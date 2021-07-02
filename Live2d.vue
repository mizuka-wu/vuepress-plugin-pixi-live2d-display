<template>
  <div
    :style="containerStyle"
    class="live2d-container"
    v-show="isLoaded"
  >
    <canvas id="vuepress-live2d"></canvas>
  </div>
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
    model: {
      type: String,
      default: "https://cdn.jsdelivr.net/npm/live2dv3@latest/assets/biaoqiang_3/biaoqiang_3.model3.json"
    },
    /**
     * 延迟多久加载
     */
    delay: {
      type: Number,
      default: 2000
    },
    scale: {
      type: Number,
      default: 1
    }
  },
  data() {
    const isMobile = !!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    return {
      height: this.width,
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

      setTimeout(async () => {
        // 加载基础库成功
        if (window.PIXI && window.PIXI.live2d) {
          const view = document.getElementById('vuepress-live2d')
          const PIXI = window.PIXI
          const Live2DModel = window.PIXI.live2d.Live2DModel
          const model = await Live2DModel.from(this.model);
          const {width, height} = model

          const app = new PIXI.Application({
            transparent: true,
            width,
            height,
            view
          })
          app.stage.addChild(model);
          // 改变模组大小

          model.rotation = Math.PI;
          model.skew.x = Math.PI;
          model.x = width / 2
          model.y = height / 2
          model.anchor.set(0.5, 0.5);
          window.model = model

          // 缩放到符合比例
          model.scale.set(this.scale, this.scale);

          // interaction
          model.on('hit', hitAreas => {
            if (hitAreas.includes('body')) {
              model.motion('tap_body');
            }
          });

        } else {
          this.isLoaded = false
          console.log('未能成功加载live2d基础库')
        }
      }, this.delay)
      
    }
  },
  mounted() {
    this.initLive2d()
    // this.$router.afterEach((to, from) => {
    //   if (to.path !== from.path) {
    //     this.initLive2d();
    //   }
    // });
  },
}
</script>

<style>
.live2d-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 400px;
  height: 400px;
  right: 20px;
  bottom: 20px;
  z-index: 80;
}

.live2d-container canvas {
  max-width: 100%;
  max-height: 100%;
  /* width: 500px;
  height: 300px; */
}
</style>