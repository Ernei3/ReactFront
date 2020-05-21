import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class WishlistByUser extends Component {

    constructor() {
        super();
        this.state = {
            wishlist: [],
            products: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClickRemove.bind(this);
        this.handleClick = this.handleClickMove.bind(this);
    }

    async componentDidMount() {

        const { userId } = this.props.match.params;

        var url1 = `http://localhost:9000/wishlistJson/${userId}`
        const wishResponse = await fetch(url1, {
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

        const wishJson = await wishResponse.json();
        const prodJson = await prodResponse.json();

        this.setState({ wishlist: wishJson, products: prodJson });


    }

    handleChange(id) {
        let subId = "submit"+id;
        ReactDOM.findDOMNode(this.refs[subId]).click()
    }

    async handleClickMove(wish) {

        let url1 = `http://localhost:9000/removeFromWishlistJson`;

        await fetch(url1, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(wish),
        });

        let url2 = `http://localhost:9000/addToBasketJson`;

        await fetch(url2, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(wish),
        });

        window.location.reload();

    }

    handleClickRemove(wish) {

        let url = `http://localhost:9000/removeFromWishlistJson`;

        fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(wish),
        });
        window.location.reload();

    }

    handleSubmit(event) {


        event.preventDefault();
        const data = new FormData(event.target);

        let object = {
            "id": Number(data.get('id')),
            "user": data.get('user'),
            "quantity": Number(data.get('quantity')),
            "product": Number(data.get('product'))
        };

        let url = `http://localhost:9000/updateWishlistJson`;

        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object),
        });


    }

    render() {

        const { userId } = this.props.match.params;

        return (
            <div className="wishlistByUser">
                <div className="subtitle">Wishlist for {userId}</div>
                {this.state.wishlist.map(wish => (
                    <div key={wish.id} className="singleWish">
                        <span className="prodOfWishName"> {this.state.products.find( ({ id }) => id === wish.product ).name} </span>
                        <span className="prodOfWishPrice"> {this.state.products.find( ({ id }) => id === wish.product ).price} $</span>
                        <form onSubmit={this.handleSubmit}>
                            <input name="id" id="id" value={wish.id} type="hidden" />
                            <input name="user" id="user" value={wish.user} type="hidden" />
                            Quantity:<input type="number" id="quantity" name="quantity" min="1" max="15" defaultValue={wish.quantity} onChange={() => this.handleChange(wish.id)} />
                            <input name="product" id="product" value={wish.product} type="hidden" />
                            <input type="submit" value="Update" ref={"submit"+wish.id} style={{display: 'none'}}/>
                        </form>
                            <input type="submit" value="Move to Basket" ref={"delete"+wish.id} onClick={() => this.handleClickMove(wish)}/>
                            <input type="submit" value="Remove" ref={"delete"+wish.id} onClick={() => this.handleClickRemove(wish)}/>
                    </div>
                ))}
            </div>
        )
    }
}

export default WishlistByUser;