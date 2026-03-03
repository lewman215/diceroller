
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
  // track inputs as strings so we can clear them and meet reset requirement
  const [numDice, setNumDice] = useState('');
  const [threshold, setThreshold] = useState('');
  const [results, setResults] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [hits, setHits] = useState(0);

  // Requirement 8: Wounds tab state
  const [tab, setTab] = useState('hits'); // 'hits' or 'wounds'
  const [strength, setStrength] = useState('');
  const [toughness, setToughness] = useState('');
  const [woundResults, setWoundResults] = useState([]);
  const [wounds, setWounds] = useState(0);

  // Requirement 2: Increment/decrement handlers for dice count and threshold
  const incrementNumDice = () => {
    const current = Number(numDice) || 0;
    setNumDice(Math.min(100, current + 1));
  };
  const decrementNumDice = () => {
    const current = Number(numDice) || 0;
    setNumDice(Math.max(1, current - 1));
  };
  const incrementThreshold = () => {
    const current = Number(threshold) || 0;
    setThreshold(Math.min(6, current + 1));
  };
  const decrementThreshold = () => {
    const current = Number(threshold) || 0;
    setThreshold(Math.max(1, current - 1));
  };

  // Requirement 3, 4, 5: Roll dice and count hits
  const handleRoll = () => {
    // convert input strings to numbers
    const n = Number(numDice);
    const t = Number(threshold);
    if (!n || !t) return; // invalid inputs
    setRolling(true);
    const animationFrames = 10;
    let frame = 0;
    const animate = () => {
      if (frame < animationFrames) {
        setResults(rollDice(n));
        frame++;
        setTimeout(animate, 50);
      } else {
        const dice = rollDice(n);
        setResults(dice);
        setHits(dice.filter((d) => d >= t).length);
        setRolling(false);
      }
    };
    animate();
  };

  // Requirement 8: Roll wounds dice
  const handleRollWounds = () => {
    // ensure numeric strength/toughness before rolling
    const s = Number(strength);
    const t = Number(toughness);
    if (!s || !t) return;
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
        const woundThreshold = getWoundThreshold(s, t);
        setWoundResults(woundDice);
        setWounds(woundDice.filter((d) => d >= woundThreshold).length);
        setRolling(false);
      }
    };
    animate();
  };

  // Requirement 7: Reset/refresh button handler
  const handleReset = () => {
    setNumDice('');
    setThreshold('');
    setResults([]);
    setHits(0);
    setTab('hits');
    setStrength('');
    setToughness('');
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
      <div className="tabs">
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
            {/* Requirement 2: Custom up/down controls for dice count */}
            <div className="control-group">
              <label>Number of Dice:</label>
              <div className="spinner-control">
                <button className="spinner-btn" onClick={decrementNumDice}>−</button>
                <input
                  type="text"
                  inputMode="numeric"
                  className="spinner-input"
                  placeholder="0"
                  value={numDice}
                  onChange={(e) => {
                    const v = e.target.value;
                    setNumDice(v === '' ? '' : Math.max(1, Math.min(100, Number(v))));
                  }}
                />
                <button className="spinner-btn" onClick={incrementNumDice}>+</button>
              </div>
            </div>

            {/* Requirement 2: Custom up/down controls for threshold */}
            <div className="control-group">
              <label>Hit Threshold (1-6):</label>
              <div className="spinner-control">
                <button className="spinner-btn" onClick={decrementThreshold}>−</button>
                <input
                  type="text"
                  inputMode="numeric"
                  className="spinner-input"
                  placeholder="0"
                  value={threshold}
                  onChange={(e) => {
                    const v = e.target.value;
                    setThreshold(v === '' ? '' : Math.max(1, Math.min(6, Number(v))));
                  }}
                />
                <button className="spinner-btn" onClick={incrementThreshold}>+</button>
              </div>
            </div>

            <div className="button-group">
              <button className="roll-btn" onClick={handleRoll} disabled={rolling || !numDice || !threshold}>{rolling ? 'Rolling...' : 'Roll Dice'}</button>
              {/* Requirement 7: Reset/refresh button */}
              <button className="roll-btn reset-btn" onClick={handleReset}>Refresh</button>
            </div>
          </div>
          {results.length > 0 && (
            <div className="results">
              <h2>Results</h2>
              <p>
                Hits{threshold ? ` (≥ ${threshold})` : ''}: <strong>{hits}</strong>
              </p>
              <div className="dice-list">
                {results.map((value, idx) => (
                  <span key={idx} className={value >= Number(threshold) ? 'hit' : ''}>{value}</span>
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
            {/* Requirement 2: Custom up/down controls for strength */}
            <div className="control-group">
              <label>Strength:</label>
              <div className="spinner-control">
                <button className="spinner-btn" onClick={() => setStrength(Math.max(1, Number(strength) - 1) || '')}>−</button>
                <input
                  type="text"
                  inputMode="numeric"
                  className="spinner-input"
                  placeholder="0"
                  value={strength}
                  onChange={(e) => {
                    const v = e.target.value;
                    setStrength(v === '' ? '' : Math.max(1, Math.min(20, Number(v))));
                  }}
                />
                <button className="spinner-btn" onClick={() => setStrength(Math.min(20, Number(strength) + 1) || '')}>+</button>
              </div>
            </div>

            {/* Requirement 2: Custom up/down controls for toughness */}
            <div className="control-group">
              <label>Toughness:</label>
              <div className="spinner-control">
                <button className="spinner-btn" onClick={() => setToughness(Math.max(1, Number(toughness) - 1) || '')}>−</button>
                <input
                  type="text"
                  inputMode="numeric"
                  className="spinner-input"
                  placeholder="0"
                  value={toughness}
                  onChange={(e) => {
                    const v = e.target.value;
                    setToughness(v === '' ? '' : Math.max(1, Math.min(20, Number(v))));
                  }}
                />
                <button className="spinner-btn" onClick={() => setToughness(Math.min(20, Number(toughness) + 1) || '')}>+</button>
              </div>
            </div>

            <div className="button-group">
              <button className="roll-btn" onClick={handleRollWounds} disabled={hits === 0 || rolling || !strength || !toughness}>{rolling ? 'Rolling...' : 'Roll Wounds'}</button>
              <button className="roll-btn reset-btn" onClick={handleReset}>Refresh</button>
            </div>
          </div>
          <div style={{ marginBottom: '1em' }}>
            <strong>Dice to roll for wounds: {hits}</strong>
            <br />
            <span>
            Wound threshold: {strength && toughness ? `${getWoundThreshold(Number(strength), Number(toughness))}+` : '-'}
          </span>
          </div>
          {woundResults.length > 0 && (
            <div className="results">
              <h2>Wounds</h2>
              <p>
                Wounds{strength && toughness ? ` (≥ ${getWoundThreshold(Number(strength), Number(toughness))})` : ''}: <strong>{wounds}</strong>
              </p>
              <div className="dice-list">
                {woundResults.map((value, idx) => {
                  const wt = strength && toughness ? getWoundThreshold(Number(strength), Number(toughness)) : 0;
                  return (
                    <span key={idx} className={value >= wt ? 'hit' : ''}>{value}</span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


export default App;
