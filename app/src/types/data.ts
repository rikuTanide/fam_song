export interface Song {
  artistID: string;
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

export type Songs = {
  [songID: string]: Song;
};

export type Artists = {
  [artistID: string]: Artist;
};

export type Users = {
  [userID: string]: User;
};

export type Votes = {
  [userID: string]: { [artistID: string]: Vote };
};
