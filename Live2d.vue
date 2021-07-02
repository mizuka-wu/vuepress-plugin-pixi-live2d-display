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
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 300
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

      setTimeout(async () => {
        // 加载基础库成功
        if (window.PIXI && window.PIXI.live2d) {
          const view = document.getElementById('vuepress-live2d')
          const PIXI = window.PIXI
          const Live2DModel = window.PIXI.live2d.Live2DModel
          console.log(PIXI, Live2DModel)
          const app = new PIXI.Application({
            view
          })
          const model = await Live2DModel.from(this.model);
          app.stage.addChild(model);
          // transforms
          model.x = 100;
          model.y = 100;
          model.rotation = Math.PI;
          model.skew.x = Math.PI;
          model.scale.set(2, 2);
          model.anchor.set(0.5, 0.5);

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