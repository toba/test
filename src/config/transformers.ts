import * as babelJest from 'babel-jest';
import { config } from './babel';

module.exports = babelJest.createTransformer(config);

// module.exports = require('babel-jest').createTransformer(
//    require('../babelLoaderConfig.json')
// );
