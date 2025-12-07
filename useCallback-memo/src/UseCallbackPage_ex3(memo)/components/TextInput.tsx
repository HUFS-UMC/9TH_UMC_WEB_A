import { memo } from "react";

interface ITextInput {
  onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInput) => {
  console.log("Text input rendred");
  return (
    <input
      type="text"
      className="border p-4 rounded-lg "
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default memo(TextInput);
