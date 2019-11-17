import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class Rocket {

    constructor(scene) {
        this.bind()
        this.scene = scene
        this.loader = new GLTFLoader
        this.falcon1
        this.falconHeavy
        this.falcon9
        this.rockets = new THREE.Group()
        this.load()
    }

    load() {
        this.loader.load('./src/assets/rockets/scene.glb', this.loaded)

    }

    loaded(obj) {
        console.log(obj)
        let s = 0.0007
        this.falcon9 = obj.scene.children[0].clone()
        this.falcon1 = obj.scene.children[1].clone()
        this.falconHeavy = obj.scene.children[2].clone()
        this.falcon9.scale.set(s, s, s)
        this.falcon9.position.set(-0.7, -1, 0)
        // this.falcon1.scale.set(s, s, s)
        this.falconHeavy.scale.set(s, s, s)
        this.rockets.add(this.falcon1, this.falcon9, this.falconHeavy)

        this.scene.add(this.rockets)



    }

    bind() {
        this.loaded = this.loaded.bind(this)
    }


}