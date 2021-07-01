<template>
  <div>{{ width }}</div>
</template>

<script>
import live2dJSString from "./live2d";
export default {
  props: {
    width: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {

    }
  },
  methods: {
    initLive2d() {
      console.log('初始化')
    }
  },
  mounted() {
    this.initLive2d()
    this.$router.afterEach((to, from) => {
      if (to.path !== from.path) {
        this.initLive2d();
      }
    });
  },
}
</script>

<style>
</style>