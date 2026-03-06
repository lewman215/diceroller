

# Dice Roller — Requirements (as implemented)

## Functional Requirements (Current App)

1. Users can enter the number of dice to roll (D6 only) using a custom spinner labeled "Attacks" (min 1, max 100).
2. Users can set a hit threshold (1–6, labeled "WS/BS") using a custom spinner. Input is clamped to 1–6 and always shown as N+.
3. Rolling generates random D6 results for the specified number of dice. Each die is shown individually.
4. The app counts and displays how many dice meet or exceed the hit threshold ("Successful Hits"). Hits are visually highlighted.
    - The Hits tab includes a "Critical" spinner to the right of "WS/BS" using the same 1–6 range and N+ display, defaulting to 6+.
    - Hit dice that meet or exceed the critical threshold are visually identified as critical hits.
5. Dice results summary shows the count of each face (1–6) after rolling.
    - On the Hits tab, each face at or above the current critical threshold shows a small flame indicator in the summary row, and this updates live when the critical threshold changes.
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
11. After rolling for wounds, users can switch to a "Saves" tab:
    - The saves tab automatically receives the number of successful wounds as the number of dice to roll.
    - The tab shows a "Successful Wounds" summary box.
    - Users set a save threshold (1–6, labeled "Save") using a custom spinner. Input is clamped to 1–6 and always shown as N+.
    - Users roll save dice (equal to successful wounds); each die is shown, and saved dice are counted/highlighted.
    - Users can re-roll all save dice that show a 1, with animation and sound.
    - Users can re-roll all failed save dice, where failed means below the current save threshold, with animation and sound.
    - The app displays the number of saved dice and the number of remaining unsaved wounds after rolling saves.
    - If the number of successful wounds changes, save results are cleared.
    - The saves tab can be used repeatedly as long as there are successful wounds.
12. On Hits, Wounds, and Saves, users can click an individual die result to re-roll only that die with animation and sound.

## UI/Design Requirements (Current App)

- All controls and results are center-aligned and spaced for clarity.
- The app uses a dark, Warhammer 40k-inspired theme (black, gold, red, gray) with bold, militaristic fonts.
- Numeric fields (dice, threshold, strength, toughness) use custom spinner controls.
- Buttons and controls have hover/active effects and are grouped symmetrically.
- Switching between Hits, Wounds, and Saves tabs uses a smooth layered transition with eased motion so tab changes feel noticeably softer without slowing interaction.
- Hits, Wounds, and Saves use a consistent tab content layout so summaries, controls, and action buttons stay in stable positions when switching tabs.
- When roll results appear on Hits, Wounds, or Saves, the results section enters with a short smooth animation instead of appearing instantly.
- The results panels on Hits, Wounds, and Saves use consistent sizing and spacing so they appear uniform across tabs.
- The content inside the results panels on Hits, Wounds, and Saves uses consistent internal alignment and vertical positioning so summaries, face counts, and dice rows appear in the same locations across tabs.
- Dice results are displayed in styled boxes; hits/wounds are visually highlighted.
- The "Attacks" and "WS/BS" labels are always visible and clear.

## Non-Functional Requirements

- The app is responsive and usable on desktop and mobile.
- The interface is intuitive, accessible, and provides prompt feedback.
- Dice rolling and sound effects are smooth and reliable.

## Optional/Unimplemented Features

- Statistics (e.g., average hits over multiple rolls): Not implemented.
- Arbitrary multi-die selection for custom re-rolls beyond the built-in buttons and single clicked die: Not implemented.
- Full dark mode toggle: Partially supported via CSS.

---

**Note:** Only standard six-sided dice (D6) are supported. All requirements above reflect the current, verified app functionality as of March 2026.
