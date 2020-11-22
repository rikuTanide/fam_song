import * as React from "react";
import { SongPageProps } from "../types/props";
import { Breadcrumb, Card, Jumbotron, ListGroup } from "react-bootstrap";
import { renderToStaticMarkup } from "react-dom/server";

export function renderSongPage(props: SongPageProps): string {
  return renderToStaticMarkup(<SongPageComponent {...props} />);
}

export const SongPageComponent: React.FunctionComponent<SongPageProps> = (
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
        <p className="lead">
          あなたが思う{props.artistName}の代表曲を教えてください
        </p>
        <hr className="my-4" />
        <p>{props.artistName}といえば？</p>
        <a className="btn btn-primary btn-lg" href="/mypage">
          投票する
        </a>
      </Jumbotron>
      <Breadcrumb className="m-5">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href={`/artists/${props.artistID}`}>
          {props.artistName}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href={`/artists/${props.artistID}/songs/${props.songID}`}
        >
          {props.songName}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card className="m-5">
        <Card.Header>
          <Card.Title>{props.songName}に投票した人</Card.Title>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {props.voteUsers.map((u) => (
              <ListGroup.Item key={u.userID}>
                <a
                  className="text-dark"
                  href={`/votes/users/${u.userID}/artists/${props.artistID}`}
                >
                  <img className="img-thumbnail" src={u.img} width={30} />
                  {u.twitterName}
                </a>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </body>
  </html>
);
