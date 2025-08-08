/**
 * Simple audio test component to debug microphone issues
 */

import React, { useState } from "react";
import "./audio-test.scss";

export default function AudioTest() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<string>("");
  const [stream, setStream] = useState<MediaStream | null>(null);

  const testMicrophone = async () => {
    setTesting(true);
    setResult("Testing microphone access...");

    try {
      // Step 1: Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia is not supported in this browser");
      }
      setResult("✓ getUserMedia is supported");

      // Step 2: Check protocol
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      setResult(prev => prev + `\n✓ Protocol: ${protocol}, Host: ${hostname}`);
      
      if (protocol !== 'https:' && hostname !== 'localhost' && hostname !== '127.0.0.1') {
        throw new Error("HTTPS is required for microphone access (or use localhost)");
      }

      // Step 3: Request microphone access
      setResult(prev => prev + "\n🎤 Requesting microphone access...");
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });

      setStream(mediaStream);
      setResult(prev => prev + "\n✅ Microphone access granted!");
      
      // Step 4: Test audio context
      setResult(prev => prev + "\n🔊 Creating audio context...");
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(mediaStream);
      
      setResult(prev => prev + "\n✅ Audio context created successfully!");
      setResult(prev => prev + `\n📊 Sample rate: ${audioContext.sampleRate}Hz`);
      setResult(prev => prev + `\n🎵 Audio tracks: ${mediaStream.getAudioTracks().length}`);
      
      // Cleanup
      setTimeout(() => {
        mediaStream.getTracks().forEach(track => track.stop());
        audioContext.close();
        setStream(null);
        setResult(prev => prev + "\n🛑 Test completed - resources cleaned up");
      }, 3000);

    } catch (error: any) {
      console.error("Microphone test failed:", error);
      let errorMsg = error.message || "Unknown error";
      
      if (error.name === 'NotAllowedError') {
        errorMsg = "❌ Permission denied. Please allow microphone access in browser settings.";
      } else if (error.name === 'NotFoundError') {
        errorMsg = "❌ No microphone found. Please connect a microphone.";
      } else if (error.name === 'NotReadableError') {
        errorMsg = "❌ Microphone is busy or being used by another application.";
      }
      
      setResult(prev => prev + `\n${errorMsg}`);
    }
    
    setTesting(false);
  };

  const clearTest = () => {
    setResult("");
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="audio-test">
      <h3>🎤 Audio Debug Tool</h3>
      <div className="test-controls">
        <button 
          onClick={testMicrophone} 
          disabled={testing}
          className="test-button"
        >
          {testing ? "Testing..." : "Test Microphone"}
        </button>
        <button 
          onClick={clearTest} 
          disabled={testing}
          className="clear-button"
        >
          Clear
        </button>
      </div>
      
      {result && (
        <div className="test-result">
          <h4>Test Results:</h4>
          <pre>{result}</pre>
        </div>
      )}
      
      {stream && (
        <div className="stream-info">
          <p>🟢 Microphone is active</p>
        </div>
      )}
    </div>
  );
}
