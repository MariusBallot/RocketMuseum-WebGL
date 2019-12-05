import * as THREE from 'three'

import vertSource from '../shaders/plane.vert'
import fragSource from '../shaders/plane.frag'

import { TweenLite } from "gsap";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import createCanvas from './createCanvas'

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
        this.waveFlag = true
        this.time = 0.8;
        this.planeTop = null

        this.uvInt = new THREE.Vector2(0, 0)

        this.loadTopPlane()
        this.loadCenterPlane()
    }



    loadCenterPlane() {
        this.fbxLoader.load('./src/assets/grid.fbx', (obj) => {
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
            },
            u_h: {
                type: 'f',
                value: 0
            },

            u_alpha: {
                type: 'f',
                value: -1.
            },
            u_intUv: {
                type: 'vec2',
                value: this.uvInt
            },
        }
        let s = 0.5
        this.plane.scale.set(s, s, s)
        this.plane.translateY(0.3)
        this.plane.rotateX(Math.PI / 2)
        this.plane.rotateZ(Math.PI)
        this.plane.name = 'center'
        this.plane.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertSource,
            fragmentShader: fragSource,
            transparent: true
        })
        this.scene.add(this.plane)
    }

    loadTopPlane(topText) {

        let tex = new THREE.CanvasTexture(createCanvas(topText, true))
        this.planeTop = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true
        }))
        tex.needsUpdate = true
        this.planeTop.position.set(0.55, 0.5, 0)
        this.scene.add(this.planeTop)
    }

    updateUv(uvInt) {
        this.uvInt = uvInt
        this.uniforms.u_intUv.value = uvInt
    }

    mouseIn() {
        if (!this.waveFlag) return
        this.waveFlag = false
        TweenLite.to(this.uniforms.u_h, this.time / 2, {
            value: -2.0
        })
        console.log(this.waveFlag)
    }


    mouseOut() {

        TweenLite.to(this.uniforms.u_h, 2, {
            value: 0,
            onComplete: () => {
                this.waveFlag = true
            }
        })
    }


    onClick() {
        TweenLite.to(this.uniforms.u_alpha, this.time / 2, {
            value: 2.
        })
    }

    onBack() {
        TweenLite.to(this.uniforms.u_alpha, this.time / 2, {
            value: -1.
        })
    }

    update(delta) {
        if (this.plane)
            this.uniforms.u_delta.value += 1
    }

    bind() {
        this.update = this.update.bind(this)
        this.createBillboard = this.createBillboard.bind(this)
        this.mouseIn = this.mouseIn.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onBack = this.onBack.bind(this)
        this.updateUv = this.updateUv.bind(this)
    }




}