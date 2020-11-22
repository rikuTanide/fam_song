import {
  ArtistPageProps,
  ArtistProps,
  ArtistTabProps,
  MyPageProps,
  NotVotedArtistProps,
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
          const topSongID = songs.topSongID();
          const topSong = topSongID ? songs.get(topSongID) : undefined;
          const topSongName = topSong?.name || "";
          const count = model.artists.voteCount(aid);

          return {
            artistID: aid,
            name: name,
            count: count,
            topSongID: topSongID || "",
            topSongName: topSongName,
          };
        }
      ),
  };
}

export function toArtistPageProps(
  data: Data,
  artistID: string
): ArtistPageProps {
  const model = modeling(data);
  const artist = model.artists.get(artistID);
  const songs: SongProps[] = model.songs
    .getArtistSongs(artistID)
    .keys()
    .map(
      (songID): SongProps => {
        const song = model.songs.get(artistID, songID);
        return {
          songID: songID,
          name: song?.name || "",
          voteCount: model.songs.voteCount(artistID, songID),
        };
      }
    );
  return {
    artistID: artistID,
    name: artist?.name || "",
    songs: songs,
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
  return {
    artistID: artistID,
    artistName: artistName,
    songID: songID || "",
    songName: songName,
    userID: userID,
    userName: userName,
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

      return {
        artistID: aid,
        name: artistName,
        songs: songs,
        newSong: newSong,
        submitEnable: newSong.trim().length > 0,
        loading: myPageState.loading,
        selected: !!model.votes.find(myPageState.userID, aid),
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
