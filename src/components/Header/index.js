/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const clickToLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="nav-card">
      <Link to="/">
        <img
          className="nav-img"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <ul className="nav-list">
        <li className="l-item">
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li className="l-item">
          <Link className="link" to="/jobs">
            Jobs
          </Link>
        </li>
        <li> </li>
      </ul>
      <button onClick={clickToLogOut} className="nav-btn">
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
