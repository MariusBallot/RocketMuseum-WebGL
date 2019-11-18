import { TweenLite } from "gsap";

export default class AnimationController {
    constructor(sections, stepSize) {
        this.bind()
        this.stepSize = stepSize
        this.sections = sections
        this.prezFlag = false
        this.positionIndex = 0;
    }

    moveToLeft() {
        if (!this.prezFlag) {
            console.log('hi')
            if (this.positionIndex < 2) {
                this.positionIndex++;
                TweenLite.to(this.sections.position, 1, {
                    x: this.positionIndex * -this.stepSize
                })
            }
        }
    }

    moveToRight() {
        if (!this.prezFlag) {
            if (this.positionIndex > 0) {
                this.positionIndex--;
                TweenLite.to(this.sections.position, 1, {
                    x: this.positionIndex * -this.stepSize
                })
            }
        }
    }


    moveForward() {
        if (!this.prezFlag) {
            TweenLite.to(this.sections.position, 0.5, {
                z: 0.2
            })
        }
    }

    moveBackward() {
        if (!this.prezFlag) {
            TweenLite.to(this.sections.position, 0.5, {
                z: 0
            })
        }
    }

    back() {
        this.prezFlag = false
        TweenLite.to(this.sections.position, 0.5, {
            z: 0,
            x: this.positionIndex * -this.stepSize,
            y: 0,
        })

    }

    prezMode() {
        this.prezFlag = true
        TweenLite.to(this.sections.position, 0.5, {
            z: 2,
            x: 0.3 + this.positionIndex * -this.stepSize,
            y: -0.3,
        })
    }



    bind() {
        this.moveToLeft = this.moveToLeft.bind(this)
        this.moveForward = this.moveForward.bind(this)
        this.prezMode = this.prezMode.bind(this)
        this.back = this.back.bind(this)
    }

}