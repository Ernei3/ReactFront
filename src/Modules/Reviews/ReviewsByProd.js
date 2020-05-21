import React, {Component} from 'react';

class ReviewsByProd extends Component {

    constructor() {
        super();
        this.state = {
            reviews: [],
            product: [],
        };
    }

    async componentDidMount() {

        const { prodId } = this.props.match.params;

        var url1 = `http://localhost:9000/reviewsJson/${prodId}`
        const revResponse = await fetch(url1, {
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

        const revJson = await revResponse.json();
        const prodJson = await prodResponse.json();

        this.setState({ reviews: revJson, product: prodJson.find( ({ id }) => id.toString() === prodId.toString() ) });


    }

    render() {
        return (
            <div className="reviewsByProd">
                <div className="subtitle">{this.state.product.name}</div>
                <div className="returnToProduct"><a href={'/product/'+this.state.product.id}>Return to Product</a></div>
                {this.state.reviews.map(rev => (
                    <div key={rev.id} className="review">
                        <div className="reviewTitle"> {rev.title} </div>
                        <div className="reviewContent"> {rev.content} </div>
                    </div>
                ))}
                <div className="addReviewToProd"><a href={'/addReview/'+this.state.product.id}>Add Review</a></div>
            </div>
        )
    }
}

export default ReviewsByProd;