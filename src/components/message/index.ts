import { h, render } from "vue"
import XtxMessage from './index.vue'

export type MessageParams = {
    type: 'success' | 'error' | 'warning'
    text: string,
    duration?: number
}

const xtxMessageContainer = document.createElement('div')
xtxMessageContainer.className = 'xtx-msg-container'
document.body.appendChild(xtxMessageContainer)

export default function Message ({type, text, duration = 1500}: MessageParams) {
    const vNode = h(XtxMessage, {type, text})
    render(vNode, xtxMessageContainer)
    setTimeout(() => {
        render(null, xtxMessageContainer)
    }, duration)
}