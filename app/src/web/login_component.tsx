import * as React from "react";
import { Button, Card, Form } from "react-bootstrap";

export const LoginComponent: React.FunctionComponent<{
  callback: () => boolean;
  passwordLogin: () => boolean;
  passwordSignUp: () => boolean;
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
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            props.passwordLogin();
            return false;
          }}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Emailアドレス</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            ログイン
          </Button>
          <Button
            onClick={() => {
              props.passwordSignUp();
              return false;
            }}
            variant="primary"
            type="submit"
          >
            新規登録
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </>
);
