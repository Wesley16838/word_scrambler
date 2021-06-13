import React from "react";
import { TBoard } from "./../types";
import Input from "./inputbox";
import "./style.scss";
const Board: React.FC<TBoard> = ({ data, onInput, onBack }) => {
  let index = 0;
  let space = false;
  return (
    <div className="board">
      {data.map((word: string[], idx: number) => {
        space = false;
        return (
          <div key={`word${idx}`} className="section">
            {word.map((letter: string) => {
              space = true;
              if (letter === "&") {
                return null;
              } else {
                index++;
                return (
                  <Input
                    value={letter}
                    key={`${index}`}
                    onChange={onInput}
                    name={`${index}`}
                    onBack={onBack}
                  />
                );
              }
            })}
            {space && idx !== data.length - 1 ? (
              <Input
                value={"&"}
                key={`space${idx}`}
                onChange={onInput}
                name={`${++index}`}
                onBack={onBack}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
