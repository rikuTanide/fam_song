import * as React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { ArtistListComponent } from "./artist_list_component";
import { ArtistTabProps, MyPageProps } from "../types/props";
import { ArtistTabComponent } from "./artist_tab_component";
import { connect } from "react-redux";
import { toMyPageProps } from "../mapping/to_props";
import * as actions from "./actions";
import { bindActionCreators } from "redux";

type AppProps = MyPageProps & typeof actions;
class _MyPageTopComponent extends React.Component<AppProps> {
  public render(): React.ReactElement {
    return (
      <Tabs activeKey={this.props.tab}>
        <Tab.Content eventKey="" title="一覧">
          <ArtistListComponent
            loading={this.props.loading}
            enable={this.props.submitEnable}
            newArtistName={this.props.newArtist}
            onNewArtistNameInput={this.props.inputNewArtistName}
            onNewArtistSubmit={() => this.props.postArtist()}
          />
        </Tab.Content>
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

export const MyPageTopComponent = connect(
  toMyPageProps,
  (dispatch: any): typeof actions => bindActionCreators(actions, dispatch)
)(_MyPageTopComponent);
