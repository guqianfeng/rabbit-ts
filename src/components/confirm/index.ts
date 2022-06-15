import { h, render } from 'vue'
import XtxConfirm from './confirm.vue'

const divContainer = document.createElement('div')
divContainer.className = 'xtx-confirm-container'
document.body.appendChild(divContainer)

export default function Confirm({title, text}: {title: string, text: string}) {
    return new Promise((resolve, reject) => {
        const cancelCallback = () => {
            // console.log('cancel')
            reject('reject')
            render(null, divContainer)
        }
        const confirmCallback =  () => {
            // console.log('confirm')
            resolve('resolve')
            render(null, divContainer)
        }
        const vNode = h(XtxConfirm, {title, text, cancelCallback, confirmCallback})
        render(vNode, divContainer)
    })
}