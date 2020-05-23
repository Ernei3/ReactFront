import React, {useContext, useEffect} from 'react';
import {UserContext} from "../../providers/UserProvider";


export default function Checkout(props){

    const {user, setUser} = useContext(UserContext);

    const [basket, setBasket] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [priceSum, setPriceSum] = React.useState(0);


    useEffect(function effectFunction() {
        async function fetchData() {
            let url1 = `http://localhost:9000/basketJson/${user.id}`
            const baskResponse = await fetch(url1, {
                mode: 'cors',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'http://localhost:3000',
                },
                method: 'GET',
            })
            let url2 = "http://localhost:9000/productsJson"
            const prodResponse = await fetch(url2, {
                mode: 'cors',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'http://localhost:3000',
                },
                method: 'GET',
            })

            const baskJson = await baskResponse.json();
            const prodJson = await prodResponse.json();

            let sum = 0;
            baskJson.forEach(calcPrice);

            function calcPrice(item) {
                sum += item.quantity*prodJson.find( ({ id }) => id === item.product ).price;
            }


            setBasket(baskJson);
            setProducts(prodJson);
            setPriceSum(sum);

        }
        fetchData();
    }, [user.id]);


    async function handleClick() {

        const object = {
            "id": 0,
            "user": user.id,
            "status": "Created",
            "address": 0
        }

        let url1 = `http://localhost:9000/addOrderJson`
        const ordResponse = await fetch(url1, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'POST',
            body: JSON.stringify(object),
        })
        const ordJson = await ordResponse.json()

        let url2 = `http://localhost:9000/addToOrderJson`

        await fetch(url2, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'POST',
            body: JSON.stringify(ordJson),
        }).then(props.history.push('/addAddress/'+ordJson.id));

    }

    if(priceSum > 0){
        return (
            <div className="checkOut">
                <div className="subtitle">Check Out</div>
                {basket.map(bask => (
                    <div key={bask.id} className="singleBask">
                        <span className="prodOfBaskName"> {products.find( ({ id }) => id === bask.product ).name} </span>
                        <span className="prodOfBaskPrice"> {products.find( ({ id }) => id === bask.product ).price} $</span>
                        <div className="prodOfBaskPrice"> Quantity: {bask.quantity}</div>
                    </div>
                ))}
                <div className="priceSum">
                    <span className="hereSum">Altogether: </span>
                    <span className="finalPrice">{priceSum} $</span>
                </div>
                <input type="submit" value="Buying" onClick={handleClick}/>
            </div>
        )
    }else{
        return (
            <div className="checkOut">Your basket is empty!</div>
        )
    }





}

/*
class Checkout extends Component {




    render() {


    }
}

export default withRouter(Checkout);*/