import './stylus/index.styl';
import ThreeScene from './classes/ThreeScene'
import WebFont from "webfontloader"
import DataGetter from './classes/DataGetter';


WebFont.load({
  google: {
    families: ['Titillium Web']
  },
  fontactive: () => {

    new DataGetter(onLoaded)
    function onLoaded(museumData) {
      console.log(museumData)
      const threeScene = new ThreeScene(museumData);

      function raf() {
        requestAnimationFrame(raf)
        threeScene.update();
      }
      raf()

    }

  }
});