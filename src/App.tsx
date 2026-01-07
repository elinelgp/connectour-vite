import "./App.css";

function App() {
  return (
    <div className="connectour-container">
      <div className="connectour-content">
        <img
          src="/src/assets/connectour-logo.svg"
          alt="Connectour Logo"
          className="connectour-logo"
        />

        <h1>🎵 Connectour</h1>

        <p className="connectour-tagline">Connecting Artists and Venues</p>

        <p className="connectour-description">
          A modern platform for seamless event booking and collaboration between musicians and
          concert venues.
        </p>

        <div className="connectour-features">
          <div className="feature">
            <span className="feature-icon">🎤</span>
            <h3>For Artists</h3>
            <p>Manage your profile, set availability, and book concerts</p>
          </div>

          <div className="feature">
            <span className="feature-icon">🎪</span>
            <h3>For Venues</h3>
            <p>Discover artists and organize amazing events</p>
          </div>

          <div className="feature">
            <span className="feature-icon">📅</span>
            <h3>Event Management</h3>
            <p>Streamlined booking and scheduling system</p>
          </div>
        </div>

        <button className="connectour-btn">Get Started</button>

        <footer className="connectour-footer">
          <p>© 2026 Connectour. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
