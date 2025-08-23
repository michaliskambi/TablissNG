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

  return (
    <Backdrop
      className="Online fullscreen"
      url={data.url}
    />
  );
};

export default Online;
