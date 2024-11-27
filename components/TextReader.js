'use client'
import { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speech, setSpeech] = useState(null);

  // Initialize the SpeechSynthesisUtterance and prepare the speech
  useEffect(() => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      setSpeech(utterance);
    } else {
      alert("Speech synthesis is not supported in this browser.");
    }
  }, [text]);

  const handlePlay = () => {
    if (speech) {
      if (isPaused) {
        // Resume if paused
        speechSynthesis.resume();
      } else {
        // Start new speech
        speechSynthesis.cancel(); // Ensure no overlapping speech
        speechSynthesis.speak(speech);
      }
      setIsSpeaking(true);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    if (isSpeaking) {
      speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Text-to-Speech Player</h2>
      <p style={textStyle}>{text}</p>
      <div style={buttonContainerStyle}>
        <button onClick={handlePlay} style={buttonStyle} disabled={isSpeaking && !isPaused}>
          Play
        </button>
        <button onClick={handlePause} style={buttonStyle} disabled={!isSpeaking}>
          Pause
        </button>
        <button onClick={handleStop} style={buttonStyle}>
          Stop
        </button>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  maxWidth: "600px",
  margin: "auto",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

const headingStyle = {
  color: "#4CAF50",
  marginBottom: "10px",
};

const textStyle = {
  marginBottom: "20px",
  fontSize: "1.2rem",
  lineHeight: "1.6",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
};

export default TextToSpeech;
