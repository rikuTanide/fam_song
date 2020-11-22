import * as React from "react";
import { TopPageProps, UserPageProps } from "../types/props";
import { Badge, Card, Jumbotron, ListGroup } from "react-bootstrap";

export const UserPageComponent: React.FunctionComponent<UserPageProps> = (
  props
) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      />

      <title>代表曲は？</title>
    </head>
    <body>
      <Jumbotron className="m-5">
        <h1>代表曲は？</h1>
        <p className="lead">あなたが思うアーティストの代表曲を教えてください</p>
        <hr className="my-4" />
        <p>
          {props.userScreenName}
          {props.userName}さんとは気が合いそうかな？
        </p>
        <a className="btn btn-primary btn-lg" href="/mypage">
          投票する
        </a>
      </Jumbotron>
      <Card className="m-5">
        <Card.Header>
          <Card.Title>
            {props.userScreenName}
            {props.userName}さんの投票
          </Card.Title>
        </Card.Header>
        <Card.Body>
          {props.voteSongs.map((s) => (
            <Card key={s.artistID} className="mb-2">
              <Card.Header>{s.artistName}</Card.Header>
              <Card.Body>{s.songName}</Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </body>
  </html>
);
