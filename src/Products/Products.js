import React, {Component} from 'react';

class Products extends Component {

    constructor() {
        super();
        this.state = {
            products: [],
            subcategories: [],
        };
    }

    async componentDidMount() {

        var url1 = "http://localhost:9000/productsJson"
        const prodResponse = await fetch(url1, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })
        var url2 = "http://localhost:9000/subcategoriesJson"
        const subResponse = await fetch(url2, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })

        const prodJson = await prodResponse.json();
        const subJson = await subResponse.json();

        this.setState({ products: prodJson, subcategories: subJson});


    }

    render() {

        return (
            <div className="products">
                {this.state.products.map(prod => (
                    <div key={prod.id}>
                        <span className="productName"> {prod.name} </span>
                        <span className="productPrice"> {prod.price} $ </span>
                        <a href={'/product/'+prod.id}>Details</a>
                        <span className="subOfProd"> {this.state.subcategories.find( ({ id }) => id === prod.subcategory ).name} </span>
                    </div>
                ))}
            </div>
        )
    }
}

export default Products;