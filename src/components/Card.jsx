import React from 'react';
import './Card.css';

const Card = ({ card, isFlipped, isMatched, onClick }) => {
    const handleClick = () => {
        if (!isFlipped && !isMatched) {
            onClick(card.id);
        }
    };

    return (
        <div className={`card-container ${isFlipped || isMatched ? 'flipped' : ''}`} onClick={handleClick}>
            <div className="card-inner">
                <div className="card-front">
                    {/* Content hidden */}
                    ?
                </div>
                <div className="card-back">
                    {isFlipped || isMatched ? card.content : '?' /* redundant but safe */}
                </div>
            </div>
        </div>
    );
};

export default Card;
