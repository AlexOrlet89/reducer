import { useReducer } from 'react';
import { useEffect, useState } from 'react';
import styles from './Counter.css';

const colors = {
  yellow: 'rgb(236, 222, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
};

const initialCount = { count: 0, color: colors.green };

const countReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1, color: state.color };
    case 'DECREMENT':
      return { count: state.count - 1, color: state.color };
    case 'RESET':
      return { count: 0, color: state.color };
    case 'CHANGE_COLOR':
      return {
        count: state.count,
        color: action.payload.color,
      };
    default:
      throw new Error(`Action type unsupported`);
  }
};

export default function Counter() {
  // const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(countReducer, initialCount);
  // const [currentColor, setCurrentColor] = useState(colors.green);
  // const [color, dispatch] = useReducer(colorReducer, initialColor);

  useEffect(() => {
    if (count.count === 0) {
      dispatch({ type: 'CHANGE_COLOR', payload: { color: colors.yellow } });
    }

    if (count.count > 0) {
      dispatch({ type: 'CHANGE_COLOR', payload: { color: colors.green } });
    }

    if (count.count < 0) {
      dispatch({ type: 'CHANGE_COLOR', payload: { color: colors.red } });
    }
  }, [count.count]);

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <main className={styles.main}>
      <h1 style={{ color: count.color }}>{count.count}</h1>
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
