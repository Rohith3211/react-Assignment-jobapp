/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/self-closing-comp */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import JobItems from '../JobItems'
import Header from '../Header'
import FilterItems from '../FilterItems'
import './index.css'

const statusType = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class JobsPage extends Component {
  state = {
    objList: [],
    time: '',
    salary: '',
    change: '',
    status: statusType.initial,
  }

  componentDidMount() {
    this.getFetchDetails()
  }

  getFetchDetails = async () => {
    const {time, salary, change} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${time}&minimum_package=${salary}&search=${change}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updated = data.jobs.map(eachObject => ({
        id: eachObject.id,
        companyLogoUrl: eachObject.company_logo_url,
        employmentType: eachObject.employment_type,
        jobDescription: eachObject.job_description,
        location: eachObject.location,
        packagePerAnnum: eachObject.package_per_annum,
        rating: eachObject.rating,
        title: eachObject.title,
      }))
      console.log(updated)

      this.setState({objList: updated, status: statusType.success})
    } else {
      this.setState({status: statusType.fail})
    }
  }

  callingACheckFunction = value => {
    this.setState({time: value}, this.getFetchDetails)
  }

  callingARadioFunction = value => {
    this.setState({salary: value}, this.getFetchDetails)
  }

  searchInputChange = event => {
    this.setState({change: event.target.value})
  }

  getApiCallToSearch = () => {
    this.getFetchDetails()
  }

  onClickToCall = () => {
    this.getFetchDetails()
  }

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

  loadingIsInProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successResponse = () => {
    const {objList} = this.state

    const length = objList.length <= 0

    return (
      <div>
        {length ? (
          <div className="no-jobs">
            <img
              className="no-img"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
          </div>
        ) : (
          <ul className="list-card">
            {objList.map(each => (
              <JobItems details={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  failureResponse = () => (
    <div className="fail">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="btn-r" onClick={this.onClickToCall}>
        Retry
      </button>
    </div>
  )

  render() {
    const {objList} = this.state

    const length = objList.length <= 0

    return (
      <div>
        <Header />

        <div className="job-card">
          <div className="display">
            <div className="s-btn-card">
              <input
                onChange={this.searchInputChange}
                className="search-input"
                type="search"
                placeholder="Search"
              />
              <button
                onClick={this.getApiCallToSearch}
                className="s-button"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>

          <FilterItems
            callingACheckFunction={this.callingACheckFunction}
            callingARadioFunction={this.callingARadioFunction}
          />

          <div className="sub-card2">
            <div className="s-btn-card view">
              <input
                onChange={this.searchInputChange}
                className="search-input"
                type="search"
                placeholder="Search"
              />
              <button
                onClick={this.getApiCallToSearch}
                className="s-button"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            {this.runningStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsPage
