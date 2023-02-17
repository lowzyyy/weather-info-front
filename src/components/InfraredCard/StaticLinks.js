import React from "react";

function StaticLinks(props) {
  const increment = 14;
  return (
    <ul
      className={`absolute left-16 top-1 z-20 flex w-40 flex-wrap gap-1 text-xs font-semibold text-stone-900 [&>*]:flex-shrink-0 [&>*]:basis-8 `}
    >
      {props.links.slice(props.links.length - 2).map((l, i) => (
        <li
          className={`text-base hover:cursor-pointer md-text-lg${
            props.selectedTime === i + increment ? " text-red-500" : ""
          }`}
          index={i + increment}
          onClick={props.linkCallback}
          key={l.time}
          data-link={l.link}
        >
          {l.time}
        </li>
      ))}
    </ul>
  );
}

export default React.memo(StaticLinks);
