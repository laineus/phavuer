import { GAME_OBJECT_EVENTS, vModelPropsBody, vModelPropsGameObject } from './setters.js'

const emits = GAME_OBJECT_EVENTS.map(v => v.emit)
const vModelEmits = vModelPropsGameObject.map(key => `update:${key}`)
export const gameObjectEmits = ['create', ...emits, ...vModelEmits]

const vModelEmitsBody = vModelPropsBody.map(key => `update:${key}`)
export const bodyEmits = ['create', ...vModelEmitsBody]
