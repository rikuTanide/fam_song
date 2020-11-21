import * as React from "react";
import { Tabs, Tab, Form, Button, Spinner } from "react-bootstrap";
import { OnNewArtistNameInput, OnNewArtistSubmit } from "./index";
export const ArtistListComponent: React.SFC<{
  newArtistName: string;
  enable: boolean;
  loading: boolean;
  onNewArtistNameInput: OnNewArtistNameInput;
  onNewArtistSubmit: OnNewArtistSubmit;
}> = (props) => (
  <div>
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
