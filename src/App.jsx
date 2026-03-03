
import React, { useState } from 'react';
import './App.css';

function rollDice(numDice) {
  return Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1);
}

function getWoundThreshold(strength, toughness) {
  // Requirement 8: Calculate wound threshold
  if (strength >= 2 * toughness) return 2;
  if (strength > toughness) return 3;
  if (strength === toughness) return 4;
  if (strength < toughness && strength > toughness / 2) return 5;
  if (strength <= toughness / 2) return 6;
  return 4; // fallback
}

function App() {
  // Requirement 1, 2, 7: Inputs and reset
  const DEFAULT_NUM_DICE = 1; // Requirement 7: default value
  const DEFAULT_THRESHOLD = 4; // Requirement 7: default value
  const [numDice, setNumDice] = useState(DEFAULT_NUM_DICE);
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);
  const [results, setResults] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [hits, setHits] = useState(0);

  // Requirement 8: Wounds tab state
  const [tab, setTab] = useState('hits'); // 'hits' or 'wounds'
  const [strength, setStrength] = useState(4);
  const [toughness, setToughness] = useState(4);
  const [woundResults, setWoundResults] = useState([]);
  const [wounds, setWounds] = useState(0);

  // Requirement 3, 4, 5: Roll dice and count hits
  const handleRoll = () => {
    setRolling(true);
    // Show random dice for animation
    const animationFrames = 10;
    let frame = 0;
    const animate = () => {
      if (frame < animationFrames) {
        setResults(rollDice(numDice));
        frame++;
        setTimeout(animate, 50);
      } else {
        const dice = rollDice(numDice);
        setResults(dice);
        setHits(dice.filter((d) => d >= threshold).length);
        setRolling(false);
      }
    };
    animate();
  };

  // Requirement 8: Roll wounds dice
  const handleRollWounds = () => {
    setRolling(true);
    const animationFrames = 10;
    let frame = 0;
    const animate = () => {
      if (frame < animationFrames) {
        setWoundResults(rollDice(hits));
        frame++;
        setTimeout(animate, 50);
      } else {
        const woundDice = rollDice(hits);
        const woundThreshold = getWoundThreshold(strength, toughness);
        setWoundResults(woundDice);
        setWounds(woundDice.filter((d) => d >= woundThreshold).length);
        setRolling(false);
      }
    };
    animate();
  };

  // Requirement 7: Reset/refresh button handler
  const handleReset = () => {
    setNumDice(DEFAULT_NUM_DICE);
    setThreshold(DEFAULT_THRESHOLD);
    setResults([]);
    setHits(0);
    setTab('hits');
    setStrength(4);
    setToughness(4);
    setWoundResults([]);
    setWounds(0);
    // Requirement 7: All input boxes emptied, settings reset, results cleared
  };

  // Requirement 8: Update wounds if hits change
  // (auto-clear wounds when hits change)
  // eslint-disable-next-line
  React.useEffect(() => {
    setWoundResults([]);
    setWounds(0);
  }, [hits]);

  return (
    <div className="dice-roller-container">
      <h1>Dice Roller</h1>
      {/* Requirement 8: Tab navigation */}
      <div style={{ display: 'flex', gap: '1em', justifyContent: 'center', marginBottom: '1em' }}>
        <button
          className={tab === 'hits' ? 'roll-btn' : ''}
          onClick={() => setTab('hits')}
        >Hits</button>
        <button
          className={tab === 'wounds' ? 'roll-btn' : ''}
          onClick={() => setTab('wounds')}
          disabled={hits === 0}
        >Wounds</button>
      </div>

      {tab === 'hits' && (
        <div>
          <div className="inputs">
            <label>
              Number of Dice:
              <input
                type="number"
                min="1"
                max="100"
                value={numDice}
                onChange={(e) => setNumDice(Math.max(1, Math.min(100, Number(e.target.value))))}
              />
            </label>
            <label>
              Hit Threshold (1-6):
              <input
                type="number"
                min="1"
                max="6"
                value={threshold}
                onChange={(e) => setThreshold(Math.max(1, Math.min(6, Number(e.target.value))))}
              />
            </label>
            <div style={{ display: 'flex', gap: '1em', marginTop: '0.5em' }}>
              <button className="roll-btn" onClick={handleRoll} disabled={rolling}>{rolling ? 'Rolling...' : 'Roll Dice'}</button>
              {/* Requirement 7: Reset/refresh button */}
              <button className="roll-btn" style={{ background: '#e74c3c' }} onClick={handleReset}>Refresh</button>
            </div>
          </div>
          {results.length > 0 && (
            <div className="results">
              <h2>Results</h2>
              <p>Hits (≥ {threshold}): <strong>{hits}</strong></p>
              <div className="dice-list">
                {results.map((value, idx) => (
                  <span key={idx} className={value >= threshold ? 'hit' : ''}>{value}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Requirement 8: Wounds tab */}
      {tab === 'wounds' && (
        <div>
          <div className="inputs">
            <label>
              Strength:
              <input
                type="number"
                min="1"
                max="20"
                value={strength}
                onChange={(e) => setStrength(Math.max(1, Math.min(20, Number(e.target.value))))}
              />
            </label>
            <label>
              Toughness:
              <input
                type="number"
                min="1"
                max="20"
                value={toughness}
                onChange={(e) => setToughness(Math.max(1, Math.min(20, Number(e.target.value))))}
              />
            </label>
            <div style={{ display: 'flex', gap: '1em', marginTop: '0.5em' }}>
              <button className="roll-btn" onClick={handleRollWounds} disabled={hits === 0 || rolling}>{rolling ? 'Rolling...' : 'Roll Wounds'}</button>
              <button className="roll-btn" style={{ background: '#e74c3c' }} onClick={handleReset}>Refresh</button>
            </div>
          </div>
          <div style={{ marginBottom: '1em' }}>
            <strong>Dice to roll for wounds: {hits}</strong>
            <br />
            <span>Wound threshold: {getWoundThreshold(strength, toughness)}+</span>
          </div>
          {woundResults.length > 0 && (
            <div className="results">
              <h2>Wounds</h2>
              <p>Wounds (≥ {getWoundThreshold(strength, toughness)}): <strong>{wounds}</strong></p>
              <div className="dice-list">
                {woundResults.map((value, idx) => (
                  <span key={idx} className={value >= getWoundThreshold(strength, toughness) ? 'hit' : ''}>{value}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


export default App;
