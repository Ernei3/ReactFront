import React, {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {UserContext} from "../../providers/UserProvider";

export default function AddAddress(props) {

    const { orderId } = useParams();

    function handleSubmit(event) {

        event.preventDefault();
        const data = new FormData(event.target);

        let object = {
            "id": Number(0),
            "country": data.get('country'),
            "city": data.get('city'),
            "street": data.get('street'),
            "number": data.get('number')
        };


        let url = `http://localhost:9000/addAddressJson/${orderId}`;

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object),
        }).then(props.history.push('/addPayment/'+orderId))

    }


    return (
        <div className="addOrderAddress">
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">Country</label>
                <input id="country" name="country" type="text"/>
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text"/>
                <label htmlFor="street">Street</label>
                <input id="street" name="street" type="text"/>
                <label htmlFor="number">Number</label>
                <input id="number" name="number" type="text"/>
                <button>Send to this Address</button>
            </form>
        </div>
    )

}