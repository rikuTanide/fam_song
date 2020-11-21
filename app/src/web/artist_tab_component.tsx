import * as React from "react";
import { ArtistTabProps } from "../types/props";
import {
  Badge,
  Card,
  FormControl,
  InputGroup,
  ListGroup,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import {
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
  }
> = (props) => (
  <div>
    <h1>{props.name}</h1>

    <Card>
      <Card.Body>
        <Card.Title>代表曲は？</Card.Title>
        <ListGroup>
          <ListGroup.Item>
            <Form.Check
              type={"radio"}
              label={"未定"}
              name="songs"
              onChange={() => props.onRemoveVote(props.artistID)}
              checked={!props.selected}
            />
          </ListGroup.Item>
          {props.songs.map((s) => (
            <ListGroup.Item key={s.songID}>
              <Form.Check
                type={"radio"}
                label={s.songName}
                name="songs"
                onChange={() => props.onVote(props.artistID, s.songID)}
                checked={s.selected}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>

    <Card>
      <Card.Body>
        <Card.Title>曲を追加</Card.Title>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">曲名は</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={props.newSong}
            onChange={(e: any) =>
              props.onNewSongNameInput(props.artistID, e.target.value)
            }
            disabled={props.loading}
          />

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
        </InputGroup>
      </Card.Body>
    </Card>
  </div>
);
