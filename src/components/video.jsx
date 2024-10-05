import { Dot, MoreHorizontal, MoreVertical } from "lucide-react";
import ReactTimeAgo from "react-time-ago";
import React from "react";

import TA from "javascript-time-ago";
import ar from "javascript-time-ago/locale/ar";
import { YOUTUBE_API_KEY } from "../constants";
TA.addDefaultLocale(ar);
function numbered(number) {
  if (number < 1000) {
    return number;
  }
  if (number < 1000000) {
    return `${(number / 1000).toFixed(1).replace(/.0$/, "")} ألف`;
  }
  if (number < 1000000000) {
    return `${(number / 1000000).toFixed(1).replace(/.0k/, "")} مليون`;
  }
  return `${(number / 1000000000).toFixed(1).replace(/.0$/, "")} مليار`;
}

function TimeAgo({ date }) {
  return <ReactTimeAgo date={date} locale="ar" />;
}

async function fetchChannel(channelId) {
  const cachedChannel = localStorage.getItem(`channel-${channelId}`);
  if (cachedChannel) {
    return JSON.parse(cachedChannel);
  }
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${YOUTUBE_API_KEY}`,
  );
  const data = await response.json();
  // Cache the result
  console.log("Data:", data);
  localStorage.setItem(
    `channel-${channelId}`,
    JSON.stringify(data.items[0].snippet),
  );
  return data.items[0].snippet;
}

export function Video(
  { title, authorName, views, uploadedAt, thumbnail, id, channelId },
) {
  const [channel, setChannel] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      const channel = await fetchChannel(channelId);
      setChannel(channel);
    })();
  }, [channelId]);


  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <a href={`/watch/${id}`} className="rounded-xl overflow-hidden">
        <img className="w-full" src={thumbnail} alt={title} />
      </a>
      <div className="flex flex-row gap-3 items-start">
        <img
          src={channel?.thumbnails?.default?.url}
          alt={authorName}
          className="rounded-full w-10 h-10"
        />
        <div className="flex flex-col flex-1">
          <a
            title={title}
            href={`/watch/${id}`}
            className="text-[14px] font-semibold mb-1"
          >
            {title.substring(0, 50) + (title.length > 50 ? "..." : "")}
          </a>
          <div className="text-sm text-gray-400">{authorName}</div>
          <div className="text-sm text-gray-400 flex flex-row text-nowrap">
            <span>{numbered(views)} مشاهدة</span>
            {uploadedAt && (
              <>
                <Dot />
                <span>
                  <TimeAgo date={uploadedAt} />
                </span>
              </>
            )}
          </div>
        </div>
        <button className="p-2 hover:bg-gray-500/20 rounded-full">
          <MoreVertical />
        </button>
      </div>
    </div>
  );
}
