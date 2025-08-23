import React from "react";
import Backdrop from "../../../views/shared/Backdrop";
import { useTime } from "../../../hooks";
import "./Online.sass";
import { defaultData, Props } from "./types";

const Online: React.FC<Props> = ({ data = defaultData }) => {
  const time = useTime("absolute");

  if (!data.url) return <div className="Online default fullscreen" />;

  // Create a refresh key that changes every 15 minutes (900 seconds)
  const refreshInterval = 15 * 60 * 1000; // 15 minutes in milliseconds
  const refreshKey = Math.floor(time.getTime() / refreshInterval);

  // Append timestamp parameter to force refresh every 15 minutes
  const refreshedUrl = React.useMemo(() => {
    if (!data.url) return data.url;

    const separator = data.url.includes('?') ? '&' : '?';
    return `${data.url}${separator}_refresh=${refreshKey}`;
  }, [data.url, refreshKey]);

  return (
    <Backdrop
      className="Online fullscreen"
      url={refreshedUrl}
    />
  );
};

export default Online;
