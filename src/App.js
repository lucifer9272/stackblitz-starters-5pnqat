import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import { ProductProvider } from './Context';

function App() {
  return (
    <ProductProvider>
      <div className="App">
        <Home />
      </div>
    </ProductProvider>
  );
}

export default App;
