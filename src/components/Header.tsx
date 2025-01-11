import React from 'react';
import './Header.css';
import '../App.css';

const Header: React.FC = () => {
    return (
        <header style={headerStyle}>
            <h1>Personal Finance Tracker</h1>
        </header>
    );
};

const headerStyle: React.CSSProperties = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 0',
    textAlign: 'center',
    // position: 'center',
    top: 0,
    width: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000
};

export default Header;