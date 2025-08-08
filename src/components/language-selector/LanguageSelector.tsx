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

import React, { useState } from "react";
import Select from "react-select";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import "./language-selector.scss";

const languageOptions = [
  { value: "English", label: "🇺🇸 English" },
  { value: "Vietnamese", label: "🇻🇳 Vietnamese" },
];

export default function LanguageSelector() {
  const { setLanguage, language } = useLiveAPIContext();
  const [selectedLanguage, setSelectedLanguage] = useState(
    languageOptions.find(option => option.value === language) || languageOptions[0]
  );

  const handleLanguageChange = (selectedOption: any) => {
    setSelectedLanguage(selectedOption);
    setLanguage(selectedOption.value);
  };

  return (
    <div className="language-selector">
      <Select
        className="language-select"
        classNamePrefix="language-select"
        value={selectedLanguage}
        options={languageOptions}
        onChange={handleLanguageChange}
        isSearchable={false}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            background: "var(--Neutral-15)",
            color: "var(--Neutral-90)",
            minHeight: "40px",
            border: state.isFocused ? "2px solid var(--Blue-60)" : "1px solid var(--Neutral-30)",
            borderRadius: "8px",
            boxShadow: state.isFocused ? "0 0 0 1px var(--Blue-60)" : "none",
            cursor: "pointer",
            "&:hover": {
              border: "1px solid var(--Neutral-50)",
            },
          }),
          option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            backgroundColor: isFocused
              ? "var(--Blue-10)"
              : isSelected
                ? "var(--Blue-20)"
                : "transparent",
            color: isSelected ? "var(--Blue-80)" : "var(--Neutral-90)",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "var(--Blue-10)",
            },
          }),
          menu: (styles) => ({
            ...styles,
            backgroundColor: "var(--Neutral-10)",
            border: "1px solid var(--Neutral-30)",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }),
          singleValue: (styles) => ({
            ...styles,
            color: "var(--Neutral-90)",
          }),
          dropdownIndicator: (styles) => ({
            ...styles,
            color: "var(--Neutral-60)",
            "&:hover": {
              color: "var(--Neutral-80)",
            },
          }),
        }}
      />
    </div>
  );
}
