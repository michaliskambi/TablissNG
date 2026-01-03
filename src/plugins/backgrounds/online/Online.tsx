import React from "react";
import Backdrop from "../../../views/shared/Backdrop";
import "./Online.sass";
import { defaultData, Props } from "./types";

/* Refresh the page, to refresh image, every 15 minutes.
  Using setTimeout, regular JS,
  https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout

  TODO: There's probably a better way to do this,
  and refresh only image contents, with React.
  The Unsplash plugin uses useRotatingCache.
*/
const timeout = 15 * 60 * 1000;
function keepRefreshingPage(): void
{
  window.location.reload();
  setTimeout(keepRefreshingPage, timeout);
}

setTimeout(keepRefreshingPage, timeout);

const Online: React.FC<Props> = ({ data = defaultData }) => {
  if (!data.url) return <div className="Online default fullscreen" />;

  let url = data.url;
  // append random number to url to bypass browser cache
  url += (url.includes("?") ? "&" : "?") +
    "random_to_avoid_browser_cache=" + Math.floor(Math.random() * 1000 * 1000);

  console.log("Online background from: " + url);

  return (
    <Backdrop
      className="Online fullscreen"
      url={url}
    />
  );
};

export default Online;
