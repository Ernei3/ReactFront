import React, {Component} from 'react';

class OrdersByUser extends Component {

    constructor() {
        super();
        this.state = {
            orders: [],
        };
    }

    componentDidMount() {

        const { userId } = this.props.match.params;

        var url = `http://localhost:9000/ordersJson/${userId}`

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
            this.setState({orders: data})
        })
    }

    render() {

        const { userId } = this.props.match.params;

        return (
            <div className="ordersByUser">
                <div className="sorderByUserTitle">Orders of user {userId}</div>
                {this.state.orders.map((ord) => {
                    return (
                    <div key={ord.id}>
                        <span className="orderId">{ord.id} </span>
                        <span className="orderStatus">{ord.status} </span>
                        <span className="orderDetails"><a href={'/order/'+ord.id}>Details</a> </span>
                    </div>
                    )
                })}
            </div>
        )
    }
}

export default OrdersByUser;