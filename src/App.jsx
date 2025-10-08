
import "./App.css";
import Flashcard from "./Flashcard";
function App() {
  const cards = [
    { question: "What does '===' do in JavaScript?", answer: "It’s the strict equality operator. It checks value and type without converting types." },
    { question: "What is a JavaScript callback function?", answer: "A callback is a function passed into another function as an argument, which is then executed later inside the outer function." },
    { question: "What keyword is used to declare a variable in JavaScript?", answer: "Either var, let or const" },
    { question: "What's the difference between var and let/const?", answer: "var is function-scoped and hoisted; let/const are block-scoped. const cannot be reassigned." },
    { question: "What is a closure in JavaScript?", answer: "A closure is a function that remembers variables from its outer lexical scope even after the outer function has returned." },
    { question: "What is the event loop?", answer: "The event loop handles async callbacks by moving tasks from the callback queue to the call stack when it's empty, enabling non-blocking behavior." },
    { question: "What is a Promise?", answer: "A Promise represents a future value — it can be pending, fulfilled, or rejected and allows chaining with then/catch." },
    { question: "How do arrow functions differ from regular functions?", answer: "Arrow functions have a lexical this (they don't bind their own this), and they have a concise syntax without their own arguments object." }
  ];

  return (
    <div>
      <h1>JavaScript Flashcards</h1>
      <p>Quick trivia for reviewing JS fundamentals</p>
      <p>Total Cards: {cards.length}</p>
      <Flashcard cards={cards} />
    </div>
  );
}

export default App;