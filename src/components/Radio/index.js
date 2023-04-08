/* eslint-disable no-undef */
import './index.css'

const Radio = props => {
  const {d, onChangeTheRadio} = props
  const {salaryRangeId, label} = d
  const toChangeRadio = event => {
    onChangeTheRadio(event.target.value)
  }

  return (
    <li>
      <input
        type="radio"
        name="same"
        id={salaryRangeId}
        value={salaryRangeId}
        onChange={toChangeRadio}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}
export default Radio
