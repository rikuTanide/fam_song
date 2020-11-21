import { reducerWithInitialState } from "typescript-fsa-reducers";
import { State } from "./index";
const initialState: State = {
  data: {
    songs: {},
    votes: {},
    users: {},
    artists: {},
  },
  myPageState: {
    newArtist: "",
    newSongs: [],
    selectArtist: "",
    tabs: [],
  },
};

const reducer = reducerWithInitialState<State>(initialState);
