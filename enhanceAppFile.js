const { resolve } = require('path')
module.exports = function(option = {}) {
    return `import Live2d from "${resolve(__dirname, './Live2d.vue')}";

    export default ({ Vue }) => {
      ${Object.keys(option).map(key => `Live2d.props.${key}.default = ${option[key]}`).join('\n')}  
      Vue.component("Live2d", Live2d);
    };`
}