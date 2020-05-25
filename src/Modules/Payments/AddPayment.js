import React, {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {UserContext} from "../../providers/UserProvider";

export default function AddPayment(props) {

    const { orderId } = useParams();
    const {user, setUser} = useContext(UserContext);

    async function handleSubmit(event) {

        event.preventDefault();
        const data = new FormData(event.target);

        let url1 = `http://localhost:9000/orderDetailsJson/${orderId}`;

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

        const ordJson = await ordResponse.json();
        ordJson.status = "Accepted";

        let url2 = `http://localhost:9000/updateOrderJson`;

        await fetch(url2, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
                'X-Auth-Token': user?.token
            },
            body: JSON.stringify(ordJson),
        })

        let object = {
            "id": Number(0),
            "number": data.get('number'),
            "name": data.get('name'),
            "date": data.get('date'),
            "code": data.get('code'),
            "order": Number(orderId)
        };

        let url3 = `http://localhost:9000/sendPaymentJson`;

        await fetch(url3, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object),
        })


        props.history.push('/order/'+orderId);


    }


    return (
        <div className="addOrderAddress">
            <form onSubmit={handleSubmit}>
                <label htmlFor="number">Number</label>
                <input id="number" name="number" type="text"/>
                <label htmlFor="name">Name on the card:</label>
                <input id="name" name="name" type="text"/>
                <label htmlFor="date">Expiration date:</label>
                <input id="date" name="date" type="text"/>
                <label htmlFor="code">Code</label>
                <input id="code" name="code" type="text"/>
                <button>Pay</button>
            </form>
        </div>
    )



}