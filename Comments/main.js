import { getComments } from './API.js'
import { renderComments } from './renderComments.js'
import { renderLogin } from './renderLogin.js'
export let comments = []

export let isLoading = true
export let user

export const setUser = (newUser) => {
    user = newUser
}

export const getCommentation = () => {
    getComments()
        .then((responseData) => {
            comments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date)
                        .toLocaleString('ru-RU', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        })
                        .replace(',', ''),
                    text: comment.text,
                    likesCount: comment.likes,
                    isLiked: false,
                    isEdited: false,
                    isLikeLoading: false,
                }
            })
            return comments
        })
        .then(() => {
            isLoading = false
            renderComments({ comments, isLoading })
        })
        .catch((error) => {
            console.warn(error)
            if (error.message === 'Сервер сломался') {
                alert('Сервер сломался, попробуй позже')
                return
            }
        })
}

getCommentation()
renderLogin()

// обработчик события на кнопку зарегистрироваться
// addLoader.style.display = 'block';
// document.body.style.overflow = 'hidden';
// addLoader.style.display = 'none';
// document.body.style.overflow = 'visible';
console.log('It works!')
