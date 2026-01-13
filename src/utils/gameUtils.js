export const generateDeck = (size) => {
    const totalCards = size * size;
    const pairCount = totalCards / 2;

    // Use simple emojis or numbers for pairs. 
    // Let's use a predefined list of emojis to make it fun.
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
        '🦁', 'dV', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤',
        '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛'];

    const selectedEmojis = emojis.slice(0, pairCount);
    const deck = [];

    selectedEmojis.forEach((emoji, index) => {
        // Create two cards for each emoji
        deck.push({ id: index * 2, pairId: index, content: emoji });
        deck.push({ id: index * 2 + 1, pairId: index, content: emoji });
    });

    return shuffle(deck);
};

const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};
