import React, {Component} from 'react';

class SubByCat extends Component {

    constructor() {
        super();
        this.state = {
            subcategories: [],
            categoryName: "",
        };
    }

    async componentDidMount() {

        const { catId } = this.props.match.params;

        var url1 = `http://localhost:9000/subByCatJson/${catId}`
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

        this.setState({ subcategories: subJson, categoryName: catJson.find( ({ id }) => id.toString() === catId.toString() ).name });


    }

    render() {
        return (
            <div className="subcategories">
                <div className="subtitle">{this.state.categoryName}</div>
                {this.state.subcategories.map(sub => (
                    <div key={sub.id} className="subcategory">
                        <a href={'/products/'+sub.id}>{sub.name}</a>
                    </div>
                ))}
            </div>
        )
    }
}

export default SubByCat;