import { Scriptable } from "../mod.ts";

function MyWidget({ author, avatar, content, channel, messageID, channelID, guildID, timestamp }: {
  author: string;
  avatar?: Image;
  content: string;
  channel: string;
  messageID: string;
  channelID: string;
  guildID: string;
  timestamp: string;
}): ListWidget {
  return (
    <widget
      backgroundColor="#36393F"
      url={`https://discord.com/channels/${guildID}/${channelID}/${messageID}`}
      spacing={8}
    >
      <text color="#FAFAFA" font={Font.systemFont(15)}>In #{channel}</text>
      <hstack spacing={8}>
        {avatar && <image
          image={avatar}
          size={new Size(38, 38)}
          cornerRadius={18}
        />}
        <vstack>
          <hstack spacing={8}>
            <text color="#FFFFFF" font={Font.systemFont(18)}>{author}</text>
            <text color="#70747B" font={Font.systemFont(15)}>{timestamp}</text>
          </hstack>
          <text color="#FFFFFF" font={Font.systemFont(14)}>{content}</text>
        </vstack>
      </hstack>
    </widget>
  )
}

let avatar;
{
  const req = new Request("https://cdn.discordapp.com/attachments/783321611343757313/906167826782486588/nevergonnagiveyouup.png");
  avatar = await req.loadImage();
}

const widget = MyWidget({
  author: "DjDeveloper",
  channel: "general",
  content: "test",
  messageID: "1",
  channelID: "2",
  guildID: "3",
  timestamp: "Today at 00:00",
  avatar,
});

if (config.runsInApp) {
  widget.presentMedium();
} else {
  Script.setWidget(widget);
}
