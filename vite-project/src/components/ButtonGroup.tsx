import { useCount } from "../context/CounterProvider";
import Button from "./Button";

// interface ButtonGroupProps {
//   handleIncrement?: () => void;
//   handleDecrement?: () => void;
// }

const ButtonGroup = () => {
  const { handleIncrement, handleDecrement } = useCount();
  return (
    <div>
      <Button onClick={handleIncrement} text="+1 증가" />
      <Button onClick={handleDecrement} text="-1 감소" />
    </div>
  );
};

export default ButtonGroup;
