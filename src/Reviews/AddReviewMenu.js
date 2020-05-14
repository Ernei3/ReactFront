import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

class AddReviewMenu extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const { prodId } = this.props.match.params;
        event.preventDefault();
        const data = new FormData(event.target);

        let object = {
            "id": Number(0),
            "title": data.get('title'),
            "content": data.get('content'),
            "product": Number(data.get('product'))
        };




        let url = `http://localhost:9000/addReview/${prodId}`;

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object),
        }).then(this.props.history.push('/reviews/'+prodId));



    }

    render() {
        const { prodId } = this.props.match.params;
        return (
            <div className="addReviewMenu">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" type="text"/>
                    <label htmlFor="content">Content</label>
                    <textarea id="content" name="content"/>
                    <input name="product" id="product" value={prodId} type="hidden"/>
                    <input value="Add review" type="submit"/>
                </form>
        </div>
        )
    }
}

export default withRouter(AddReviewMenu);