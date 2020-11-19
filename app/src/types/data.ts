export interface Song {
  artistID: string;
  name: string;
}

export interface Artist {
  name: string;
}

export interface User {
  name: string;
}

export interface Vote {
  songID: string;
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
