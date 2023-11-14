const userURL = 'https://wedev-api.sky.pro/api/user/login'
const commentsURL = 'https://wedev-api.sky.pro/api/v1/sveta-kosuhina/comments'

export let token

export const setToken = (newToken) => {
    token = newToken
}

import { sanitizeHtml } from './utils.js'
import { nameInput, commentInput } from './const.js'

export function getComments() {
    return fetch(commentsURL, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.status === 500) {
            throw new Error('Сервер сломался')
        }
        return response.json()
    })
}

export function commentPost() {
    return fetch(commentsURL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: sanitizeHtml(nameInput.value),
            text: sanitizeHtml(commentInput.value),
            forceError: false,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Плохой запрос')
        } else if (response.status === 500) {
            throw new Error('Сервер сломался')
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
            throw new Error('Нет авторизации')
        } else if (responseData.status === 400) {
            throw new Error('Неправильный логин или пароль')
        }
        if (responseData.status === 201) {
            return responseData.json()
        }
    })
}
