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

export function saveUserToLocalStorage(user) {
    window.localStorage.setItem('user', JSON.stringify(user))
}

export function getUserFromLocalStorage(user) {
    try {
        console.log(user)
        return JSON.parse(window.localStorage.getItem('user'))
    } catch (error) {
        return null
    }
}

// export function removeUserFromLocalStorage(user) {
//     window.localStorage.removeItem('user')
// }
