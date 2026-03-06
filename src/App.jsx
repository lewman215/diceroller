import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const diceRollAudioPool = Array.from({ length: 3 }, () => {
  const audio = new window.Audio('/sounds/Rolling Dice.mp3');
  audio.preload = 'auto';
  audio.volume = 0.7;
  return audio;
});

let diceRollAudioIndex = 0;

function playDiceRollSound() {
  const audio = diceRollAudioPool[diceRollAudioIndex];
  diceRollAudioIndex = (diceRollAudioIndex + 1) % diceRollAudioPool.length;
  audio.currentTime = 0;
  audio.play().catch(() => {
    // Ignore blocked autoplay/playback interruptions.
  });
}

function rollDice(numDice) {
  return Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1);
}

function getWoundThreshold(strength, toughness) {
  if (strength >= 2 * toughness) return 2;
  if (strength > toughness) return 3;
  if (strength === toughness) return 4;
  if (strength < toughness && strength > toughness / 2) return 5;
  if (strength <= toughness / 2) return 6;
  return 4;
}

function getFaceCounts(dice) {
  return Array.from({ length: 6 }, (_, index) => {
    const value = index + 1;
    return {
      value,
      count: dice.filter((die) => die === value).length,
    };
  });
}

function FaceSummary({ dice, criticalThreshold = null }) {
  return (
    <div className="face-summary" aria-label="Dice face summary">
      {getFaceCounts(dice).map(({ value, count }) => (
        <div key={value} className="face-summary-item" data-face={value}>
          <span className="face-summary-face">
            <span>{value}+</span>
            {criticalThreshold !== null && value >= criticalThreshold && (
              <span className="face-summary-critical" aria-hidden="true">🔥</span>
            )}
          </span>
          <span className="face-summary-count">{count}</span>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [numDice, setNumDice] = useState('1');
  const [threshold, setThreshold] = useState('1');
  const [critical, setCritical] = useState('6');
  const [results, setResults] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [rollingHitIndexes, setRollingHitIndexes] = useState([]);

  // Requirement 10/11: Track workflow state across Hits, Wounds, and Saves tabs.
  const [tab, setTab] = useState('hits');
  const [strength, setStrength] = useState('1');
  const [toughness, setToughness] = useState('1');
  const [woundResults, setWoundResults] = useState([]);
  const [rollingWoundIndexes, setRollingWoundIndexes] = useState([]);
  const [save, setSave] = useState('1');
  const [saveResults, setSaveResults] = useState([]);
  const [rollingSaveIndexes, setRollingSaveIndexes] = useState([]);
  const previousWounds = useRef(null);

  const hits = results.filter((die) => die >= Number(threshold)).length;
  const criticalThreshold = Number(critical);
  const woundThreshold = strength && toughness
    ? getWoundThreshold(Number(strength), Number(toughness))
    : null;
  const wounds = woundThreshold
    ? woundResults.filter((die) => die >= woundThreshold).length
    : 0;
  const saveThreshold = Number(save);
  const saved = saveResults.filter((die) => die >= saveThreshold).length;
  const unsavedWounds = Math.max(wounds - saved, 0);

  useEffect(() => {
    diceRollAudioPool.forEach((audio) => {
      audio.load();
    });
  }, []);

  useEffect(() => {
    setWoundResults([]);
    if (hits === 0) {
      setTab('hits');
    }
  }, [hits]);

  useEffect(() => {
    if (previousWounds.current === null) {
      previousWounds.current = wounds;
    } else if (previousWounds.current !== wounds) {
      setSaveResults([]);
      previousWounds.current = wounds;
    }

    if (wounds === 0 && tab === 'saves') {
      setTab(hits > 0 ? 'wounds' : 'hits');
    }
  }, [hits, wounds, tab]);

  const runRollAnimation = (count, setter, setRollingIndexes) => {
    setRolling(true);
    setRollingIndexes(Array.from({ length: count }, (_, index) => index));
    playDiceRollSound();

    const animationFrames = 10;
    let frame = 0;

    const animate = () => {
      if (frame < animationFrames) {
        setter(rollDice(count));
        frame += 1;
        setTimeout(animate, 50);
        return;
      }

      setter(rollDice(count));
      setRollingIndexes([]);
      setRolling(false);
    };

    animate();
  };

  const runSelectiveReroll = (sourceResults, setter, shouldReroll, setRollingIndexes) => {
    if (sourceResults.length === 0) return;

    setRolling(true);
    playDiceRollSound();

    const originalResults = [...sourceResults];
    const rerollIndexes = originalResults
      .map((value, index) => (shouldReroll(value) ? index : null))
      .filter((value) => value !== null);

    setRollingIndexes(rerollIndexes);

    const animationFrames = 6;
    let frame = 0;

    const animate = () => {
      if (frame < animationFrames) {
        setter(originalResults.map((value) => (shouldReroll(value) ? Math.floor(Math.random() * 6) + 1 : value)));
        frame += 1;
        setTimeout(animate, 50);
        return;
      }

      setter(originalResults.map((value) => (shouldReroll(value) ? Math.floor(Math.random() * 6) + 1 : value)));
      setRollingIndexes([]);
      setRolling(false);
    };

    animate();
  };

  const runSingleDieReroll = (sourceResults, setter, index, setRollingIndexes) => {
    if (sourceResults.length === 0 || index < 0 || index >= sourceResults.length) return;

    setRolling(true);
    playDiceRollSound();

    const originalResults = [...sourceResults];
    setRollingIndexes([index]);

    const animationFrames = 6;
    let frame = 0;

    const animate = () => {
      if (frame < animationFrames) {
        setter(originalResults.map((value, currentIndex) => (currentIndex === index ? Math.floor(Math.random() * 6) + 1 : value)));
        frame += 1;
        setTimeout(animate, 50);
        return;
      }

      setter(originalResults.map((value, currentIndex) => (currentIndex === index ? Math.floor(Math.random() * 6) + 1 : value)));
      setRollingIndexes([]);
      setRolling(false);
    };

    animate();
  };

  const handleRoll = () => {
    const diceCount = Number(numDice);
    if (!diceCount) return;
    runRollAnimation(diceCount, setResults, setRollingHitIndexes);
  };

  const handleRerollOnes = () => {
    runSelectiveReroll(results, setResults, (value) => value === 1, setRollingHitIndexes);
  };

  const handleRerollMisses = () => {
    const target = Number(threshold);
    runSelectiveReroll(results, setResults, (value) => value < target, setRollingHitIndexes);
  };

  const handleRollWounds = () => {
    const attackerStrength = Number(strength);
    const targetToughness = Number(toughness);
    if (!attackerStrength || !targetToughness || hits === 0) return;
    runRollAnimation(hits, setWoundResults, setRollingWoundIndexes);
  };

  const handleRerollWoundOnes = () => {
    runSelectiveReroll(woundResults, setWoundResults, (value) => value === 1, setRollingWoundIndexes);
  };

  const handleRerollFailedWounds = () => {
    if (!woundThreshold) return;
    runSelectiveReroll(woundResults, setWoundResults, (value) => value < woundThreshold, setRollingWoundIndexes);
  };

  const handleRollSaves = () => {
    if (wounds === 0) return;
    runRollAnimation(wounds, setSaveResults, setRollingSaveIndexes);
  };

  const handleRerollSaveOnes = () => {
    runSelectiveReroll(saveResults, setSaveResults, (value) => value === 1, setRollingSaveIndexes);
  };

  const handleRerollFailedSaves = () => {
    runSelectiveReroll(saveResults, setSaveResults, (value) => value < saveThreshold, setRollingSaveIndexes);
  };

  const handleRerollSingleHit = (index) => {
    runSingleDieReroll(results, setResults, index, setRollingHitIndexes);
  };

  const handleRerollSingleWound = (index) => {
    runSingleDieReroll(woundResults, setWoundResults, index, setRollingWoundIndexes);
  };

  const handleRerollSingleSave = (index) => {
    runSingleDieReroll(saveResults, setSaveResults, index, setRollingSaveIndexes);
  };

  const incrementNumDice = () => {
    const current = Number(numDice) || 1;
    setNumDice(Math.min(100, current + 1).toString());
  };

  const decrementNumDice = () => {
    const current = Number(numDice) || 1;
    setNumDice(Math.max(1, current - 1).toString());
  };

  const incrementThreshold = () => {
    const current = Number(threshold) || 1;
    setThreshold(Math.min(6, current + 1).toString());
  };

  const decrementThreshold = () => {
    const current = Number(threshold) || 1;
    setThreshold(Math.max(1, current - 1).toString());
  };

  const incrementCritical = () => {
    const current = Number(critical) || 6;
    setCritical(Math.min(6, current + 1).toString());
  };

  const decrementCritical = () => {
    const current = Number(critical) || 6;
    setCritical(Math.max(1, current - 1).toString());
  };

  const handleReset = () => {
    setNumDice('1');
    setThreshold('1');
    setCritical('6');
    setResults([]);
    setRolling(false);
    setRollingHitIndexes([]);
    setTab('hits');
    setStrength('1');
    setToughness('1');
    setWoundResults([]);
    setRollingWoundIndexes([]);
    setSave('1');
    setSaveResults([]);
    setRollingSaveIndexes([]);
  };

  const renderTabContent = () => {
    if (tab === 'hits') {
      return (
        <div className="tab-content-shell">
          <div className="tab-summary-slot tab-summary-slot-empty" aria-hidden="true" />

          <div className="tab-controls-slot">
            <div className="inputs">
              <div className="control-group">
                <label>ATTACKS:</label>
                <div className="spinner-control">
                  <button className="spinner-btn" onClick={decrementNumDice}>−</button>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="spinner-input"
                    placeholder="1"
                    value={numDice}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || Number.isNaN(Number(value))) {
                        setNumDice('1');
                        return;
                      }
                      setNumDice(Math.max(1, Math.min(100, Number(value))).toString());
                    }}
                  />
                  <button className="spinner-btn" onClick={incrementNumDice}>+</button>
                </div>
              </div>

              <div className="control-group">
                <label>WS/BS:</label>
                <div className="spinner-control">
                  <button className="spinner-btn" onClick={decrementThreshold}>−</button>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="spinner-input"
                    placeholder="1+"
                    value={`${threshold}+`}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\+/g, '');
                      if (rawValue === '' || Number.isNaN(Number(rawValue))) {
                        setThreshold('1');
                        return;
                      }
                      setThreshold(Math.max(1, Math.min(6, Number(rawValue))).toString());
                    }}
                  />
                  <button className="spinner-btn" onClick={incrementThreshold}>+</button>
                </div>
              </div>

              <div className="control-group">
                <label>CRITICAL:</label>
                <div className="spinner-control">
                  <button className="spinner-btn" onClick={decrementCritical}>−</button>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="spinner-input"
                    placeholder="6+"
                    value={`${critical}+`}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\+/g, '');
                      if (rawValue === '' || Number.isNaN(Number(rawValue))) {
                        setCritical('6');
                        return;
                      }
                      setCritical(Math.max(1, Math.min(6, Number(rawValue))).toString());
                    }}
                  />
                  <button className="spinner-btn" onClick={incrementCritical}>+</button>
                </div>
              </div>

              <div className="button-group">
                <button className="roll-btn" onClick={handleRoll} disabled={rolling}>
                  {rolling ? 'ROLLING...' : 'ROLL'}
                </button>
                <button
                  className="roll-btn"
                  onClick={handleRerollOnes}
                  disabled={rolling || results.length === 0 || !results.includes(1)}
                >
                  RE-ROLL 1s
                </button>
                <button
                  className="roll-btn"
                  onClick={handleRerollMisses}
                  disabled={rolling || results.length === 0 || results.every((value) => value >= Number(threshold))}
                >
                  RE-ROLL MISSES
                </button>
                <button className="roll-btn reset-btn" onClick={handleReset}>REFRESH</button>
              </div>
            </div>
          </div>

          <div className="tab-results-slot">
            {results.length > 0 && (
              <div className="results results-enter">
                <p className="result-total">
                  SUCCESSFUL HITS: <strong>{hits}</strong>
                </p>

                <FaceSummary dice={results} criticalThreshold={criticalThreshold} />

                <div className="dice-list">
                  {results.map((value, index) => (
                    <button
                      type="button"
                      key={`${value}-${index}`}
                      className={`dice-face dice-face-button${rollingHitIndexes.includes(index) ? ' rolling' : ''}${value >= Number(threshold) ? ' hit' : ''}${value >= criticalThreshold ? ' critical-hit' : ''}`}
                      onClick={() => handleRerollSingleHit(index)}
                      disabled={rolling}
                      aria-label={`Re-roll hit die ${index + 1}, currently ${value}`}
                    >
                      <span className="dice-value">{value}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (tab === 'wounds') {
      return (
        <div className="tab-content-shell wounds-tab">
          <div className="tab-summary-slot">
            <div className="wound-summary-wrap">
              <div className="wound-summary-bar">
                <span className="wound-summary-item">
                  SUCCESSFUL ATTACKS: {hits}
                </span>
                <span className="wound-summary-item wound-summary-threshold">
                  TO WOUND: {woundThreshold ? `${woundThreshold}+` : '-'}
                </span>
              </div>
            </div>
          </div>

          <div className="tab-controls-slot">
            <div className="inputs">
              <div className="control-group">
                <label>ATTACKER STRENGTH:</label>
                <div className="spinner-control">
                  <button className="spinner-btn" onClick={() => setStrength(Math.max(1, Number(strength || 1) - 1).toString())}>−</button>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="spinner-input"
                    placeholder="1"
                    value={strength}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || Number.isNaN(Number(value))) {
                        setStrength('1');
                        return;
                      }
                      setStrength(Math.max(1, Math.min(20, Number(value))).toString());
                    }}
                  />
                  <button className="spinner-btn" onClick={() => setStrength(Math.min(20, Number(strength || 0) + 1).toString())}>+</button>
                </div>
              </div>

              <div className="control-group">
                <label>TARGET TOUGHNESS:</label>
                <div className="spinner-control">
                  <button className="spinner-btn" onClick={() => setToughness(Math.max(1, Number(toughness || 1) - 1).toString())}>−</button>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="spinner-input"
                    placeholder="1"
                    value={toughness}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || Number.isNaN(Number(value))) {
                        setToughness('1');
                        return;
                      }
                      setToughness(Math.max(1, Math.min(20, Number(value))).toString());
                    }}
                  />
                  <button className="spinner-btn" onClick={() => setToughness(Math.min(20, Number(toughness || 0) + 1).toString())}>+</button>
                </div>
              </div>

              <div className="button-group">
                <button
                  className="roll-btn"
                  onClick={handleRollWounds}
                  disabled={hits === 0 || rolling || !strength || !toughness}
                >
                  {rolling ? 'ROLLING...' : 'ROLL'}
                </button>
                <button
                  className="roll-btn"
                  onClick={handleRerollWoundOnes}
                  disabled={rolling || woundResults.length === 0 || !woundResults.includes(1)}
                >
                  RE-ROLL 1s
                </button>
                <button
                  className="roll-btn"
                  onClick={handleRerollFailedWounds}
                  disabled={rolling || woundResults.length === 0 || !woundThreshold || woundResults.every((value) => value >= woundThreshold)}
                >
                  RE-ROLL FAILED WOUNDS
                </button>
                <button className="roll-btn reset-btn" onClick={handleReset}>REFRESH</button>
              </div>
            </div>
          </div>

          <div className="tab-results-slot">
            {woundResults.length > 0 && (
              <div className="results results-enter">
                <p className="result-total">
                  SUCCESSFUL WOUNDS: <strong>{wounds}</strong>
                </p>
                <FaceSummary dice={woundResults} />
                <div className="dice-list">
                  {woundResults.map((value, index) => (
                    <button
                      type="button"
                      key={`${value}-${index}`}
                      className={`dice-face dice-face-button${rollingWoundIndexes.includes(index) ? ' rolling' : ''}${woundThreshold && value >= woundThreshold ? ' hit' : ''}`}
                      onClick={() => handleRerollSingleWound(index)}
                      disabled={rolling}
                      aria-label={`Re-roll wound die ${index + 1}, currently ${value}`}
                    >
                      <span className="dice-value">{value}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="tab-content-shell wounds-tab">
        <div className="tab-summary-slot">
          <div className="wound-summary-wrap">
            <div className="wound-summary-bar">
              <span className="wound-summary-item">
                SUCCESSFUL WOUNDS: {wounds}
              </span>
            </div>
          </div>
        </div>

        <div className="tab-controls-slot">
          <div className="inputs">
            <div className="control-group">
              <label>SAVE:</label>
              <div className="spinner-control">
                <button className="spinner-btn" onClick={() => setSave(Math.max(1, Number(save) - 1).toString())}>−</button>
                <input
                  type="text"
                  inputMode="numeric"
                  className="spinner-input"
                  placeholder="1+"
                  value={`${save}+`}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\+/g, '');
                    if (rawValue === '' || Number.isNaN(Number(rawValue))) {
                      setSave('1');
                      return;
                    }
                    setSave(Math.max(1, Math.min(6, Number(rawValue))).toString());
                  }}
                />
                <button className="spinner-btn" onClick={() => setSave(Math.min(6, Number(save) + 1).toString())}>+</button>
              </div>
            </div>

            <div className="button-group">
              <button
                className="roll-btn"
                onClick={handleRollSaves}
                disabled={wounds === 0 || rolling}
              >
                {rolling ? 'ROLLING...' : 'ROLL'}
              </button>
              <button
                className="roll-btn"
                onClick={handleRerollSaveOnes}
                disabled={rolling || saveResults.length === 0 || !saveResults.includes(1)}
              >
                RE-ROLL 1s
              </button>
              <button
                className="roll-btn"
                onClick={handleRerollFailedSaves}
                disabled={rolling || saveResults.length === 0 || saveResults.every((value) => value >= saveThreshold)}
              >
                RE-ROLL FAILED SAVES
              </button>
              <button className="roll-btn reset-btn" onClick={handleReset}>REFRESH</button>
            </div>
          </div>
        </div>

        <div className="tab-results-slot">
          {saveResults.length > 0 && (
            <div className="results results-enter">
              <div className="result-summary-row">
                <p className="result-total">
                  SAVED: <strong>{saved}</strong>
                </p>
                <p className="result-total">
                  UNSAVED WOUNDS: <strong>{unsavedWounds}</strong>
                </p>
              </div>
              <FaceSummary dice={saveResults} />
              <div className="dice-list">
                {saveResults.map((value, index) => (
                  <button
                    type="button"
                    key={`${value}-${index}`}
                    className={`dice-face dice-face-button${rollingSaveIndexes.includes(index) ? ' rolling' : ''}${value >= saveThreshold ? ' hit' : ''}`}
                    onClick={() => handleRerollSingleSave(index)}
                    disabled={rolling}
                    aria-label={`Re-roll save die ${index + 1}, currently ${value}`}
                  >
                    <span className="dice-value">{value}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="dice-roller-container">
      <h1 className="main-title">DICE ROLLER</h1>

      <div className="tabs">
        <button
          className={`roll-btn${tab === 'hits' ? ' tab-active' : ''}`}
          onClick={() => setTab('hits')}
        >
          HITS
        </button>
        <button
          className={`roll-btn${tab === 'wounds' ? ' tab-active' : ''}`}
          onClick={() => setTab('wounds')}
          disabled={hits === 0}
        >
          WOUNDS
        </button>
        <button
          className={`roll-btn${tab === 'saves' ? ' tab-active' : ''}`}
          onClick={() => setTab('saves')}
          disabled={wounds === 0}
        >
          SAVES
        </button>
      </div>

      <div key={tab} className="tab-panel">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default App;
