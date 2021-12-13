import React from "react";

type tweetprops = {tweet:any};
class Tweet extends React.Component<tweetprops> {
  
    render() {
    let tweet = this.props.tweet;
    let tweetUrl = `https://twitter.com/${tweet.username}/status/${tweet.id}`;
    return (
      <li className="tweet" key={tweet.id}>
        <div className="tweetcontent">
            <span>{tweet.text}</span>
        </div>
        <a className="gototweet" rel="noreferrer" target="_blank" href={tweetUrl}>Go To Tweet</a>
      </li>
    )
  }
};
export default Tweet;