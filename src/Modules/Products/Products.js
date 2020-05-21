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
                <div className="subtitle">All Products</div>
                {this.state.products.map(prod => (
                    <div key={prod.id} className="allProducts">
                        <a href={'/product/'+prod.id}>
                            <div className="productName"> {prod.name}</div>
                            <div className="productPrice"> {prod.price} $ </div>
                            <div className="subOfProd"> ({this.state.subcategories.find( ({ id }) => id === prod.subcategory ).name}) </div>
                        </a>
                    </div>
                ))}
            </div>
        )
    }
}

export default Products;