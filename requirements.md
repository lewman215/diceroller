
# Dice Roller Web App Requirements

## Functional Requirements

1. Users must be able to enter the number of dice to roll (all dice are six-sided, D6).
2. Users must be able to set a threshold value (between 1 and 6) that defines a "hit".
   - Provide adjacent up and down buttons to increment/decrement the threshold instead of requiring manual typed input.
   - Similarly, the number of dice control must include up/down buttons to change the count.
3. When rolling, the app must generate random results for the specified number of D6 dice.
4. The app must count and display how many dice meet or exceed the threshold (number of "hits").
5. The app must show the result of each individual die rolled.
6. The interface must be clear and easy to use for entering inputs and viewing results.
9. When rolling dice, the app should display a visual animation effect to give the impression that the dice are rolling before showing the final results.  
   - The animation should be a "cool" 3D-style dice roll, not just a simple fade or spin.  
   - Use transformations or a library to render dice with perspective and movement for added polish.

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

## UI/Design Requirements

### Overall Layout
- Improve the spacing and layout of the entire application (all sections).
- Remove the "squished" appearance of the layout.
- **PRIORITY: Ensure the entire app is center-aligned (horizontally) in the viewport on all screen sizes.** Currently the app is left-aligned and needs to be fixed.

### Design Aesthetic
- Adopt a Warhammer 40k grimdark theme throughout the application.
- **Color Scheme:** Dark, industrial colors including blacks, golds, blood reds, and industrial grays. Use dark backgrounds with metallic accents.
- **Visual Style:** Gothic and ornate industrial aesthetic with jagged edges, skull motifs, and military insignia elements.
- **Typography:** Bold, imposing fonts with a militaristic feel to reinforce the grimdark atmosphere.
- **Imagery & Iconography:** Incorporate Warhammer 40k visual elements such as skulls, eagles, and gothic decorative accents throughout the UI.
- **Tone:** Labels and text should have a grimdark and militaristic tone appropriate to the 40k universe.
- Ensure clean, organized visual presentation within the grimdark aesthetic.
- Replace the default system font with a more appealing, legible typeface suited to the militaristic theme.

### Inputs and Controls
- Style input boxes so they look polished and visually distinct from bland HTML defaults.
- Use consistent padding, borders, and focus outlines for input elements.
- Provide custom up/down controls for numeric fields (dice count and threshold) rather than plain text inputs. They should be large, easy to tap/click, and change value appropriately.
- Buttons (including the up/down controls) should have hover effects that slightly change their background or border color for feedback.

### Dice Display and Visibility
- Prioritize the visibility and prominence of dice display.
- Make individual dice results easily visible and readable.

### Button Alignment and Symmetry
- Fix button alignment (currently buttons are not symmetrical and positioned on the left side).
- Ensure buttons are properly centered and symmetrically arranged.
- Make the button layout look polished and balanced.

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
