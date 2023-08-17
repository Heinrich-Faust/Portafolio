import React, { useState } from 'react';
import './components/App.css';
import Home from './components/Home'
import Proyectos from './components/Proyectos';
import AcercaDeMi from './components/AcercaDeMi';
import Contacto from './components/Contacto';

const App = () => {
  const [tab, setTab] = useState('Home');

  const renderTab = () => {
    switch (tab) {
      case 'Home':
        return <Home />;
      case 'proyectos':
        return <Proyectos />;
      case 'acerca':
        return <AcercaDeMi />;
      case 'contacto':
        return <Contacto />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <nav>
        <ul>
          <li onClick={() => setTab('Home')}>Home</li>
          <li onClick={() => setTab('proyectos')}>Proyectos</li>
          <li onClick={() => setTab('acerca')}>Acerca de mí</li>
          <li onClick={() => setTab('contacto')}>Contacto</li>
        </ul>
      </nav>
      <main>
        {renderTab()}
      </main>
    </div>
  );
}

export default App;