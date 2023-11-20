const userURL = 'https://wedev-api.sky.pro/api/user/login'
const commentsURL = 'https://wedev-api.sky.pro/api/v2/sveta-kosuhina/comments'

export let token

export const setToken = (newToken) => {
    token = newToken
}

import { sanitizeHtml } from './utils.js'

export function getComments() {
    return fetch(commentsURL, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.status === 500) {
            alert('Кажется, сервер сломался...')
        }
        return response.json()
    })
}

export function commentPost(nameInput) {
    return fetch(commentsURL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            // name: sanitizeHtml(nameInput.value),
            text: sanitizeHtml(nameInput.value),
        }),
    }).then((response) => {
        if (response.status === 400) {
            alert('Попробуйте снова')
        } else if (response.status === 500) {
            alert('Кажется, сервер сломался...')
        }
        if (response.status === 201) {
            return response.json()
        }
    })
}
export function login({ login, password }) {
    return fetch(userURL, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((responseData) => {
        console.log(responseData)
        if (responseData.status === 401) {
            alert('Пройдите авторизацию!')
        } else if (responseData.status === 400) {
            alert('Неправильный логин или пароль')
        }
        if (responseData.status === 201) {
            return responseData.json()
        }
    })
}
export function deletePost(id) {
    return fetch(commentsURL + `/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((responseData) => {
        console.log(id)
        if (responseData.status === 201) {
            return responseData.json()
        } else {
            alert('Невозможно удалить комментарий')
        }
    })
}
