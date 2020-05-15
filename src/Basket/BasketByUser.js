import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class BasketByUser extends Component {

    constructor() {
        super();
        this.state = {
            basket: [],
            products: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {

        const { userId } = this.props.match.params;

        var url1 = `http://localhost:9000/basketJson/${userId}`
        const baskResponse = await fetch(url1, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })
        var url2 = "http://localhost:9000/productsJson"
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

        this.setState({ basket: baskJson, products: prodJson });


    }

    handleChange(id) {
        let subId = "submit"+id;
        ReactDOM.findDOMNode(this.refs[subId]).click()
    }

    handleClick(bask) {

        let url = `http://localhost:9000/removeFromBasketJson`;

        fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bask),
        });
        window.location.reload();

    }

    handleSubmit(event) {


        event.preventDefault();
        const data = new FormData(event.target);

        let object = {
            "id": Number(data.get('id')),
            "user": Number(data.get('user')),
            "quantity": Number(data.get('quantity')),
            "product": Number(data.get('product'))
        };

        let url = `http://localhost:9000/updateBasketJson`;

        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object),
        });


    }

    render() {

        const { userId } = this.props.match.params;

        return (
            <div className="basketByUser">
                <div className="subtitle">Basket for {userId}</div>
                {this.state.basket.map(bask => (
                    <div key={bask.id} className="singleBask">
                        <span className="prodOfBaskName"> {this.state.products.find( ({ id }) => id === bask.product ).name} </span>
                        <span className="prodOfBaskPrice"> {this.state.products.find( ({ id }) => id === bask.product ).price} $</span>
                        <form onSubmit={this.handleSubmit}>
                            <input name="id" id="id" value={bask.id} type="hidden" />
                            <input name="user" id="user" value={bask.user} type="hidden" />
                            Quantity:<input type="number" id="quantity" name="quantity" min="1" max="15" defaultValue={bask.quantity} onChange={() => this.handleChange(bask.id)} />
                            <input name="product" id="product" value={bask.product} type="hidden" />
                            <input type="submit" value="Update" ref={"submit"+bask.id} style={{display: 'none'}}/>
                        </form>
                            <input type="submit" value="Remove" ref={"delete"+bask.id} onClick={() => this.handleClick(bask)}/>
                    </div>
                ))}
                <div className="checkOut"><a href={'/checkOut/'+userId}>Checkout</a></div>
            </div>
        )
    }
}

export default BasketByUser;