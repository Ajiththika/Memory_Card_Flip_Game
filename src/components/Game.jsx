import React, { useState, useEffect } from 'react';
import Card from './Card';
import Confetti from './Confetti';
import { generateDeck } from '../utils/gameUtils';
import './Game.css';

const Game = () => {
    const [gridSize, setGridSize] = useState(4);
    const [theme, setTheme] = useState('animals');
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState(new Set());
    const [isLocked, setIsLocked] = useState(false);
    const [moves, setMoves] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isWon, setIsWon] = useState(false);

    // High Scores State: Key format `highScore_${gridSize}`
    const [bestTime, setBestTime] = useState(null);
    const [bestMoves, setBestMoves] = useState(null);

    useEffect(() => {
        resetGame();
    }, [gridSize, theme]);

    useEffect(() => {
        // Load high scores for current grid size
        const storedBestTime = localStorage.getItem(`memory_best_time_${gridSize}`);
        const storedBestMoves = localStorage.getItem(`memory_best_moves_${gridSize}`);
        setBestTime(storedBestTime ? Number(storedBestTime) : null);
        setBestMoves(storedBestMoves ? Number(storedBestMoves) : null);
    }, [gridSize]);

    useEffect(() => {
        let interval;
        if (startTime && !isWon) {
            interval = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [startTime, isWon]);

    const resetGame = () => {
        setCards(generateDeck(gridSize, theme));
        setFlippedCards([]);
        setMatchedCards(new Set());
        setIsLocked(false);
        setMoves(0);
        setStartTime(null);
        setElapsedTime(0);
        setIsWon(false);
    };

    const checkWin = (newMatchedSize) => {
        const totalPairs = (gridSize * gridSize) / 2;
        if (newMatchedSize === totalPairs) {
            setIsWon(true);
            // Update High Scores
            const currentBestTime = bestTime === null ? Infinity : bestTime;
            const currentBestMoves = bestMoves === null ? Infinity : bestMoves;

            if (elapsedTime < currentBestTime) {
                localStorage.setItem(`memory_best_time_${gridSize}`, elapsedTime);
                setBestTime(elapsedTime);
            }
            if (moves + 1 < currentBestMoves) { // moves + 1 because this move completed it
                localStorage.setItem(`memory_best_moves_${gridSize}`, moves + 1);
                setBestMoves(moves + 1);
            }
        }
    };

    const handleCardClick = (id) => {
        if (isLocked || isWon) return;

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
                checkWin(newMatched.size);
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
            {isWon && <Confetti />}
            <div className="controls">
                <label>
                    Grid:
                    <select value={gridSize} onChange={(e) => setGridSize(Number(e.target.value))}>
                        <option value={2}>2x2</option>
                        <option value={4}>4x4</option>
                        <option value={6}>6x6</option>
                    </select>
                </label>
                <label>
                    Theme:
                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="animals">Animals 🐶</option>
                        <option value="fruits">Fruits 🍎</option>
                        <option value="space">Space 🚀</option>
                    </select>
                </label>
                <button onClick={resetGame}>Reset Game</button>
            </div>

            <div className="stats">
                <div className="stat-group">
                    <span>Moves: {moves}</span>
                    {bestMoves !== null && <span className="best-score">Best: {bestMoves}</span>}
                </div>
                <div className="stat-group">
                    <span>Time: {elapsedTime}s</span>
                    {bestTime !== null && <span className="best-score">Best: {bestTime}s</span>}
                </div>
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
