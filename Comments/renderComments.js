import {
    likeComment,
    answerCommentListener,
    editComment,
    clickDelete,
} from './additional.js'
import { commentInput } from './const.js'
import { appElement, addForm } from './const.js'
import { token, commentPost } from './API.js'
import { renderLogin } from './renderLogin.js'
import { getCommentation, user } from './main.js'

export function renderComments({ comments, isLoading }) {
    // let commentSection = document.querySelector('.comments')

    const commentsHtml = comments
        .map((comment, index) => {
            return `<li class="comment" id="comment" data-index="${index}">
  <div class="comment-header">
    <div>${comment.name}</div>
    <div>${comment.date}</div>
  </div>
  <div class="comment-body" data-index="${index}">
    ${
        comment.isEdited
            ? `<textarea id="textarea-${index}">${comment.text}</textarea>`
            : `<div class="comment-text">${comment.text}</div>`
    }
  </div>
  <div class="comment-footer">
    <button class="edit-button">${
        comment.isEdited ? 'Сохранить' : 'Редактировать'
    }</button>
    <div class="likes">
      <span class="likes-counter">${comment.likesCount}</span>
      <button class="like-button ${comment.isLiked ? '-active-like' : ''} ${
          comment.isLikeLoading ? '-loading-like' : ''
      }"></button>
    </div>
  </div>
</li>`
        })
        .join('')

    // если юзер авторизован нужно менять поле с авторизацией на поле с комментариями
    const appHtml = `<div class="container">
    ${
        isLoading
            ? `<div class="mask">
        <p class="loader">Пожалуйста подождите, комментарии загружаются...</p>
        <div class="comments-loading"></div>
      </div>`
            : `<ul id="comments" class="comments">
        ${commentsHtml}
      </ul>`
    }
    ${
        token
            ? `<div class="add-form">
    <input type="text" class="add-form-name" placeholder="${user.name}" readonly/>
    <textarea type="textarea" class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
    <div class="add-form-row">
      <button class="add-form-button">Написать</button>
    </div>
  </div>
  <button class="delete-form-button">Удалить последний комментарий</button> 
  </div>`
            : `<p>Чтобы добавить комментарий, <a id="link-to-login" href="#"> авторизуйтесь</a></p>`
    }  
  `

    appElement.innerHTML = appHtml

    // addLoader.style.display = 'block';
    // document.body.style.overflow = 'hidden';

    likeComment(comments)
    answerCommentListener(comments)
    editComment(comments)
    clickDelete(comments)

    const linkToLoginElement = document.getElementById('link-to-login')
    let addButton = document.querySelector('.add-form-button')
    linkToLoginElement?.addEventListener('click', () => {
        // null или undef. обработчик события не сработает
        renderLogin()
    })
    if (user) {
        if (addButton) {
            //  commentInput.addEventListener('input')

            addButton.addEventListener('click', pullComment)

            addButton.addEventListener('keyup', function (event) {
                if (event.which === 13) {
                    pullComment()
                }
            })
            return
        }
    }

    function pullComment(event) {
        let commentInput = document.querySelector('.add-form-text')
        if (commentInput.value === '') {
            commentInput.classList.add('error')
            return
        }

        addButton.disabled = true
        addButton.textContent = 'Комментарий добавляется...'

        event.stopPropagation()
        commentPost(commentInput)
            .then(() => {
                return [commentInput.value]
            })
            .then(() => {
                addButton.disabled = false
                addButton.textContent = 'Написать'
                commentInput.value = ''
                getCommentation()
            })
            .then(() => {})
            .catch(() => {
                handleCommentError()
            })
            .finally(() => {
                addButton.disabled = false
                addButton.textContent = 'Написать'
            })
    }

    function handleCommentError(error) {
        console.warn(error)
        if (error.message === 'Сервер сломался') {
            alert('Сервер сломался, попробуй перезагрузить страницу позже')
            addForm.style.display = 'none'
            addButton.disabled = true
            return
        } else if (error.message === 'Плохой запрос') {
            alert('В поле должны содержаться хотя бы 3 символа')
            commentInput.classList.add('error')
            setTimeout(() => {
                commentInput.classList.remove('error')
            }, 2000)
            return
        }
        alert('Кажется, у вас сломался интернет, попробуйте позже')
    }
}
