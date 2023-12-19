import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Channel = () => {
  const { channelId } = useParams();
  const [channelData, setChannelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/channel/${channelId}"
        );
        setChannelData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [channelId]);

  return (
    <div>
      <ul>
        {channelData.map((channel) => (
          <li key={channel.channelId}>
            {channel.streamerNickname}
            {channel.title}
            {channel.hlsUrl}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channel;