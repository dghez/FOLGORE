// import Emitter from 'tiny-emitter'
import Emitter from './Emitter'

const emitter = new Emitter()

const EVENTS = {
    // WEBGL
    // 'WEBGL_BEFORE_RENDER': 'WEBGL:BEFORE:RENDER',
    // 'WEBGL_AFTER_RENDER': 'WEBGL:AFTER:RENDER',
    // 'WEBGL_APP_LOADING': 'WEBGL:APP:LOADING',
    // 'WEBGL_APP_LOADED': 'WEBGL:APP:LOADED',
    // 'WEBGL_APP_READY': 'WEBGL:APP:READY',

    // APP
    'APP_TICK': 'APP:TICK',
    'APP_RESIZE': 'APP:RESIZE',
    'APP_SCROLL': 'APP:SCROLL',

    // PAGE TRANSITIONS
    'PAGE_TRANSITION_ENTER_START': 'APP:PAGE:ENTER:START',
    'PAGE_TRANSITION_ENTER_END': 'APP:PAGE:ENTER:END',
    'PAGE_TRANSITION_LEAVE_START': 'APP:PAGE:LEAVE:START',
    'PAGE_TRANSITION_LEAVE_END': 'APP:PAGE:LEAVE:END'

    // GESTURES
    // 'APP_MOUSE_MOVE': 'MOUSE:MOVE',
    // 'APP_MOUSE_DRAG': 'MOUSE:DRAG',
}

const PRIORITY = {
    first: -10,
    instant: 0,
    high: 10,
    mid: 20,
    low: 30
}

export { EVENTS, PRIORITY }
export default emitter

