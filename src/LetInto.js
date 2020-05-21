import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

class LetInto extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        const { point } = this.props.match.params;

        event.preventDefault();
        let userId = event.target.userId.value;

        if(point === "wishlist"){
            this.props.history.push('/wishlist/'+userId);
        }else if(point === "basket"){
            this.props.history.push('/basket/'+userId);
        }else if(point === "orders"){
            this.props.history.push('/orders/'+userId);
        }

    }

    render() {
        return (
            <div className="letInto">
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="userId">User Id:</label>
                    <input id="userId" name="userId" type="text" />

                    <button>Go</button>
                </form>
            </div>
        )
    }
}

export default withRouter(LetInto);