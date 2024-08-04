import React from 'react';
import {Route, Routes} from 'react-router-dom';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Me from './components/Me';
import {AuthProvider} from "./contexts/AuthContext";


const App: React.FC = () => {
    return (
        <div className={'App'}>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<SignIn/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/me" element={<Me/>}/> {/* Добавь маршрут для страницы /me */}
                </Routes>
            </AuthProvider>
        </div>
    )
        ;
};

// Импортируй новый компонент

export default App;
