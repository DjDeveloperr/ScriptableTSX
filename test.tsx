import { Scriptable } from "./mod.ts";

function MyWidget({ author, avatar, content, channel, messageID, channelID, guildID, timestamp }: {
  author: string;
  avatar?: Image;
  content: string;
  channel: string;
  messageID: string;
  channelID: string;
  guildID: string;
  timestamp: string;
}) {
  return (
    <widget
      backgroundColor="#36393F"
      url={`https://discord.com/channels/${guildID}/${channelID}/${messageID}`}
      spacing={8}
      refreshAfterDate={new Date()}
    >
      <text color="#FAFAFA" font={Font.systemFont(15)}>In #{channel}</text>
      <hstack spacing={8}>
        {avatar && <image
          image={avatar}
          size={new Size(38, 38)}
          cornerRadius={16}
        />}
        <vstack spacing={8}>
          <hstack>
            <text color="#FFFFFF" font={Font.systemFont(18)}>{author}</text>
            <text color="#70747B" font={Font.systemFont(15)}>{timestamp}</text>
          </hstack>
          <text color="#FFFFFF" font={Font.systemFont(14)}>{content}</text>
        </vstack>
      </hstack>
    </widget>
  )
}

Script.setWidget(MyWidget({
  author: "DjDeveloper",
  channel: "general",
  content: "test",
  messageID: "1",
  channelID: "2",
  guildID: "3",
  timestamp: "Today at 00:00",
}));
