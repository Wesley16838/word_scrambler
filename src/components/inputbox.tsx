import { Console } from "console";
import React from "react";
import { TInput } from "./../types";
const Inputbox: React.FC<TInput> = ({ value, onChange, name, onBack }) => {
  const [letter, setLetter] = React.useState("");
  const [styleName, setStyleName] = React.useState("default");
  const handleOnChange = (e: any) => {
    if (e.target.value.toLowerCase() === value.toLowerCase()) {
      setStyleName("fulfill");
      if (onChange) onChange();
    } else {
      if (styleName === "fulfill") onBack();
      setStyleName("default");
    }
    setLetter(e.target.value);
  };
  const handleOnKeyUp = (e: any) => {
    const nextSibling = document.querySelector(
      `input[name=word${parseInt(name, 10) + 1}]`
    );
    const prevSibling = document.querySelector(
      `input[name=word${parseInt(name, 10) - 1}]`
    );
    if (prevSibling !== null && e.keyCode === 8) {
      (prevSibling as HTMLElement)?.focus();
    } else if (nextSibling !== null && e.keyCode !== 8) {
      if (e.keyCode === 32 && value === "&") {
        setStyleName("fulfill");
        if (onChange) onChange();
      }
      (nextSibling as HTMLElement)?.focus();
    }
  };
  return (
    <input
      name={`word${name}`}
      type="text"
      onChange={(e) => handleOnChange(e)}
      onKeyUp={(e) => handleOnKeyUp(e)}
      maxLength={1}
      value={letter}
      className={`${styleName} ${value === "&" ? "space" : ""}`}
    />
  );
};

export default Inputbox;
