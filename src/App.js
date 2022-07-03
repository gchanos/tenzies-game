import React from "react";
import "./styles.css";
import Die from "./components/Die";
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [diceArray, setDiceArray ] = React.useState(allNewDice())
    const [numOfRolls, setNumOfRolls] = React.useState(0)
    const [tenzies, setTenzies] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [timer, setTimer] = React.useState({ms: 0, s:0, m:0});
    const [interv, setInterv] = React.useState();

    let updatedMs = timer.ms, updatedS = timer.s, updatedM = timer.m;

    const diceComponents = diceArray.map( die => {
       return  (
            <Die key={die.id} 
            holdDice={ () => holdDice(die.id) } 
            value={die.value} 
            isHeld={die.isHeld} 
            />
        );
    })

    React.useEffect( function() {
        let values = allEqual(allDiceValues());
        let held = allEqual(allHeldValues());

        if (values && held) {
            setTenzies(true)
            stopTimer()
        }
        
    }, [diceArray])

    // TIMER FUNCTIONALITIES**

    function startTimer() {
        run();
        setInterv(setInterval(run, 10))
        setDisabled(true)
    }

    function run() {
        if (updatedS === 60) {
            updatedM ++;
            updatedS = 0;
        }

        if (updatedMs === 100) {
            updatedS ++;
            updatedMs = 0;
        }

        updatedMs++;
        return setTimer({ms: updatedMs, s:updatedS, m: updatedM});
    };

    function stopTimer() {
        clearInterval(interv);
    }

    function resetTimer() {
        clearInterval(interv);
        setTimer({ms:0, s:0, m:0})
        setDisabled(false)
    }

    // END OF THESE FUNCTIONS**


    function allNewDice() {
        const randomNumbers = [];

        for (let index = 0; index < 10; index++) {
            let newNumber = between(1, 6);
            randomNumbers.push( { value: newNumber, isHeld: false, id: nanoid() } );
        }
        return randomNumbers;
    }

    // FUNCTIONS TO DETERMINE WHETHER THE PLAYER HAS WON
    //To determine whether all dice values are the same
    function allDiceValues() {
        let values = [];
        for (let index = 0; index < diceArray.length; index++) {
            values.push(diceArray[index].value)
        }
        return values;
    }

    //To determine whether all isHeld values are true
    function allHeldValues() {
        let held = [];
        for (let index = 0; index < diceArray.length; index++) {
            held.push(diceArray[index].isHeld)
        }
        return held;
    }

    function allEqual(toEvaluate) {
        const result = toEvaluate.every( element => {
            if (element === toEvaluate[0]) {
                return true;
            }
        });
        return result;
    }
    // END OF THESE FUNCTIONS

    function between(min, max) {
        return Math.floor(
          Math.random() * (max - min + 1) + min
        )
    }
    
    function rollDice() {
        
        setDiceArray( prevDice => prevDice.map( die => {
            return die.isHeld ? die : {...die, id: nanoid(), value: between(1, 6)}
        }))
        
        setNumOfRolls(prevNum => prevNum + 1)

        if (tenzies) {
            setDiceArray(allNewDice())
            setTenzies(false)
            setNumOfRolls(-1)
            resetTimer()
        }
    }


    
    function holdDice(id) {
        setDiceArray( prevDice => prevDice.map( die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} :
                   die
        }))
    }

    
    
    return (
        <div className="app-container">
            {tenzies && <Confetti />}
            <div className="primary-container">
                
                <div className="main-container">
                    <div className="main-text">
                        <h1>Tenzies</h1>
                        <h3>Roll until all dice are the same. Click each dice
                            to freeze it at its current value between rolls.
                        </h3>
                    </div>

                    <div className="main-dice">
                        {diceComponents}
                    </div>

                    <div className="button-and-number">
                        <div onClick={rollDice} className="roll-button">
                            <h1 className="button-content">{tenzies ? "New Game" : "Roll"}</h1>
                        </div>

                        {numOfRolls <= 0 ? "" : 
                            <div className="number-of-rolls">
                                <h4>Your rolls: {numOfRolls}</h4>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="main-container-2">
                <div className="main-text">
                    <h1>Test yourself</h1>
                    <h3>By setting a timer see how fast you can call it Tenzies!</h3>

                   <div className="timer-container">
                        <div className="timer">{ timer.m <= 10 ? "0" + timer.m : timer.m } :</div>
                        <div className="timer">{ timer.s <= 10 ? "0" + timer.s : timer.s } :</div> 
                        <div className="timer">{ timer.ms }</div>
                   </div>

                </div>
                <button disabled={disabled} onClick={startTimer} className="timer-button" id="timerBtn">
                    <h1 className="button-content">Go!</h1>
                </button>
            </div>
        </div>
    )
}