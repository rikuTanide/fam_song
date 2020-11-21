import * as React from "react";
import "firebase/auth";
import { Requests } from "../update/frontend";
import { main } from "./main";
import { State } from "../types/state";

export type GetState = () => State;

export interface ExternalArguments {
  requests: Requests;
  uid: string;
}

export type OnSelectTab = (artistID: string) => void;
export type OnNewArtistNameInput = (name: string) => void;
export type OnNewArtistSubmit = () => void;
export type OnNewSongNameInput = (artistID: string, name: string) => void;
export type OnNewSongSubmit = (artistID: string) => void;
export type OnVote = (artistID: string, songID: string) => void;
export type OnRemoveVote = (artistID: string) => void;

main();
