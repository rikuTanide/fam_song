export interface MyPageState {
  tab: string;
  selectArtist: string;
  newArtist: string;
  newSongs: NewSongState[];
}

export interface NewSongState {
  artistID: string;
  newSong: string;
}
