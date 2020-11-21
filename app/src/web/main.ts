import firebase from "firebase";
import * as React from "react";
import { RootComponent } from "./root_component";
import * as ReactDOM from "react-dom";
import { Requests } from "../update/frontend";

export async function main() {
  const app = firebase.initializeApp(
    await (await fetch("/__/firebase/init.json")).json()
  );
  app.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const element = document.getElementById("react-root");
      const rootElement = React.createElement(RootComponent);
      ReactDOM.render(rootElement, element);
    } else {
      const button = document.createElement("button");
      button.addEventListener("click", () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "consent" });
        void app
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            const req = new Requests();
            console.log(result.additionalUserInfo);
            return window.location.reload();
          });
      });
      button.textContent = "ログイン";
      document.body.appendChild(button);
    }
  });
}
