import React, {Component} from 'react';

class OrderDetails extends Component {

    constructor() {
        super();
        this.state = {
            order: "",
            orderAddress: "",
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
        const prodResponse = await fetch(url2, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })

        let url3 = `http://localhost:9000/paymentJson/${ordId}`
        const payResponse = await fetch(url3, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })

        const ordJson = await ordResponse.json();
        const prodJson = await prodResponse.json();
        const payJson = await payResponse.json();
        this.setState({ order: ordJson, orderedProducts: prodJson, orderPayment: payJson});

        if(ordJson.address === 0){

            const handleZero = {
                "id" : 0,
                "city" : "There's no address attached to this order. Please contact the administration.",
                "street": "",
                "country": "",
                "number": ""
            }

            this.setState({ orderAddress: handleZero});
        }else{

            let url4 = `http://localhost:9000/orderAddressJson/${ordJson.address}`
            const adResponse = await fetch(url4, {
                mode: 'cors',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'http://localhost:3000',
                },
                method: 'GET',
            })


            const adJson = await adResponse.json();
            this.setState({ orderAddress: adJson});
        }


    }

    render() {
        return (
            <div className="order">
                <div className="subtitle">Details for order {this.state.order.id}</div>
                <div className="orderUser">User: {this.state.order.user}</div>
                <div className="orderStatus">Status: {this.state.order.status}</div>
                <div className="orderAddress">Sent to: {this.state.orderAddress.street} {this.state.orderAddress.number} {this.state.orderAddress.city} {this.state.orderAddress.country}</div>
                <div className="orderProducts">Ordered products:</div>
                {this.state.orderedProducts.map(op => (
                    <div key={op.id} className="singleProd">
                        <span className="orderedProductName"> {op.name} </span>
                        <span className="orderedProductPrice"> {op.price} $ </span>
                        <div className="orderedProductQuantity"> Quantity: {op.quantity} </div>
                    </div>
                ))}
                <div className="orderPayment">Order payment:</div>
                {this.state.orderPayment.map(op => (
                    <div key={op.id}>
                        <span className="paymentNumber"> {op.number} </span>
                        <span className="paymentName"> {op.name} </span>
                        <span className="paymentDate"> {op.date} </span>
                    </div>
                ))}
                <div className="returnToOrders"><a href={'/order/'+this.state.order.user}>Return to Orders</a></div>
            </div>
        )
    }
}

export default OrderDetails;