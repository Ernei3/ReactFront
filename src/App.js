import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Categories from './Categories/Categories'
import Subcategories from './Subcategories/Subcategories'

import './App.css';
import SubByCat from "./Subcategories/SubByCat";
import Products from "./Products/Products";
import ProductsBySub from "./Products/ProductsBySub";
import ProductDetails from "./Products/ProductDetails";
import ReviewsByProd from "./Reviews/ReviewsByProd";
import AddReviewMenu from "./Reviews/AddReviewMenu";

function App() {
    return <Router>
        <div id="menu">
            <nav>
                <ul>
                    <li>
                        <Link to="/categories">Categories</Link>
                    </li>
                    <li>
                        <Link to="/subcategories">Subcategories</Link>
                    </li>
                    <li>
                        <Link to="/allProducts">Products</Link>
                    </li>
                </ul>
            </nav>
            <Route path="/categories" component={Categories}/>
            <Route path="/subcategories" component={Subcategories}/>
            <Route path="/subcategory/:catId" component={SubByCat}/>
            <Route path="/allProducts" component={Products}/>
            <Route path="/products/:subId" component={ProductsBySub}/>
            <Route path="/product/:id" component={ProductDetails}/>
            <Route path="/reviews/:prodId" component={ReviewsByProd}/>
            <Route path="/addReview/:prodId" component={AddReviewMenu}/>
        </div>
    </Router>
}

export default App;
