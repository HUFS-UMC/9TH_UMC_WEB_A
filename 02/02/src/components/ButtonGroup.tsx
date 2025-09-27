import Button from "./Button.tsx";
import { useCount } from "../context/CounterProvider.tsx";

const ButtonGroup = () => {
  const { handleIncrement, handleDecrement } = useCount();

  return (
    <div>
      <Button onClick={handleIncrement} text="+1" />
      <Button onClick={handleDecrement} text="-1" />
    </div>
  );
};

export default ButtonGroup;
