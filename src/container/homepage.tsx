import React from "react";
import apiConfig from "./../api";
import Board from "./../components/board";
import "./style.scss";

const Homepage: React.FC = () => {
  const [sentence, setSentence] = React.useState("");
  const [sentenceArr, setSentenceArr] = React.useState<String[][] | [][]>([]);
  const [round, setRound] = React.useState(1);
  const [length, setLength] = React.useState(0);
  const [errorMsg, setErrorMsg] = React.useState("");
  const reset = () => {
    setSentence("");
    setSentenceArr([]);
    setLength(0);
    setRound((preState) => preState + 1);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await apiConfig.get(JSON.stringify(round));
        let newResult = result.data.data.sentence.replace(/ /g, "& ");
        let arr = newResult.split(" ");
        let newArr = arr.map((words: any) => {
          return words.split("");
        });

        let newSentenceArray = result.data.data.sentence.split(" ");
        let arr1 = newSentenceArray.map((item: string) => {
          return item
            .split("")
            .sort(function () {
              return 0.5 - Math.random();
            })
            .join("");
        });
        let newSentence = arr1.join(" ");

        setLength(result.data.data.sentence.length);
        setSentenceArr(newArr);
        setSentence(newSentence);
      } catch (err) {
        setErrorMsg(err);
      }
    };
    fetchData();
  }, [round]);

  return (
    <div className="container">
      {round === 11 ? (
        <div className="title">
          <p>You Win!</p>
        </div>
      ) : (
        <div className="wrapper">
          <p className="sentence">{sentence}</p>
          <p>Guess the sentence! Starting typing</p>
          <p>The yellow blocks are meabt for spaces</p>
          <p className="score">Score:{round - 1}</p>
          <Board
            data={sentenceArr}
            onInput={() => setLength((preState) => preState - 1)}
            onBack={() => setLength((preState) => preState + 1)}
          />
          {length === 0 ? <button onClick={() => reset()}>Next</button> : null}
        </div>
      )}
    </div>
  );
};

export default Homepage;
