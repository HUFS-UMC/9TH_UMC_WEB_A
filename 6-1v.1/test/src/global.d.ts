// ./global.d.ts
import React from "react";

declare global {
  namespace JSX {
    // React 18+의 JSX.Element
    type Element = React.ReactElement;

    // 모든 태그 이름을 any로 허용
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}