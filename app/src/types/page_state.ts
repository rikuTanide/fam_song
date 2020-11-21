export interface MyPageState {
  tabs: string[];
  selectArtist: string;
  newArtist: string;
  newSongs: NewSongState[];
}

export interface NewSongState {
  artistID: string;
  newSong: string;
}
