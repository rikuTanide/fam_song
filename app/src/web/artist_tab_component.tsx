import * as React from "react";
import { ArtistTabProps, ShareProps } from "../types/props";
import {
  Badge,
  Card,
  FormControl,
  InputGroup,
  ListGroup,
  Form,
  Button,
  Spinner,
  Jumbotron,
} from "react-bootstrap";
import {
  OnCloseTab,
  OnNewSongNameInput,
  OnNewSongSubmit,
  OnRemoveVote,
  OnVote,
} from "./index";

export const ArtistTabComponent: React.FunctionComponent<
  ArtistTabProps & {
    onNewSongNameInput: OnNewSongNameInput;
    onNewSongSubmit: OnNewSongSubmit;
    onVote: OnVote;
    onRemoveVote: OnRemoveVote;
    onCloseTab: OnCloseTab;
    height: number;
  }
> = (props) => (
  <div style={{ height: props.height, overflow: "scroll" }}>
    <p className="text-right">
      <Button variant="danger" onClick={() => props.onCloseTab(props.artistID)}>
        ×
      </Button>
    </p>
    <Jumbotron className="m-1">
      <h1>{props.name}</h1>
    </Jumbotron>

    <div className="overflow-hidden">
      <Card className="mt-5 m-2 shadow-sm">
        <Card.Header>
          <Card.Title>代表曲は？</Card.Title>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <Form.Check
                type="radio"
                label="未選択"
                name={`songs-${props.artistID}`}
                onChange={() => props.onRemoveVote(props.artistID)}
                checked={!props.selected}
              />
            </ListGroup.Item>
            {props.songs.map((s) => (
              <ListGroup.Item key={s.songID}>
                <Form.Check
                  type={"radio"}
                  label={s.songName}
                  name={`songs-${props.artistID}`}
                  onChange={() => props.onVote(props.artistID, s.songID)}
                  checked={s.selected}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="my-5 mx-2 shadow-sm">
        <Card.Header>
          <Card.Title>曲を追加</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>曲名</Form.Label>
            <Form.Control
              type="text"
              value={props.newSong}
              onChange={(e: any) =>
                props.onNewSongNameInput(props.artistID, e.target.value)
              }
              disabled={props.loading}
            />
          </Form.Group>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button
            disabled={!props.submitEnable}
            variant="primary"
            type="submit"
            onClick={() => props.onNewSongSubmit(props.artistID)}
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
      {props.share ? <ShareComponent {...props.share} /> : ""}
    </div>
    {props.icacheUrl ? <img src={props.icacheUrl} width="1" /> : ""}
  </div>
);

export const ShareComponent: React.FunctionComponent<ShareProps> = (props) => (
  <Card className="my-5 mx-2 shadow-sm">
    <Card.Header>
      <Card.Title>シェアする</Card.Title>
    </Card.Header>
    <Card.Body>
      <a
        href={props.url}
        className="btn btn-block btn-social btn-twitter"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <span className="fa fa-twitter" />
        Twitterでつぶやく
      </a>
    </Card.Body>
  </Card>
);
