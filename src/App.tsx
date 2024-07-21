import React from 'react';
import './style/App.css';

const App = () => {

  const [count, setCount]  = React.useState(0);


  return (
    <div className="App">
      <p>{count}</p>
      <button>Click me</button>
    </div>
  );
}

export default App;
