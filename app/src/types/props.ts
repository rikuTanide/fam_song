export interface TopPageProps {
  artists: ArtistProps[];
}

export interface ArtistProps {
  artistID: string;
  name: string;
  topSongID: string;
  topSongName: string;
  count: number;
}

export interface ArtistPageProps {
  artistID: string;
  name: string;
  songs: SongProps[];
}

export interface SongProps {
  songID: string;
  name: string;
  voteCount: number;
}

export interface SongPageProps {
  artistID: string;
  artistName: string;
  songID: string;
  songName: string;

  voteUsers: VoteUserProps[];
}

export interface VoteUserProps {
  userID: string;
  twitterName: string;
  img: string;
}

export interface UserPageProps {
  userID: string;
  userName: string;
  userImg: string;
  voteSongs: VoteSongProps[];
}

export interface VoteSongProps {
  artistID: string;
  artistName: string;
  songID: string;
  songName: string;
}

export interface VotePageProps {
  ogTitle: string;
  ogUrl: string;
  ogICatch: string;

  userID: string;
  userName: string;
  artistID: string;
  artistName: string;
  songID: string;
  songName: string;
  share: ShareProps;
}

export interface MyPageProps {
  img: string;
  tab: string;
  votedArtists: VotedArtistProps[];
  notVotedArtists: NotVotedArtistProps[];
  tabs: ArtistTabProps[];
  newArtist: string;
  submitEnable: boolean;
  loading: boolean;
}

export interface VotedArtistProps {
  artistID: string;
  artistName: string;
  songID: string;
  songName: string;
}

export interface NotVotedArtistProps {
  artistID: string;
  artistName: string;
}

export interface ArtistTabProps {
  artistID: string;
  name: string;

  songs: SongOptionProps[];
  newSong: string;
  submitEnable: boolean;
  loading: boolean;
  selected: boolean;

  share?: ShareProps;
}

export interface SongOptionProps {
  songID: string;
  songName: string;
  selected: boolean;
}

export interface ShareProps {
  url: string;
}
