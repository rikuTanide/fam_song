import * as React from "react";
import "firebase/auth";
import { Data } from "../types/data";
import { MyPageState } from "../types/page_state";
import actionCreatorFactory from "typescript-fsa";
import { Requests } from "../update/frontend";
import { main } from "./main";
import { State } from "../types/state";

export const actionCreator = actionCreatorFactory();
export type GetState = () => State;

export interface ExternalArguments {
  requests: Requests;
  uid: string;
}

main();
