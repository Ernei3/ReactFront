import React, {Component} from 'react';

class Subcategories extends Component {

    constructor() {
        super();
        this.state = {
            subcategories: [],
            categories: [],
        };
    }

    async componentDidMount() {

        var url1 = "http://localhost:9000/subcategoriesJson"
        const subResponse = await fetch(url1, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })
        var url2 = "http://localhost:9000/categoriesJson"
        const catResponse = await fetch(url2, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })
        const subJson = await subResponse.json();
        const catJson = await catResponse.json();

        this.setState({ subcategories: subJson, categories: catJson });


    }

    render() {

        return (
            <div className="subcategories">
                {this.state.subcategories.map(sub => (
                <div key={sub.id}>
                    <a href={'/products/'+sub.id}>
                        <span className="subcategoryName"> {sub.name} </span>
                        <span className="categoryOfSub"> {this.state.categories.find( ({ id }) => id === sub.category ).name} </span>
                    </a>
                </div>
                ))}
            </div>
        )
    }
}

export default Subcategories;