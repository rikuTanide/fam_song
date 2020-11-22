import * as functions from "firebase-functions";
import { DataSnapshot } from "firebase-functions/lib/providers/database";
import { Request, Response } from "./types/request_type";
import { FirebaseService, update } from "./update/server";
import * as admin from "firebase-admin";
import { Data } from "./types/data";
import { modeling } from "./mapping/modeling";
import { server } from "./server/app";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const httpHandle = functions.https.onRequest(server());

class FirebaseServiceImple implements FirebaseService {
  constructor(private ref: admin.database.Reference) {}

  push(path: string, value: any): string {
    const r = this.ref.child(path).push(value);
    return r.key!;
  }

  remove(path: string): void {
    this.ref.child(path).remove();
  }

  set(path: string, value: any): void {
    this.ref.child(path).set(value);
  }
}

export const onRequest = functions
  .region("us-central1")
  .database.ref("/requests/{event_id}")
  .onCreate(async (snapshot) => {
    await onCreate(snapshot);
    await snapshot.ref.remove();
  });

export function cleansing(org: Data | undefined): Data {
  const data = (org || {}) as Data;
  const pdata: Data = {
    artists: data.artists || {},
    users: data.users || {},
    votes: data.votes || {},
    songs: data.songs || {},
  };
  return pdata;
}

async function readData(snapshot: DataSnapshot): Promise<Data> {
  return new Promise<any>((resolve) => {
    snapshot.ref.root.child("data").once("value", (ss) => {
      const data = cleansing(ss.val());
      resolve(data);
    });
  });
}

async function onCreate(snapshot: DataSnapshot) {
  const req = snapshot.val() as Request;
  const requestID = snapshot.key;
  const fs = new FirebaseServiceImple(snapshot.ref.root);
  const data = await readData(snapshot);
  const model = modeling(data);
  const res = update(fs, model, req, requestID);
  const userID = req.userID;
  snapshot.ref.root.child(`responses/${userID}`).push(res);
}
