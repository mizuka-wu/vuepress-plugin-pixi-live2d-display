
const enhanceAppFile = require('./enhanceAppFile')
const {resolve} = require('path')

module.exports = (option) => {
    return {
        enhanceAppFiles() {
            return [
                // 注入lib
                // resolve(__dirname, 'lib', 'live2dcubismcore.js'),
                {
                    name: "live2dcubismcore.min.js",
                    content: `
                    const scriptElement = document.createElement('script')
                    scriptElement.src = "https://cdn.jsdelivr.net/gh/litstronger/live2d-​moc3@master/js/frame/live2dcubismcore.min.js"
                    document.body.appendChild(scriptElement)
                    `
                },
                resolve(__dirname, 'lib', 'pixi.js'),
                resolve(__dirname, 'lib', 'pixi-live2d-display.js'),
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