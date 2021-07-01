function createScript(src) {
    const scriptElement = document.createElement('script');
    scriptElement.src = src
    document.body.appendChild(scriptElement);
}

export default () => {
    createScript("https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js")
    createScript("https://cdn.jsdelivr.net/npm/pixi.js@4.6.1/dist/pixi.min.js")
    setTimeout(() => {
        createScript("https://cdn.jsdelivr.net/npm/live2dv3@1.2.2/live2dv3.min.js")
    }, 800)
}