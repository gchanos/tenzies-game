import React from "react";
import "../styles.css";

export default function Die(props) {
    
    return (
        <div onClick={props.holdDice} className={props.isHeld ? "box green" : "box"}>
            <div className="dot-container">
                <div className="dot-column">
                    <div className={`dot ${(props.value == 3 || props.value == 6 || props.value == 2 || props.value == 4 || props.value == 5) && "dot-show"}`}></div>
                    <div className={`dot ${(props.value == 6) && "dot-show"}`}></div>
                    <div className={`dot ${(props.value == 6 || props.value == 4 || props.value == 5) && "dot-show"}`}></div>
                </div>
                <div className="dot-column-2">
                    <div className={`dot ${(props.value == 1 || props.value == 3 || props.value == 5) && "dot-show"}`}></div>
                </div>
                <div className="dot-column">
                    <div className={`dot ${(props.value == 6 || props.value == 4 || props.value == 5) && "dot-show"}`}></div>
                    <div className={`dot ${(props.value == 6) && "dot-show"}`}></div>
                    <div className={`dot ${(props.value == 3 || props.value == 6 || props.value == 2 || props.value == 4 || props.value == 5) && "dot-show"}`}></div>
                </div>
            </div>
        </div>
    )
}