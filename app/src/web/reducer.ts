import { reducerWithInitialState } from "typescript-fsa-reducers";
import { State } from "../types/state";
import * as actions from "./actions";
import { MyPageState } from "../types/page_state";
import { Data } from "../types/data";

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
    loading: false,
  },
};

function contain<T>(array: T[], needle: T): boolean {
  return array.indexOf(needle) > -1;
}

export const reducer = reducerWithInitialState<State>(initialState)
  .case(actions.setUserID, setUserID)
  .case(actions.setLoading, setLoading)
  .case(actions._selectTab, selectTab)
  .case(actions.setTabs, setTabs)
  .case(actions.deleteTab, deleteTab)
  .case(actions.inputNewArtistName, inputNewArtistName)
  .case(actions.inputNewSongName, inputNewSongName)
  .case(actions.dataUpdate, dataUpdate);

function setUserID(state: State, userID: string): State {
  const myPageState = state.myPageState;
  const newMyPageState: MyPageState = {
    ...myPageState,
    userID: userID,
  };
  return { ...state, myPageState: newMyPageState };
}
function setLoading(state: State, loading: boolean): State {
  const myPageState = state.myPageState;
  const newMyPageState: MyPageState = {
    ...myPageState,
    loading: loading,
  };
  return { ...state, myPageState: newMyPageState };
}
function selectTab(state: State, tab: string): State {
  const myPageState = state.myPageState;
  const tabs = myPageState.tabs;
  const newTabs = contain(tabs, tab) ? tabs : [...tabs, tab];
  const newMyPageState: MyPageState = {
    ...myPageState,
    tabs: newTabs,
    selectTab: tab,
  };
  return { ...state, myPageState: newMyPageState };
}

function setTabs(state: State, tabs: string[]): State {
  const myPageState = state.myPageState;
  const newMyPageState: MyPageState = {
    ...myPageState,
    tabs: tabs,
  };
  return { ...state, myPageState: newMyPageState };
}

function deleteTab(state: State, tab: string): State {
  const myPageState = state.myPageState;
  const currentTab = myPageState.tabs.indexOf(tab);
  const nextTab = currentTab <= 0 ? "" : myPageState.tabs[currentTab - 1];
  const tabs = myPageState.tabs;
  const newTabs = tabs.filter((t) => t != tab);
  const newMyPageState: MyPageState = {
    ...myPageState,
    tabs: newTabs,
    selectTab: nextTab,
  };
  return { ...state, myPageState: newMyPageState };
}

function inputNewArtistName(state: State, name: string): State {
  const newMyPageState: MyPageState = {
    ...state.myPageState,
    newArtist: name,
  };
  return { ...state, myPageState: newMyPageState };
}

function inputNewSongName(
  state: State,
  payload: { artistID: string; songName: string }
): State {
  const newNewSongs = state.myPageState.newSongs
    .filter((s) => s.artistID != payload.artistID)
    .concat({
      artistID: payload.artistID,
      newSong: payload.songName,
    });

  const newMyPageState: MyPageState = {
    ...state.myPageState,
    newSongs: newNewSongs,
  };
  return { ...state, myPageState: newMyPageState };
}

function dataUpdate(state: State, data: Data): State {
  return { ...state, data: data };
}
