import React, { useState, useEffect } from 'react';
import './App.css';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

function App() {
  const [bmsData, setBmsData] = useState({
    voltage: 11.85,
    current: 3.82,
    temperature: 30.2,
    batteryHealth: 100,
    lastUpdated: new Date().toLocaleTimeString()
  });

  // ✅ Firebase Setup & Realtime Data Fetch
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCCiETVbkS06lUF51V-ERMBF019yhpm7Vk",
  authDomain: "finalbms-c7a42.firebaseapp.com",
  projectId: "finalbms-c7a42",
  storageBucket: "finalbms-c7a42.firebasestorage.app",
    databaseURL: "https://finalbms-c7a42-default-rtdb.firebaseio.com",
  messagingSenderId: "619992172473",
  appId: "1:619992172473:web:47e4719b8d448395911868",
  measurementId: "G-13QX5G8JKQ"
   
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const bmsDataRef = ref(database, 'bmsData');

    const unsubscribe = onValue(bmsDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBmsData({
          voltage: data.voltage || 0,
          current: data.current || 0,
          temperature: data.temperature || 0,
          batteryHealth: data.batteryHealth || 0,
          lastUpdated: new Date().toLocaleTimeString()
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const getHealthColor = (health) => {
    if (health >= 70) return '#4CAF50'; // Green
    if (health >= 40) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Battery Management System</h1>
        <p className="last-updated">Last updated: {bmsData.lastUpdated}</p>
      </header>
      
      <div className="dashboard-grid">
        {/* Voltage Card */}
        <div className="dashboard-card voltage-card">
          <h2>Voltage</h2>
          <div className="value">{bmsData.voltage} V</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(bmsData.voltage / 15) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Card */}
        <div className="dashboard-card current-card">
          <h2>Current</h2>
          <div className="value">{bmsData.current} A</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(bmsData.current / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Temperature Card */}
        <div className="dashboard-card temperature-card">
          <h2>Temperature</h2>
          <div className="value">{bmsData.temperature} °C</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((bmsData.temperature - 25) / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Battery Health Card */}
        <div className="dashboard-card health-card">
          <h2>Battery Health</h2>
          <div 
            className="value" 
            style={{ color: getHealthColor(bmsData.batteryHealth) }}
          >
            {bmsData.batteryHealth}%
          </div>
          <div className="circular-progress">
            <div 
              className="circle-progress" 
              style={{ 
                background: `conic-gradient(${getHealthColor(bmsData.batteryHealth)} ${bmsData.batteryHealth * 3.6}deg, #eee 0deg)`
              }}
            >
              <div className="circle-inner"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="status-section">
        <h2>System Status</h2>
        <div className="status-indicators">
          <div className="status-indicator active">
            <div className="status-led"></div>
            <span>Connected</span>
          </div>
          <div className="status-indicator">
            <div className="status-led"></div>
            <span>Charging</span>
          </div>
          <div className="status-indicator">
            <div className="status-led"></div>
            <span>Warning</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
