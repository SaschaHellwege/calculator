/*import './App.css';
import React, { useState } from 'react';

function App() {
  const [userInput, setUserInput] = useState([]);
  const [result, setResult] = useState("");

  const buttonArray = [
    { id: "equals", sign: "=" },
    { id: "zero", sign: "0" },
    { id: "one", sign: "1" },
    { id: "two", sign: "2" },
    { id: "three", sign: "3" },
    { id: "four", sign: "4" },
    { id: "five", sign: "5" },
    { id: "six", sign: "6" },
    { id: "seven", sign: "7" },
    { id: "eight", sign: "8" },
    { id: "nine", sign: "9" },
    { id: "add", sign: "+" },
    { id: "subtract", sign: "-" },
    { id: "multiply", sign: "*" },
    { id: "divide", sign: "/" },
    { id: "decimal", sign: "." },
    { id: "clear", sign: "C" },
  ];

  const handleKeyDown = (sign) => {
    if (sign === "C") {
      setUserInput([]);
      setResult("0");
      return;
    }
  
    if (sign === "=") {
      calculateResult();
      return;
    }
  
    const lastInput = userInput[userInput.length - 1];
    /*const operators = ['+', '-', '*', '/'];
  
    if (operators.includes(sign)) {
      // If the last input was an operator, replace it with the new one
      if (operators.includes(lastInput)) {
        setUserInput([...userInput.slice(0, -1), sign]);
      } else {
        setUserInput([...userInput, sign]);
      }
      return;
    }*/
/*
      
    
    const lastNumberSegment = userInput.join("").split(/[\+\-\*\/]/).pop();
  
    if (sign === "0") {
      if (lastNumberSegment === "0" && lastInput !== ".") {
        return;
      }
    }
  
    if (sign === ".") {
      if (lastNumberSegment.includes(".")) {
        return;
      }
    }
    setResult("");
    setUserInput([...userInput, sign]);
  };
  

  const calculateResult = () => {
    try {
      const expressionStr = userInput.join("");

      // eval loop:
      //first, seperate numbers and operators

      const regex1= /(\-?\.?\d+(\.\d+)?)|((\/|\+|\-|\*)+)/g;
      let expressionArr = expressionStr.match(regex1);
      console.log('expression Array: ' + expressionArr);

      //clean up the array opperators so its no multiples anymore except *- or /*

      for(let i=0;i<expressionArr.length;i++){
        console.log('arrived in the multiple op clean up loop');
        let expressionPart = expressionArr[i];
        let lastOpIsSubtract = expressionPart.slice(-1) === "-"? true: false;
        const multipleOpRegex = /(\+|\-|\*|\/){2,}/g;
        if(multipleOpRegex.test(expressionPart)){
          if(lastOpIsSubtract){
            expressionArr[i]=expressionPart.substr(-2);
          }
          else{
            expressionArr[i] = expressionPart.substr(-1);
          };
        }
        console.log("cleaned expression: "+ expressionArr.join(""));
      };

      //loop over the expression to calculate the * and / first

      const firstOpRegex = /(\*|\/)/g;
      while(firstOpRegex.test(expressionArr.join(""))){
        console.log('punktvorstrichrechnung: ' + expressionArr.join(""));
        const opIndex = expressionArr.indexOf(/\*|\//g);
        const slicedExpression = expressionArr.slice(opIndex - 1, opIndex + 1).join("");
        console.log('sliced expression: ' + slicedExpression);
        expressionArr.splice(opIndex-1, 3, String(eval(slicedExpression)));
        console.log('after punktvorstrichrechnung: ' + expressionArr.join(""));
      };

      //eval the rest, should be clear to do so
      console.log('last evaluation: ' + expressionArr.join(""));
      setResult(eval(expressionArr.join("")));
      console.log('Result: ' + result); 

      //give out the result and put it into input for further calculations

      setUserInput([...result]);
    } catch (error) {
      setUserInput(["Error"]);
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div id="calculator">
        {buttonArray.map((obj) => (
          <button key={obj.id} id={obj.id} onClick={() => handleKeyDown(obj.sign)}>
            {obj.sign}
          </button>
        ))}
      </div>
      <div id="display">{userInput.join("")}{result}</div>
    </div>
  );
}

export default App;
*/

import './App.css';
import React, { useState } from 'react';

function App() {
  const [userInput, setUserInput] = useState([]);
  const [result, setResult] = useState("");

  const buttonArray = [
    { id: "equals", sign: "=" },
    { id: "zero", sign: "0" },
    { id: "one", sign: "1" },
    { id: "two", sign: "2" },
    { id: "three", sign: "3" },
    { id: "four", sign: "4" },
    { id: "five", sign: "5" },
    { id: "six", sign: "6" },
    { id: "seven", sign: "7" },
    { id: "eight", sign: "8" },
    { id: "nine", sign: "9" },
    { id: "add", sign: "+" },
    { id: "subtract", sign: "-" },
    { id: "multiply", sign: "*" },
    { id: "divide", sign: "/" },
    { id: "decimal", sign: "." },
    { id: "clear", sign: "C" },
  ];

  const handleKeyDown = (sign) => {
    if (sign === "C") {
      setUserInput([]);
      setResult("0");
      return;
    } else {
      setResult("");
    }

    if (sign === "=") {
      calculateResult();
      return;
    }
    
    const lastInput = userInput[userInput.length - 1];
    const operators = ['+', '-', '*', '/'];

    // Allow two operators if the last one is "-"
    if (operators.includes(sign)) {
      if (operators.includes(lastInput)) {
        if (sign === "-" && lastInput !== "-") {
          setUserInput([...userInput, sign]); // Allow sequences like "2 + -"
        } else {
          setUserInput([...userInput.slice(0, -1), sign]); // Replace the last operator
        }
      } else {
        setUserInput([...userInput, sign]); // Add the operator if the last input isn't an operator
      }
      return;
    }

    const lastNumberSegment = userInput.join("").split(/[\+\-\*\/]/).pop();

    if (sign === "0" && lastNumberSegment === "0" && lastInput !== ".") {
      return; // Prevent multiple leading zeros
    }

    if (sign === "." && lastNumberSegment.includes(".")) {
      return; // Prevent multiple decimals in a number
    }

    setUserInput([...userInput, sign]);
  };

  const calculateResult = () => {
    try {
      const expressionStr = userInput.join("");
      const cleanedExpression = expressionStr.replace(/(\+|\-|\*|\/){2,}/g, (match) => {
        // Allow sequences like "+-" but clean up others
        return match.includes("-") ? match : match.slice(-1);
      });
      const calculatedResult = eval(cleanedExpression);
      setResult(calculatedResult.toString());
      setUserInput([calculatedResult.toString()]);
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="App">
      <div id="calculator">
        {buttonArray.map((obj) => (
          <button key={obj.id} id={obj.id} onClick={() => handleKeyDown(obj.sign)}>
            {obj.sign}
          </button>
        ))}
      </div>
      <div id="display">{userInput.join("") || result}</div>
    </div>
  );
}

export default App;

