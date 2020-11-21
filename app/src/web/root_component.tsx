import * as React from "react";
import { Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import { toMyPageProps } from "../mapping/to_props";
import * as actions from "./actions";
import { bindActionCreators } from "redux";
import { ArtistTabProps, MyPageProps } from "../types/props";
import { ArtistListComponent } from "./artist_list_component";
import { ArtistTabComponent } from "./artist_tab_component";

type AppProps = MyPageProps & typeof actions;

class _RootComponent extends React.Component<AppProps> {
  public render(): React.ReactElement {
    return (
      <Tabs>
        <ArtistListComponent />
        {this.artistTabs()}
      </Tabs>
    );
  }
  private artistTabs() {
    return this.props.tabs.map((t) => this.artistTab(t));
  }
  private artistTab(t: ArtistTabProps) {
    return <ArtistTabComponent key={t.artistID} />;
  }
}

export const RootComponent = connect(
  toMyPageProps,
  (dispatch: any): typeof actions => bindActionCreators(actions, dispatch)
)(_RootComponent);
