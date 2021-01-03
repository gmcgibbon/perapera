import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from './components/app';

const appDiv = document.getElementById('app');

ReactDOM.render(<HashRouter><App /></HashRouter>, appDiv);
