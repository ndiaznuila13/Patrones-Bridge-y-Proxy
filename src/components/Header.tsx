import { useState, useEffect } from 'react';

interface HeaderProps {
  activeTab: 'home' | 'bridge' | 'proxy';
  setActiveTab: (tab: 'home' | 'bridge' | 'proxy') => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
    }
  }, [isDark]);

  return (
    <header className="header">
      <div className="container flex justify-between items-center">
        <div className="title-heavy" style={{ fontSize: '1.85rem' }}>
          Los Patrones
        </div>
        
        <nav className="flex gap-lg" style={{ display: 'none' }}>
          {/* Hide on mobile, show on desktop via media queries - simplified for now */}
        </nav>
        
        <nav className="flex gap-lg">
          <button 
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
          >
            Inicio
          </button>
          <button 
            className={`nav-link ${activeTab === 'bridge' ? 'active' : ''}`}
            onClick={() => setActiveTab('bridge')}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
          >
            Bridge
          </button>
          <button 
            className={`nav-link ${activeTab === 'proxy' ? 'active' : ''}`}
            onClick={() => setActiveTab('proxy')}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
          >
            Proxy
          </button>
        </nav>
        
        <div className="flex items-center gap-md">
          <button 
            className="btn-icon" 
            onClick={() => setIsDark(!isDark)}
            title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            <span className="material-symbols-outlined">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
