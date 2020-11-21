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

main();
