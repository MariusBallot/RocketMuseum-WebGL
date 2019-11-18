import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class Rocket {

    constructor(scene, gltfLoader, rocketId) {
        this.bind()
        this.scene = scene
        this.loader = gltfLoader
        this.rocketId = rocketId
        this.falcon1
        this.falconHeavy
        this.falcon9
        this.rockets = new THREE.Group()
        this.load()
    }

    load() {
        // this.rocketId = 'falconHeavy'
        let url = './src/assets/rockets/' + this.rocketId + '.glb'
        // let url = './src/assets/rockets/falcon1.glb'
        this.loader.load(url, this.loaded)

    }

    loaded(obj) {

        var rocket = obj.scene
        if (this.rocketId == 'falconHeavy') {
            let s = 0.04
            rocket.scale.set(s, s, s)
            rocket.rotateY(Math.PI / 2)
            rocket.position.set(-0.7, -0.9, 0)
        } else {
            let s = 0.07
            rocket.scale.set(s, s, s)
            rocket.position.set(-0.7, -0.8, 0)

        }
        this.scene.add(rocket)


    }

    bind() {
        this.loaded = this.loaded.bind(this)
    }


}