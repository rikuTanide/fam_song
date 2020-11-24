import * as React from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { OnNewArtistNameInput, OnNewArtistSubmit, OnSelectTab } from "./index";
import { NotVotedArtistProps, VotedArtistProps } from "../types/props";

export const ArtistListComponent: React.SFC<{
  newArtistName: string;
  enable: boolean;
  loading: boolean;
  onNewArtistNameInput: OnNewArtistNameInput;
  onNewArtistSubmit: OnNewArtistSubmit;
  votedArtists: VotedArtistProps[];
  notVotedArtists: NotVotedArtistProps[];
  onSelectTab: OnSelectTab;
  height: number;
}> = (props) => (
  <div style={{ height: props.height, overflow: "scroll" }}>
    <Card className="m-2 mt-5 shadow-sm">
      <Card.Header>
        <Card.Title>投票しよう</Card.Title>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          {props.notVotedArtists.map((a) => (
            <ListGroup.Item
              key={a.artistID}
              action
              onClick={() => props.onSelectTab(a.artistID)}
            >
              {a.artistName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>

    <Card className="m-2 mt-5 shadow-sm">
      <Card.Header>
        <Card.Title>投票したアーティスト</Card.Title>
      </Card.Header>

      <Card.Body>
        <ListGroup>
          {props.votedArtists.map((a) => (
            <ListGroup.Item
              key={a.artistID}
              action
              onClick={() => props.onSelectTab(a.artistID)}
            >
              {a.artistName} <Badge variant="secondary">{a.songName}</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
    <Form.Group>
      <Card className="my-5 mx-2 shadow-sm">
        <Card.Header>
          <Card.Title>アーティストを登録</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>アーティスト名</Form.Label>
            <Form.Control
              type="text"
              value={props.newArtistName}
              onChange={(e: any) => props.onNewArtistNameInput(e.target.value)}
              disabled={props.loading ? "disabled" : ""}
            />
          </Form.Group>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button
            disabled={!props.enable}
            variant="primary"
            type="submit"
            onClick={() => {
              props.onNewArtistSubmit();
              return false;
            }}
          >
            追加
          </Button>
          {props.loading ? (
            <Spinner animation="border" variant="primary" size="sm" />
          ) : (
            ""
          )}
        </Card.Footer>
      </Card>
    </Form.Group>
  </div>
);
