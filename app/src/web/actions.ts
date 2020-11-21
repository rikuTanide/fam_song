import { Dispatch } from "redux";
import { ExternalArguments, GetState } from "./index";
import actionCreatorFactory from "typescript-fsa";

export function postArtist(name: string) {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {};
}

export function postSong(artistID: string, name: string) {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {};
}

export function putVote(artistID: string, songID: string) {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {};
}

export function deleteVote(artistID: string, songID: string) {
  return async (
    dispatch: Dispatch,
    getState: GetState,
    api: ExternalArguments
  ) => {};
}
const actionCreator = actionCreatorFactory();
export const selectTab = actionCreator<string>("selectTab");
export const deleteTab = actionCreator<string>("deleteTab");
export const inputNewArtistName = actionCreator<string>("inputNewArtistName");
export const vote = actionCreator<string>("vote");
export const inputNewSongName = actionCreator<string>("inputNewSongName");
