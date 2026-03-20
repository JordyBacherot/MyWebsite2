import React, { createContext, useContext, useState, useEffect } from 'react';

type Universe = 'dune' | 'cyberpunk';

interface UniverseContextType {
    universe: Universe;
    toggleUniverse: () => void;
}

const UniverseContext = createContext<UniverseContextType>({
    universe: 'dune',
    toggleUniverse: () => {},
});

export const UniverseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [universe, setUniverse] = useState<Universe>(() => {
        const saved = localStorage.getItem('universe') as Universe;
        return saved || 'dune';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (universe === 'cyberpunk') {
            root.classList.add('universe-cyberpunk');
        } else {
            root.classList.remove('universe-cyberpunk');
        }
        localStorage.setItem('universe', universe);
    }, [universe]);

    const toggleUniverse = () => {
        setUniverse(prev => prev === 'dune' ? 'cyberpunk' : 'dune');
    };

    return (
        <UniverseContext.Provider value={{ universe, toggleUniverse }}>
            {children}
        </UniverseContext.Provider>
    );
};

export const useUniverse = () => useContext(UniverseContext);
