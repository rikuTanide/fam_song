import { Dispatch } from "redux";
import { ExternalArguments, GetState } from "./index";
import actionCreatorFactory from "typescript-fsa";
import { Data, Users, Artists, Songs, Votes } from "../types/data";
import { modeling } from "../mapping/modeling";

export function logout() {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {
    api.logout();
    window.location.reload();
  };
}

export function updateUsers(users: Users) {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {
    const data = getState().data;
    const newData: Data = { ...data, users: users };
    dispatch(dataUpdate(newData));
  };
}

export function updateArtists(artists: Artists) {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {
    const data = getState().data;
    const newData: Data = { ...data, artists: artists };
    dispatch(dataUpdate(newData));
  };
}

export function updateSongs(songs: Songs) {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {
    const data = getState().data;
    const newData: Data = { ...data, songs: songs };
    dispatch(dataUpdate(newData));
  };
}

export function updateVotes(votes: Votes) {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {
    const data = getState().data;
    const newData: Data = { ...data, votes: votes };
    dispatch(dataUpdate(newData));
  };
}

export function postArtist() {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {
    const state = getState();
    const name = state.myPageState.newArtist.trim();
    if (!name) return;
    dispatch(setLoading(true));
    await api.requests.postArtist({ name: name });
    dispatch(setLoading(false));
    dispatch(inputNewArtistName(""));
  };
}

export function postSong(artistID: string) {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {
    const state = getState();
    const name = state.myPageState.newSongs
      .find((ns) => ns.artistID == artistID)
      ?.newSong?.trim();
    if (!name) return;
    dispatch(setLoading(true));
    await api.requests.postSong(artistID, { name: name });
    dispatch(setLoading(false));
    dispatch(inputNewSongName({ artistID: artistID, songName: "" }));
  };
}

export function putVote(artistID: string, songID: string) {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {
    api.requests.putVote(artistID, { songID: songID });
    const data = getState().data;
    const model = modeling(data);
    const newVotes = model.votes
      .add(api.uid, artistID, { songID: songID })
      .ex();
    const newData: Data = {
      ...data,
      votes: newVotes,
    };
    dispatch(dataUpdate(newData));
  };
}

export function deleteVote(artistID: string) {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {
    api.requests.deleteVote(artistID);
    const data = getState().data;
    const model = modeling(data);
    const newVotes = model.votes.remove(api.uid, artistID).ex();
    const newData: Data = {
      ...data,
      votes: newVotes,
    };
    dispatch(dataUpdate(newData));
  };
}
export function selectTab(artistID: string) {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {
    dispatch(_selectTab(artistID));
    const state = getState();
    api.storageService.setTabs(state.myPageState.tabs);
    api.storageService.setCurrentTab(state.myPageState.selectTab);
  };
}
export function updateSongName(artistID: string, songID: string) {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {
    dispatch(_selectTab(artistID));
    const state = getState();
    const model = modeling(state.data);
    const songName = model.songs.get(artistID, songID)?.name || "";
    const newSongName = window.prompt("曲名を変更", songName);
    if (!newSongName) return;
    const newSongs = model.songs.updateSongName(artistID, songID, newSongName);
    dispatch(dataUpdate({ ...state.data, songs: newSongs }));
    api.requests.putSong(artistID, songID, newSongName);
  };
}
const actionCreator = actionCreatorFactory();
export const setUserID = actionCreator<string>("setUserID");
export const setLoading = actionCreator<boolean>("setLoading");
export const _selectTab = actionCreator<string>("_selectTab");
export const setTabs = actionCreator<string[]>("setTabs");
export const deleteTab = actionCreator<string>("deleteTab");
export const inputNewArtistName = actionCreator<string>("inputNewArtistName");
export const inputNewSongName = actionCreator<{
  artistID: string;
  songName: string;
}>("inputNewSongName");
export const dataUpdate = actionCreator<Data>("dataUpdate");
