/* tslint:disable:no-unused-expression */
import "mocha";
import { expect } from "chai";
import { JSDOM } from "jsdom";
import { WebSocket as MockWebSocket } from "mock-socket";

declare global {
   namespace NodeJS {
      interface Global {
         navigator: Navigator;
         document: Document;
         window: Window;
         WebSocket: any;
      }
   }
}

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.document = dom.window.document;
global.window = dom.window;
global.navigator = { userAgent: "node.js" } as Navigator;
global.WebSocket = MockWebSocket;

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactTestUtils from "react-dom/test-utils";

export const tag = {
   a: "A",
   button: "BUTTON",
   div: "DIV",
   footer: "FOOTER",
   i: "I",
   img: "IMG"
};

export interface Expect {
   tagName?: string;
   className?: string;
   style?: string;
   innerHTML?: string;
   attribute?: { [key: string]: string | number };
}

/**
 * Render JSX into Element for testing. Full render requires a document to
 * render into.
 *
 * https://github.com/tmpvar/jsdom
 * https://facebook.github.io/react/docs/test-utils.html
 * http://facebook.github.io/jest/docs/tutorial-react.html#content
 */
export function render<P>(
   component: React.ComponentClass<P> | React.StatelessComponent<P>,
   props?: React.Attributes & P,
   ...children: React.ReactNode[]
) {
   const r = React.createElement(component as React.ComponentClass<P>, props, children);
   const jsx = ReactTestUtils.renderIntoDocument(React.createElement("div", null, r));
   const el = jsx === null ? null : ReactDOM.findDOMNode(jsx).children[0];

   return {
      /**
       * Test expectations against rendered element.
       */
      expect(e: Expect) {
         expect(el).to.exist;
         if (e.attribute === undefined) {
            e.attribute = {};
         }
         if (e.tagName) {
            expect(el.tagName).equals(e.tagName);
         }
         if (e.className) {
            e.attribute["class"] = e.className;
         }
         if (e.style) {
            e.attribute["style"] = e.style;
         }

         for (const a in e.attribute) {
            expect(el.getAttribute(a)).equals(e.attribute[a]);
         }
         return el;
      },
      /**
       * Return rendered element without testing.
       */
      get() {
         return el;
      }
   };
}
