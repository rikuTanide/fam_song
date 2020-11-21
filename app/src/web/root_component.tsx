import * as React from "react";
import { Tabs } from "react-bootstrap";
import { connect, Provider } from "react-redux";
import { toMyPageProps } from "../mapping/to_props";
import * as actions from "./actions";
import {
  bindActionCreators,
  createStore,
  compose,
  applyMiddleware,
} from "redux";
import { ArtistTabProps, MyPageProps } from "../types/props";
import { ArtistListComponent } from "./artist_list_component";
import { ArtistTabComponent } from "./artist_tab_component";
import { State } from "../types/state";
import { reducer } from "./reducer";
import thunk from "redux-thunk";
import firebase from "firebase";
import { MyPageTopComponent } from "./my_page_top";
import { Requests } from "../update/frontend";
import { dataUpdate, selectTab, setTabs, setUserID } from "./actions";
import { Data } from "../types/data";
import { StorageService } from "./index";

export const RootComponent: React.SFC<{
  app: firebase.app.App;
  requests: Requests;
}> = (props) => {
  const composeEnhancers = compose;
  const storageService = new StorageService();
  const enhancer = composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({
        uid: props.app.auth().currentUser!.uid,
        requests: props.requests,
        storageService: storageService,
      })
    )
  );

  const store = createStore<State, any, any, any>(reducer, enhancer);
  store.dispatch(setUserID(props.app.auth().currentUser!.uid));
  store.dispatch(setTabs(storageService.getTabs()));
  store.dispatch(selectTab(storageService.getCurrentTab()));

  props.app
    .database()
    .ref("data")
    .on("value", (ss) => {
      const data = (ss.val() || {}) as Data;
      const pdata: Data = {
        artists: data.artists || {},
        users: data.users || {},
        votes: data.votes || {},
        songs: data.songs || {},
      };
      store.dispatch(dataUpdate(pdata));
    });

  return (
    <Provider store={store}>
      <MyPageTopComponent />
    </Provider>
  );
};
