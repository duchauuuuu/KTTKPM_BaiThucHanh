import React from 'react';

function App() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Hello, Docker React!</h1>
        <p style={styles.subtitle}>Ứng dụng React đang chạy trong Docker container.</p>
        <span style={styles.badge}>React 18 + Node 18-alpine</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #61dafb 0%, #21a1f1 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: 'white',
    padding: '40px 60px',
    borderRadius: '16px',
    textAlign: 'center',
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
  },
  title: {
    fontSize: '2.5rem',
    color: '#21a1f1',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '16px',
  },
  badge: {
    display: 'inline-block',
    background: '#61dafb',
    color: '#333',
    padding: '4px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },
};

export default App;
