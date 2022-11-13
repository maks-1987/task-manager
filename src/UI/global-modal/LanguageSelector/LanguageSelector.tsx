import React from 'react';
import './languageSelector.css';

function LanguageSelector(): JSX.Element {
  return (
    <select className="select">
      <option className="option" value="EN">
        EN
      </option>
      <option className="option" value="UA">
        UA
      </option>
      <option className="option" value="BY">
        BY
      </option>
      <option className="option" value="RU">
        RU
      </option>
    </select>
  );
}

export default LanguageSelector;
