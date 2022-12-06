import { GAME_OBJECT_EVENTS } from './setters.js'
const emits = GAME_OBJECT_EVENTS.map(v => v.emit)
export const gameObjectEmits = ['create', ...emits, 'update:x', 'update:y']
