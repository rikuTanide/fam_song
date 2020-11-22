import * as React from "react";
import { ArtistPageProps } from "../types/props";
import { Badge, Breadcrumb, Card, Jumbotron, ListGroup } from "react-bootstrap";
import { renderToStaticMarkup } from "react-dom/server";

export function renderArtistPage(props: ArtistPageProps): string {
  return renderToStaticMarkup(<ArtistPageComponent {...props} />);
}

export const ArtistPageComponent: React.FunctionComponent<ArtistPageProps> = (
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
      <Jumbotron className="m-3">
        <h1>代表曲は？</h1>
        <p className="lead">あなたが思うアーティストの代表曲を教えてください</p>
        <hr className="my-4" />
        <p>{props.name}といえば？</p>
        <a className="btn btn-primary btn-lg" href="/mypage">
          投票する
        </a>
      </Jumbotron>

      <Breadcrumb className="m-3">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href={`/artists/${props.artistID}`}>
          {props.name}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card className="m-3">
        <Card.Header>
          <Card.Title>みんなの投票</Card.Title>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {props.songs.map((s) => (
              <ListGroup.Item key={s.songID}>
                <a
                  className="text-dark"
                  href={`/artists/${props.artistID}/songs/${s.songID}`}
                >
                  {s.name}
                </a>
                <Badge variant="danger">{s.voteCount}</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </body>
  </html>
);
