import { reducerWithInitialState } from "typescript-fsa-reducers";
import { State } from "../types/state";
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
    selectTab: "",
    tabs: [],
    userID: "",
  },
};

export const reducer = reducerWithInitialState<State>(initialState);
