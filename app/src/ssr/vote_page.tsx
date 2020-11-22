import * as React from "react";
import { TopPageProps, UserPageProps, VotePageProps } from "../types/props";
import { Badge, Breadcrumb, Card, Jumbotron, ListGroup } from "react-bootstrap";

export const VotePageComponent: React.FunctionComponent<VotePageProps> = (
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

      <Breadcrumb className="m-5">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item
          href={`/artists/${props.artistID}`}
        >
          {props.artistName}
        </Breadcrumb.Item>
        <Breadcrumb.Item
            href={`/artists/${props.artistID}/songs/${props.songID}`}
        >
          {props.songName}
        </Breadcrumb.Item>
        <Breadcrumb.Item href={`/users/${props.userID}`}>
          {props.userScreenName}{props.userName}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card className="m-5">
        <Card.Header>
          <Card.Subtitle>
            <a className="text-dark" href={`/users/${props.userID}`}>
              {props.userScreenName}
              {props.userName}さんは
            </a>
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <a className="text-dark" href={`/artists/${props.artistID}`}>
              {props.artistName}
            </a>
            の代表曲は
            <a
              className="text-dark"
              href={`/artists/${props.artistID}/songs/${props.songID}`}
            >
              {props.songName}
            </a>
          </Card.Title>
        </Card.Body>
        <Card.Footer>と主張しています。</Card.Footer>
      </Card>
    </body>
  </html>
);
