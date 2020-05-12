import React, {Component} from 'react';

class OrderDetails extends Component {

    constructor() {
        super();
        this.state = {
            order: "",
            orderAddress: [],
            orderedProducts: [],
            orderPayment: [],
        };
    }

    async componentDidMount() {

        const { ordId } = this.props.match.params;

        let url1 = `http://localhost:9000/orderDetailsJson/${ordId}`
        const ordResponse = await fetch(url1, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })
        let url2 = `http://localhost:9000/orderedProductsJson/${ordId}`
        const catResponse = await fetch(url2, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })
        const ordJson = await ordResponse.json();
        const catJson = await catResponse.json();

        this.setState({ order: ordJson, orderedProducts: catJson });


    }

    render() {
        return (
            <div className="order">
                <div className="orderTitle">Details for order {this.state.order.id}</div>
                <div className="orderUser">User: {this.state.order.user}</div>
                <div className="orderStatus">Status: {this.state.order.status}</div>
                <div className="orderAddress">Sent to: {this.state.order.address}</div>
                <div className="orderProducts">Ordered products:</div>
                {this.state.orderedProducts.map(op => (
                    <div key={op.id}>
                        <span className="orderedProductName"> {op.name} </span>
                        <span className="orderedProductPrice"> {op.price} $ </span>
                        <span className="orderedProductQuantity"> Quantity: {op.quantity} </span>
                    </div>
                ))}
            </div>
        )
    }
}

export default OrderDetails;