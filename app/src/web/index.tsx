import * as React from "react";
import firebase from "firebase";
import "firebase/auth";
import * as ReactDOM from "react-dom";

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
            return window.location.reload();
          });
      });
      button.textContent = "ログイン";
      document.body.appendChild(button);
    }
  });
}

class RootComponent extends React.Component {
  public render(): React.ReactElement {
    return <div>aaa</div>;
  }
}

main();
