import { useState } from "react";

function Flashcard({ cards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hasGuessed, setHasGuessed] = useState(false);

  const handleFlip = () => {
    if (!hasGuessed) return;
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
      word.length > 2 && correctWords.some(correctWord => 
        correctWord.includes(word) || word.includes(correctWord)
      )
    );
    
    const isCorrect = isExactMatch || isPartialMatch || keyWordsMatch;
    
    setFeedback(isCorrect ? "correct" : "incorrect");
    setHasGuessed(true);
  };

  const nextCard = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      resetCard();
    }
  };

  const prevCard = () => {
    if (index > 0) {
      setIndex(index - 1);
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

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            if (hasGuessed) {
              e.preventDefault();
              handleFlip();
            }
          }
        }}
        role="button"
        tabIndex={hasGuessed ? 0 : -1}
        aria-pressed={flipped}
        style={{ cursor: hasGuessed ? 'pointer' : 'default' }}
      >
        <div className="card-inner">
          <div className="card-face card-front">
            <div className="content">{cards[index].question}</div>
          </div>
          <div className="card-face card-back">
            <div className="content">{cards[index].answer}</div>
          </div>
        </div>
      </div>

      <div className="controls">
        <button 
          onClick={prevCard} 
          disabled={index === 0}
          className="nav-btn prev-btn"
        >
          ← Previous
        </button>
        <span className="card-counter">
          {index + 1} / {cards.length}
        </span>
        <button 
          onClick={nextCard} 
          disabled={index === cards.length - 1}
          className="nav-btn next-btn"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Flashcard;

