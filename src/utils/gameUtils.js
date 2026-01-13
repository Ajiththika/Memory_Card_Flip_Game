export const themes = {
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
        '🦁', 'dV', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤',
        '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛'],
    fruits: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒',
        '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬',
        '🥒', '🌽', '🥕', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨'],
    space: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌙', '🌚',
        '🌛', '🌜', '🌝', '🌞', '🌟', '⭐️', '🌠', '🌌', '🪐', '💫',
        '☄️', '🚀', '🛸', '🛰', '👽', '👾', '🤖', '🔭', '🌍', '🌎']
};

export const generateDeck = (size, theme = 'animals') => {
    const totalCards = size * size;
    const pairCount = totalCards / 2;

    const selectedTheme = themes[theme] || themes.animals;
    const selectedEmojis = selectedTheme.slice(0, pairCount);

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
