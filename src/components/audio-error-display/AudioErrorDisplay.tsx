/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import "./audio-error-display.scss";

export interface AudioErrorDisplayProps {
  error: string | null;
  onDismiss: () => void;
}

export default function AudioErrorDisplay({ error, onDismiss }: AudioErrorDisplayProps) {
  if (!error) return null;

  const isPermissionError = error.includes("permission");
  const isDeviceError = error.includes("microphone") || error.includes("device");
  const isHTTPSError = error.includes("HTTPS");

  return (
    <div className="audio-error-display">
      <div className="error-content">
        <div className="error-icon">
          <span className="material-symbols-outlined">error</span>
        </div>
        <div className="error-message">
          <h3>Audio Error</h3>
          <p>{error}</p>
          
          {isPermissionError && (
            <div className="error-help">
              <h4>How to fix:</h4>
              <ul>
                <li>Click the microphone icon in your browser's address bar</li>
                <li>Select "Allow" for microphone access</li>
                <li>Refresh the page and try again</li>
              </ul>
            </div>
          )}
          
          {isDeviceError && (
            <div className="error-help">
              <h4>How to fix:</h4>
              <ul>
                <li>Check that your microphone is connected</li>
                <li>Close other applications using your microphone</li>
                <li>Try refreshing the page</li>
              </ul>
            </div>
          )}
          
          {isHTTPSError && (
            <div className="error-help">
              <h4>How to fix:</h4>
              <ul>
                <li>Use HTTPS connection for microphone access</li>
                <li>Or run on localhost for development</li>
              </ul>
            </div>
          )}
        </div>
        <button className="error-dismiss" onClick={onDismiss}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
}
