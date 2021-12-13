import React from "react";
import Tweet from "./Tweet";
import { io } from "socket.io-client";
import config from "../config.json";

const socket = io(config.streamEndpoint);

type tweetstate = { tweets: any[] };

class Tweetstream extends React.Component<{}, tweetstate> {
  constructor(props: {}) {
    super(props);
    this.state = { tweets: [] };
  }

  async componentDidMount() {
    let tweets: any[] = [];

    socket.on("connect", () => {
      console.log("connected to server...");
    });

    socket.on("disconnect", () => {
      console.log(socket.connected);
      console.log("disconnected from server...");
    });

    // on new tweet add it to top of the array
    socket.on("tweet", (tweet) => {
      let tweetData = {
        id: tweet.data.id,
        text: tweet.data.text,
        username: `@${tweet.includes.users[0].username}`,
      };

      tweets.unshift(tweetData);
      this.setState({ tweets: tweets });
    });
  }

  render() {
    return (
      // rendering the tweet using Tweet component
      <div>
        <h1>Tweet Streaming</h1>
        <ul className="tweetlist">
          {this.state.tweets.length === 0 ? (
            <li className="tweetloader">Releasing the chirps...</li>
          ) : (
            this.state.tweets.map((tweet) => (
              <Tweet tweet={tweet} key={tweet.id + new Date().valueOf()} />
            ))
          )}
        </ul>
      </div>
    );
  }
}

export default Tweetstream;
