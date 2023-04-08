/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import {Component} from 'react'
import Cookies from 'js-cookie'
import CheckBox from '../CheckBox'
import Radio from '../Radio'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FilterItems extends Component {
  state = {user: '', status: ''}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const r = await fetch(url, options)
    if (r.ok === true) {
      const result = await r.json()

      const profile = {
        name: result.profile_details.name,
        profileImageUrl: result.profile_details.profile_image_url,
        shortBio: result.profile_details.short_bio,
      }
      console.log(profile)
      this.setState({user: profile, status: true})
    } else {
      this.setState({status: false})
    }
  }

  onChangeCheck = id => {
    const {callingACheckFunction} = this.props
    callingACheckFunction(id)
  }

  onChangeTheRadio = id => {
    const {callingARadioFunction} = this.props
    callingARadioFunction(id)
  }

  onClickToCallApi = () => {
    this.getProfile()
  }

  render() {
    const {user, status} = this.state
    const {name, profileImageUrl, shortBio} = user
    return (
      <div className="f-card">
        {status ? (
          <div className="img-card">
            <img className="rahul" src={profileImageUrl} alt="profile" />
            <h1>{name}</h1>
            <p>{shortBio}</p>
          </div>
        ) : (
          <div className="image-fail">
            <button className="btn-r" onClick={this.onClickToCallApi}>
              Retry
            </button>
          </div>
        )}

        <hr />
        <h1 className="head">Type of Employment</h1>

        <ul>
          {employmentTypesList.map(eItem => (
            <CheckBox
              details={eItem}
              onChangeCheck={this.onChangeCheck}
              key={eItem.employmentTypeId}
            />
          ))}
        </ul>

        <hr />
        <h1 className="head">Salary Range</h1>

        <ul>
          {salaryRangesList.map(item => (
            <Radio
              d={item}
              onChangeTheRadio={this.onChangeTheRadio}
              key={item.salaryRangeId}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default FilterItems
