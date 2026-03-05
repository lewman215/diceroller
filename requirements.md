

# Imperial Dice Roller — Requirements (as implemented)

## Functional Requirements (Current App)

1. Users can enter the number of dice to roll (D6 only) using a custom spinner labeled "Attacks" (min 1, max 100).
2. Users can set a hit threshold (1–6, labeled "WS/BS") using a custom spinner. Input is clamped to 1–6 and always shown as N+.
3. Rolling generates random D6 results for the specified number of dice. Each die is shown individually.
4. The app counts and displays how many dice meet or exceed the hit threshold ("Successful Hits"). Hits are visually highlighted.
5. Dice results summary shows the count of each face (1–6) after rolling.
6. The interface is clear, center-aligned, and uses large, accessible controls. All controls are styled for clarity and feedback.
7. Dice rolling includes a visual animation and plays a dice sound effect ("Rolling Dice.mp3").
8. Users can re-roll all dice that show a 1, or all dice that missed the hit threshold, with animation and sound.
9. A "refresh" button resets all inputs, results, and settings to their initial state.
10. After rolling for hits, users can switch to a "Wounds" tab:
    - The wounds tab automatically receives the number of successful hits as the number of dice to roll.
    - Users enter "Attacker Strength" and "Target Toughness" (1–20, custom spinners).
    - The "to wound" threshold is calculated per Warhammer rules and displayed live.
    - Users roll wounds dice (equal to hits); each die is shown, and wounds are counted/highlighted.
    - If Strength or Toughness changes after rolling, the wound count and highlighting update automatically to match the new threshold.
    - If the number of hits changes, wound results are cleared.
    - The wounds tab can be used repeatedly as long as there are hits.

## UI/Design Requirements (Current App)

- All controls and results are center-aligned and spaced for clarity.
- The app uses a dark, Warhammer 40k-inspired theme (black, gold, red, gray) with bold, militaristic fonts.
- Numeric fields (dice, threshold, strength, toughness) use custom spinner controls.
- Buttons and controls have hover/active effects and are grouped symmetrically.
- Dice results are displayed in styled boxes; hits/wounds are visually highlighted.
- The "Attacks" and "WS/BS" labels are always visible and clear.

## Non-Functional Requirements

- The app is responsive and usable on desktop and mobile.
- The interface is intuitive, accessible, and provides prompt feedback.
- Dice rolling and sound effects are smooth and reliable.

## Optional/Unimplemented Features

- Statistics (e.g., average hits over multiple rolls): Not implemented.
- Option to re-roll any dice (beyond 1s/misses): Not implemented.
- Full dark mode toggle: Partially supported via CSS.

---

**Note:** Only standard six-sided dice (D6) are supported. All requirements above reflect the current, verified app functionality as of March 2026.
