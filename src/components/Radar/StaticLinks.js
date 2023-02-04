import React from "react";

function StaticLinks(props) {
  return (
    <ul
      className={`absolute left-16 top-1 flex w-40 flex-wrap gap-1 text-xs font-semibold text-stone-900 [&>*]:flex-shrink-0 [&>*]:basis-8 `}
    >
      {props.links.map((l, i) => (
        <li
          className={`hover:cursor-pointer ${
            props.currLink === i ? " text-white" : ""
          }`}
          index={i}
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
