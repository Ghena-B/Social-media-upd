import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
let dialogs = [
    {id: 1, user: "Ghenaaa"},
    {id: 2, user: "Nicu"},
    {id: 3, user: "Max"},
    {id: 4, user: "Tudor"},
    {id: 5, user: "Mama"},
    {id: 6, user: "Tata"},
];
let messages = [
    {id: 1, message: "Salut, ce faci?"},
    {id: 2, message: "Mesaj 2"},
    {id: 3, message: "Mesaj 3"}
];
let posts = [
    {id: 1, message: "Hi, how are youuu?", likesCount : '23' },
    {id: 2, message: "I am using props", likesCount : '11' }
];
root.render(
  <React.StrictMode>
    <App dialogs={dialogs} messages={messages} posts={posts} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
