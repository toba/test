/**
 * Copied from https://github.com/TypeStrong/ts-node/blob/master/src/index.ts
 */
declare module "ts-node" {
   import * as TS from "typescript";

   /**
    * Common TypeScript interfaces between versions.
    */
   export interface TSCommon {
      version: typeof TS.version;
      sys: typeof TS.sys;
      ScriptSnapshot: typeof TS.ScriptSnapshot;
      displayPartsToString: typeof TS.displayPartsToString;
      createLanguageService: typeof TS.createLanguageService;
      getDefaultLibFilePath: typeof TS.getDefaultLibFilePath;
      getPreEmitDiagnostics: typeof TS.getPreEmitDiagnostics;
      flattenDiagnosticMessageText: typeof TS.flattenDiagnosticMessageText;
      transpileModule: typeof TS.transpileModule;
      ModuleKind: typeof TS.ModuleKind;
      ScriptTarget: typeof TS.ScriptTarget;
      findConfigFile: typeof TS.findConfigFile;
      readConfigFile: typeof TS.readConfigFile;
      parseJsonConfigFileContent: typeof TS.parseJsonConfigFileContent;

      // TypeScript 1.5 and 1.6.
      parseConfigFile?(json: any, host: any, basePath: string): any;
   }

   /**
    * Registration options.
    */
   export interface Options {
      typeCheck?: boolean;
      cache?: boolean;
      cacheDirectory?: string;
      compiler?: string;
      project?: boolean | string;
      ignore?: boolean | string | string[];
      ignoreWarnings?: number | string | Array<number | string>;
      getFile?: (path: string) => string;
      fileExists?: (path: string) => boolean;
      compilerOptions?: any;
      transformers?: TS.CustomTransformers;
   }

   /**
    * Return type for registering `ts-node`.
    */
   export interface Register {
      cwd: string;
      extensions: string[];
      cachedir: string;
      ts: TSCommon;
      compile(code: string, fileName: string, lineOffset?: number): string;
      getTypeInfo(code: string, fileName: string, position: number): TypeInfo;
   }
   
   function register(options?: Options): Register;
}
