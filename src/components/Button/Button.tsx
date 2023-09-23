type Props = {
  btnStyle: "outline" | "fill";
  btnType?: "submit" | "button" | "reset"; 
  text: string;
  handler: () => void;
}

export const Button: React.FC<Props> = ({ btnStyle, btnType, text, handler }) => {

  return (
  <button
    className={`btn ${btnStyle}`}
    onClick={handler}
    type={btnType || "button"}
  >
    {text}
  </button>
  )
}