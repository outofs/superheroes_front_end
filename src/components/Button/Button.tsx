type Props = {
  btnStyle: 'outline' | 'fill';
  text: string;
  handler: () => void;
}

export const Button: React.FC<Props> = ({ btnStyle, text, handler }) => {

  return (<button
    className={`btn ${btnStyle}`}
    onClick={handler}
  >
    {text}
  </button>)
}