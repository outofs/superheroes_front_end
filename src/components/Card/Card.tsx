export const Card = () => {
  return (
    <div className="card">
      <div className="card__wrapper">
        <div className="card__banner-image"> </div>
        <h1 className="card__title">Superman</h1>
      </div>
      <div className="card__button-wrapper">
        <button className="btn outline">DETAILS</button>
        <button className="btn fill">DELETE</button>
      </div>
    </div>
  )
}