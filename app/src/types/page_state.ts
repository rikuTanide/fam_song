export interface MyPageState {
  userID: string;
  tabs: string[];
  selectTab: string;
  newArtist: string;
  newSongs: NewSongState[];
}

export interface NewSongState {
  artistID: string;
  newSong: string;
}
