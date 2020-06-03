import React, {Component} from 'react';

class Categories extends Component {

    constructor() {
        super();
        this.state = {
            categories: [],
        };
    }

    componentDidMount() {
        var url = "http://localhost:9000/categoriesJson"

        fetch(url, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                return results.json();
            }).then(data => {
            let categories = data.map((cat) => {
                return (
                    <div key={cat.id} className="category">
                        <a href={'/subcategory/'+cat.id}>{cat.name}</a>
                    </div>
                )
            })
            this.setState({categories: categories})
        })
    }

    render() {
        return (
            <div className="categories">
                <div className="subtitle">Categories</div>
                {this.state.categories}
            </div>
        )
    }
}

export default Categories;