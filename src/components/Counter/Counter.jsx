import { useReducer } from 'react';
import { useEffect, useState } from 'react';
import styles from './Counter.css';

const initialCount = 10;

const countReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      console.log('increment', state);
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return state == 0;
    default:
      throw new Error(`Action type unsupported`);
  }
};

const colors = {
  yellow: 'rgb(236, 222, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
};

export default function Counter() {
  // const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(countReducer, initialCount);
  const [currentColor, setCurrentColor] = useState(colors.yellow);
  console.log(count);

  useEffect(() => {
    if (count === 0) {
      setCurrentColor(colors.yellow);
    }

    if (count > 0) {
      setCurrentColor(colors.green);
    }

    if (count < 0) {
      setCurrentColor(colors.red);
    }
  }, [count]);

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    setCount((prevState) => prevState - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <main className={styles.main}>
      <h1 style={{ color: currentColor }}>{count}</h1>
      <div>
        <button
          type="button"
          onClick={increment}
          aria-label="increment"
          style={{ backgroundColor: colors.green }}
        >
          Increment
        </button>
        <button
          type="button"
          onClick={decrement}
          aria-label="decrement"
          style={{ backgroundColor: colors.red }}
        >
          Decrement
        </button>
        <button
          type="button"
          aria-label="reset"
          onClick={reset}
          style={{ backgroundColor: colors.yellow }}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
