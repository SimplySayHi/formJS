
import { mergeObjects } from './mergeObjects'

export const dispatchCustomEvent = ( $el, eventName, eventOptions ) => {
    const eventOptionsNew = mergeObjects({}, { bubbles: true }, eventOptions)
    const eventObj = new CustomEvent(eventName, eventOptionsNew)
    $el.dispatchEvent( eventObj )
}
