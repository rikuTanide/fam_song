import * as React from "react";
import { Button, Card, Form } from "react-bootstrap";

export const LoginComponent: React.FunctionComponent<{
  callback: () => boolean;
  anonymousCallback: () => boolean;
}> = (props) => (
  <>
    <Card className="my-5 mx-2 shadow-sm">
      <Card.Header>
        <Card.Title>ログイン</Card.Title>
      </Card.Header>
      <Card.Body>
        <a
          className="btn btn-block btn-social btn-twitter"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.callback();
            return false;
          }}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <span className="fa fa-twitter" /> Twitterでログイン
        </a>
      </Card.Body>
    </Card>

    <Card className="my-5 mx-2 shadow-sm">
      <Card.Header>
        <Card.Title>ログイン</Card.Title>
      </Card.Header>
      <Card.Body>
        <Button onClick={() => props.anonymousCallback()}>
          ログインせずに投票
        </Button>
      </Card.Body>
    </Card>
  </>
);
