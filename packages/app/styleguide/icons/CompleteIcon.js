import React from "react";

const SvgCompleteIcon = props => (
  <svg viewBox="0 0 100 100" {...props}>
    <path
      style={{
        marker: "none"
      }}
      d="M50 8C26.804 8 8 26.804 8 50s18.804 42 42 42 42-18.804 42-42S73.196 8 50 8zm0 20l7.094 14.469L73 44.812 61.5 56.094 64.219 72 50 64.469 35.781 72 38.5 56.094 27 44.812l15.906-2.343L50 28z"
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

export default SvgCompleteIcon;
