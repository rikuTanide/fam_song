import * as React from "react";
import "firebase/auth";
import { Requests } from "../update/frontend";
import { main } from "./main";
import { State } from "../types/state";

export type GetState = () => State;

export class StorageService {
  public getTabs(): string[] {
    const tabsStr = window.localStorage.getItem("tabs");
    if (!tabsStr) return [];
    return JSON.parse(tabsStr);
  }

  public getCurrentTab(): string {
    const tabStr = window.localStorage.getItem("tab");
    return tabStr || "";
  }

  public setTabs(tabs: string[]) {
    window.localStorage.setItem("tabs", JSON.stringify(tabs));
  }

  public setCurrentTab(tab: string) {
    window.localStorage.setItem("tab", tab);
  }
}

export interface ExternalArguments {
  requests: Requests;
  uid: string;
  storageService: StorageService;
}

export type OnSelectTab = (artistID: string) => void;
export type OnCloseTab = (artistID: string) => void;
export type OnNewArtistNameInput = (name: string) => void;
export type OnNewArtistSubmit = () => void;
export type OnNewSongNameInput = (artistID: string, name: string) => void;
export type OnNewSongSubmit = (artistID: string) => void;
export type OnVote = (artistID: string, songID: string) => void;
export type OnRemoveVote = (artistID: string) => void;

main();
