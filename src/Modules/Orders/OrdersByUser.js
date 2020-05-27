import React, {useContext, useEffect} from 'react';
import {UserContext} from "../../providers/UserProvider";
import {Redirect, useParams} from "react-router-dom";


export default function OrdersByUser(){


    const {user, setUser} = useContext(UserContext);
    const [orders, setOrders] = React.useState([]);

    useEffect(function effectFunction() {
        async function fetchData() {

            let url = `http://localhost:9000/ordersJson/${user.id}`

            const response = await fetch(url, {
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'http://localhost:3000',
                    'X-Auth-Token': user?.token
                },
                method: 'GET',
            })

            if (response.status >= 400 && response.status < 500) {
                setUser(null);
            }else {
                const resJson = await response.json();
                setOrders(resJson);
            }



        }
        if(user){
            fetchData();
        }
    }, [user]);


    if(user === undefined || user === null) {
        return (
            <Redirect to='/logIn'/>
        )
    }else {
        return (
            <div className="ordersByUser">
                <div className="subtitle">Orders of user {user.firstName} {user.lastName}</div>
                {orders.map((ord) => {
                    return (
                        <div key={ord.id} className="singleOrder">
                            <span className="orderId">{ord.id} </span>
                            <span className="orderStatus">{ord.status} </span>
                            <span className="orderDetails"><a href={'/order/' + ord.id}>Details</a> </span>
                        </div>
                    )
                })}
            </div>
        )
    }



}
