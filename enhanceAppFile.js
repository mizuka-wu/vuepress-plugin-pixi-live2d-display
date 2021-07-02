const { resolve } = require('path')
module.exports = function(option = {}) {
    return `import Live2d from "${resolve(__dirname, './Live2d.vue')}";

    export default ({ Vue }) => {
      ${Object.keys(option).map(key => {
        let value = option[key]
        switch (typeof value) {
          case 'object': {
            value = `() => (${JSON.stringify(value)})`
            break
          }
          case 'string': {
            value = JSON.stringify(value)
            break
          }
          default: {
            break
          }
        }
        return `(Live2d.props.${key} || {}).default = ${value}`
      }).join('\n')}  
      Vue.component("Live2d", Live2d);
    };`
}