import { useState } from "react";

function Flashcard({ cards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const nextCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setIndex(randomIndex);
    setFlipped(false);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div onClick={handleFlip} className="card">
        <div className="content">{flipped ? cards[index].answer : cards[index].question}</div>
      </div>
      <div className="controls">
        <button onClick={nextCard}>Next</button>
      </div>
    </div>
  );
}

export default Flashcard;

