// loader-utils是专门用于自定义loader时的一些工具函数
const { getOptions } = require('loader-utils');

module.exports = function (source) {
  const options = getOptions(this); // getOptions用于获取配置

  // return source.replace(/NAME/g,     options.words);
};
