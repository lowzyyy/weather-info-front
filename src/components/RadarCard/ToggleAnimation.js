import { ToggleLeft, ToggleRight } from "phosphor-react";
import React from "react";

function ToggleAnimation(props) {
  return (
    <>
      {props.shouldAnimate ? (
        <ToggleRight
          className="fill-blue-500"
          onClick={props.checkCallback}
          size={35}
          weight="fill"
        />
      ) : (
        <ToggleLeft
          className="fill-blue-500"
          onClick={props.checkCallback}
          size={35}
          weight="fill"
        />
      )}
    </>
  );
}

export default React.memo(ToggleAnimation);
