import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class Checkout extends Component {

    constructor() {
        super();
        this.state = {
            basket: [],
            products: [],
            priceSum: 0,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {

        const { userId } = this.props.match.params;

        let url1 = `http://localhost:9000/basketJson/${userId}`
        const baskResponse = await fetch(url1, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })

        let url2 = "http://localhost:9000/productsJson"
        const prodResponse = await fetch(url2, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })

        const baskJson = await baskResponse.json();
        const prodJson = await prodResponse.json();

        let sum = 0;
        baskJson.forEach(calcPrice);

        function calcPrice(item) {
            sum += item.quantity*prodJson.find( ({ id }) => id === item.product ).price;
        }

        this.setState({basket: baskJson, products: prodJson, priceSum: sum });

    }

    async handleClick() {

        const { userId } = this.props.match.params;

        const object = {
            "id": 0,
            "user": Number(userId),
            "status": "Created",
            "address": 0
        }

        let url1 = `http://localhost:9000/addOrderJson`
        const ordResponse = await fetch(url1, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'POST',
            body: JSON.stringify(object),
        })
        const ordJson = await ordResponse.json()

        let url2 = `http://localhost:9000/addToOrderJson`

        await fetch(url2, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'POST',
            body: JSON.stringify(ordJson),
        })

        this.props.history.push('/addAddress/'+ordJson.id);

    }

    render() {

        if(this.state.priceSum > 0){
            return (
                <div className="checkOut">
                    <div className="checkOutTitle">Check Out</div>
                    {this.state.basket.map(bask => (
                        <div key={bask.id}>
                            <span className="prodOfBaskName"> {this.state.products.find( ({ id }) => id === bask.product ).name} </span>
                            <span className="prodOfBaskPrice"> {this.state.products.find( ({ id }) => id === bask.product ).price} $</span>
                            <span className="prodOfBaskPrice"> Quantity: {bask.quantity}</span>
                        </div>
                    ))}
                    <div className="priceSum">{this.state.priceSum} $</div>
                    <input type="submit" value="Buying" onClick={this.handleClick}/>
                </div>
            )
        }else{
            return (
                <div className="checkOut">Your basket is empty!</div>
            )
        }
    }
}

export default withRouter(Checkout);