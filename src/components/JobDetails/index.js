/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/alt-text */
import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {HiArrowRight} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'
import SkillsCard from '../SkillsCard'
import './index.css'

const statusType = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class JobDetails extends Component {
  state = {
    details: '',
    skills: [],
    companyLife: '',
    similarJobs: [],
    status: statusType.initial,
  }

  componentDidMount() {
    this.getTheDetailsOf()
  }

  getTheDetailsOf = async () => {
    const {match} = this.props

    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const details = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
      }

      const companyLife = {
        description: details.lifeAtCompany.description,
        imageUrl: details.lifeAtCompany.image_url,
      }

      const skills = details.skills.map(eachList => ({
        name: eachList.name,
        imageUrl: eachList.image_url,
      }))

      const similarJobs = data.similar_jobs.map(each => ({
        id: each.id,
        location: each.location,
        rating: each.rating,
        title: each.title,
        jobDescription: each.job_description,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
      }))

      this.setState({
        details,
        skills,
        companyLife,
        similarJobs,
        status: statusType.success,
      })
    } else {
      this.setState({status: statusType.fail})
    }
  }

  onClickToCallAllApis = () => {
    this.getTheDetailsOf()
  }

  loadingIsInProgress = () => (
    <div className="f-cards">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  successResponse = () => {
    const {details, skills, companyLife, similarJobs} = this.state
    return (
      <div className="d-card">
        <div className="d-details">
          <div className="j-card1">
            <img
              className="job-icon"
              src={details.companyLogoUrl}
              alt="job details company logo"
            />

            <div>
              <h1 className="div-h1">{details.title}</h1>
              <div className="side-card">
                <AiFillStar className="star" />
                <p>{details.rating}</p>
              </div>
            </div>
          </div>

          <div className="big-card2">
            <div className="card2">
              <div className="i-card">
                <MdLocationOn />
                <p>{details.location}</p>
              </div>
              <div className="i-card">
                <MdWork />
                <p>{details.employmentType}</p>
              </div>
            </div>
            <p>{details.packagePerAnnum}</p>
          </div>
          <hr />
          <div className="dis-card">
            <h1>Description</h1>
            <a
              className="anchor"
              href={details.companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit <HiArrowRight />
            </a>
          </div>

          <p>{details.jobDescription}</p>

          <h1 className="h1">skills</h1>
          <ul className="skills-card">
            {skills.map(eachList => (
              <SkillsCard key={eachList.name} information={eachList} />
            ))}
          </ul>
          <h1 className="h1">Life at Company</h1>
          <div className="life-card">
            <p>{companyLife.description}</p>
            <img src={companyLife.imageUrl} alt="life at company" />
          </div>
        </div>
        <h1 className="similar-h">Similar Jobs</h1>
        <ul className="s-card-list">
          {similarJobs.map(eachJob => (
            <SimilarJobs key={eachJob.id} info={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  failureResponse = () => (
    <div className="f-cards">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="btn-r" onClick={this.onClickToCallAllApis}>
        Retry
      </button>
    </div>
  )

  runningStatus = () => {
    const {status} = this.state

    switch (status) {
      case 'INITIAL':
        return this.loadingIsInProgress()
      case 'SUCCESS':
        return this.successResponse()
      case 'FAIL':
        return this.failureResponse()
      default:
        return null
    }
  }

  render() {
    const {details, skills, companyLife, similarJobs} = this.state
    console.log(details, skills, companyLife, similarJobs)

    return (
      <div>
        <Header />
        {this.runningStatus()}
      </div>
    )
  }
}

export default JobDetails
