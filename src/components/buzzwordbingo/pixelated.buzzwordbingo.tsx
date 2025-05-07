import React, { useState, useEffect } from 'react';
import './pixelated.buzzwordbingo.css';
import "../../css/pixelated.grid.scss";
import { buzzwords } from "../../data/buzzwords.js";

/* 
TODO #19 Buzzword Bingo COmponent : Fix css grid to remain 5 columns
*/

function getBingoWords(arr: Array<string>, x: number){
    var myBingoWords =[...arr].sort(() => Math.random() - 0.5); // Shuffle the array
    myBingoWords = myBingoWords.slice(0, x); // Return the first x elements
    myBingoWords.splice(12, 0, "FREE SPACE"); 
    return myBingoWords;
}

export function BuzzwordBingo(){
    const myBingoHeaders = ["B", "I", "N", "G", "O"];
    const [bingoWords, setBingoWords] = useState <string[]> ([]);
    useEffect(() => { 
        setBingoWords(getBingoWords(buzzwords, 24));
    }, []);
    return (
        <div className="bingoCard rowfix-5col">
            { myBingoHeaders.map((word) => (
                <BingoHeader word={word} key={word} />
            ))}
            { bingoWords.map((word) => (
                <BingoBox word={word} key={word} /> 
            ))}
        </div>
    );
}

function BingoHeader({ word }: { word: string }) {
    return (
        <div className="bingoHeader gridItem">
            <div className="bingoBoxText">
                {word}
            </div>
        </div>
    );
}

function BingoBox({ word }: { word: string }) {
    return (
        <div className="bingoBox gridItem">
            <div className={(word == "FREE SPACE") ? "bingoBoxFreeSpace" : "bingoBoxText" }>
                {word}
            </div>
        </div>
    );
}

