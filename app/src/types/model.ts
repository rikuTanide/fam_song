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

  public get(id: string): User | undefined {
    return this.data[id];
  }

  public in(userIDs: string[]): UserModels {
    const next: Users = {};
    for (const uid of userIDs) {
      const u = this.get(uid);
      if (!u) continue;
      next[uid] = u;
    }
    return new UserModels(next);
  }

  public ex(): Users {
    return this.data;
  }

  public add(userID: string, user: User): UserModels {
    const next: Users = { ...this.data, [userID]: user };
    return new UserModels(next);
  }
}

export class ArtistModels {
  constructor(private data: Artists, private voteCounts: Map<string, number>) {}

  public sortByVoteCount(): ArtistModels {
    const uids = this.keys();
    uids.sort((u1, u2) => (this.voteCount(u1) < this.voteCount(u2) ? 1 : -1));
    return this.in(uids);
  }

  public keys(): string[] {
    return Object.keys(this.data);
  }

  public get(id: string): Artist | undefined {
    return this.data[id];
  }

  public voteCount(id: string): number {
    return this.voteCounts.get(id) || 0;
  }

  public in(artistIDs: string[]): ArtistModels {
    const next: Artists = {};
    for (const aid of artistIDs) {
      const a = this.get(aid);
      if (!a) continue;
      next[aid] = a;
    }
    return new ArtistModels(next, this.voteCounts);
  }

  public ex(): Artists {
    return this.data;
  }

  public add(artistID: string, artist: Artist): ArtistModels {
    const next: Artists = { ...this.data, [artistID]: artist };
    return new ArtistModels(next, this.voteCounts);
  }
}

export class SongModels {
  constructor(
    private data: Songs,
    private voteCounts: Map<string, Map<string, number>>
  ) {}

  public getArtistSongs(artistID: string): ArtistSongModels {
    return new ArtistSongModels(
      this.data[artistID] || {},
      this.artistVoteCounts(artistID)
    );
  }

  private artistVoteCounts(artistID: string): Map<string, number> {
    return this.voteCounts.get(artistID) || new Map<string, number>();
  }

  public get(artistID: string, songID: string): Song | undefined {
    return (this.data[artistID] || {})[songID];
  }

  public ex(): Songs {
    return this.data;
  }

  public add(artistID: string, songID: string, song: Song): SongModels {
    const nowArtistSong = this.get(artistID, songID) || {};
    const newArtistSongs: ArtistSongs = { ...nowArtistSong, [songID]: song };
    const nextSongs: Songs = { ...this.data, [artistID]: newArtistSongs };
    return new SongModels(nextSongs, this.voteCounts);
  }

  public voteCount(artistID: string, songID: string): number {
    return this.artistVoteCounts(artistID).get(songID) || 0;
  }

  public updateSongName(
    artistID: string,
    songID: string,
    newSongName: string
  ): Songs {
    const newSong: Song = { ...this.data[artistID][songID], name: newSongName };
    const newArtistSongs: ArtistSongs = {
      ...this.data[artistID],
      [songID]: newSong,
    };
    return { ...this.data, [artistID]: newArtistSongs };
  }
}

export class ArtistSongModels {
  constructor(
    private data: ArtistSongs,
    private voteCounts: Map<string, number>
  ) {}

  public sortByVoteCount(): ArtistSongModels {
    const songIDs = this.keys().sort((a1, a2) =>
      this.voteCount(a1) < this.voteCount(a2) ? 1 : -1
    );
    const next: ArtistSongs = {};
    for (const sid of songIDs) {
      next[sid] = this.data[sid];
    }
    return new ArtistSongModels(next, this.voteCounts);
  }

  public get(songID: string): Song | undefined {
    return this.data[songID];
  }

  public keys(): string[] {
    return Object.keys(this.data);
  }

  public ex(): ArtistSongs {
    return this.data;
  }

  public add(songID: string, song: Song): ArtistSongModels {
    const next: ArtistSongs = { ...this.data, [songID]: song };
    return new ArtistSongModels(next, this.voteCounts);
  }

  public topSongID(): string | undefined {
    const counts = this.keys()
      .map((sid) => this.voteCount(sid))
      .sort()
      .reverse();
    if (counts.length == 0) return;
    const max = counts[0];
    return this.keys().find((sid) => this.voteCount(sid) === max);
  }

  public voteCount(sid: string): number {
    return this.voteCounts.get(sid) || 0;
  }
}

export class VoteModels {
  constructor(private data: Votes, private artists: Artists) {}

  public find(userID: string, artistID: string): string | undefined {
    return (this.data[userID] || {})[artistID]?.songID;
  }

  public voteArtists(userID: string): string[] {
    return Object.keys(this.data[userID] || {});
  }

  public notVoteArtists(userID: string): string[] {
    const artistIDs = Object.keys(this.artists);
    const set = new Set<string>(artistIDs);
    this.voteArtists(userID).forEach((id) => set.delete(id));
    return [...set.values()];
  }

  public voteUsers(artistID: string, songID: string): string[] {
    const res: string[] = [];
    for (const uid in this.data) {
      if (this.find(uid, artistID) === songID) res.push(uid);
    }
    return res;
  }

  public ex(): Votes {
    return this.data;
  }

  public add(userID: string, artistID: string, vote: Vote): VoteModels {
    const next: Votes = {
      ...this.data,
      [userID]: { ...(this.data[userID] || {}), [artistID]: vote },
    };
    return new VoteModels(next, this.artists);
  }

  public remove(userID: string, artistID: string): VoteModels {
    const nextUserVote = { ...this.data[userID] } || {};
    delete nextUserVote[artistID];
    const next: Votes = { ...this.data, [userID]: nextUserVote };
    return new VoteModels(next, this.artists);
  }
}
