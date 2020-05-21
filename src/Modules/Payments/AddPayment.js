import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

class AddPayment extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {

        const { orderId } = this.props.match.params;

        event.preventDefault();
        const data = new FormData(event.target);

        let url1 = `http://localhost:9000/orderDetailsJson/${orderId}`;

        const ordResponse = await fetch(url1, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })

        const ordJson = await ordResponse.json();
        ordJson.status = "Accepted";

        let url2 = `http://localhost:9000/updateOrderJson`;

        await fetch(url2, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
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

        console.log(JSON.stringify(object))

        let url3 = `http://localhost:9000/sendPaymentJson`;

        await fetch(url3, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object),
        })


        this.props.history.push('/order/'+orderId);


    }

    render() {

        return (
            <div className="addOrderAddress">
                <form onSubmit={this.handleSubmit}>
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
}

export default withRouter(AddPayment);