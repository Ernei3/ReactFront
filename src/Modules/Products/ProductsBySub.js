import React, {Component} from 'react';

class ProductsBySub extends Component {

    constructor() {
        super();
        this.state = {
            products: [],
            subcategoryName: "",
        };
    }

    async componentDidMount() {

        const { subId } = this.props.match.params;

        var url1 = `http://localhost:9000/productsBySubJson/${subId}`
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

        this.setState({ products: prodJson, subcategoryName: subJson.find( ({ id }) => id.toString() === subId.toString() ).name });


    }

    render() {
        return (
            <div className="products">
                <div className="subtitle">{this.state.subcategoryName}</div>
                {this.state.products.map(prod => (
                    <div key={prod.id} className="productBySub">
                        <a href={'/product/'+prod.id}>
                            <div className="productName"> {prod.name} </div>
                            <div className="productPrice"> {prod.price} $ </div>
                        </a>
                    </div>
                ))}
            </div>
        )
    }
}

export default ProductsBySub;