import {
  Artist,
  Artists,
  ArtistSongs,
  Song,
  Songs,
  User,
  Users,
  Vote,
  Votes,
} from "./data";

export interface Models {
  users: UserModels;
  artists: ArtistModels;
  songs: SongModels;
  votes: VoteModels;
}

export class UserModels {
  constructor(private data: Users) {}

  public get(id: string): User | undefined {}

  public in(userIDs: string[]): UserModels {}

  public ex(): Users {}

  public add(userID: string, user: User): UserModels {}
}

export class ArtistModels {
  constructor(private data: Artists, private voteCounts: Map<string, number>) {}

  public sortByVoteCount(): ArtistModels {}

  public keys(): string[] {}

  public get(id: string): Artist | undefined {}

  public in(artistIDs: string[]): ArtistModels {}

  public ex(): Artists {}

  public add(artistID: string, artist: Artist): ArtistModels {}
}

export class SongModels {
  constructor(
    private data: Songs,
    private voteCounts: Map<string, Map<string, number>>
  ) {}

  public getArtistSongs(artistID: string): ArtistSongModels {}

  public get(artistID: string, songID: string): Song | undefined {}

  public ex(): Songs {}

  public add(artistID: string, songID: string, song: Song): SongModels {}
}

export class ArtistSongModels {
  constructor(private data: ArtistSongs) {}

  public sortByVoteCount(): ArtistSongModels {}

  public get(songID: string): Song | undefined {}

  public keys(): string[] {}

  public ex(): ArtistSongs {}

  public add(songID: string, song: Song): ArtistSongModels {}
}

export class VoteModels {
  constructor(private data: Votes) {}

  public find(userID: string, artistID: string): string | undefined {}

  public voteArtists(userID: string): string[] {}

  public notVoteArtists(userID: string): string[] {}

  public voteUsers(artistID: string, songID: string): string[] {}

  public ex(): Votes {}

  public add(userID: string, artistID: string, vote: Vote): VoteModels {}

  public remove(userID: string, artistID: string): VoteModels {}
}
