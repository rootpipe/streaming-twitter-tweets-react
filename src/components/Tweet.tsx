import React from "react";

type tweetprops = {tweet:any};
class Tweet extends React.Component<tweetprops> {
  
    render() {
    var tweet = this.props.tweet;
    return (
      <li className="tweet">
        <span className="content">{tweet.text}</span>
      </li>
    )
  }
};
export default Tweet;