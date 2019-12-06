import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


import BillBoard from './BillBoard'
import Rockets from './Rockets'

export default class RocketSection {
    constructor(scene, textureLoader, rocketId, imgUrl, topText) {
        this.bind()
        this.rocketSection = new THREE.Group()

        this.scene = scene
        this.rocketId = rocketId
        this.imgUrl = imgUrl
        this.gltfLoader = new GLTFLoader()

        this.rockets = new Rockets(this.rocketSection, this.gltfLoader, this.rocketId)
        this.billBoard = new BillBoard(this.rocketSection, textureLoader, this.imgUrl, topText)
        this.scene.add(this.rocketSection)
    }

    update(delta) {
        this.billBoard.update(delta)
    }

    mouseIn() {
        this.billBoard.mouseIn()
    }
    mouseOut() {
        this.billBoard.mouseOut()
    }

    bind() {
        this.update = this.update.bind(this)
        this.mouseIn = this.mouseIn.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }
}