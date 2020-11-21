export interface MyPageState {
  userID: string;
  tabs: string[];
  selectTab: string;
  newArtist: string;
  loading: boolean;
  newSongs: NewSongState[];
}

export interface NewSongState {
  artistID: string;
  newSong: string;
}
