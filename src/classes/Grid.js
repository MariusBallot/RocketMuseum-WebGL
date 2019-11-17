import * as THREE from 'three'

export default class Grid {
    constructor(scene, textureLoader) {
        this.bind()
        this.size = 20;
        this.tile = 1;
        this.scene = scene;
        this.grid = new THREE.Group()
        this.plane;

        this.textureLoader = textureLoader

        this.createFloor();
    }

    createFloor() {
        this.plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), new THREE.MeshBasicMaterial({
            transparent: true,
            map: this.textureLoader.load('./src/assets/gridTexture.png'),
        }))
        // this.scene.add(this.plane)
        for (let x = -this.size / 2; x < this.size / 2; x += this.tile) {
            for (let y = 0; y < this.size; y += this.tile) {
                let plClone = this.plane.clone()
                plClone.position.set(x, y, 0)
                this.grid.add(plClone)
            }
        }
        this.grid.position.z = 5;
        this.grid.position.y = -0.8;
        this.grid.rotateX(-Math.PI / 2)
        this.scene.add(this.grid)
    }


    bind() {

    }
}