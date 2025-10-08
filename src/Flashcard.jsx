import { useState } from "react";

function Flashcard({ cards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hasGuessed, setHasGuessed] = useState(false);
  const [cardOrder, setCardOrder] = useState(cards.map((_, i) => i));
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  const handleFlip = () => {
    setFlipped((s) => !s);
  };

  const handleSubmitGuess = () => {
    if (userGuess.trim() === "") return;
    
    const normalizeString = (str) => {
      return str.toLowerCase()
                .trim()
                .replace(/[^\w\s]/g, '')
                .replace(/\s+/g, ' ');
    };
    
    const correctAnswer = normalizeString(cards[index].answer);
    const guess = normalizeString(userGuess);
    
    const isExactMatch = correctAnswer === guess;
    const isPartialMatch = correctAnswer.includes(guess) || guess.includes(correctAnswer);
    
    const correctWords = correctAnswer.split(' ');
    const guessWords = guess.split(' ');
    
    const keyWordsMatch = guessWords.some(word => 
      word.length > 3 && correctWords.some(correctWord => 
        (correctWord.includes(word) && word.length > correctWord.length * 0.5) ||
        (word.includes(correctWord) && correctWord.length > word.length * 0.5)
      )
    );
    
    const isCorrect = isExactMatch || isPartialMatch || keyWordsMatch;
    
    setFeedback(isCorrect ? "correct" : "incorrect");
    setHasGuessed(true);

    if (isCorrect) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
    } else {
      setCurrentStreak(0);
    }
  };

  const activeCards = cardOrder.filter(i => !masteredCards.includes(i));
  const currentCardIndex = cardOrder[index];
  const activeIndex = activeCards.indexOf(currentCardIndex);

  const nextCard = () => {
    if (activeIndex < activeCards.length - 1) {
      const nextActiveCard = activeCards[activeIndex + 1];
      setIndex(cardOrder.indexOf(nextActiveCard));
      resetCard();
    }
  };

  const prevCard = () => {
    if (activeIndex > 0) {
      const prevActiveCard = activeCards[activeIndex - 1];
      setIndex(cardOrder.indexOf(prevActiveCard));
      resetCard();
    }
  };

  const shuffleCards = () => {
    const shuffled = [...cardOrder].sort(() => Math.random() - 0.5);
    setCardOrder(shuffled);
    setIndex(0);
    resetCard();
  };

  const markAsMastered = () => {
    setMasteredCards([...masteredCards, currentCardIndex]);
    if (activeIndex < activeCards.length - 1) {
      nextCard();
    } else if (activeIndex > 0) {
      prevCard();  
    } else {
      resetCard();
    }
  };

  const resetCard = () => {
    setFlipped(false);
    setUserGuess("");
    setFeedback("");
    setHasGuessed(false);
  };

  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitGuess();
  };

  if (activeCards.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Congratulations! 🎉</h2>
        <p>You've mastered all the cards!</p>
        <p>Longest streak: {longestStreak}</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="stats">
        <span className="streak">Current: {currentStreak}</span>
        <span className="streak">Best: {longestStreak}</span>
        <span className="remaining">{activeCards.length} cards left</span>
      </div>

      {!hasGuessed && (
        <form onSubmit={handleSubmit} className="guess-section">
          <input
            type="text"
            value={userGuess}
            onChange={handleInputChange}
            placeholder="Enter your guess..."
            className="guess-input"
            required
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      )}

      {feedback && (
        <div className={`feedback ${feedback}`}>
          {feedback === "correct" ? "✓ Correct!" : "✗ Incorrect"}
        </div>
      )}

      <div
        className={`card ${flipped ? 'is-flipped' : ''} ${feedback}`}
        onClick={handleFlip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFlip();
          }
        }}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        style={{ cursor: 'pointer' }}
      >
        <div className="card-inner">
          <div className="card-face card-front">
            <div className="content">{cards[currentCardIndex].question}</div>
          </div>
          <div className="card-face card-back">
            <div className="content">{cards[currentCardIndex].answer}</div>
          </div>
        </div>
      </div>

      {hasGuessed && (
        <button onClick={markAsMastered} className="master-btn">
          ✓ Mark as Mastered
        </button>
      )}

      <div className="controls">
        <button 
          onClick={prevCard} 
          disabled={activeIndex === 0}
          className="nav-btn prev-btn"
        >
          ← Previous
        </button>
        <span className="card-counter">
          {activeIndex + 1} / {activeCards.length}
        </span>
        <button 
          onClick={nextCard} 
          disabled={activeIndex === activeCards.length - 1}
          className="nav-btn next-btn"
        >
          Next →
        </button>
      </div>

      <div className="extra-controls">
        <button onClick={shuffleCards} className="shuffle-btn">
          🔀 Shuffle
        </button>
      </div>
    </div>
  );
}

export default Flashcard;

