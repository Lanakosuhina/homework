import { getComments } from './API.js'
import { renderComments } from './renderComments.js'
import { renderLogin } from './renderLogin.js'
import { format } from 'date-fns'
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
                    date: format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss'),
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
