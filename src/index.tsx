import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App/App';
import reportWebVitals from './reportWebVitals'
// import { WeatherApp } from 'weather-app-ps/dist/cjs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


export const texts = {
  topBanner: {
      title: "Creative?",
      lines: ["FRONTEND", "DEVELOPER"]
  },
  intro: {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  weatherApp: {
      cityFinderTexts: {
          placeholder: "Enter your city",
          label: "Please enter your city",
          name: "Name hello"
      }
  }
}

root.render(
    <BrowserRouter>
        <React.StrictMode>
          <App></App>
          {/* <WeatherApp texts={ texts.weatherApp }></WeatherApp> */}
        </React.StrictMode>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
