import * as React from "react";
import {
  Tabs,
  Tab,
  Navbar,
  Nav,
  NavDropdown,
  TabContainer,
} from "react-bootstrap";
import { ArtistListComponent } from "./artist_list_component";
import { ArtistTabProps, MyPageProps } from "../types/props";
import { ArtistTabComponent } from "./artist_tab_component";
import { connect } from "react-redux";
import { toMyPageProps } from "../mapping/to_props";
import * as actions from "./actions";
import { bindActionCreators } from "redux";
export const imgUrl =
  "https://pbs.twimg.com/profile_images/747557956787441666/BKpBirO3_x96.jpg";
type AppProps = MyPageProps & typeof actions;
class _MyPageTopComponent extends React.Component<AppProps> {
  public render(): React.ReactElement {
    return (
      <div>
        <Navbar id="header" bg="light" expand="lg">
          <Navbar.Brand href="/">あのアーティストの代表曲は</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <img src={this.props.img} width={30} />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => this.props.logout()}>
                ログアウト
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Tabs
          activeKey={this.props.tab}
          onSelect={(key) => this.props.selectTab(key!)}
        >
          <Tab.Content eventKey="" title="一覧">
            <ArtistListComponent
              loading={this.props.loading}
              enable={this.props.submitEnable}
              newArtistName={this.props.newArtist}
              onNewArtistNameInput={this.props.inputNewArtistName}
              onNewArtistSubmit={() => this.props.postArtist()}
              votedArtists={this.props.votedArtists}
              notVotedArtists={this.props.notVotedArtists}
              onSelectTab={this.props.selectTab}
              height={this.calcHeight()}
            />
          </Tab.Content>
          {this.artistTabs()}
        </Tabs>
      </div>
    );
  }
  private calcHeight(): number {
    const header = document.getElementById("header")?.clientHeight || 0;
    const tab =
      document.getElementsByClassName("nav nav-tabs")[0]?.clientHeight || 0;
    const body = window.innerHeight;
    return body - header - tab - 3;
  }
  private artistTabs() {
    return this.props.tabs.map((t) => this.artistTab(t));
  }
  private artistTab(t: ArtistTabProps) {
    return (
      <Tab.Content key={t.artistID} eventKey={t.artistID} title={t.name}>
        <ArtistTabComponent
          {...t}
          onNewSongNameInput={(artistID, songName) =>
            this.props.inputNewSongName({
              artistID: artistID,
              songName: songName,
            })
          }
          onNewSongSubmit={(aid) => this.props.postSong(aid)}
          onVote={(artistID, songID) => this.props.putVote(artistID, songID)}
          onRemoveVote={(artistID) => this.props.deleteVote(artistID)}
          onCloseTab={(artistID) => this.props.deleteTab(artistID)}
          height={this.calcHeight()}
          onSongNameUpdate={(artistID, songID) =>
            this.props.updateSongName(artistID, songID)
          }
          toTop={() => this.props.selectTab("")}
        />
      </Tab.Content>
    );
  }
}

export const MyPageTopComponent = connect(
  toMyPageProps,
  (dispatch: any): typeof actions => bindActionCreators(actions, dispatch)
)(_MyPageTopComponent);
