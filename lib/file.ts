import * as fs from 'fs';
import { EOL as nl } from 'os';
import * as path from 'path';
import * as Stream from 'stream';
import * as readline from 'readline';

const localPath = (name: string) => path.normalize(__dirname + '/' + name);

/**
 * Technique that supports large text files.
 */
export const readBigFile = (name: string) =>
   new Promise<string>(resolve => {
      const input = fs.createReadStream(localPath(name));
      const output: NodeJS.WritableStream = new Stream.Writable();
      const rl = readline.createInterface(input, output);
      let file = '';
      rl.on('line', (line: string) => (file += line + nl));
      rl.on('close', () => resolve(file));
   });

export const readFile = (name: string): Promise<Buffer> =>
   new Promise((resolve, reject) => {
      fs.readFile(localPath(name), (err, data) => {
         if (err === null) {
            resolve(data);
         } else {
            reject(err);
         }
      });
   });

export const loadStream = (name: string) =>
   fs.createReadStream(localPath(name));
