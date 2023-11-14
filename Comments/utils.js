import { addButton } from './const.js'
import { renderComments } from './renderComments.js'
import { comments } from './main.js'
// ФУНКЦИЯ ЗАМЕНЫ СИМВОЛОВ

export const sanitizeHtml = (htmlString) => {
    return htmlString
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll('QUOTE_BEGIN', "<div class='quote'>")
        .replaceAll('QUOTE_END', '</div>')
}

export function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}
