const path = require('path');
const fse = require('fs-extra');

const _cache_ = 'node_modules/vuepress/node_modules/.cache';
const cachePath = path.join(`${__dirname}`, _cache_);
// remove
fse.removeSync(cachePath);