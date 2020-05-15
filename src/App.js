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
import WishlistByUser from "./Wishlist/WishlistByUser";
import AddToWishlist from "./Wishlist/AddToWishlist";
import BasketByUser from "./Basket/BasketByUser";
import AddToBasket from "./Basket/AddToBasket";
import OrdersByUser from "./Orders/OrdersByUser";
import OrderDetails from "./Orders/OrderDetails";
import CheckOut from "./Orders/Checkout";
import AddAddress from "./OrderAddress/AddAddress";
import AddPayment from "./Payments/AddPayment";
import LetInto from "./LetInto";

function App() {
    return <Router>
        <div className="content">
            <div className="menuDiv"><nav>
                <ul className="menu">
                    <li className="menu_button">
                        <Link to="/categories">Categories</Link>
                    </li>
                    <li className="menu_button">
                        <Link to="/subcategories">Subcategories</Link>
                    </li>
                    <li className="menu_button">
                        <Link to="/allProducts">Products</Link>
                    </li>
                    <li className="menu_button">
                        <Link to="/enter/wishlist">Wishlist</Link>
                    </li>
                    <li className="menu_button">
                        <Link to="/enter/basket">Basket</Link>
                    </li>
                    <li className="menu_button">
                        <Link to="/enter/orders">Orders</Link>
                    </li>
                </ul>
            </nav></div>
            <Route path="/categories" component={Categories}/>
            <Route path="/subcategories" component={Subcategories}/>
            <Route path="/subcategory/:catId" component={SubByCat}/>
            <Route path="/allProducts" component={Products}/>
            <Route path="/products/:subId" component={ProductsBySub}/>
            <Route path="/product/:id" component={ProductDetails}/>
            <Route path="/reviews/:prodId" component={ReviewsByProd}/>
            <Route path="/addReview/:prodId" component={AddReviewMenu}/>
            <Route path="/enter/:point" component={LetInto}/>
            <Route path="/wishlist/:userId" component={WishlistByUser}/>
            <Route path="/addToWishlist/:prodId" component={AddToWishlist}/>
            <Route path="/basket/:userId" component={BasketByUser}/>
            <Route path="/addToBasket/:prodId" component={AddToBasket}/>
            <Route path="/orders/:userId" component={OrdersByUser}/>
            <Route path="/order/:ordId" component={OrderDetails}/>
            <Route path="/checkOut/:userId" component={CheckOut}/>
            <Route path="/addAddress/:orderId" component={AddAddress}/>
            <Route path="/addPayment/:orderId" component={AddPayment}/>
        </div>
    </Router>
}

export default App;
