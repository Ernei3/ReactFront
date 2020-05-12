import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

class AddAddress extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        const { orderId } = this.props.match.params;

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
        }).then(this.props.history.push('/addPayment'+orderId))


    }

    render() {

        return (
            <div className="addOrderAddress">
                <form onSubmit={this.handleSubmit}>
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

export default withRouter(AddAddress);