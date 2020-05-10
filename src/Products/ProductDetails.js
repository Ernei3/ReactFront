import React, {Component} from 'react';

class ProductDetails extends Component {

    constructor() {
        super();
        this.state = {
            product: [],
        };
    }

    async componentDidMount() {

        const { id } = this.props.match.params;

        var url1 = `http://localhost:9000/productDetailsJson/${id}`
        const prodResponse = await fetch(url1, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })

        const prodJson = await prodResponse.json();

        this.setState({ product: prodJson });


    }

    render() {
        return (
            <div className="soloProduct">
                <div key={this.state.product.id}>
                    <div className="soloProductName"> {this.state.product.name} </div>
                    <div className="soloProductPrice"> {this.state.product.price} $ </div>
                    <div className="soloProductDescription"> {this.state.product.description} </div>
                    <div className="addToWishLink"><a href={'/addToWishlist/'+this.state.product.id}>Add to Wishlist</a></div>
                    <div className="reviewsLink"><a href={'/reviews/'+this.state.product.id}>Reviews</a></div>
                </div>
            </div>
        )
    }
}

export default ProductDetails;