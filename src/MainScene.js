import { ref } from 'vue'
import { createPhavuerComponent } from './Phavuer'
import ChildComponent from './ChildComponent'

export default class BootScene extends Phaser.Scene {
  constructor () {
    super({ key: 'Boot', active: true })
  }
  create () {
    this.view = createPhavuerComponent(this, {
      components: { ChildComponent },
      template: `<ChildComponent ref="root" />`,
      setup () {
        return { root: ref(null) }
      }
    })
    this.add.existing(this.view.root.object)
  }
  preload () {
    this.load.image('logo', './img/logo.png')
  }
}
