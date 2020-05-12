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

        const ordJson = await ordResponse.json();
        const prodJson = await prodResponse.json();
        this.setState({ order: ordJson, orderedProducts: prodJson});

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

            let url3 = `http://localhost:9000/orderAddressJson/${ordJson.address}`
            const adResponse = await fetch(url3, {
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
                <div className="orderTitle">Details for order {this.state.order.id}</div>
                <div className="orderUser">User: {this.state.order.user}</div>
                <div className="orderStatus">Status: {this.state.order.status}</div>
                <div className="orderAddress">Sent to: {this.state.orderAddress.street} {this.state.orderAddress.number} {this.state.orderAddress.city} {this.state.orderAddress.country}</div>
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