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

        let url = `http://localhost:9000/addReview/${prodId}`;

        fetch(url, {
            method: 'POST',
            body: data,
        });

        this.props.history.push('/reviews/'+prodId);

    }

    render() {
        const { prodId } = this.props.match.params;
        return (
            <div className="addReviewMenu">
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text"/>

                <label htmlFor="content">Content</label>
                <input id="content" name="content" type="textarea"/>
                <input name="product" id="product" value={prodId} type="hidden"/>
                <button>Add review</button>
            </form>
        </div>
        )
    }
}

export default withRouter(AddReviewMenu);