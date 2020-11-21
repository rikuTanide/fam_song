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

export const RootComponent: React.SFC<{ app: firebase.app.App }> = (props) => {
  const composeEnhancers = compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ firebase: props.app }))
  );

  const store = createStore<State, any, any, any>(reducer, enhancer);

  return (
    <Provider store={store}>
      <MyPageTopComponent />
    </Provider>
  );
};
