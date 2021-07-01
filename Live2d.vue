<template>
  <div>hello</div>
</template>

<script>
/**
 * @see https://www.npmjs.com/package/vue-live2d
 */
import isMobile from 'is-mobile'
import vueLive2d from 'vue-live2d'

export default {
    name: 'Live2d',
    components: {
        // vueLive2d
    },
    data() {
        return {
            isMobile: isMobile()
        }
    },
}
</script>

<style>
</style>