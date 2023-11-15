document.addEventListener('DOMContentLoaded', function () {
    const cardGrid = document.querySelector('.card-grid');
    const levelSelect = document.getElementById('level-select');
    let attempts = 0;
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'cyan', 'orange', 'pink'];

    function initializeGame(level) {
        const cards = [];
        let pairs = 4; // Easy
        if (level === 'intermediate') pairs = 6; // Intermediate
        if (level === 'hard') pairs = 8; // Hard

        for (let i = 0; i < pairs; i++) {
            const card1 = createCard(i);
            const card2 = createCard(i);
            cards.push(card1, card2);
        }

        // Shuffle the cards
        cards.sort(() => 0.5 - Math.random());

        // Add cards to the grid
        cardGrid.innerHTML = '';
        cards.forEach(card => cardGrid.appendChild(card));

        updateAttempts();
    }

    function createCard(id) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = id;
        card.style.backgroundColor = colors[id];
        card.addEventListener('click', flipCard);
        return card;
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.id === secondCard.dataset.id;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function updateAttempts() {
        attempts++;
        document.getElementById('attempts').innerText = 'Attempts: ' + attempts;
    }

    levelSelect.addEventListener('change', function() {
        initializeGame(this.value);
    });

    document.getElementById('restart-button').addEventListener('click', function() {
        cardGrid.innerHTML = '';
        attempts = 0;
        initializeGame(levelSelect.value);
    });

    initializeGame(levelSelect.value);
});
