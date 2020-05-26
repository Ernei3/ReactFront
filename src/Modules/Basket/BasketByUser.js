import React, {useContext, useEffect} from 'react';
import {UserContext} from "../../providers/UserProvider";
import {Redirect} from "react-router-dom";


export default function BasketByUser(){

    const {user, setUser} = useContext(UserContext);

    const [basket, setBasket] = React.useState([])
    const [products, setProducts] = React.useState([])

    useEffect(function effectFunction() {
        async function fetchData() {
            let url1 = `http://localhost:9000/basketJson/${user.id}`
            const baskResponse = await fetch(url1, {
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

            if (baskResponse.status >= 400 && baskResponse.status < 500) {
                setUser(null);
            }else {

                const baskJson = await baskResponse.json();
                const prodJson = await prodResponse.json();

                setBasket(baskJson);
                setProducts(prodJson)
            }

        }
        if(user){
            fetchData();
        }
    }, [user]);


    function handleChange(event, bask) {

        bask.quantity = Number(event.target.value);

        let url = `http://localhost:9000/updateBasketJson`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
                'X-Auth-Token': user?.token
            },
            body: JSON.stringify(bask)
        });

    }

    function handleClick(bask) {

        let url = `http://localhost:9000/removeFromBasketJson`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
                'X-Auth-Token': user?.token
            },
            body: JSON.stringify(bask),
        });
        window.location.reload();

    }


    if(user === undefined || user === null) {
        return (
            <Redirect to='/logIn'/>
        )
    }else if (basket.length > 0 && products.length > 0){
        return(
            <div className="basketByUser">
                <div className="subtitle">Basket for {user.firstName} {user.lastName}</div>
                {basket.map(bask => (
                    <div key={bask.id} className="singleBask">
                        <span className="prodOfBaskName"> {products.find( ({ id }) => id === bask.product ).name} </span>
                        <span className="prodOfBaskPrice"> {products.find( ({ id }) => id === bask.product ).price} $</span>
                        <div>Quantity:<input type="number" id="quantity" name="quantity" min="1" max="15" defaultValue={bask.quantity} onChange={event => handleChange(event, bask)} /></div>
                        <input type="submit" value="Remove" onClick={() => handleClick(bask)}/>
                    </div>
                ))}
                <div className="checkOut"><a href={'/checkOut/'}>Checkout</a></div>
            </div>
        )
    }else{
        return (
            <div className="basketByUser">
                <div className="subtitle">Basket for {user.firstName} {user.lastName}</div>
                <div>Your basket is empty!</div>
            </div>
        )
    }


}
