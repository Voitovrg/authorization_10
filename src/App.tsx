import React, {useState} from 'react';
import './style/App.css';

const App: React.FC = () => {

    const [count, setCount] = useState<number>(0);

    const increment = (): void => {
        setCount(count + 1);
    }

    return (
        <div className="App">
            <p>Count: {count}</p>
            <button onClick={increment}>Click me or not me</button>
        </div>
    );
}

export default App;
