import React from "react";

const SvgEditIcon = props => (
  <svg viewBox="0 0 30 30" {...props}>
    <path
      d="M11.11 23.632L23.84 10.904 19.596 6.66 6.868 19.39l4.243 4.243zm-.841.572l-5.01 1.67a.5.5 0 01-.633-.633l1.67-5.01 3.973 3.973zm14.277-14.007l1.408-1.408c.79-.79.79-2.051.006-2.835L24.546 4.54a2.006 2.006 0 00-2.835.006l-1.408 1.408 4.243 4.243z"
      fill="#000"
      fillRule="evenodd"
    />
    <text
      y={45}
      fontSize={5}
      fontWeight="bold"
      fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
    >
      {"Created by Pham Thi Dieu Linh"}
    </text>
    <text
      y={50}
      fontSize={5}
      fontWeight="bold"
      fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
    >
      {"from the Noun Project"}
    </text>
  </svg>
);

export default SvgEditIcon;
