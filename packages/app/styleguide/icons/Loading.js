import React from "react";

const SvgLoading = props => (
  <svg
    width={200}
    height={200}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    className="loading_svg__lds-ripple"
    style={{
      background: "0 0"
    }}
    {...props}
  >
    <circle
      cx={50}
      cy={50}
      r={9.144}
      fill="none"
      stroke="#4658ac"
      strokeWidth={2}
    >
      <animate
        attributeName="r"
        calcMode="spline"
        values="0;40"
        keyTimes="0;1"
        dur={1}
        keySplines="0 0.2 0.8 1"
        begin="-0.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        calcMode="spline"
        values="1;0"
        keyTimes="0;1"
        dur={1}
        keySplines="0.2 0 0.8 1"
        begin="-0.5s"
        repeatCount="indefinite"
      />
    </circle>
    <circle
      cx={50}
      cy={50}
      r={30.174}
      fill="none"
      stroke="#e7008a"
      strokeWidth={2}
    >
      <animate
        attributeName="r"
        calcMode="spline"
        values="0;40"
        keyTimes="0;1"
        dur={1}
        keySplines="0 0.2 0.8 1"
        begin="0s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        calcMode="spline"
        values="1;0"
        keyTimes="0;1"
        dur={1}
        keySplines="0.2 0 0.8 1"
        begin="0s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default SvgLoading;
