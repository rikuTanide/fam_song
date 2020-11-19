import { Data, Votes } from "../types/data";
import {
  ArtistModels,
  Models,
  SongModels,
  UserModels,
  VoteModels,
} from "../types/model";

export function modeling(data: Data): Models {
  const artistVoteCounts = mapArtistVoteCounts(data.votes);
  const songVoteCounts = mapSongVoteCounts(data.votes);

  return {
    artists: new ArtistModels(data.artists, artistVoteCounts),
    songs: new SongModels(data.songs, songVoteCounts),
    users: new UserModels(data.users),
    votes: new VoteModels(data.votes),
  };
}

function mapArtistVoteCounts(votes: Votes): Map<string, number> {
  const res = new Map<string, number>();
  for (const userID in votes) {
    for (const artistID in votes[userID]) {
      const now = res.get(artistID) || 0;
      const next = now + 1;
      res.set(artistID, next);
    }
  }
  return res;
}

function mapSongVoteCounts(votes: Votes): Map<string, number> {
  const res = new Map<string, number>();
  for (const userID in votes) {
    for (const artistID in votes[userID]) {
      const song = votes[userID][artistID];
      const songID = song.songID;
      const now = res.get(songID) || 0;
      const next = now + 1;
      res.set(songID, next);
    }
  }
  return res;
}
