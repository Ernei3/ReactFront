import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

class AddToWishlist extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();
        const data = new FormData(event.target);

        let object = {
            "id": Number(0),
            "user": Number(data.get('user')),
            "quantity": Number(data.get('quantity')),
            "product": Number(data.get('product'))
        };


        let url = `http://localhost:9000/addToWishlistJson`;

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object),
        }).then(this.props.history.push('/wishlist/'+data.get('user')));

    }

    render() {
        const { prodId } = this.props.match.params;
        return (
            <div className="addToWishMenu">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="user">User</label>
                    <input id="user" name="user" type="number"/>

                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="15" defaultValue="1" />

                    <input name="product" id="product" value={prodId} type="hidden"/>

                    <button>Add to wishlist</button>
                </form>
            </div>
        )
    }
}

export default withRouter(AddToWishlist);