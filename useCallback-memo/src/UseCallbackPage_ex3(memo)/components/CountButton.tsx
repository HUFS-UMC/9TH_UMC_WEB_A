import { memo } from "react";

interface ICountButton {
  onClick: (count: number) => void;
}

const CountButton = ({ onClick }: ICountButton) => {
  console.log("CountButton rendred");
  return (
    <button className="border p-2 rounded-lg " onClick={() => onClick(10)}>
      카운트증가
    </button>
  );
};

export default memo(CountButton);
