import React, {useContext} from 'react';
import {Redirect, useParams} from 'react-router-dom'
import {UserContext} from "../../providers/UserProvider";

export default function AddToWishlist(props){
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


        let url = `http://localhost:9000/addToWishlistJson`;

        fetch(url, {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
                'X-Auth-Token': user?.token
            },
            body: JSON.stringify(object),
        }).then(response =>
            response.status >= 400 ? setUser(null) : props.history.push('/wishlist/')
        );


    }


    if(user === undefined || user === null){
        return(
            <Redirect to='/logIn'/>
        )
    }else{
        return (
            <div className="addToWishMenu">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="15" defaultValue="1" />

                    <input name="product" id="product" value={prodId} type="hidden"/>

                    <button>Add to wishlist</button>
                </form>
            </div>
        )
    }



}