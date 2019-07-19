import React from "react";

const SvgDeleteIcon = props => (
  <svg viewBox="0 0 100 100" {...props}>
    <path
      style={{
        marker: "none"
      }}
      d="M50 8C26.804 8 8 26.804 8 50s18.804 42 42 42 42-18.804 42-42S73.196 8 50 8zm0 15l9 15 9 15H32l9-15 9-15zM33 62h34v8H33v-8z"
      color="#000"
      overflow="visible"
    />
    <text
      y={115}
      fontSize={5}
      fontWeight="bold"
      fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
    >
      {"Created by iconsphere"}
    </text>
    <text
      y={120}
      fontSize={5}
      fontWeight="bold"
      fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
    >
      {"from the Noun Project"}
    </text>
  </svg>
);

export default SvgDeleteIcon;
