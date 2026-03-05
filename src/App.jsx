

import React, { useState } from 'react';
import './App.css';

// Requirement 9 & 10: Sound effect for dice rolling
function playDiceRollSound() {
  // Play a realistic dice roll sound from file
  // Use correct file name from public/sounds
  const audio = new window.Audio('/sounds/Rolling Dice.mp3');
  audio.volume = 0.7;
  audio.play();
}

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
  // Threshold always starts at 1+
  const [threshold, setThreshold] = useState('1');
  const [results, setResults] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [hits, setHits] = useState(0);

  // Animation state: only true for 0.6s after a roll
  const [justRolledHits, setJustRolledHits] = useState(false);
  const [justRolledWounds, setJustRolledWounds] = useState(false);

  // Requirement 8: Wounds tab state
  const [tab, setTab] = useState('hits'); // 'hits' or 'wounds'
  const [strength, setStrength] = useState('');
  const [toughness, setToughness] = useState('');
  const [woundResults, setWoundResults] = useState([]);

  const woundThreshold = strength && toughness
    ? getWoundThreshold(Number(strength), Number(toughness))
    : null;
  const wounds = woundThreshold
    ? woundResults.filter((d) => d >= woundThreshold).length
    : 0;

  // Recalculate hits when threshold or results change
  React.useEffect(() => {
    if (results.length > 0) {
      setHits(results.filter((d) => d >= Number(threshold)).length);
    }
  }, [threshold, results]);

  // User Request: Re-roll all dice that did not meet the WS/BS threshold
  const handleRerollMisses = () => {
    if (results.length === 0) return;
    setRolling(true);
    playDiceRollSound();
    const animationFrames = 6;
    let frame = 0;
    const originalResults = [...results];
    const t = Number(threshold);
    const animate = () => {
      if (frame < animationFrames) {
        setResults((prevResults) => prevResults.map((v, i) => originalResults[i] < t ? Math.floor(Math.random() * 6) + 1 : v));
        frame++;
        setTimeout(animate, 50);
      } else {
        const rerolled = originalResults.map((v) => (v < t ? Math.floor(Math.random() * 6) + 1 : v));
        setResults(rerolled);
        setHits(rerolled.filter((d) => d >= t).length);
        setRolling(false);
        setJustRolledHits(true);
        setTimeout(() => setJustRolledHits(false), 600);
      }
    };
    animate();
  };

  // Requirement 2: Increment/decrement handlers for dice count and threshold
  const incrementNumDice = () => {
    const current = Number(numDice) || 0;
    setNumDice(Math.min(100, current + 1));
  };
  const decrementNumDice = () => {
    const current = Number(numDice) || 0;
    setNumDice(Math.max(1, current - 1));
  };
  // Only allow 1+ to 6+
  const incrementThreshold = () => {
    const current = Number(threshold) || 1;
    setThreshold(Math.min(6, current + 1).toString());
  };
  const decrementThreshold = () => {
    const current = Number(threshold) || 1;
    setThreshold(Math.max(1, current - 1).toString());
  };

  // User Request: Re-roll all dice that show a value of 1
  const handleRerollOnes = () => {
    if (results.length === 0) return;
    setRolling(true);
    playDiceRollSound();
    const animationFrames = 6;
    let frame = 0;
    const originalResults = [...results];
    const animate = () => {
      if (frame < animationFrames) {
        setResults((prevResults) => prevResults.map((v, i) => originalResults[i] === 1 ? Math.floor(Math.random() * 6) + 1 : v));
        frame++;
        setTimeout(animate, 50);
      } else {
        const rerolled = originalResults.map((v) => (v === 1 ? Math.floor(Math.random() * 6) + 1 : v));
        setResults(rerolled);
        setHits(rerolled.filter((d) => d >= Number(threshold)).length);
        setRolling(false);
        setJustRolledHits(true);
        setTimeout(() => setJustRolledHits(false), 600);
      }
    };
    animate();
  };

  // Requirement 3, 4, 5: Roll dice and count hits
  const handleRoll = () => {
    const n = Number(numDice);
    const t = Number(threshold);
    if (!n || !t) return;
    setRolling(true);
    playDiceRollSound();
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
        setJustRolledHits(true);
        setTimeout(() => setJustRolledHits(false), 600);
      }
    };
    animate();
  };

  // Requirement 8: Roll wounds dice
  const handleRollWounds = () => {
    const s = Number(strength);
    const t = Number(toughness);
    if (!s || !t) return;
    setRolling(true);
    playDiceRollSound();
    const animationFrames = 10;
    let frame = 0;
    const animate = () => {
      if (frame < animationFrames) {
        setWoundResults(rollDice(hits));
        frame++;
        setTimeout(animate, 50);
      } else {
        const woundDice = rollDice(hits);
        setWoundResults(woundDice);
        setRolling(false);
        setJustRolledWounds(true);
        setTimeout(() => setJustRolledWounds(false), 600);
      }
    };
    animate();
  };

  // Requirement 7: Reset/refresh button handler
  const handleReset = () => {
    setNumDice('');
    setThreshold('1');
    setResults([]);
    setHits(0);
    setTab('hits');
    setStrength('');
    setToughness('');
    setWoundResults([]);
    // Requirement 7: All input boxes emptied, settings reset, results cleared
  };

  // Requirement 8: Update wounds if hits change
  // (auto-clear wounds when hits change)
  // eslint-disable-next-line
  React.useEffect(() => {
    setWoundResults([]);
  }, [hits]);

  return (
    <div className="dice-roller-container">
      <h1 className="main-title">IMPERIAL DICE ROLLER</h1>
      {/* Requirement 8: Tab navigation */}
      <div className="tabs">
        <button
          className={`roll-btn${tab === 'hits' ? ' tab-active' : ''}`}
          onClick={() => setTab('hits')}
        >HITS</button>
        <button
          className={`roll-btn${tab === 'wounds' ? ' tab-active' : ''}`}
          onClick={() => setTab('wounds')}
          disabled={hits === 0}
        >WOUNDS</button>
      </div>

      {tab === 'hits' && (
        <div>
          <div className="inputs">
            {/* Requirement 2: Custom up/down controls for dice count */}
            <div className="control-group">
              <label>ATTACKS: </label>
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
              <label>WS/BS:</label>
              <div className="spinner-control">
                <button className="spinner-btn" onClick={decrementThreshold}>−</button>
                <input
                  type="text"
                  inputMode="numeric"
                  className="spinner-input"
                  placeholder="1+"
                  value={threshold ? `${threshold}+` : ''}
                  onChange={(e) => {
                    // Accept input like '4+' or '4', strip trailing plus
                    let v = e.target.value.replace(/\+$/, '');
                    // Only allow 1-6
                    if (v === '' || isNaN(Number(v))) {
                      setThreshold('1');
                    } else {
                      let num = Math.max(1, Math.min(6, Number(v)));
                      setThreshold(num.toString());
                    }
                  }}
                />
                <button className="spinner-btn" onClick={incrementThreshold}>+</button>
              </div>
            </div>

            <div className="button-group">
              <button className="roll-btn" onClick={handleRoll} disabled={rolling || !numDice || !threshold}>{rolling ? 'ADVANCING...' : 'ROLL'}</button>
              <button className="roll-btn" onClick={handleRerollOnes} disabled={rolling || results.length === 0 || !results.includes(1)}>RE-ROLL 1s</button>
              <button className="roll-btn" onClick={handleRerollMisses} disabled={rolling || results.length === 0 || results.every((v) => v >= Number(threshold))}>RE-ROLL MISSES</button>
              {/* Requirement 7: Reset/refresh button */}
              <button className="roll-btn reset-btn" onClick={handleReset}>REFRESH</button>
            </div>
          </div>
          {results.length > 0 && (
            <div className="results">
              <p style={{ color: '#D4AF37', fontWeight: 700, fontSize: '1.1em', letterSpacing: '1px', marginBottom: '0.5em' }}>
                Successful Hits: <strong>{hits}</strong>
              </p>
              {/* Dice value summary */}
              <div style={{ margin: '0.5em 0', color: '#D4AF37', fontWeight: 700, fontSize: '1em', letterSpacing: '1px' }}>
                {Array.from({ length: 6 }, (_, i) => i + 1).map((val) => {
                  const count = results.filter((d) => d === val).length;
                  return (
                    <span key={val} style={{ marginRight: '1.2em' }}>{val}+ : {count} </span>
                  );
                })}
              </div>
              <div className="dice-list">
                {results.map((value, idx) => (
                  <span
                    key={idx}
                    className={
                      (justRolledHits ? 'dice-anim ' : '') + (value >= Number(threshold) ? 'hit' : '')
                    }
                  >
                    {value}
                  </span>
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
              <label>ATTACKER STRENGTH:</label>
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
              <label>TARGET TOUGHNESS:</label>
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
              <button className="roll-btn" onClick={handleRollWounds} disabled={hits === 0 || rolling || !strength || !toughness}>{rolling ? 'CALCULATING...' : 'ROLL'}</button>
              <button className="roll-btn reset-btn" onClick={handleReset}>REFRESH</button>
            </div>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '1.2em 0' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '2.5em',
              fontWeight: 700,
              color: '#D4AF37',
              fontSize: '1.08em',
              letterSpacing: '1px',
              background: 'rgba(34, 34, 34, 0.7)',
              borderRadius: '0.7em',
              boxShadow: '0 0 10px rgba(212,175,55,0.10)',
              padding: '0.7em 1.5em',
              border: '1.5px solid #D4AF37',
            }}>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', whiteSpace: 'nowrap' }}>SUCCESSFUL ATTACKS: {hits}</span>
              <span style={{ textAlign: 'center', minWidth: '180px' }}>TO WOUND: {woundThreshold ? `${woundThreshold}+` : '-'}</span>
            </div>
          </div>
          {woundResults.length > 0 && (
            <div className="results">
              <p style={{ color: '#D4AF37', fontWeight: 700, fontSize: '1.1em', letterSpacing: '1px', marginBottom: '0.5em' }}>
                SUCCESSFUL WOUNDS: <strong>{wounds}</strong>
              </p>
              <div className="dice-list">
                {woundResults.map((value, idx) => (
                  <span
                    key={idx}
                    className={
                      (justRolledWounds ? 'dice-anim ' : '') + (woundThreshold && value >= woundThreshold ? 'hit' : '')
                    }
                  >
                    {value}
                  </span>
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
