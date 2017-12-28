/**
 * https://github.com/tmpvar/jsdom/blob/master/lib/api.js
 */
declare module "jsdom" {
   type ResourceType = "usable" | "unusable";
   type RunType = "dangerously" | "outside-only";
   type ParseMode = "html" | "xml";
   type MethodType = "function";

   interface BaseOptions {
      url: string;
      userAgent: string;
      contentType: string;
   }

   interface WindowOptions extends BaseOptions {
      runScripts: RunType;
      parsingMode: ParseMode;
      parseOptions: { locationInfo: false };
      encoding: string;
   }

   interface DomOptions extends BaseOptions {
      resources: ResourceType;
      windowOptions: WindowOptions;
      includeNodeLocations: boolean;
      beforeParse: () => void;
   }

   interface ConsoleOptions {
      omitJSDOMErrors: boolean;
   }

   interface Console {
      info(): void;
      warn(): void;
      error(): void;
   }

   export class JSDOM {
      constructor(input: string, options?: DomOptions);
      window: Window;
   }

   /**
    * https://github.com/tmpvar/jsdom/blob/master/lib/jsdom/virtual-console.js
    */
   export class VirtualConsole extends NodeJS.EventEmitter {
      sendTo(console: Console, options?: ConsoleOptions): void;
   }
}
