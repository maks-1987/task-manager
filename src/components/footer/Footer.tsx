import React from 'react';
import { ghSvg, rssSvg } from './svg';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-items">
        <p className="footer-item">©</p>
        <p className="footer-item">2022</p>
      </div>
      <div className="footer-items">
        <a
          className="gh-link"
          href="https://github.com/maks-1987/"
          rel="noreferrer"
          target="_blank"
        >
          {ghSvg()}
          <p className="gh-title">Max</p>
        </a>
        <a className="gh-link" href="https://github.com/matvey84/" rel="noreferrer" target="_blank">
          {ghSvg()}
          <p className="gh-title">Den</p>
        </a>
        <a
          className="gh-link"
          href="https://github.com/DenisWilk/"
          rel="noreferrer"
          target="_blank"
        >
          {ghSvg()}
          <p className="gh-title">Den</p>
        </a>
      </div>
      <a className="rss-link" href="https://rs.school/react/" rel="noreferrer" target="_blank">
        {rssSvg()}
      </a>
    </footer>
  );
}
