import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

class LetIntoWishlist extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();
        let userId = event.target.userId.value;


        this.props.history.push('/wishlist/'+userId);

    }

    render() {
        return (
            <div className="letIntoWishlist">
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="userId">User Id:</label>
                    <input id="userId" name="userId" type="number"/>

                    <button>Go to wishlist</button>
                </form>
            </div>
        )
    }
}

export default withRouter(LetIntoWishlist);