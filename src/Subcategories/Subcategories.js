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
                <div className="subtitle">Subcategories</div>
                {this.state.subcategories.map(sub => (
                <div key={sub.id} className="subcategoryByCat">
                    <a href={'/products/'+sub.id}>
                        <div className="subcategoryName"> {sub.name} </div>
                        <div className="categoryOfSub"> ({this.state.categories.find( ({ id }) => id === sub.category ).name}) </div>
                    </a>
                </div>
                ))}
            </div>
        )
    }
}

export default Subcategories;