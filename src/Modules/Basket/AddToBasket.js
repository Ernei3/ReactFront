import React, {useContext} from 'react';
import {useParams} from 'react-router-dom'
import {UserContext} from "../../providers/UserProvider";

export default function AddBasketlist(props){
    const {user, setUser} = useContext(UserContext);
    const { prodId } = useParams();

    const handleSubmit = event => {

        event.preventDefault();
        const data = new FormData(event.target);

        let object = {
            "id": Number(0),
            "user": user.id,
            "quantity": Number(data.get('quantity')),
            "product": Number(data.get('product'))
        };


        let url = `http://localhost:9000/addToBasketJson`;

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object),
        }).then(props.history.push('/basket/'));


    }


    return (
        <div className="addToWishMenu">
            <form onSubmit={handleSubmit}>
                <label htmlFor="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity" min="1" max="15" defaultValue="1" />

                <input name="product" id="product" value={prodId} type="hidden"/>

                <button>Add to basket</button>
            </form>
        </div>
    )

}