import { delay } from './utils.js'
import { renderComments } from './renderComments.js'
import { commentInput } from './const.js'
import { deletePost } from './API.js'
import { user } from './main.js'

// ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ ЛАЙКА

export const likeComment = (comments) => {
    const likeButtons = document.querySelectorAll('.like-button') // находим кнопки лайков
    likeButtons.forEach((likeButton, index) => {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation() // Чтобы не срабатывали одновременно другие функции

            const comment = comments[index]

            comment.isLikeLoading = true // устанавливаем флаг загрузки
            renderComments({ comments })
            delay(2000).then(() => {
                // имитируем задержку загрузки
                if (comment.isLikeLoading) {
                    comment.isLiked = !comment.isLiked // меняем флаг лайка
                    comment.likesCount = comment.isLiked
                        ? comment.likesCount + 1
                        : comment.likesCount - 1 // изменяем количество лайков
                }
                comment.isLikeLoading = false // снимаем флаг загрузки
                renderComments({ comments }) // перерисовываем комментарии
            })
        })
    })
}

// ФУНКЦИЯ ОТВЕТА НА КОММЕНТАРИЙ И ЕЕ ВЫЗОВ
export const answerCommentListener = (comments) => {
    const commentsElement = document.querySelectorAll('.comment')

    for (const commentElement of commentsElement) {
        commentElement.addEventListener('click', () => {
            const index = commentElement.dataset.index

            if (comments[index].isEdited) return

            let commentText = document.querySelector('.comment-text')
            commentText.value = `QUOTE_BEGIN ${comments[index].name}: \n ${comments[index].text} QUOTE_END`
            commentText.value = commentInput.innerHTML
            renderComments({ comments })
        })
    }
}

// ФУНКЦИЯ РЕДАКТИРОВАНИЯ КОММЕНТАРИЯ

export const editComment = (comments) => {
    const editButtonList = document.querySelectorAll('.edit-button')

    editButtonList.forEach((editButton, index) => {
        editButton.addEventListener('click', (event) => {
            event.stopPropagation()

            const comment = comments[index]
            if (comment.isEdited) {
                const newText = document.getElementById(
                    `textarea-${index}`,
                ).value
                comment.text = newText
                comment.isEdited = false
            } else {
                comment.isEdited = true
            }

            renderComments({ comments })
        })
    })
}

// УДАЛЕНИЕ ПОСЛЕДНЕГО КОММЕНТАРИЯ И ОБРАБОТЧИК СОБЫТИЯ

export const clickDelete = (comments) => {
    const deleteButton = document.querySelector('.delete-form-button')
    console.log(deleteButton)
    if (user) {
        deleteButton.addEventListener('click', () => {
            const id = deleteButton.dataset.id
            deletePost(id).then(() => {
                const lastCommentIndex = comments.length - 1
                comments.splice(lastCommentIndex, 1)

                renderComments({ comments })
            })
        })
    }
}
