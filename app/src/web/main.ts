import firebase from "firebase";
import * as React from "react";
import { RootComponent } from "./root_component";
import * as ReactDOM from "react-dom";
import { Requests } from "../update/frontend";

export async function main() {
  // const app = firebase.initializeApp(
  //   await (await fetch("/__/firebase/init.json")).json()
  // );

  const app = firebase.initializeApp({
    apiKey: "AIzaSyDvKOkLEocQ6TmRCZbkFgM11hkWKEwswsU",
    authDomain: "fam-song.firebaseapp.com",
    databaseURL: "https://fam-song.firebaseio.com",
    messagingSenderId: "844377812032",
    projectId: "fam-song",
    storageBucket: "fam-song.appspot.com",
  });
  app.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const element = document.getElementById("react-root");
      const rootElement = React.createElement(RootComponent, { app: app });
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
