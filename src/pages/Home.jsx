import React, { useState, useEffect } from 'react';
import TextField from '../components/TextField';
import '../styles/Home.css';
import Button from '../components/Button';
import Speech from 'speak-tts'

export default function Home() {
    const [text, setText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [firstLine, setFirstLine] = useState(true);
    const speech = new Speech();

    const handleTextChange = (newText) => {
        setText(newText);
    };

    const playText = async () => {

    };

    const toggleSpeaking = () => {
        if (!isSpeaking && firstLine) {
            setIsSpeaking(true);
            console.log()
            speech.cancel()
            speech.speak({
                text: text.split(' ')[0],
            }).then(() => {
                console.log("Success !");
                // Update state to indicate speech is playing
            }).catch(e => {
                console.error("An error occurred :", e)
            })
            setFirstLine(false)
            speech.speak({
                text: text.substring(text.indexOf(' ') + 1),
            }).then(() => {
                console.log("Success !");
                // Update state to indicate speech is playing
            }).catch(e => {
                console.error("An error occurred :", e)
            })
        } else if(isSpeaking && !firstLine) {
            speech.pause();
            setIsSpeaking(false); // Update state to indicate speech is resumed
        }
        else{
            setIsSpeaking(true)
            speech.resume();
        }
    };

    useEffect(() => {
        if (speech.hasBrowserSupport()) {
            console.log("Speech synthesis supported");
            speech.init().then((data) => {
                // The "data" object contains the list of available voices and the voice synthesis params
                console.log("Speech is ready, voices are available", data)
            }).catch(e => {
                console.error("An error occured while initializing : ", e)
            })
        } else {
            console.log("Speech synthesis not supported");
        }
    }, []); // Empty dependency array ensures that this effect runs only once on component mount

    return (
        <div className='home-root'>
            <h1>Text To Speech</h1>
            <TextField onTextChange={handleTextChange} />
            <div className='buttons'>
                <Button onClickPress={toggleSpeaking} name={isSpeaking ? "Pause" : "Play"} /> {/* Dynamically change button name based on speaking state */}
            </div>
        </div>
    );
}