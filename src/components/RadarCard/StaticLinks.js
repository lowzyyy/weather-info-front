import React from "react";

function StaticLinks(props) {
  const len = props.links.length;
  const increment = len > 8 ? (len === 16 ? 8 : 16) : 0;
  return (
    <ul
      className={`absolute left-16 top-1 z-20 flex w-40 flex-wrap gap-1 text-xs font-semibold text-stone-900 md:w-48 [&>*]:flex-shrink-0 [&>*]:basis-8 `}
    >
      {props.links.slice(props.links.length - 8).map((l, i) => (
        <li
          className={`hover:cursor-pointer md:text-lg ${
            props.selectedTime === i + increment ? " text-white" : ""
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
