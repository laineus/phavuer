<template>
  <div><slot /></div>
</template>

<script>
import { defineComponent, provide, inject } from 'vue'
import { initGameObject } from '../index.js'
import { gameObjectProps, mapProps } from '../props.js'
export default defineComponent({
  props: {
    ...gameObjectProps,
    ...mapProps(
      'width', 'height',
      'radius',
      'fillColor', 'fillAlpha',
      'lineWidth', 'strokeColor', 'strokeAlpha'
    )
  },
  setup (props, context) {
    const scene = inject('scene')
    class RoundRectangle extends Phaser.GameObjects.Graphics {
      constructor (scene, x, y, width, height, radius) {
        super(scene, x, y, width, height)
        this._originX = 0
        this._originY = 0
        this._width = width || 0
        this._height = height || 0
        this._radius = radius || 0
        this._fillColor = null
        this._fillAlpha = 1
        this._lineWidth = 0
        this._strokeColor = null
        this._strokeAlpha = 1
        this.setRenderFlag(true)
      }
      preUpdate (...arg) {
        if (this.renderFlag) this.render()
      }
      setRenderFlag (bool) {
        this.renderFlag = bool
      }
      render () {
        this.setRenderFlag(false)
        const x = this.originX * -this.width
        const y = this.originY * -this.height
        const radius = typeof this.radius === 'number' ? Math.min(this.radius, this.width.half, this.height.half) : this.radius
        this.clear()
        if (this.fillColor !== null) {
          this.fillStyle(this.fillColor, this.fillAlpha)
          this.fillRoundedRect(x, y, this.width, this.height, radius)
        }
        if (this.lineWidth && this.strokeColor !== null) {
          this.lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
          this.strokeRoundedRect(x, y, this.width, this.height, radius)
        }
      }
      // Origin
      get originX () {
        return this._originX
      }
      set originX (v) {
        this._originX = v
        this.displayOriginX = this.width * v
        this.setRenderFlag(true)
      }
      get originY () {
        return this._originY
      }
      set originY (v) {
        this._originY = v
        this.displayOriginY = this.height * v
        this.setRenderFlag(true)
      }
      setOrigin (x, y) {
        this.originX = x
        this.originY = y === undefined ? x : y
        return this
      }
      // Radius
      get radius () {
        return this._radius
      }
      set radius (v) {
        this._radius = v
        this.setRenderFlag(true)
      }
      setRadius (radius) {
        this.radius = radius
        return this
      }
      // Size
      get width () {
        return this._width
      }
      set width (v) {
        this._width = v
        this.fixSize()
        this.setRenderFlag(true)
      }
      get height () {
        return this._height
      }
      set height (v) {
        this._height = v
        this.fixSize()
        this.setRenderFlag(true)
      }
      setSize (width, height) {
        if (width !== undefined) this.width = width
        if (height !== undefined) this.height = height
        return this
      }
      fixSize () {
        if (this.input) this.input.hitArea.setSize(this.width, this.height)
        if (this.body) this.body.setSize(this.width, this.height)
      }
      get displayWidth () {
        return Math.abs(this.scaleX * this.width)
      }
      set displayWidth (value) {
        this.scaleX = value / this.width
      }
      get displayHeight () {
        return Math.abs(this.scaleY * this.height)
      }
      set displayHeight (value) {
        this.scaleY = value / this.height
      }
      // Fill
      get fillColor () {
        return this._fillColor
      }
      set fillColor (v) {
        this._fillColor = v
        this.setRenderFlag(true)
      }
      get fillAlpha () {
        return this._fillAlpha
      }
      set fillAlpha (v) {
        this._fillAlpha = v
        this.setRenderFlag(true)
      }
      setFillStyle (fillColor, fillAlpha) {
        if (fillColor !== undefined) this.fillColor = fillColor
        if (fillAlpha !== undefined) this.fillAlpha = fillAlpha
        return this
      }
      // Stroke
      get lineWidth () {
        return this._lineWidth
      }
      set lineWidth (v) {
        this._lineWidth = v
        this.setRenderFlag(true)
      }
      get strokeColor () {
        return this._strokeColor
      }
      set strokeColor (v) {
        this._strokeColor = v
        this.setRenderFlag(true)
      }
      get strokeAlpha () {
        return this._strokeAlpha
      }
      set strokeAlpha (v) {
        this._strokeAlpha = v
        this.setRenderFlag(true)
      }
      setStrokeStyle (lineWidth, strokeColor, strokeAlpha) {
        if (lineWidth !== undefined) this.lineWidth = lineWidth
        if (strokeColor !== undefined) this.strokeColor = strokeColor
        if (strokeAlpha !== undefined) this.strokeAlpha = strokeAlpha
        return this
      }
    }
    const object = new RoundRectangle(scene, props.x || 0, props.y || 0, props.width, props.height, props.radius)
    initGameObject(object, props, context)
    provide('gameObject', object)
    return { object }
  }
})
</script>
