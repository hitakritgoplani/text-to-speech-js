import React, { useState, useEffect } from 'react';
import TextField from '../components/TextField';
import '../styles/Home.css';
import Button from '../components/Button';
import Speech from 'speak-tts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const [text, setText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [firstLine, setFirstLine] = useState(true);
    const speech = new Speech();

    const handleTextChange = (newText) => {
        setText(newText);
    };

    const playText = async () => {
        // Function left unchanged for now
    };

    const toggleSpeaking = () => {
        if (!text.trim()) {
            toast.error("No text available! Please enter text to play.");
            return;
        }

        if (!isSpeaking && firstLine) {
            setIsSpeaking(true);
            speech.cancel();
            speech.speak({
                text: text.split(' ')[0],
            }).then(() => {
                console.log("Success!");
            }).catch(e => {
                console.error("An error occurred: ", e);
            });
            setFirstLine(false);
            speech.speak({
                text: text.substring(text.indexOf(' ') + 1),
            }).then(() => {
                console.log("Success!");
            }).catch(e => {
                console.error("An error occurred: ", e);
            });
        } else if (isSpeaking && !firstLine) {
            speech.pause();
            setIsSpeaking(false); // Update state to indicate speech is paused
        } else {
            setIsSpeaking(true);
            speech.resume();
        }
    };

    useEffect(() => {
        if (speech.hasBrowserSupport()) {
            console.log("Speech synthesis supported");
            speech.init().then((data) => {
                console.log("Speech is ready, voices are available", data);
            }).catch(e => {
                console.error("An error occurred while initializing: ", e);
            });
        } else {
            console.log("Speech synthesis not supported");
        }
    }, []); // Empty dependency array ensures that this effect runs only once on component mount

    return (
        <div className='home-root'>
            <ToastContainer />
            <h1>Text To Speech</h1>
            <TextField onTextChange={handleTextChange} />
            <div className='buttons'>
                <Button onClickPress={toggleSpeaking} name={isSpeaking ? "Pause" : "Play"} />
            </div>
        </div>
    );
}
