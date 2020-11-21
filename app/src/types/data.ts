export interface Song {
  name: string;
}

export interface Artist {
  name: string;
}

export interface User {
  name: string;
  screenName: string;
  img: string;
}

export interface Vote {
  songID: string;
}

export interface Data {
  artists: Artists;
  songs: Songs;
  users: Users;
  votes: Votes;
}

export type Artists = {
  [artistID: string]: Artist;
};

export type Songs = {
  [artistID: string]: ArtistSongs;
};

export type ArtistSongs = {
  [songID: string]: Song;
};

export type Users = {
  [userID: string]: User;
};

export type Votes = {
  [userID: string]: { [artistID: string]: Vote };
};

export interface Data {
  artists: Artists;
  users: Users;
  votes: Votes;
  songs: Songs;
}
