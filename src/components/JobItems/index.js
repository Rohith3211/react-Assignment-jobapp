/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */

import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import './index.css'

const JobItems = props => {
  const {details} = props
  const {
    companyLogoUrl,
    id,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  return (
    <li className="job-details-card">
      <Link className="link" to={`/jobs/${id}`}>
        <div className="j-card1">
          <img className="job-icon" src={companyLogoUrl} alt="company logo" />

          <div>
            <h1 className="div-h1">{title}</h1>
            <div className="side-card">
              <AiFillStar className="star" /> <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="big-card2">
          <div className="card2">
            <div className="i-card">
              <MdLocationOn /> <p>{location}</p>
            </div>
            <div className="i-card">
              <MdWork /> <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>

        <hr className="hor-line" />
        <div className="low-card">
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItems
