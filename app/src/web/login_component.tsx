import * as React from "react";
import { Provider } from "react-redux";
import { dataUpdate, selectTab, setTabs, setUserID } from "./actions";
import { applyMiddleware, compose, createStore } from "redux";
import { State } from "../types/state";
import { reducer } from "./reducer";
import thunk from "redux-thunk";
import firebase from "firebase";
import { MyPageTopComponent } from "./my_page_top";
import { Requests } from "../update/frontend";
import { Data } from "../types/data";
import { StorageService } from "./index";
import { Card } from "react-bootstrap";

export const LoginComponent: React.FunctionComponent<{
  callback: () => boolean;
}> = (props) => (
  <Card className="my-5 mx-2 shadow-sm">
    <Card.Header>
      <Card.Title>ログイン</Card.Title>
    </Card.Header>
    <Card.Body>
      <a
        className="btn btn-block btn-social btn-twitter"
        href="#"
        onClick={() => props.callback()}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <span className="fa fa-twitter" /> Twitterでログイン
      </a>
    </Card.Body>
  </Card>
);
