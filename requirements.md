
# Dice Roller Web App Requirements

## Functional Requirements

1. Users must be able to enter the number of dice to roll (all dice are six-sided, D6).
2. Users must be able to set a threshold value (between 1 and 6) that defines a "hit".
3. When rolling, the app must generate random results for the specified number of D6 dice.
4. The app must count and display how many dice meet or exceed the threshold (number of "hits").
5. The app must show the result of each individual die rolled.
6. The interface must be clear and easy to use for entering inputs and viewing results.
9. When rolling dice, the app should display a visual animation effect to give the impression that the dice are rolling before showing the final results.

8. After determining hits, the user can navigate to a second tab called "Wounds".
   - The wounds tab automatically receives the number of successful hits from the first tab.
   - The user can return to the hits tab and change their dice results; the wounds tab updates automatically.
   - In the wounds tab, the user enters "Strength" and "Toughness" values once for all dice.
   - The number of dice to roll for wounds equals the number of successful hits from the first tab.
   - The threshold for a successful wound is determined by:
	   - Strength is twice or more than Toughness: threshold 2+
	   - Strength is more than Toughness: threshold 3+
	   - Strength is equal to Toughness: threshold 4+
	   - Strength is less than Toughness: threshold 5+
	   - Strength is half or less than Toughness: threshold 6+
   - The wounds tab displays the number of wounds as the main label, with output similar in style to the hits tab (showing individual dice results and which succeeded).
7. Users must be able to reset the app to its initial state using a "refresh" button:
	- All dice rolls are cleared (none shown).
	- All input boxes are emptied.
	- All settings and options are reset to their default values.
	- The user sees the same state as when first opening the application.

## Non-Functional Requirements

- The app should be responsive and usable on both desktop and mobile devices.
- The interface should be intuitive and accessible.
- Results should be displayed promptly and clearly after rolling.

## Optional Features

- Option to re-roll dice with a single click.
- Display statistics, such as average hits over multiple rolls.
- Support for dark mode.

---

**Note:** Only standard six-sided dice (D6) are required for this app.
