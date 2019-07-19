import React from "react";

const SvgFilterIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M15.82 4a3 3 0 00-5.64 0H2v2h8.18a3 3 0 005.64 0H22V4zM7 9a3 3 0 00-2.82 2H2v2h2.18a3 3 0 005.64 0H22v-2H9.82A3 3 0 007 9zM16 16a3 3 0 00-2.82 2H2v2h11.18a3 3 0 005.64 0H22v-2h-3.18A3 3 0 0016 16z" />
    <text
      y={39}
      fontSize={5}
      fontWeight="bold"
      fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
    >
      {"Created by Dwiky Setiawan"}
    </text>
    <text
      y={44}
      fontSize={5}
      fontWeight="bold"
      fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
    >
      {"from the Noun Project"}
    </text>
  </svg>
);

export default SvgFilterIcon;
