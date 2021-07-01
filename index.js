
const enhanceAppFile = require('./enhanceAppFile')

module.exports = (option) => {
    return {
        enhanceAppFiles() {
            return {
                name: 'dynamic-code',
                content: enhanceAppFile(option)
            }
        },
        globalUIComponents: "Live2d"
      }
};