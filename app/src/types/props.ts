export interface TopPageProps {
  artists: ArtistProps[];
}

export interface ArtistProps {
  artistID: string;
  name: string;
  count: number;
}

export interface ArtistPageProps {
  artistID: string;
  name: string;
  songs: SongProps[];
}

export interface SongProps {
  artistID: string;
  songID: string;
  name: string;
  voteUsers: VoteUserProps[];
}

export interface VoteUserProps {
  userID: string;
  twitterName: string;
  twitterScreenName: string;
  img: string;
}

export interface UserPageProps {
  voteSongs: VoteSongProps[];
}

export interface VoteSongProps {
  artistID: string;
  artistName: string;
  songID: string;
  songName: string;
}

export interface MyPageProps {
  tab: string;
  tabs: ArtistTabProps[];
  newArtist: string;
  submitEnable: boolean;
}

export interface ArtistTabProps {
  artistID: string;
  name: string;

  songs: SongOptionProps[];
  newSong: string;
  submitEnable: boolean;
}

export interface SongOptionProps {
  songID: string;
  songName: string;
  selected: boolean;
}
