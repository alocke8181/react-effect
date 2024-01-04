import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";


const BASE_URL = 'https://deckofcardsapi.com/api/deck';

const Deck = ()=>{
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [shuffling, setShuffling] = useState(false);

    useEffect(()=>{
        axios.get(`${BASE_URL}/new/shuffle/`).then((deck) =>{
            setDeck(deck.data);
        });
    },[]);

    async function draw(){
        try{
            let draw = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/`);
            if(draw.data.remaining == 0){
                throw new Error('No More Cards!');
            }

            let card = draw.data.cards[0];

            setDrawn(d => [...d, {
                id: card.code,
                name: card.suit + " " + card.value,
                image: card.image
            }])

        }catch(e){
            alert(e);
        }
    }

    async function shuffle(){
        setShuffling(true);
        try{
            await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle/`);
            setDrawn([]);
        }catch(e){
            alert(e);
        }finally{
            setShuffling(false);
        }
    }

    function showDrawBtn(){
        if(!deck){
            return null;
        }else{
            return (
                <button
                    className="Deck-draw-btn"
                    onClick={draw}
                    disabled={shuffling}>
                Draw</button>
            )
        }
    }

    function showShuffleBtn(){
        if(!deck){
            return null;
        }else{
            return (
                <button
                    className="Deck-shuffle-btn"
                    onClick={shuffle}
                    disabled={shuffling}>
                Shuffle</button>
            )
        }
    }

    return (
        <div className="Deck">
            {showDrawBtn()}
            {showShuffleBtn()}
            <div className="Deck-cards" >
                {drawn.map((card) => <Card key={card.id} name={card.name} image={card.image}/>)}
            </div>
        </div>
    )

}

export default Deck