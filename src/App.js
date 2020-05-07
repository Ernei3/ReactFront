import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Categories from './Categories'
import Subcategories from './Subcategories'

import './App.css';

function App() {
    return <Router>
        <div id="menu">
            <ul>
                <li>
                    <Link to="/categories">Categories</Link>
                </li>
                <li>
                    <Link to="/subcategories">Subcategories</Link>
                </li>
            </ul>
            <Route path="/categories" component={Categories}/>
            <Route path="/subcategories" component={Subcategories}/>
        </div>
    </Router>
}

export default App;
