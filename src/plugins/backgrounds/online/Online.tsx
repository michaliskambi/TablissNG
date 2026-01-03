import React from "react";
import Backdrop from "../../../views/shared/Backdrop";
import "./Online.sass";
import { defaultData, Props } from "./types";
import { useTime } from "../../../hooks";

const Online: React.FC<Props> = ({ data = defaultData }) => {
  if (!data.url) return <div className="Online default fullscreen" />;

  const timeout = 15 * 60 * 1000;
  // debug: change every 1 second, 10 seconds
  // const timeout = 1000;
  // const timeout = 10 * 1000;
  const time = useTime("absolute");

  let url = data.url;

  // Modify URL once timeout passes, to reload the image after such time.
  // This code is evaluated in a loop, so to load a new image, changing
  // URL is all we need.
  let milisecs = time.getTime();
    //Date.now(); // it is important to use useTime, to keep this rerendering
  milisecs = Math.floor(milisecs / timeout) * timeout;
  url += (url.includes("?") ? "&" : "?") + "timeout=" + milisecs;

  // Note: This would be bad, refreshing image as often as possible.
  // At least sometimes it would refresh often...
  // url += (url.includes("?") ? "&" : "?") +
  //   "random_to_avoid_browser_cache=" + Math.floor(Math.random() * 1000 * 1000);

  // Do not keep logging, as this occurs often, this is reevaluated often.
  //console.log("Online background from: " + url);

  return (
    <Backdrop
      className="Online fullscreen"
      url={url}
    />
  );
};

export default Online;
