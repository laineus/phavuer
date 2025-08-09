import { GAME_OBJECT_EVENTS, vModelProps } from './setters.js'

const emits = GAME_OBJECT_EVENTS.map(v => v.emit)
const vModelEmits = vModelProps.map(key => `update:${key}`)
export const gameObjectEmits = ['create', ...emits, ...vModelEmits]
