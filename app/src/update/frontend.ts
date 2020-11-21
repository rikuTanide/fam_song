import { Artist, Song, User, Vote } from "../types/data";

export class Requests {
  putUser(user: User) {}
  postArtist(artist: Artist) {}
  postSong(artistID: string, song: Song) {}
  putVote(artistID: string, vote: Vote) {}
  deleteVote(artistID: string) {}
}
