import * as React from 'react';

const Counter: React.FC = () => {
  const [counter, setCounter] = React.useState(0);

  return (
    <div>
      <p>{`conter value is: ${counter}`}</p>
      <button onClick={() => setCounter(prevState => prevState + 1)}>
        add one
      </button>
    </div>
  );
};

export { Counter };
