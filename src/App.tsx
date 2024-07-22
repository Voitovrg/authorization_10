import React, {SetStateAction, useState} from 'react';
import './style/App.css';

const App = () => {

  const [count, setCount]:SetStateAction<any>  = useState(0);


  return (
    <div className="App">
      <p>{count}</p>
      <button onClick={e => setCount(e)}>Click me or not me</button>
    </div>
  );
}

export default App;
