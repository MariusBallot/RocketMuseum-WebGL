import * as THREE from 'three'

import vertSource from '../shaders/plane.vert'
import fragSource from '../shaders/plane.frag'

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export default class Billboard {
    constructor(scene, textureLoader, url) {
        this.bind()
        this.scene = scene
        this.url = url
        this.textureLoader = textureLoader
        this.fbxLoader = new FBXLoader()
        this.texture
        this.plane
        this.uniforms
        this.loadGrid()
    }

    loadGrid() {
        this.fbxLoader.load('./src/assets/grid.fbx', (obj) => {
            console.log(obj)
            this.createBillboard(obj.children[0])
        })
    }

    createBillboard(obj) {
        this.plane = obj
        this.texture = this.textureLoader.load(this.url)
        this.uniforms = {
            u_tex: {
                type: 't',
                value: this.texture
            },

            u_delta: {
                type: 'f',
                value: 0
            }
        }
        console.log(this.plane)
        let s = 0.5
        this.plane.scale.set(s, s, s)
        this.plane.translateY(0.3)
        this.plane.rotateX(Math.PI / 2)
        this.plane.rotateZ(Math.PI)
        this.plane.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertSource,
            fragmentShader: fragSource,
        })
        this.scene.add(this.plane)

    }

    update(delta) {
        if (this.plane)
            this.uniforms.u_delta.value += 1
    }

    bind() {
        this.update = this.update.bind(this)
        this.createBillboard = this.createBillboard.bind(this)
    }




}