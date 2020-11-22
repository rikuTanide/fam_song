import firebase from "firebase";
import * as React from "react";
import { RootComponent } from "./root_component";
import * as ReactDOM from "react-dom";
import { Requests } from "../update/frontend";
import { LoginComponent } from "./login_component";

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
      req.putUser(user.uid);
    } else {
      const callback = () => {
        const provider = new firebase.auth.TwitterAuthProvider();
        provider.setCustomParameters({ prompt: "consent" });
        void app
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            window.location.reload();
          });
        return false;
      };

      const element = document.getElementById("react-root");
      const rootElement = React.createElement(LoginComponent, {
        callback: callback,
      });
      ReactDOM.render(rootElement, element);
    }
  });
}
