/**
 * https://github.com/thoov/mock-socket
 * Copied from lib.webworker.d.ts
 */
declare module "mock-socket" {
   class WebSocket extends EventTarget {
      //binaryType: string;
   }

   //    interface WebSocket2 extends EventTarget {
   //       binaryType: string;
   //       readonly bufferedAmount: number;
   //       readonly extensions: string;
   //       onclose: (this: WebSocket, ev: CloseEvent) => any;
   //       onerror: (this: WebSocket, ev: Event) => any;
   //       onmessage: (this: WebSocket, ev: MessageEvent) => any;
   //       onopen: (this: WebSocket, ev: Event) => any;
   //       readonly protocol: string;
   //       readonly readyState: number;
   //       readonly url: string;
   //       close(code?: number, reason?: string): void;
   //       send(data: any): void;
   //       readonly CLOSED: number;
   //       readonly CLOSING: number;
   //       readonly CONNECTING: number;
   //       readonly OPEN: number;
   //       addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, useCapture?: boolean): void;
   //       addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
   //    }

   //    declare var WebSocket2: {
   //       prototype: WebSocket;
   //       new(url: string, protocols?: string | string[]): WebSocket;
   //       readonly CLOSED: number;
   //       readonly CLOSING: number;
   //       readonly CONNECTING: number;
   //       readonly OPEN: number;
   //   };
}
