import { useState } from "react";

function Flashcard({ cards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((s) => !s);
  };

  const nextCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setIndex(randomIndex);
    setFlipped(false);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        className={`card ${flipped ? 'is-flipped' : ''}`}
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
        <button onClick={nextCard}>Next</button>
      </div>
    </div>
  );
}

export default Flashcard;

