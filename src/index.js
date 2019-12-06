import './stylus/index.styl';
import ThreeScene from './classes/ThreeScene'
import WebFont from "webfontloader"

WebFont.load({
    google: {
        families: ['Titillium Web']
    },
    fontactive: () => {
        const threeScene = new ThreeScene();

        function raf() {
            requestAnimationFrame(raf)
            threeScene.update();
        }

        raf()
    }
});