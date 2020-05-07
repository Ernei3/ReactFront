import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Categories from './Categories'

import './App.css';

function App() {
    return <Router>
        <div id="menu">
            <ul>
                <li>
                    <Link to="/categories">Categories</Link>
                </li>
            </ul>
            <Route path="/categories" component={Categories}/>
        </div>
    </Router>
}

export default App;
