/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './index.css'

const CheckBox = props => {
  const {details, onChangeCheck} = props
  const {employmentTypeId, label} = details
  const toChangeThe = event => {
    if (event.target.checked === true) {
      onChangeCheck(event.target.value)
    } else {
      onChangeCheck('')
    }
  }
  return (
    <li>
      <input
        onChange={toChangeThe}
        type="checkbox"
        id={employmentTypeId}
        value={employmentTypeId}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}
export default CheckBox
