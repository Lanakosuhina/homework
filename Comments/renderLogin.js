import { appElement } from './const.js'
import { login, setToken } from './API.js'
import { getCommentation, setUser } from './main.js'

export const renderLogin = () => {
    const loginHtml = `
  <div class="container">
  <div class="login-form">
      <p class="login-text">Форма входа</p>
      <form id="login-password" action="#" autocomplete="on">
          <input type="text" class="input" id="login-input" placeholder="Введите ваш логин" />
          <input type="password" class="input" id="password-input" placeholder="Введите ваш пароль" />
          <button id="login-button" class="login-button">Войти</button>
          <a href="#" class="register">Зарегистрироваться</a>
</form>
  </div>
</div>
     `

    appElement.innerHTML = loginHtml

    const buttonElement = document.getElementById('login-button')
    const loginInputElement = document.getElementById('login-input')
    const passwordInputElement = document.getElementById('password-input')

    buttonElement.addEventListener('click', (e) => {
        e.preventDefault()
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
            .then((responseData) => {
                setToken(responseData.user.token)
                setUser(responseData.user)
            })
            .then(() => {
                getCommentation()
            })
    })
}
