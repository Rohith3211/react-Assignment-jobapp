/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-card">
        <h1>
          Find The Job That <br /> Fits Your Life
        </h1>
        <p>
          Millions of people are searching for jobs, salary <br />
          information, company reviews. Find the job that fits <br /> your
          abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="nav-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
