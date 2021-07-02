
const enhanceAppFile = require('./enhanceAppFile')
const {resolve} = require('path')

const resolveLib = function(...paths) {
    return resolve(__dirname, 'lib', ...paths)
}

module.exports = (option) => {
    return {
        // 注入component
        enhanceAppFiles() {
            return [
                resolveLib('index.js'),
                {
                    name: 'Live2dComponent',
                    content: enhanceAppFile(option)
                }
            ]
        },
        globalUIComponents: "Live2d"
      }
};