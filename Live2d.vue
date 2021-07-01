<template>
  <div :style="containerStyle" class="live2d-container" id="vuepress-live2d" v-show="isLoaded"></div>
</template>

<script>
/**
 * @see https://github.com/QiShaoXuan/vuepress-plugin-cat/blob/master/cat.vue
 */

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
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 300
    },
    basePath: {
      type: String,
      default: "https://cdn.jsdelivr.net/npm/live2dv3@latest/assets"
    },
    modelName: {
      type: String,
      default: "biaoqiang_3"
    },
    /**
     * 延迟多久加载
     */
    delay: {
      type: Number,
      default: 1000
    },
  },
  data() {
    const isMobile = !!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    return {
      viewer: null,
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
        if (window.l2dViewer) {
          this.viewer = new l2dViewer({
            el: document.getElementById('vuepress-live2d'),
            mobileLimit: this.mobile,
            width: this.width,
            height: this.height,
            basePath: this.basePath,
            modelName: this.modelName,
          })
        } else {
          this.isLoaded = false
          console.log('未能成功加载live2d基础库')
        }
      }, 1000)
      
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
}

.live2d-container canvas {
  width: 500px;
  height: 300px;
}
</style>