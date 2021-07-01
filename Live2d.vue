<template>
  <div
    :style="containerStyle"
    class="live2d-container"
    v-show="isLoaded"
  >
    <canvas
      height="100%"
      id="vuepress-live2d"
      width="100%"
    />
  </div>
</template>

<script>
import live2dJSString from "./live2d";

if (!window.loadlive2d) {
  const script = document.createElement("script");
  script.innerHTML = live2dJSString;
  document.body.appendChild(script);
}

export default {
  props: {
    containerStyle: {
      type: Object,
      default: () => ({})
    },
    /**
     * 是否mobile下显示
     */
    mobile: {
      type: Boolean,
      default: false
    },
    model: {
      type: String,
      default: "https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-tororo/assets/tororo.model.json"
    }
  },
  data() {
    const isMobile = !!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    return {
      isLoaded: true,
      isMobile
    }
  },
  methods: {
    /**
     * 初始化live2d
     */
    initLive2d() {
      /**
       * 手机看配置显示不显示
       */
      if (this.isMobile && !this.mobile) {
        this.isLoaded = false
        return 0
      }

      setTimeout(() => {
        if (window.loadlive2d) {
          window.loadlive2d('vuepress-live2d', this.model)
        } else {
          console.log('未能成功加载live2d基础库')
        }
      }, 500)
      
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
.live2d-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 80;
  width: 300px;
  height: 300px;
}
</style>