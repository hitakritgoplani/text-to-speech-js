import React, { useState, useEffect, useRef } from 'react';
import TextField from '../components/TextField';
import '../styles/Home.css';
import Button from '../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const synth = useRef(null);
  const utterance = useRef(null);

  useEffect(() => {
    synth.current = window.speechSynthesis;
    return () => {
      if (synth.current) {
        synth.current.cancel();
      }
    };
  }, []);

  const handleTextChange = (newText) => {
    setText(newText);
    setIsCompleted(false);
    
    // If speech is paused, cancel it and reset states
    if (isPaused) {
      synth.current.cancel();
      setIsPaused(false);
      setIsSpeaking(false);
    }
};

  const speakText = () => {
    utterance.current = new SpeechSynthesisUtterance(text);
    synth.current.speak(utterance.current);
    setIsSpeaking(true);
    setIsCompleted(false);
    setIsPaused(false);
    utterance.current.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setIsCompleted(true);
    };
};

  const toggleSpeaking = () => {
    if (!text.trim()) {
      toast.error("No text available! Please enter text to play.");
      return;
    }

    if (!synth.current) {
      toast.error("Speech synthesis is not supported in your browser.");
      return;
    }

    if (!isSpeaking && !isPaused) {
      // Start speaking
      speakText();
    } else if (isSpeaking && !isPaused) {
      // Pause speaking
      synth.current.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    } else if (!isSpeaking && isPaused) {
      // Resume speaking
      synth.current.resume();
      setIsPaused(false);
      setIsSpeaking(true);
    }
  };

  const getButtonText = () => {
    if (isCompleted) return "Play";
    if (isPaused) return "Resume";
    if (isSpeaking) return "Pause";
    return "Play";
  };

  return (
    <div className='home-root'>
      <ToastContainer />
      <h1>Text Aloud</h1>
      <TextField onTextChange={handleTextChange} />
      <div className='buttons'>
        <Button onClickPress={toggleSpeaking} name={getButtonText()} />
      </div>
    </div>
  );
}
