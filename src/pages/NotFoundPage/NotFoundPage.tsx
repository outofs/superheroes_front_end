import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/Button"

export const NotFoundPage: React.FC = () => {

  return (
    <div className="not-found">
      <h1>Looks like you got lost...</h1>
      <Link to="/">
        <Button
          btnType="button"
          btnStyle="outline"
          handler={() => { }}
          text="I'LL HELP YOU"
        />
      </Link>
    </div>
  )
}