import firebase from "firebase";
import * as React from "react";
import { RootComponent } from "./root_component";
import * as ReactDOM from "react-dom";
import { Requests } from "../update/frontend";
import { LoginComponent } from "./login_component";
import { User } from "../types/data";

export async function main() {
  const app = firebase.initializeApp(
    await (await fetch("/__/firebase/init.json")).json()
  );

  app.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const element = document.getElementById("react-root");
      const req = new Requests(app);
      const rootElement = React.createElement(RootComponent, {
        app: app,
        requests: req,
      });
      ReactDOM.render(rootElement, element);
    } else {
      const callback = () => {
        const provider = new firebase.auth.TwitterAuthProvider();
        provider.setCustomParameters({ prompt: "consent" });
        void app
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            const req = new Requests(app);
            const user: User = {
              name: result.additionalUserInfo?.username || "",
              img: result.user?.photoURL || "",
            };
            req.putUser(result.user?.uid || "", user);
            // window.location.reload();
          });
        return false;
      };

      const anonymousCallback = (): boolean => {
        const nickname = window.prompt("あなたのニックネームを教えてください");
        if (!nickname) return false;
        app
          .auth()
          .signInAnonymously()
          .then((res) => {
            const uid = res.user?.uid;
            if (!uid) return;
            const req = new Requests(app);
            req.putUser(uid, { name: nickname, img: "/noimg.jpg" });
          });
        return false;
      };

      const element = document.getElementById("react-root");
      const rootElement = React.createElement(LoginComponent, {
        callback: callback,
        anonymousCallback: anonymousCallback,
      });
      ReactDOM.render(rootElement, element);
    }
  });
}
