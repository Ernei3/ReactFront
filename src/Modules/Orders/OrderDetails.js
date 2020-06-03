import React, {useContext, useEffect} from 'react';
import {UserContext} from "../../providers/UserProvider";
import {useParams} from "react-router-dom";
import { Redirect } from "react-router-dom"


export default function OrderDetails(){

    const { ordId } = useParams();

    const {user, setUser} = useContext(UserContext);

    const [order, setOrder] = React.useState("");
    const [orderAddress, setAddress] = React.useState("");
    const [orderedProducts, setProducts] = React.useState([]);
    const [orderPayment, setPayment] = React.useState([]);


    useEffect(function effectFunction() {
        async function fetchData() {

            let url1 = `http://localhost:9000/orderDetailsJson/${ordId}`
            const ordResponse = await fetch(url1, {
                mode: 'cors',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'http://localhost:3000',
                    'X-Auth-Token': user?.token
                },
                method: 'GET',
            })

            if (ordResponse.status >= 400 && ordResponse.status < 500) {
                setUser(null);
            }else {

                let url2 = `http://localhost:9000/orderedProductsJson/${ordId}`
                const prodResponse = await fetch(url2, {
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                    },
                    method: 'GET',
                })

                let url3 = `http://localhost:9000/paymentJson/${ordId}`
                const payResponse = await fetch(url3, {
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                    },
                    method: 'GET',
                })

                const ordJson = await ordResponse.json();
                const prodJson = await prodResponse.json();
                const payJson = await payResponse.json();

                setOrder(ordJson);
                setProducts(prodJson);
                setPayment(payJson);

                if (ordJson.address === 0) {

                    const handleZero = {
                        "id": 0,
                        "city": "There's no address attached to this order. Please contact the administration.",
                        "street": "",
                        "country": "",
                        "number": ""
                    }

                    setAddress(handleZero);
                } else {

                    let url4 = `http://localhost:9000/orderAddressJson/${ordJson.address}`
                    const adResponse = await fetch(url4, {
                        mode: 'cors',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': 'http://localhost:3000',
                        },
                        method: 'GET',
                    })


                    const adJson = await adResponse.json();
                    setAddress(adJson);
                }

            }

        }
        fetchData();
    }, [ordId]);

    if(user === undefined || user === null){
        return(
            <Redirect to='/logIn'/>
        )
    }else{
        return (
            <div className="order">
                <div className="subtitle">Details for order {order.id}</div>
                <div className="orderUser">User: {user.firstName} {user.lastName}</div>
                <div className="orderStatus">Status: {order.status}</div>
                <div className="orderAddress">Sent to: {orderAddress.street} {orderAddress.number} {orderAddress.city} {orderAddress.country}</div>
                <div className="orderProducts">Ordered products:</div>
                {orderedProducts.map(op => (
                    <div key={op.id} className="singleProd">
                        <span className="orderedProductName"> {op.name} </span>
                        <span className="orderedProductPrice"> {op.price} $ </span>
                        <div className="orderedProductQuantity"> Quantity: {op.quantity} </div>
                    </div>
                ))}
                <div className="orderPayment">Order payment:</div>
                {orderPayment.map(op => (
                    <div key={op.id}>
                        <span className="paymentNumber"> {op.number} </span>
                        <span className="paymentName"> {op.name} </span>
                        <span className="paymentDate"> {op.date} </span>
                    </div>
                ))}
                <div className="returnToOrders"><a href={'/orders'}>Return to Orders</a></div>
            </div>
        )
    }


}
