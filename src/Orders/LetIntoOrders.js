import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

class LetIntoOrders extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();
        let userId = event.target.userId.value;


        this.props.history.push('/orders/'+userId);

    }

    render() {
        return (
            <div className="letIntoOrder">
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="userId">User Id:</label>
                    <input id="userId" name="userId" type="number"/>

                    <button>Go to Orders</button>
                </form>
            </div>
        )
    }
}

export default withRouter(LetIntoOrders);