import React, { ReactNode } from "react"

type Props = {
  children?: ReactNode;
}

export const Overlay: React.FC<Props> = ({ children }) => {
  return <div className="overlay">{children}</div>
}