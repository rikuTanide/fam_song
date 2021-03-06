import {
  ArtistPageProps,
  ArtistProps,
  ArtistTabProps,
  MyPageProps,
  NotVotedArtistProps,
  ShareProps,
  SongOptionProps,
  SongPageProps,
  SongProps,
  TopPageProps,
  UserPageProps,
  VotedArtistProps,
  VotePageProps,
  VoteSongProps,
  VoteUserProps,
} from "../types/props";
import { State } from "../types/state";
import { modeling } from "./modeling";
import { Data } from "../types/data";
import { Models } from "../types/model";

export function toTopPageProps(data: Data): TopPageProps {
  const model = modeling(data);
  return {
    artists: model.artists
      .sortByVoteCount()
      .keys()
      .map(
        (aid): ArtistProps => {
          const artist = model.artists.get(aid);
          const name = artist?.name || "";
          const songs = model.songs.getArtistSongs(aid);

          const topSongs = model.songs
            .getArtistSongs(aid)
            .sortByVoteCount()
            .keys()
            .sort((s1, s2) =>
              songs.voteCount(s1) > songs.voteCount(s2) ? -1 : 1
            )
            .slice(0, 3)
            .map((songID) => mapSongRanking(model, aid, songID));

          return {
            artistID: aid,
            name: name,
            songRanking: topSongs,
          };
        }
      ),
  };
}

function mapSongRanking(
  model: Models,
  artistID: string,
  songID: string
): SongProps {
  const song = model.songs.get(artistID, songID);
  return {
    songID: songID,
    name: song?.name || "",
    voteCount: model.songs.voteCount(artistID, songID),
  };
}

export function toArtistPageProps(
  data: Data,
  artistID: string
): ArtistPageProps {
  const model = modeling(data);
  const artist = model.artists.get(artistID);
  const songs = model.songs
    .getArtistSongs(artistID)
    .sortByVoteCount()
    .keys()
    .map((songID) => mapSongRanking(model, artistID, songID));
  const name = artist?.name || "";
  const ogTitle = `${name}といえば？`;
  const ogUrl = createArtistUrl(artistID);
  const ogICatch = createArtistICacheUrl(name, songs.slice(0, 3));
  const share = mapArtistShare(model, artistID);

  return {
    artistID: artistID,
    name: name,
    songs: songs,
    ogTitle: ogTitle,
    ogUrl: ogUrl,
    ogICatch: ogICatch,
    share: share,
  };
}

export function toSongPageProps(
  data: Data,
  artistID: string,
  songID: string
): SongPageProps {
  const model = modeling(data);
  const artistName = model.artists.get(artistID)?.name || "";
  const song = model.songs.get(artistID, songID);
  const songName = song?.name || "";
  const voteUsers: VoteUserProps[] = model.votes
    .voteUsers(artistID, songID)
    .map((uid) => {
      const user = model.users.get(uid);
      if (user) {
        return {
          userID: uid,
          img: user.img,
          twitterName: user.name,
        };
      } else {
        return {
          userID: uid,
          img: "",
          twitterName: "",
        };
      }
    });
  return {
    artistID: artistID,
    artistName: artistName,
    songID: songID,
    songName: songName,
    voteUsers: voteUsers,
  };
}

export function toUserPageProps(data: Data, userID: string): UserPageProps {
  const model = modeling(data);
  const voteSongs: VoteSongProps[] = model.votes.voteArtists(userID).map(
    (aid): VoteSongProps => {
      const sid = model.votes.find(userID, aid);
      const artist = model.artists.get(aid);
      if (sid && model.songs.get(aid, sid)) {
        const song = model.songs.get(aid, sid);
        return {
          artistID: aid,
          artistName: artist?.name || "",
          songID: sid,
          songName: song?.name || "",
        };
      } else {
        return {
          artistID: aid,
          artistName: artist?.name || "",
          songID: "",
          songName: "",
        };
      }
    }
  );
  const user = model.users.get(userID);
  return {
    userID: userID,
    userName: user?.name || "",
    userImg: user?.img || "",
    voteSongs: voteSongs,
  };
}

export function toVotePageProps(
  data: Data,
  artistID: string,
  userID: string
): VotePageProps {
  const model = modeling(data);
  const artist = model.artists.get(artistID);
  const artistName = artist?.name || "";
  const vote = model.votes.find(userID, artistID);
  const songID = vote;
  const songName =
    (songID ? model.songs.get(artistID, songID)?.name : undefined) || "";
  const user = model.users.get(userID);
  const userName = user?.name || "";
  const ogUrl = createVoteUrl(userID, artistID);
  const ogICatch = createICacheUrl(userName, artistName, songName);
  const ogTitle = `${userName}さんが${artistName}といえば${songName}だと主張しています。`;

  return {
    artistID: artistID,
    artistName: artistName,
    songID: songID || "",
    songName: songName,
    userID: userID,
    userName: userName,
    share: mapShare(model, userID, artistID)!,
    ogICatch: ogICatch.toString(),
    ogTitle: ogTitle,
    ogUrl: ogUrl,
  };
}

export function toMyPageProps(state: State): MyPageProps {
  const model = modeling(state.data);
  const myPageState = state.myPageState;
  const user = model.users.get(myPageState.userID);
  const tabs: ArtistTabProps[] = model.artists
    .in(myPageState.tabs)
    .keys()
    .map((aid) => {
      const artist = model.artists.get(aid);
      const artistName = artist?.name || "";
      const songs: SongOptionProps[] = model.songs
        .getArtistSongs(aid)
        .keys()
        .map(
          (sid): SongOptionProps => {
            const song = model.songs.get(aid, sid);
            const songName = song?.name;
            const selected = model.votes.find(myPageState.userID, aid) === sid;
            return {
              songID: sid,
              songName: songName || "",
              selected: selected,
            };
          }
        );
      const newSong =
        myPageState.newSongs.find((a) => a.artistID == aid)?.newSong || "";
      const share = mapShare(model, myPageState.userID, aid);
      const userName = user?.name || "";
      const voteSongID = model.votes.find(myPageState.userID, aid);
      const songName = voteSongID
        ? model.songs.get(aid, voteSongID)?.name || ""
        : "";

      return {
        artistID: aid,
        name: artistName,
        songs: songs,
        newSong: newSong,
        submitEnable: newSong.trim().length > 0 && !myPageState.loading,
        loading: myPageState.loading,
        selected: !!voteSongID,
        share: share,
        icacheUrl: voteSongID
          ? createICacheUrl(userName, artistName, songName)
          : undefined,
        selectedSongName: songName,
      };
    });

  const votedArtists = model.votes.voteArtists(myPageState.userID).map(
    (aid): VotedArtistProps => {
      const artistName = model.artists.get(aid)?.name;
      const sid = model.votes.find(myPageState.userID, aid);
      const song = sid ? model.songs.get(aid, sid) : undefined;
      const songName = song?.name;
      return {
        artistID: aid,
        artistName: artistName || "",
        songID: sid || "",
        songName: songName || "",
      };
    }
  );

  const notVotedArtists = model.votes.notVoteArtists(myPageState.userID).map(
    (aid): NotVotedArtistProps => {
      const artistName = model.artists.get(aid)?.name;
      return {
        artistID: aid,
        artistName: artistName || "",
      };
    }
  );

  return {
    img: user?.img || "",
    newArtist: myPageState.newArtist,
    submitEnable: myPageState.newArtist.trim().length > 0,
    tab: myPageState.selectTab,
    tabs: tabs,
    votedArtists: votedArtists,
    notVotedArtists: notVotedArtists,
    loading: myPageState.loading,
  };
}

function mapShare(
  model: Models,
  userID: string,
  artistID: string
): ShareProps | undefined {
  const songID = model.votes.find(userID, artistID);
  const artistName = model.artists.get(artistID)?.name || "";
  if (!songID) return;
  const homeUrl = createVoteUrl(userID, artistID);
  const songName = model.songs.get(artistID, songID)?.name || "";
  const name = model.users.get(userID)?.name || "";
  const message = `${name}さんは\n${artistName}といえば『${songName}』だと主張しています。\n`;
  const url = new URL("https://twitter.com/intent/tweet");
  url.searchParams.set("text", message);
  url.searchParams.set("url", homeUrl);
  url.searchParams.set("hashtags", "アーティストの代表曲は");
  return {
    url: url.toString(),
  };
}

function mapArtistShare(
  model: Models,
  artistID: string
): ShareProps | undefined {
  const artistName = model.artists.get(artistID)?.name || "";
  const homeUrl = createArtistUrl(artistID);
  const message = `${artistName}といえば\n`;
  const url = new URL("https://twitter.com/intent/tweet");
  url.searchParams.set("text", message);
  url.searchParams.set("url", homeUrl);
  url.searchParams.set("hashtags", "アーティストの代表曲は");
  return {
    url: url.toString(),
  };
}

function createVoteUrl(userID: string, artistID: string): string {
  return `https://famous-song.app/votes/users/${userID}/artists/${artistID}`;
}

function createArtistUrl(artistID: string): string {
  return `https://famous-song.app/artists/${artistID}`;
}

function createICacheUrl(
  userName: string,
  artistName: string,
  songName: string
): string {
  const ogICatch = new URL("https://famous-song.app/icache");
  ogICatch.searchParams.set("user_name", userName);
  ogICatch.searchParams.set("artist_name", artistName);
  ogICatch.searchParams.set("song_name", songName);
  return ogICatch.toString();
}

function createArtistICacheUrl(artistName: string, songs: SongProps[]): string {
  const ogICatch = new URL("https://famous-song.app/artist_icatch");
  ogICatch.searchParams.set("artist_name", artistName);
  ogICatch.searchParams.set("songs", JSON.stringify(songs));
  return ogICatch.toString();
}
