import React, { useState, useEffect } from 'react';
import Card from './Card';
import { generateDeck } from '../utils/gameUtils';
import './Game.css';

const Game = () => {
    const [gridSize, setGridSize] = useState(4); // Default 4x4
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]); // indices of cards
    const [matchedCards, setMatchedCards] = useState(new Set()); // set of matched Pair IDs
    const [isLocked, setIsLocked] = useState(false);
    const [moves, setMoves] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    // Initialize game
    useEffect(() => {
        resetGame();
    }, [gridSize]);

    // Timer logic
    useEffect(() => {
        let interval;
        if (startTime && matchedCards.size < (gridSize * gridSize) / 2) {
            interval = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [startTime, matchedCards, gridSize]);

    const resetGame = () => {
        setCards(generateDeck(gridSize));
        setFlippedCards([]);
        setMatchedCards(new Set());
        setIsLocked(false);
        setMoves(0);
        setStartTime(null);
        setElapsedTime(0);
    };

    const handleCardClick = (id) => {
        if (isLocked) return;

        // Find index of clicked card
        const cardIndex = cards.findIndex(c => c.id === id);
        if (cardIndex === -1) return;

        // Start timer on first move
        if (!startTime) {
            setStartTime(Date.now());
        }

        setFlippedCards(prev => [...prev, cardIndex]);

        if (flippedCards.length === 1) {
            setMoves(prev => prev + 1);
            setIsLocked(true);
            const firstCardIndex = flippedCards[0];
            const secondCardIndex = cardIndex;

            const firstCard = cards[firstCardIndex];
            const secondCard = cards[secondCardIndex];

            if (firstCard.pairId === secondCard.pairId) {
                // Match!
                const newMatched = new Set(matchedCards);
                newMatched.add(firstCard.pairId);
                setMatchedCards(newMatched);
                setFlippedCards([]);
                setIsLocked(false);
            } else {
                // No match
                setTimeout(() => {
                    setFlippedCards([]);
                    setIsLocked(false);
                }, 1000);
            }
        }
    };

    const activeFlippedSet = new Set(flippedCards.map(index => cards[index].id));

    return (
        <div className="game-container">
            <div className="controls">
                <label>
                    Grid Size:
                    <select value={gridSize} onChange={(e) => setGridSize(Number(e.target.value))}>
                        <option value={2}>2x2</option>
                        <option value={4}>4x4</option>
                        <option value={6}>6x6</option>
                    </select>
                </label>
                <button onClick={resetGame}>Reset Game</button>
            </div>

            <div className="stats">
                <span>Moves: {moves}</span>
                <span>Time: {elapsedTime}s</span>
            </div>

            <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        isFlipped={activeFlippedSet.has(card.id)}
                        isMatched={matchedCards.has(card.pairId)}
                        onClick={handleCardClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default Game;
