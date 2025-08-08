import { defineComponent as p, ref as Y, provide as u, onMounted as k, openBlock as D, createElementBlock as L, createElementVNode as H, renderSlot as y, createCommentVNode as G, inject as d, getCurrentInstance as F, onUpdated as M, onBeforeUnmount as O, watch as U, customRef as V } from "vue";
const X = [
  { attr: "onPointerdown", emit: "pointerdown", eventIndex: 3 },
  { attr: "onPointermove", emit: "pointermove", eventIndex: 3 },
  { attr: "onPointerup", emit: "pointerup", eventIndex: 3 },
  { attr: "onPointerout", emit: "pointerout", eventIndex: 1 },
  { attr: "onPointerover", emit: "pointerover", eventIndex: 3 },
  { attr: "onWheel", emit: "wheel", eventIndex: 4 },
  { attr: "onDragstart", emit: "dragstart", drag: !0 },
  { attr: "onDrag", emit: "drag", drag: !0 },
  { attr: "onDragend", emit: "dragend", drag: !0 },
  { attr: "onDragenter", emit: "dragenter", drag: !0 },
  { attr: "onDragover", emit: "dragover", drag: !0 },
  { attr: "onDragleave", emit: "dragleave", drag: !0 },
  { attr: "onDrop", emit: "drop", drag: !0 }
], C = (e) => {
  e.updateDisplayOrigin && e.updateDisplayOrigin(), e.input ? e.input.hitArea.setSize(e.width, e.height) : e._events && X.some((t) => t.emit in e._events) && e.setInteractive();
}, A = (e, t, n) => {
  let i = e[t];
  return Object.defineProperty(e, t, {
    get() {
      return i;
    },
    set(r) {
      i !== r && n(`update:${t}`, r);
    }
  }), (r) => i = r;
}, z = ["tween", "tweens", "timeline", "style"], E = ["x", "y", "tweens", "tween", "timeline"], R = {
  active: (e) => (t) => e.setActive(t),
  visible: (e) => (t) => e.setVisible(t),
  x: (e, t) => t ? A(e, "x", t) : (n) => e.x = n,
  y: (e, t) => t ? A(e, "y", t) : (n) => e.y = n,
  x1: (e) => (t) => e.geom.x1 = t,
  y1: (e) => (t) => e.geom.y1 = t,
  x2: (e) => (t) => e.geom.x2 = t,
  y2: (e) => (t) => e.geom.y2 = t,
  x3: (e) => (t) => e.geom.x3 = t,
  y3: (e) => (t) => e.geom.y3 = t,
  points: (e) => (t) => e.setTo(t),
  rotation: (e) => (t) => e.setRotation(t),
  origin: (e) => (t) => e.setOrigin(t, t),
  originX: (e) => (t) => e.setOrigin(t, e.originY),
  originY: (e) => (t) => e.setOrigin(e.originX, t),
  scale: (e) => (t) => e.setScale(t, t),
  scaleX: (e) => (t) => e.setScale(t, e.scaleY),
  scaleY: (e) => (t) => e.setScale(e.scaleX, t),
  width: (e) => (t) => {
    e.setSize(t, e.height), C(e);
  },
  height: (e) => (t) => {
    e.setSize(e.width, t), C(e);
  },
  leftWidth: (e) => (t) => e.setSlices(e.width, e.height, t, e.rightWidth, e.topHeight, e.bottomHeight),
  rightWidth: (e) => (t) => e.setSlices(e.width, e.height, e.leftWidth, t, e.topHeight, e.bottomHeight),
  topHeight: (e) => (t) => e.setSlices(e.width, e.height, e.leftWidth, e.rightWidth, t, e.bottomHeight),
  bottomHeight: (e) => (t) => e.setSlices(e.width, e.height, e.leftWidth, e.rightWidth, e.topHeight, t),
  radius: (e) => (t) => e.setRadius(t),
  displayWidth: (e) => (t) => e.setDisplaySize(t, e.displayHeight),
  displayHeight: (e) => (t) => e.setDisplaySize(e.displayWidth, t),
  displayOriginX: (e) => (t) => e.setDisplayOrigin(t, e.displayOriginY),
  displayOriginY: (e) => (t) => e.setDisplayOrigin(e.displayOriginX, t),
  dropZone: (e) => (t) => {
    t && (e.input || e.setInteractive(), e.input.dropZone = t);
  },
  flipX: (e) => (t) => e.setFlipX(t),
  flipY: (e) => (t) => e.setFlipY(t),
  depth: (e) => (t) => {
    if (e.setDepth(t), e.parentContainer) {
      const n = e.parentContainer.list.findIndex((i) => i.depth > (e.depth ?? 0));
      n === -1 ? e.parentContainer.bringToTop(e) : e.parentContainer.moveTo(e, Math.max(n - 1, 0));
    }
  },
  alpha: (e) => (t) => e.setAlpha(t),
  blendMode: (e) => (t) => e.setBlendMode(t),
  pipeline: (e) => (t) => e.setPipeline(t),
  intensity: (e) => (t) => e.setIntensity(t),
  tint: (e) => (t) => e.setTint(t),
  text: (e) => (t) => e.setText(t),
  texture: (e) => (t) => e.setTexture(t, e.frame && e.frame.name),
  frame: (e) => (t) => e.setFrame(t),
  color: (e) => (t) => e.setColor(t),
  fillColor: (e) => (t) => e.setFillStyle(t, e.fillAlpha),
  fillAlpha: (e) => (t) => e.setFillStyle(e.fillColor, t),
  lineWidth: (e) => (t, n) => {
    e.setLineWidth ? e.setLineWidth(t, n) : e.setStrokeStyle(...t ? [t, e.strokeColor, e.strokeAlpha] : []);
  },
  strokeColor: (e) => (t) => e.setStrokeStyle(e.lineWidth, t, e.strokeAlpha),
  strokeAlpha: (e) => (t) => e.setStrokeStyle(e.lineWidth, e.strokeColor, t),
  style: (e) => (t) => e.setStyle(t),
  lineSpacing: (e) => (t) => e.setLineSpacing(t),
  padding: (e) => (t) => e.setPadding(t),
  collision: (e) => (t) => e.setCollision(t),
  collisionByProperty: (e) => (t) => e.setCollisionByProperty(t),
  play: (e) => (t) => t ? e.play(t) : e.stop(),
  scrollFactor: (e) => (t) => e.setScrollFactor(t),
  scrollFactorX: (e) => (t) => e.setScrollFactor(t, e.scrollFactorY),
  scrollFactorY: (e) => (t) => e.setScrollFactor(e.scrollFactorX, t),
  cullPadding: (e) => (t) => e.setCullPadding(t, t),
  cullPaddingX: (e) => (t) => e.setCullPadding(t, e.cullPaddingY),
  cullPaddingY: (e) => (t) => e.setCullPadding(e.cullPaddingX, t),
  // Body
  enable: (e) => (t) => e.enable = t,
  immovable: (e) => (t) => e.setImmovable(t),
  moves: (e) => (t) => e.moves = t,
  bounceX: (e) => (t) => e.setBounceX(t),
  bounceY: (e) => (t) => e.setBounceY(t),
  drag: (e) => (t) => e.setDrag(t),
  dragX: (e) => (t) => e.setDragX(t),
  dragY: (e) => (t) => e.setDragY(t),
  gravityX: (e) => (t) => e.setGravityX(t),
  gravityY: (e) => (t) => e.setGravityY(t),
  frictionX: (e) => (t) => e.setFrictionX(t),
  frictionY: (e) => (t) => e.setFrictionY(t),
  velocityX: (e) => (t) => e.setVelocityX(t),
  velocityY: (e) => (t) => e.setVelocityY(t),
  maxVelocityX: (e) => (t) => e.setMaxVelocityX(t),
  maxVelocityY: (e) => (t) => e.setMaxVelocityY(t),
  accelerationX: (e) => (t) => e.setAccelerationX(t),
  accelerationY: (e) => (t) => e.setAccelerationY(t),
  offsetX: (e) => (t) => e.setOffset(t, e.offset.y),
  offsetY: (e) => (t) => e.setOffset(e.offset.x, t),
  collideWorldBounds: (e) => (t) => e.collideWorldBounds = t,
  // Tween
  tween: (e, t) => N((n) => {
    const i = e.scene.add.tween(Object.assign({ targets: e }, n));
    return t && i.on("complete", () => t("update:tween", void 0)), i;
  }),
  tweens: (e, t) => N((n) => {
    const i = n.findIndex((s) => s.repeat === -1), r = n.slice(0, i === -1 ? void 0 : i + 1), o = e.scene.add.timeline(r.map((s, c) => ({
      at: r.slice(0, c).reduce((x, b) => {
        const w = b.duration ?? 1e3, S = b.yoyo ?? !1, l = (b.repeat ?? 0) + 1;
        return x + w * (S ? 2 : 1) * l;
      }, 0),
      tween: Object.assign({ targets: e }, s)
    }))).play();
    return t && o.on("complete", () => t("update:tweens", void 0)), o;
  }),
  timeline: (e, t) => N((n) => {
    const i = e.scene.add.timeline(n.map((r) => {
      const o = Object.assign({}, r);
      return o.tween && (o.tween = Object.assign({ targets: e }, o.tween)), o;
    })).play();
    return t && i.on("complete", () => t("update:timeline", void 0)), i;
  })
}, N = (e) => {
  let t;
  return (n) => {
    t && t.stop(), t = n ? e(n) : void 0;
  };
}, Z = "phavuer", q = "0.16.5", J = "A wrapper library that integrates Phaser 3 with Vue 3.", K = "src/index.js", Q = "types/phavuer.d.ts", j = "Laineus", ee = "MIT", te = {
  type: "git",
  url: "https://github.com/laineus/phavuer.git"
}, ie = {
  dev: "vite",
  build: "vite build",
  "build:watch": "vite build --watch",
  preview: "vite preview",
  test: "vitest"
}, ne = [
  "dist",
  "src",
  "types"
], se = {
  phaser: "^3.70.0",
  vue: "^3.3.13"
}, re = {
  "@vitejs/plugin-vue": "^5.0.4",
  "@vitest/browser": "^1.3.0",
  "@vue/compiler-sfc": "^3.3.13",
  "@vue/test-utils": "^2.4.4",
  "mock-require": "^3.0.3",
  phaser: "^3.70.0",
  vite: "^5.0.0",
  vitest: "^1.3.0",
  vue: "^3.3.13",
  webdriverio: "^8.32.2"
}, ae = {
  name: Z,
  version: q,
  description: J,
  main: K,
  types: Q,
  author: j,
  license: ee,
  repository: te,
  scripts: ie,
  files: ne,
  peerDependencies: se,
  devDependencies: re
}, m = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, oe = p({
  emits: ["create", "ready"],
  props: {
    config: { type: Object }
  },
  setup(e, t) {
    var s;
    ((s = e.config) == null ? void 0 : s.banner) !== !1 && console.log(
      `%c %cPhavuer v${ae.version}%c https://github.com/laineus/phavuer`,
      "background-color: #42b883; padding: 2px 0;",
      "background-color: #213547; padding: 2px 8px; color: white; font-weight: bold;",
      ""
    );
    const n = Y(!1), i = Y(!1), r = document.createElement("div"), o = new Phaser.Game(Object.assign({ parent: r }, e.config));
    return u(a.Game, o), u(a.Scene, void 0), u(a.Container, void 0), u(a.RenderTextureRenderList, void 0), o.events.addListener("ready", () => {
      i.value = !0, t.emit("ready", o);
    }), t.emit("create", o), k(() => {
      const c = r.firstChild;
      c && (n.value.appendChild(c), o.scale.getParent({ ...o.config, parent: n.value }), o.scale.refresh());
    }), { canvasRoot: n, show: i };
  }
}), le = { "data-phavuer-game": "" }, ce = {
  "data-phavuer-canvas": "",
  ref: "canvasRoot"
};
function de(e, t, n, i, r, o) {
  return D(), L("div", le, [
    H("div", ce, null, 512),
    e.show ? y(e.$slots, "default", { key: 0 }) : G("", !0)
  ]);
}
const je = /* @__PURE__ */ m(oe, [["render", de]]), he = p({
  emits: ["init", "create", "update", "preload"],
  props: {
    name: { type: String, required: !0 },
    autoStart: { type: Boolean, default: !0 }
  },
  setup(e, t) {
    const n = Y(!1), i = [], r = [], o = class extends Phaser.Scene {
      init(h) {
        t.emit("init", this, h);
      }
      create(h) {
        n.value = !0, t.emit("create", this, h);
      }
      update(h, x) {
        i.forEach((b) => b(h, x)), t.emit("update", this, h, x), r.forEach((b) => b(h, x));
      }
      preload() {
        t.emit("preload", this);
      }
    }, c = d(a.Game).scene.add(e.name, o, e.autoStart);
    return c.events.on("shutdown", () => n.value = !1), u(a.Scene, c), u(a.PreUpdateEvents, i), u(a.PostUpdateEvents, r), { scene: c, show: n };
  }
});
function ue(e, t, n, i, r, o) {
  return e.show ? y(e.$slots, "default", { key: 0 }) : G("", !0);
}
const et = /* @__PURE__ */ m(he, [["render", ue]]), pe = {
  active: { type: Boolean },
  visible: { type: Boolean },
  x: { type: Number },
  y: { type: Number },
  x1: { type: Number },
  y1: { type: Number },
  x2: { type: Number },
  y2: { type: Number },
  x3: { type: Number },
  y3: { type: Number },
  points: { type: Array },
  rotation: { type: Number },
  origin: { type: Number },
  originX: { type: Number },
  originY: { type: Number },
  scale: { type: Number },
  scaleX: { type: Number },
  scaleY: { type: Number },
  width: { type: Number },
  height: { type: Number },
  leftWidth: { type: Number },
  rightWidth: { type: Number },
  topHeight: { type: Number },
  bottomHeight: { type: Number },
  radius: { type: Number },
  displayWidth: { type: Number },
  displayHeight: { type: Number },
  displayOriginX: { type: Number },
  displayOriginY: { type: Number },
  dropZone: { type: Boolean },
  flipX: { type: Boolean },
  flipY: { type: Boolean },
  depth: { type: Number },
  alpha: { type: Number },
  blendMode: { type: [Number, String] },
  pipeline: { type: [String, Object] },
  intensity: { type: Number },
  tint: { type: Number },
  text: { type: [String, Number] },
  texture: { type: String },
  frame: { type: [Number, String] },
  color: { type: String },
  fillColor: { type: Number },
  fillAlpha: { type: Number },
  lineWidth: { type: Number },
  strokeColor: { type: Number },
  strokeAlpha: { type: Number },
  style: { type: Object },
  lineSpacing: { type: Number },
  padding: { type: [Number, Object] },
  collision: { type: [Number, Array] },
  collisionByProperty: { type: Object },
  play: { type: [String, Object] },
  scrollFactor: { type: Number },
  scrollFactorX: { type: Number },
  scrollFactorY: { type: Number },
  // Body
  enable: { type: Boolean },
  immovable: { type: Boolean },
  moves: { type: Boolean },
  bounceX: { type: Number },
  bounceY: { type: Number },
  drag: { type: Number },
  dragX: { type: Number },
  dragY: { type: Number },
  gravityX: { type: Number },
  gravityY: { type: Number },
  frictionX: { type: Number },
  frictionY: { type: Number },
  velocityX: { type: Number },
  velocityY: { type: Number },
  maxVelocityX: { type: Number },
  maxVelocityY: { type: Number },
  accelerationX: { type: Number },
  accelerationY: { type: Number },
  offsetX: { type: Number },
  offsetY: { type: Number },
  collideWorldBounds: { type: Boolean },
  // Tween
  tween: { type: Object },
  tweens: { type: Array },
  timeline: { type: Object }
}, me = Object.entries(pe), g = (...e) => {
  const t = new Set(e);
  return Object.fromEntries(
    me.filter(([n]) => t.has(n))
  );
}, _ = g(
  "tween",
  "tweens",
  "timeline",
  "active",
  "visible",
  "x",
  "y",
  "rotation",
  "origin",
  "originX",
  "originY",
  "displayOriginX",
  "displayOriginY",
  "scale",
  "scaleX",
  "scaleY",
  "displayWidth",
  "displayHeight",
  "scrollFactor",
  "scrollFactorX",
  "scrollFactorY",
  "dropZone",
  "depth",
  "alpha",
  "blendMode",
  "pipeline"
), ge = X.map((e) => e.emit), fe = E.map((e) => `update:${e}`), $ = ["create", ...ge, ...fe], ye = p({
  emits: [...$],
  props: Object.fromEntries(
    Object.entries(_).filter(([e]) => !["origin", "originX", "originY", "displayOriginX", "displayOriginY"].includes(e))
  ),
  setup(e, t) {
    const n = d(a.Scene), i = new Phaser.GameObjects.Container(n, e.x || 0, e.y || 0);
    return f(i, e, t), u(a.Container, i), u(a.GameObject, i), u(a.RenderTextureRenderList, void 0), { object: i };
  }
});
function _e(e, t, n, i, r, o) {
  return y(e.$slots, "default");
}
const tt = /* @__PURE__ */ m(ye, [["render", _e]]), $e = p({
  emits: [...$],
  props: {
    ..._,
    ...g(
      "width",
      "height",
      "fillColor",
      "fillAlpha",
      "lineWidth",
      "strokeColor",
      "strokeAlpha"
    )
  },
  setup(e, t) {
    const n = d(a.Scene), i = new Phaser.GameObjects.Rectangle(n, e.x || 0, e.y || 0, e.width, e.height);
    return f(i, e, t), u(a.GameObject, i), { object: i };
  }
});
function ve(e, t, n, i, r, o) {
  return y(e.$slots, "default");
}
const it = /* @__PURE__ */ m($e, [["render", ve]]), be = p({
  emits: [...$],
  props: {
    ..._,
    ...g(
      "width",
      "height",
      "radius",
      "fillColor",
      "fillAlpha",
      "lineWidth",
      "strokeColor",
      "strokeAlpha"
    )
  },
  setup(e, t) {
    const n = d(a.Scene);
    class i extends Phaser.GameObjects.Graphics {
      constructor(s, c, h, x, b, w) {
        super(s, c, h, x, b), this._originX = 0, this._originY = 0, this._width = x || 0, this._height = b || 0, this._radius = w || 0, this._fillColor = null, this._fillAlpha = 1, this._lineWidth = 0, this._strokeColor = null, this._strokeAlpha = 1, this.setRenderFlag(!0);
      }
      preUpdate(...s) {
        this.renderFlag && this.render();
      }
      setRenderFlag(s) {
        this.renderFlag = s;
      }
      render() {
        this.setRenderFlag(!1);
        const s = this.originX * -this.width, c = this.originY * -this.height, h = typeof this.radius == "number" ? Math.min(this.radius, this.width / 2, this.height / 2) : this.radius;
        this.clear(), this.fillColor !== null && (this.fillStyle(this.fillColor, this.fillAlpha), this.fillRoundedRect(s, c, this.width, this.height, h)), this.lineWidth && this.strokeColor !== null && (this.lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha), this.strokeRoundedRect(s, c, this.width, this.height, h));
      }
      // Origin
      get originX() {
        return this._originX;
      }
      set originX(s) {
        this._originX = s, this.displayOriginX = this.width * s, this.setRenderFlag(!0);
      }
      get originY() {
        return this._originY;
      }
      set originY(s) {
        this._originY = s, this.displayOriginY = this.height * s, this.setRenderFlag(!0);
      }
      setOrigin(s, c) {
        return this.originX = s, this.originY = c === void 0 ? s : c, this;
      }
      // Radius
      get radius() {
        return this._radius;
      }
      set radius(s) {
        this._radius = s, this.setRenderFlag(!0);
      }
      setRadius(s) {
        return this.radius = s, this;
      }
      // Size
      get width() {
        return this._width;
      }
      set width(s) {
        this._width = s, this.fixSize(), this.setRenderFlag(!0);
      }
      get height() {
        return this._height;
      }
      set height(s) {
        this._height = s, this.fixSize(), this.setRenderFlag(!0);
      }
      setSize(s, c) {
        return s !== void 0 && (this.width = s), c !== void 0 && (this.height = c), this;
      }
      fixSize() {
        this.input && this.input.hitArea.setSize(this.width, this.height), this.body && this.body.setSize(this.width, this.height);
      }
      get displayWidth() {
        return Math.abs(this.scaleX * this.width);
      }
      set displayWidth(s) {
        this.scaleX = s / this.width;
      }
      get displayHeight() {
        return Math.abs(this.scaleY * this.height);
      }
      set displayHeight(s) {
        this.scaleY = s / this.height;
      }
      // Fill
      get fillColor() {
        return this._fillColor;
      }
      set fillColor(s) {
        this._fillColor = s, this.setRenderFlag(!0);
      }
      get fillAlpha() {
        return this._fillAlpha;
      }
      set fillAlpha(s) {
        this._fillAlpha = s, this.setRenderFlag(!0);
      }
      setFillStyle(s, c) {
        return s !== void 0 && (this.fillColor = s), c !== void 0 && (this.fillAlpha = c), this;
      }
      // Stroke
      get lineWidth() {
        return this._lineWidth;
      }
      set lineWidth(s) {
        this._lineWidth = s, this.setRenderFlag(!0);
      }
      get strokeColor() {
        return this._strokeColor;
      }
      set strokeColor(s) {
        this._strokeColor = s, this.setRenderFlag(!0);
      }
      get strokeAlpha() {
        return this._strokeAlpha;
      }
      set strokeAlpha(s) {
        this._strokeAlpha = s, this.setRenderFlag(!0);
      }
      setStrokeStyle(s, c, h) {
        return s !== void 0 && (this.lineWidth = s), c !== void 0 && (this.strokeColor = c), h !== void 0 && (this.strokeAlpha = h), this;
      }
    }
    const r = new i(n, e.x || 0, e.y || 0, e.width, e.height, e.radius);
    return f(r, e, t), u(a.GameObject, r), { object: r };
  }
});
function xe(e, t, n, i, r, o) {
  return y(e.$slots, "default");
}
const nt = /* @__PURE__ */ m(be, [["render", xe]]), we = p({
  emits: [...$],
  props: {
    ..._,
    ...g(
      "x1",
      "y1",
      "x2",
      "y2",
      "x3",
      "y3",
      "fillColor",
      "fillAlpha",
      "lineWidth",
      "strokeColor",
      "strokeAlpha"
    )
  },
  setup(e, t) {
    const n = d(a.Scene), i = new Phaser.GameObjects.Triangle(n, e.x || 0, e.y || 0, e.x1, e.y1, e.x2, e.y2, e.x3, e.y3);
    return f(i, e, t), u(a.GameObject, i), { object: i };
  }
});
function Se(e, t, n, i, r, o) {
  return y(e.$slots, "default");
}
const st = /* @__PURE__ */ m(we, [["render", Se]]), Oe = p({
  emits: [...$],
  props: {
    ..._,
    ...g(
      "radius",
      "fillColor",
      "fillAlpha",
      "lineWidth",
      "strokeColor",
      "strokeAlpha"
    )
  },
  setup(e, t) {
    const n = d(a.Scene), i = new Phaser.GameObjects.Arc(n, e.x || 0, e.y || 0, e.radius);
    return f(i, e, t), u(a.GameObject, i), { object: i };
  }
});
function Pe(e, t, n, i, r, o) {
  return y(e.$slots, "default");
}
const rt = /* @__PURE__ */ m(Oe, [["render", Pe]]), Ne = p({
  emits: [...$],
  props: {
    ..._,
    ...g(
      "points",
      "fillColor",
      "fillAlpha",
      "lineWidth",
      "strokeColor",
      "strokeAlpha",
      "points"
    )
  },
  setup(e, t) {
    const n = d(a.Scene), i = new Phaser.GameObjects.Polygon(n, e.x || 0, e.y || 0, e.points);
    return f(i, e, t), u(a.GameObject, i), { object: i };
  }
});
function Ye(e, t, n, i, r, o) {
  return y(e.$slots, "default");
}
const at = /* @__PURE__ */ m(Ne, [["render", Ye]]), Xe = p({
  emits: [...$],
  props: {
    ..._,
    ...g(
      "x1",
      "y1",
      "x2",
      "y2",
      "lineWidth",
      "strokeColor",
      "strokeAlpha"
    )
  },
  setup(e, t) {
    const n = d(a.Scene), i = new Phaser.GameObjects.Line(n, e.x || 0, e.y || 0, e.x1, e.y1, e.x2, e.y2);
    return f(i, e, t), u(a.GameObject, i), { object: i };
  }
});
function Ce(e, t, n, i, r, o) {
  return y(e.$slots, "default");
}
const ot = /* @__PURE__ */ m(Xe, [["render", Ce]]), Ae = p({
  emits: [...$],
  props: {
    ..._,
    ...g(
      "texture",
      "frame",
      "tint",
      "flipX",
      "flipY"
    )
  },
  setup(e, t) {
    const n = d(a.Scene), i = new Phaser.GameObjects.Image(n, e.x || 0, e.y || 0, e.texture);
    return f(i, e, t), u(a.GameObject, i), { object: i };
  }
});
function Re(e, t, n, i, r, o) {
  return y(e.$slots, "default");
}
const lt = /* @__PURE__ */ m(Ae, [["render", Re]]), We = p({
  emits: [...$],
  props: {
    ..._,
    ...g(
      "width",
      "height",
      "leftWidth",
      "rightWidth",
      "topHeight",
      "bottomHeight",
      "texture",
      "frame",
      "tint"
    )
  },
  setup(e, t) {
    const n = d(a.Scene), i = new Phaser.GameObjects.NineSlice(n, e.x || 0, e.y || 0, e.texture, e.frame, e.width, e.height, e.leftWidth, e.rightWidth, e.topHeight, e.bottomHeight);
    return f(i, e, t), u(a.GameObject, i), { object: i };
  }
});
function ke(e, t, n, i, r, o) {
  return y(e.$slots, "default");
}
const ct = /* @__PURE__ */ m(We, [["render", ke]]), W = [
  { attr: "onAnimationstart", emit: "animationstart" },
  { attr: "onAnimationupdate", emit: "animationupdate" },
  { attr: "onAnimationrepeat", emit: "animationrepeat" },
  { attr: "onAnimationcomplete", emit: "animationcomplete" },
  { attr: "onAnimationstop", emit: "animationstop" },
  { attr: "onAnimationrestart", emit: "animationrestart" }
], Ge = p({
  emits: [
    ...$,
    ...W.map((e) => e.emit)
  ],
  props: {
    ..._,
    ...g(
      "texture",
      "frame",
      "tint",
      "flipX",
      "flipY"
    ),
    play: { type: [String, Object] }
  },
  setup(e, t) {
    const n = d(a.Scene), i = new Phaser.GameObjects.Sprite(n, e.x || 0, e.y || 0, e.texture), o = F().vnode.props || [];
    return W.filter((s) => s.attr in o).forEach((s) => {
      i.on(s.emit, (...c) => {
        t.emit(s.emit, ...c);
      });
    }), f(i, e, t), u(a.GameObject, i), { object: i };
  }
});
function Fe(e, t, n, i, r, o) {
  return y(e.$slots, "default");
}
const dt = /* @__PURE__ */ m(Ge, [["render", Fe]]), Ee = p({
  emits: [...$],
  props: {
    ..._,
    ...g(
      "text",
      "style",
      "lineSpacing",
      "padding"
    )
  },
  setup(e, t) {
    const n = d(a.Scene), i = new Phaser.GameObjects.Text(n, e.x || 0, e.y || 0, e.text);
    return f(i, e, t), { object: i };
  }
});
function Ie(e, t, n, i, r, o) {
  return y(e.$slots, "default");
}
const ht = /* @__PURE__ */ m(Ee, [["render", Ie]]), Te = p({
  emits: ["create"],
  props: {
    ..._,
    ...g("width", "height", "collision", "collisionByProperty"),
    tilemap: { type: Object },
    layerIndex: { type: Number },
    tileset: { type: [Array, String] },
    cullPadding: { type: Number },
    cullPaddingX: { type: Number },
    cullPaddingY: { type: Number }
  },
  setup(e, t) {
    const n = d(a.Scene), i = new Phaser.Tilemaps.TilemapLayer(n, e.tilemap, e.layerIndex, e.tileset, e.x || 0, e.y || 0);
    return f(i, e, t), { object: i };
  }
});
function Be(e, t, n, i, r, o) {
  return y(e.$slots, "default");
}
const ut = /* @__PURE__ */ m(Te, [["render", Be]]), De = p({
  emits: [...$],
  props: {
    ...Object.fromEntries(
      Object.entries(_).filter(([e]) => !["alpha", "blendMode", "pipeline"].includes(e))
    ),
    ...g("width", "height")
  },
  setup(e, t) {
    const n = d(a.Scene), i = new Phaser.GameObjects.Zone(n, e.x || 0, e.y || 0, e.width, e.height);
    return f(i, e, t), { object: i };
  }
});
function Le(e, t, n, i, r, o) {
  return null;
}
const pt = /* @__PURE__ */ m(De, [["render", Le]]), He = p({
  emits: ["create"],
  props: {
    ...g(
      "tween",
      "tweens",
      "timeline",
      "visible",
      "x",
      "y",
      "radius",
      "color",
      "intensity"
    )
  },
  setup(e, t) {
    const n = new Phaser.GameObjects.Light(e.x || 0, e.y || 0);
    return f(n, e, t), { object: n };
  }
});
function Me(e, t, n, i, r, o) {
  return null;
}
const mt = /* @__PURE__ */ m(He, [["render", Me]]), Ue = p({
  emits: ["create"],
  props: {
    ...g(
      "width",
      "height",
      "offsetX",
      "offsetY",
      "enable"
    )
  },
  setup(e, t) {
    const n = d(a.Scene);
    if (!n.physics)
      throw Error("Physics is not available. Add physics setting to your game config. e.g. `physics: { default: 'arcade' }`");
    const i = d(a.GameObject), r = n.physics.add.existing(i, Phaser.Physics.Arcade.STATIC_BODY).body;
    f(r, e, t);
  }
});
function Ve(e, t, n, i, r, o) {
  return null;
}
const gt = /* @__PURE__ */ m(Ue, [["render", Ve]]), ze = p({
  emits: ["create"],
  props: {
    ...g(
      "width",
      "height",
      "offsetX",
      "offsetY",
      "enable",
      "immovable",
      "moves",
      "bounceX",
      "bounceY",
      "drag",
      "dragX",
      "dragY",
      "gravityX",
      "gravityY",
      "frictionX",
      "frictionY",
      "velocityX",
      "velocityY",
      "maxVelocityX",
      "maxVelocityY",
      "accelerationX",
      "accelerationY",
      "collideWorldBounds"
    )
  },
  setup(e, t) {
    const n = d(a.Scene);
    if (!n.physics)
      throw Error("Physics is not available. Add physics setting to your game config. e.g. `physics: { default: 'arcade' }`");
    const i = d(a.GameObject), r = n.physics.add.existing(i, Phaser.Physics.Arcade.DYNAMIC_BODY).body;
    f(r, e, t);
  }
});
function Ze(e, t, n, i, r, o) {
  return null;
}
const ft = /* @__PURE__ */ m(ze, [["render", Ze]]), qe = p({
  emits: [...$],
  props: {
    ..._,
    ...g(
      "width",
      "height"
    )
  },
  setup(e, t) {
    const n = d(a.Scene), i = new Phaser.GameObjects.RenderTexture(n, e.x || 0, e.y || 0, e.width, e.height);
    f(i, e, t);
    const r = [];
    u(a.RenderTextureRenderList, r), u(a.GameObject, i);
    const o = () => {
      i.beginDraw(), r.forEach((s) => i.batchDraw(s)), i.endDraw();
    };
    return k(() => {
      o();
    }), M(() => {
      i.clear(), o();
    }), { object: i };
  }
});
function Je(e, t, n, i, r, o) {
  return y(e.$slots, "default");
}
const yt = /* @__PURE__ */ m(qe, [["render", Je]]), _t = () => {
  console.error("Phavuer::createPhavuerApp() has been removed. Please use `<Game>` component instead. See: https://github.com/laineus/phavuer");
}, Ke = (e) => e.replace(/-./g, (t) => t[1].toUpperCase()), f = (e, t, n) => {
  const i = F(), r = "bounce" in e, o = e.constructor === Phaser.GameObjects.Light, s = d(a.Scene), c = d(a.RenderTextureRenderList);
  if (o)
    s.lights.active || s.lights.enable(), s.lights.lights.push(e);
  else if (!r)
    if (c)
      c.push(e), O(() => {
        const l = c.findIndex((v) => v === e);
        c.splice(l, 1);
      });
    else {
      s.add.existing(e);
      const l = d(a.Container);
      if (l) {
        const v = l.list.findIndex((P) => P.depth > (t.depth ?? 0));
        v === -1 ? l.add(e) : l.addAt(e, v);
      }
    }
  const h = Object.fromEntries(
    Object.entries(i.vnode.props ?? {}).map(([l, v]) => [Ke(l), v])
  ), x = Object.keys(h).filter((l) => l.startsWith("onUpdate:")).map((l) => l.split(":")[1]).filter((l) => E.includes(l)), w = Object.entries(h).filter(([l]) => R[l]).map(([l, v]) => {
    const P = R[l](e, x.includes(l) ? n.emit : void 0);
    return P(v), U(() => t[l], P, { deep: z.includes(l) });
  }).filter(Boolean);
  h.onCreate && n.emit("create", e);
  const S = X.filter((l) => l.attr in h);
  return S.length && (e.input || e.setInteractive(), S.some((l) => l.drag) && s.input.setDraggable(e), S.forEach((l) => {
    e.on(l.emit, (...v) => {
      "eventIndex" in l && (v[0].stopPropagation = v[l.eventIndex].stopPropagation), n.emit(l.emit, ...v);
    });
  })), O(() => {
    e.tween && e.tween.stop(), w.forEach((l) => l());
  }), o ? O(() => s.lights.removeLight(e)) : O(() => e.destroy()), e;
}, a = {
  Game: "phavuer_game",
  Scene: "phavuer_scene",
  GameObject: "phavuer_gameObject",
  Container: "phavuer_container",
  RenderTextureRenderList: "phavuer_renderTextureRenderList",
  PreUpdateEvents: "phavuer_preUpdateEvents",
  PostUpdateEvents: "phavuer_postUpdateEvents"
}, I = (e) => () => {
  const t = d(e);
  if (!t)
    throw new Error(`${e} is not provided`);
  return t;
}, $t = I(a.Game), vt = I(a.Scene), T = (e, t) => V((n, i) => ({
  get() {
    return n(), e;
  },
  set(r) {
    e && r || (e = r ? r[t] : null, i());
  }
})), bt = (e) => T(e, "object"), xt = (e) => T(e, "scene"), B = (e) => (t) => {
  const n = d(e);
  n.push(t), O(() => {
    const i = n.findIndex((r) => r === t);
    n.splice(i, 1);
  });
}, wt = B(a.PreUpdateEvents), St = B(a.PostUpdateEvents);
export {
  ft as Body,
  rt as Circle,
  tt as Container,
  je as Game,
  lt as Image,
  a as InjectionKeys,
  mt as Light,
  ot as Line,
  ct as NineSlice,
  at as Polygon,
  it as Rectangle,
  yt as RenderTexture,
  nt as RoundRectangle,
  et as Scene,
  dt as Sprite,
  gt as StaticBody,
  ht as Text,
  ut as TilemapLayer,
  st as Triangle,
  pt as Zone,
  _t as createPhavuerApp,
  f as initGameObject,
  St as onPostUpdate,
  wt as onPreUpdate,
  bt as refObj,
  xt as refScene,
  T as refTo,
  $t as useGame,
  vt as useScene
};
//# sourceMappingURL=phavuer.es.js.map
