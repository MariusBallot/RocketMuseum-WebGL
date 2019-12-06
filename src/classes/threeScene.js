import * as THREE from "three"

import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import Grid from './Grid'
import RocketSection from './RocketSection'
import AnimationController from './AnimationController'


export default class ThreeScene {
  constructor() {
    this.camera
    this.scene
    this.renderer
    this.controls
    this.textureLoader


    this.grid
    this.rocketSections = []
    this.rocketSectionsGroup = new THREE.Group()

    this.oldDate = 0
    this.newDate = 0;
    this.delta = 0;

    this.uvInt = new THREE.Vector2(0, 0)

    this.backbutt = document.querySelector('.back')
    this.arrows = {
      left: document.querySelector('.arrows .previous'),
      right: document.querySelector('.arrows .next')
    }
    this.backFlag = false
    console.log(this.arrows)

    this.raycaster = new THREE.Raycaster();
    this.rayFlag = false
    this.animFlag = false

    this.animationController

    this.mousePos = new THREE.Vector2();

    this.bind()
    this.init()

  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.debug.checkShaderErrors = true
    document.body.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0xEEEEEE, 8, 10)
    this.scene.background = new THREE.Color(0xEEEEEE)

    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 0, -1)
    this.camera.lookAt(0, 0, this.camera.position.z - 1)
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // this.controls.enabled = true
    // this.controls.maxDistance = 1500
    // this.controls.minDistance = 0


    this.textureLoader = new THREE.TextureLoader()

    let light = new THREE.AmbientLight()
    light.intensity = 0.5
    let pointLight = new THREE.PointLight()
    pointLight.position.set(10, 10, 0)
    this.scene.add(pointLight, light)
    this.grid = new Grid(this.scene, this.textureLoader)
    let stepSize = 4;

    for (let i = 0; i < 3; i++) {
      this.rocketSections.push(new RocketSection(this.rocketSectionsGroup, this.textureLoader, "falconHeavy", './src/assets/rocketImageTest.jpg', "jejejejej"))
      this.rocketSections[i].rocketSection.position.x = stepSize * i;
    }
    this.scene.add(this.rocketSectionsGroup)
    this.animationController = new AnimationController(
      this.rocketSectionsGroup,
      stepSize,
      this.camera,
      this.arrows)

    console.log(this.scene)

  }

  update() {
    // this.composer.render();
    this.renderer.render(this.scene, this.camera)
    this.camera.position.x += (this.mousePos.x / 5 - this.camera.position.x) * 0.05
    this.camera.position.y += (-this.mousePos.y / 5 - this.camera.position.y) * 0.05
    this.camera.lookAt(0, 0, this.camera.position.z - 4)
    for (let i = 0; i < this.rocketSections.length; i++) {
      this.rocketSections[i].update(this.getDelta())
    }
  }

  raycast() {
    this.rayFlag = false
    for (let j = 0; j < 3; j++) {
      this.raycaster.setFromCamera(this.mousePos, this.camera);
      var intersects = this.raycaster.intersectObjects(this.scene.children[3].children[j].children);
      for (var i = 0; i < intersects.length; i++) {
        this.rayFlag = true
        if (intersects[i].object.name == 'center') {
          this.rayFlag = true
          this.uvInt = intersects[0].uv
          for (let i = 0; i < this.rocketSections.length; i++) {
            this.rocketSections[i].billBoard.updateUv(this.uvInt)
          }
        }
      }
    }
  }

  getDelta() {
    this.newDate = Date.now()
    this.delta = this.newDate - this.oldDate;
    this.oldDate = this.newDate;
    return this.delta
  }


  resizeCanvas() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  mouseMove(e) {
    this.mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mousePos.y = - (e.clientY / window.innerHeight) * 2 + 1;

    this.raycast()
    if (this.rayFlag == true && this.animFlag == false) {
      // this.animationController.moveForward()
      for (let i = 0; i < this.rocketSections.length; i++) {
        this.rocketSections[i].mouseIn()
      }
      this.animFlag = true
    }
    if (this.rayFlag == false && this.animFlag == true) {
      // this.animationController.moveBackward()
      for (let i = 0; i < this.rocketSections.length; i++) {
        this.rocketSections[i].mouseOut()
      }
      this.animFlag = false
    }
  }

  onClick() {
    if (this.rayFlag) {
      this.animationController.prezMode()
      this.backFlag = true
      this.rocketSections.forEach(rocketSection => {
        rocketSection.billBoard.onClick()
      });
    }
  }

  backClicked() {
    console.log('clicked')
    if (this.backFlag) {
      this.animationController.back()
      this.rocketSections.forEach(rocketSection => {
        rocketSection.billBoard.onBack()
      });
    }
  }

  bind() {
    this.resizeCanvas = this.resizeCanvas.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this.onClick = this.onClick.bind(this)
    this.backClicked = this.backClicked.bind(this)

    window.addEventListener('resize', this.resizeCanvas)
    window.addEventListener('mousemove', this.mouseMove)
    window.addEventListener('click', this.onClick)
    this.backbutt.addEventListener('click', this.backClicked)
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == 39) {
        this.animationController.moveToLeft()
      } else if (e.keyCode == 37) {
        this.animationController.moveToRight()
      }
    })

    this.arrows.left.addEventListener('click', () => {
      this.animationController.moveToRight()
    })
    this.arrows.right.addEventListener('click', () => {
      this.animationController.moveToLeft()
    })
  }
}