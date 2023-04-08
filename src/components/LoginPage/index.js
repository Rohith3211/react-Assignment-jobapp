/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', msg: '', show: false}

  toChangeNameValue = event => {
    this.setState({username: event.target.value})
  }

  toChangePassValue = event => {
    this.setState({password: event.target.value})
  }

  successFully = jwt => {
    Cookies.set('jwt_token', jwt, {expires: 30})
    const {history} = this.props

    history.replace('/')
  }

  unAuthenticatedUser = error => {
    this.setState({msg: error, show: true})
  }

  onClickToLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.successFully(data.jwt_token)
    } else {
      this.unAuthenticatedUser(data.error_msg)
    }
  }

  render() {
    const {username, password, show, msg} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="log-card">
        <div className="l-card">
          <img
            className="log-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />

          <form className="form" onSubmit={this.onClickToLogin}>
            <label className="label-text" htmlFor="username">
              USERNAME
            </label>
            <input
              onChange={this.toChangeNameValue}
              className="input"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
            />

            <label className="label-text" htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.toChangePassValue}
              className="input"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
            />

            <button type="submit" className="log-btn">
              Login
            </button>
            {show ? <p className="e-msg">{msg}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
