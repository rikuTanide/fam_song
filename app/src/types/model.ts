import { Artist, Artists, Song, Songs, User, Users, Votes } from "./data";

export class UserModels {
  constructor(private data: Users) {}

  public get(id: string): User | undefined {}

  public in(userIDs: string[]): UserModels {}

  public ex(): Users {}
}

export class ArtistModels {
  constructor(private data: Artists, private voteCounts: Map<string, number>) {}

  public sortByVoteCount(): ArtistModels {}

  public keys(): string[] {}

  public get(id: string): Artist | undefined {}

  public in(artistIDs: string[]): ArtistModels {}

  public ex(): Artists {}
}

export class SongModels {
  constructor(private data: Songs, private voteCounts: Map<string, number>) {}

  public whereArtistID(artistID: string): SongModels {}

  public sortByVoteCount(): SongModels {}

  public keys(): string[] {}

  public get(artistID: string, songID: string): Song | undefined {}
  public ex(): Songs {}
}

export class VoteModels {
  constructor(private data: Votes) {}

  public find(userID: string, artistID: string): string | undefined {}

  public voteArtists(userID: string): string[] {}

  public notVoteArtists(userID: string): string[] {}

  public voteUsers(artistID: string, songID: string): string[] {}

  public ex(): Votes {}
}
