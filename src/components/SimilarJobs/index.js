/* eslint-disable jsx-a11y/alt-text */
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import './index.css'

// eslint-disable-next-line arrow-body-style
const SimilarJobs = props => {
  const {info} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = info
  return (
    <li className="s-card">
      <div className="j-card1">
        <img
          className="job-icon"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <h1 className="div-h1">{title}</h1>
          <div className="side-card">
            <AiFillStar className="star" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div className="s-dis">
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
      <div className="card2">
        <div className="i-card">
          <MdLocationOn />
          <p>{location}</p>
        </div>
        <div className="i-card">
          <MdWork />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
