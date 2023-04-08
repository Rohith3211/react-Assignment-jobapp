/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */
const SkillsCard = props => {
  const {information} = props
  const {name, imageUrl} = information

  return (
    <li className="icon-card">
      <img className="icon-img" src={imageUrl} alt={name} />
      <h1>{name}</h1>
    </li>
  )
}

export default SkillsCard
