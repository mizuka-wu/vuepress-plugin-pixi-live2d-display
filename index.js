
const enhanceAppFile = require('./enhanceAppFile')
const {resolve} = require('path')

module.exports = (option) => {
    return {
        enhanceAppFiles() {
            return [
                resolve(__dirname, 'live2dcubismcore.min.js'),
                {
                    // 注入component
                    name: 'Live2dComponent',
                    content: enhanceAppFile(option)
                }
            ]
        },
        globalUIComponents: "Live2d"
      }
};