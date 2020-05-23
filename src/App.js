import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Categories from './Modules/Categories/Categories'
import Subcategories from './Modules/Subcategories/Subcategories'

import './App.css';
import SubByCat from "./Modules/Subcategories/SubByCat";
import Products from "./Modules/Products/Products";
import ProductsBySub from "./Modules/Products/ProductsBySub";
import ProductDetails from "./Modules/Products/ProductDetails";
import ReviewsByProd from "./Modules/Reviews/ReviewsByProd";
import AddReviewMenu from "./Modules/Reviews/AddReviewMenu";
import WishlistByUser from "./Modules/Wishlist/WishlistByUser";
import AddToWishlist from "./Modules/Wishlist/AddToWishlist";
import BasketByUser from "./Modules/Basket/BasketByUser";
import AddToBasket from "./Modules/Basket/AddToBasket";
import OrdersByUser from "./Modules/Orders/OrdersByUser";
import OrderDetails from "./Modules/Orders/OrderDetails";
import CheckOut from "./Modules/Orders/Checkout";
import AddAddress from "./Modules/OrderAddress/AddAddress";
import AddPayment from "./Modules/Payments/AddPayment";
import UserProvider from "./providers/UserProvider";
import Oauth from "./Auth/Oauth";
import LogNav from "./Auth/LogNav";


function App() {
    return <Router>
        <UserProvider>
            <div className="content">
                <div className="menuDiv">
                    <nav>
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
                                <Link to="/wishlist">Wishlist</Link>
                            </li>
                            <li className="menu_button">
                                <Link to="/basket">Basket</Link>
                            </li>
                            <li className="menu_button">
                                <Link to="/orders">Orders</Link>
                            </li>
                        </ul>
                    </nav>
                    <LogNav />
                </div>
                <Route path="/categories" component={Categories}/>
                <Route path="/subcategories" component={Subcategories}/>
                <Route path="/subcategory/:catId" component={SubByCat}/>
                <Route path="/allProducts" component={Products}/>
                <Route path="/products/:subId" component={ProductsBySub}/>
                <Route path="/product/:id" component={ProductDetails}/>
                <Route path="/reviews/:prodId" component={ReviewsByProd}/>
                <Route path="/addReview/:prodId" component={AddReviewMenu}/>
                <Route path="/wishlist" component={WishlistByUser}/>
                <Route path="/addToWishlist/:prodId" component={AddToWishlist}/>
                <Route path="/basket" component={BasketByUser}/>
                <Route path="/addToBasket/:prodId" component={AddToBasket}/>
                <Route path="/orders" component={OrdersByUser}/>
                <Route path="/order/:ordId" component={OrderDetails}/>
                <Route path="/checkOut/" component={CheckOut}/>
                <Route path="/addAddress/:orderId" component={AddAddress}/>
                <Route path="/addPayment/:orderId" component={AddPayment}/>
                <Route path="/oauth/:provider" component={Oauth} />
            </div>
        </UserProvider>
    </Router>
}

export default App;
