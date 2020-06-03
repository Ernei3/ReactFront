import React, {useContext, useEffect} from 'react';
import {UserContext} from "../../providers/UserProvider";
import {Redirect} from "react-router-dom";


export default function WishlistByUser(){

    const {user, setUser} = useContext(UserContext);

    const [wishlist, setWishlist] = React.useState([])
    const [products, setProducts] = React.useState([])

    useEffect(function effectFunction() {
        async function fetchData() {
            let url1 = `http://localhost:9000/wishlistJson/${user.id}`
            const wishResponse = await fetch(url1, {
                mode: 'cors',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'http://localhost:3000',
                    'X-Auth-Token': user?.token
                },
                method: 'GET',
            })
            let url2 = "http://localhost:9000/productsJson"
            const prodResponse = await fetch(url2, {
                mode: 'cors',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'http://localhost:3000',
                },
                method: 'GET',
            })

            if (wishResponse.status >= 400 && wishResponse.status < 500) {
                setUser(null);
            }else{

                const wishJson = await wishResponse.json();
                const prodJson = await prodResponse.json();

                setWishlist(wishJson);
                setProducts(prodJson);
            }

        }
        if(user){
            fetchData();
        }
    }, [user]);


    function handleChange(event, wish) {

        wish.quantity = Number(event.target.value);

        let url = `http://localhost:9000/updateWishlistJson`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
                'X-Auth-Token': user?.token
            },
            body: JSON.stringify(wish)
        });

    }

    async function handleClickMove(wish) {

        let url1 = `http://localhost:9000/removeFromWishlistJson`;
        await fetch(url1, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
                'X-Auth-Token': user?.token
            },
            body: JSON.stringify(wish),
        });

        let url2 = `http://localhost:9000/addToBasketJson`;
        await fetch(url2, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
                'X-Auth-Token': user?.token
            },
            body: JSON.stringify(wish),
        }).then(window.location.reload());

    }


    async function handleClickRemove(wish) {

        let url = `http://localhost:9000/removeFromWishlistJson`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
                'X-Auth-Token': user?.token
            },
            body: JSON.stringify(wish),
        });
        window.location.reload();

    }



    if(user === undefined || user === null) {
        return (
            <Redirect to='/logIn'/>
        )
    }else if (wishlist.length > 0 && products.length > 0){
        return(
            <div className="wishlistByUser">
                <div className="subtitle">Wishlist for {user.firstName} {user.lastName}</div>
                {wishlist.map(wish => (
                    <div key={wish.id} className="singleWish">
                        <span className="prodOfWishName"> {products.find( ({ id }) => id === wish.product ).name} </span>
                        <span className="prodOfWishPrice"> {products.find( ({ id }) => id === wish.product ).price} $</span>
                        <div>Quantity:<input type="number" id="quantity" name="quantity" min="1" max="15" defaultValue={wish.quantity} onChange={event => handleChange(event, wish)} /></div>
                        <input type="submit" value="Move to Basket" onClick={() => handleClickMove(wish)}/>
                        <input type="submit" value="Remove" onClick={() => handleClickRemove(wish)}/>
                    </div>
                ))}
            </div>
        )
    }else{
        return (
            <div className="wishlistByUser">
                <div className="subtitle">Wishlist for {user.firstName} {user.lastName}</div>
                <div>Your wishlist is empty!</div>
            </div>
        )
    }




}
