import { Request, Response } from "../types/request_type";
import { Artist, Song, User, Vote } from "../types/data";
import firebase from "firebase";
import { PATH_ARTISTS } from "../values";

export class Requests {
  private ps: Map<string, Callback> = new Map<string, Callback>();

  constructor(private app: firebase.app.App) {
    const path = `responses/${this.app.auth().currentUser?.uid || ""}`;
    this.app.database().ref(path).remove();
    this.app
      .database()
      .ref(path)
      .on("child_added", (snapshot) => {
        const res = snapshot.val() as Response;
        const key = res.requestID;
        const callback = this.ps.get(key);
        if (!callback) return;
        const result = res.result as string;
        callback(result);
        this.ps.delete(key);
      });
  }

  public putUser(user: User) {}
  public async postArtist(artist: Artist): Promise<string> {
    const req: Request = {
      method: "POST",
      params: null,
      payload: artist,
      path: PATH_ARTISTS,
      userID: this.app.auth().currentUser!.uid,
    };
    return await this.push(req);
  }
  public async postSong(artistID: string, song: Song): Promise<string> {
    return "";
  }
  public putVote(artistID: string, vote: Vote) {}
  public deleteVote(artistID: string) {}

  private push(request: Request): Promise<string> {
    const r = this.app.database().ref("requests").push(request);
    return new Promise((resolve) => {
      this.on(r.key!, (result) => resolve(result));
    });
  }

  private on(key: string, callback: Callback) {
    this.ps.set(key, callback);
  }
}

type Callback = (result: string) => void;
