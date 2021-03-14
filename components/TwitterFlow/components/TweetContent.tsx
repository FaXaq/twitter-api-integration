import { Tweet } from "../../../types/twitter";

type ITweetContentProps = {
  tweet: Tweet
}

// FIXME: Quick hardcoded & buggy html escaper
function formatTweetContent(tweet: Tweet): { __html: string } {
  let str = tweet.text;

  // replace links
  str = str.replace(/(https?:\/\/[^\ ]*)/g, (a, b) => `<a href="${b}">${b}</a>`);

  // replace mentions
  if (tweet?.entities?.mentions) {
    tweet.entities.mentions.map(mention => {
      str = str.replace(`@${mention.username}`, `<a href="https://twitter.com/${mention.username}">@${mention.username}</a>`);
    })
  }

  // replace hashtags
  // Regex is quite complicated but only checks two things
  // There is a space or a new line before
  // There is a space or an end of line after
  str = str.replace(/(?<=[ ]|^)(#[^ ]+)(?=[ ]|$)/g, (a, b:string) => `<a href="https://twitter.com/hashtag/${b.substring(1)}">${b}</a>`);

  return { __html: str };
}

export default function TweetContent({ tweet }: ITweetContentProps) {
  return <p dangerouslySetInnerHTML={formatTweetContent(tweet)} />
}