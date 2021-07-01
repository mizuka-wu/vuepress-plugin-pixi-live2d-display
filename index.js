
const enhanceAppFile = require('./enhanceAppFile')
const {resolve} = require('path')

module.exports = (option) => {
    return {
        enhanceAppFiles() {
            return [
                // 注入lib
                resolve(__dirname, 'live2d.js'),
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