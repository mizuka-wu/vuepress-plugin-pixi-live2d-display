// 标准库
const libs = [
    "https://cubism.live2d.​com/sdk-web/cubismcore/live2dcubismcore.min.js",
    "https://cdn.jsdelivr.net/npm/pixi.js@5.3.10/dist/pixi.min.js",
]

// 显示库，需要延迟加载，目前延迟1s
const displayLib = "https://cdn.jsdelivr.net/npm/pixi-live2d-display@0.3.1/dist/cubism4.min.js"

export default function () {
    const createScript = function(src) {
        const script = document.createElement('script')
        script.src = src
        script.defer = true
        document.body.appendChild(script)
        return 1
    }
    libs.forEach(src => createScript(src))
    setTimeout(() => createScript(displayLib), 1000)
}