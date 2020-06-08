import React, {useContext} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {UserContext} from "../../providers/UserProvider";

export default function AddAddress(props) {

    const { orderId } = useParams();
    const {user, setUser} = useContext(UserContext);

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

        let numberPattern = /\d+[abcdefghijkl]?(\u002F\d+)?/;

        if( !numberPattern.test(data.get('number').toString())){
            alert("Your home or flat address is invalid")
        }
        else {


            let url = `http://localhost:9000/addAddressJson/${orderId}`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'X-Auth-Token': user?.token
                },
                body: JSON.stringify(object),
            }).then(response =>
                response.status >= 400 ? setUser(null) : props.history.push('/addPayment/' + orderId)
            );
        }

    }

    if(user === undefined || user === null) {
        return (
            <Redirect to='/logIn'/>
        )
    }else {
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

}