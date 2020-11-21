import * as React from "react";
import { Badge, Button, Card, Form, ListGroup, Spinner } from "react-bootstrap";
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
}> = (props) => (
  <div>
    <Card>
      <Card.Body>
        <Card.Title>投票しよう</Card.Title>
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

    <Card>
      <Card.Body>
        <Card.Title>投票したアーティスト</Card.Title>
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
      <Form.Label>追加するアーティスト名</Form.Label>
      <Form.Control
        type="text"
        placeholder="アーティスト名"
        value={props.newArtistName}
        onChange={(e: any) => props.onNewArtistNameInput(e.target.value)}
        disabled={props.loading ? "disabled" : ""}
      />
    </Form.Group>
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
  </div>
);
