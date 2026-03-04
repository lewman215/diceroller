
# Imperial Dice Roller

## Functional Requirements

1. Users must be able to enter the number of dice to roll (all dice are six-sided, D6).
   - The input field/control for the number of dice is labeled "Attacks" and uses a custom spinner (up/down buttons) for adjustment. The value is always at least 1 and at most 100.
2. Users must be able to set a threshold value (between 1 and 6) that defines a "hit".
   - The threshold input is labeled "WS/BS" and uses a custom spinner (up/down buttons) for adjustment. The value is always displayed as 1+, 2+, ..., 6+ and cannot go below 1+ or above 6+.
   - The threshold always starts at 1+ when the app loads or is reset.
   - Manual input is allowed but is clamped to the 1-6 range and always displayed as N+.
3. When rolling, the app generates random results for the specified number of D6 dice. Each die is a number from 1 to 6.
4. The app counts and displays how many dice meet or exceed the threshold (number of "hits").
   - In the Battle results section, the display shows "Successful Hits: (number of dice that hit)".
5. The app shows the result of each individual die rolled, with hits visually highlighted.
6. The interface is clear and easy to use for entering inputs and viewing results. All controls are center-aligned and styled for clarity and accessibility.
9. When rolling dice, the app displays a visual animation effect to give the impression that the dice are rolling before showing the final results.
   - The animation uses 3D-style CSS transforms (rotateX, rotateY, rotateZ, scale) and must always end with the squares representing the dice in an upright (readable) position (i.e., not rotated or skewed at the end of the animation).
   - The animation is applied to each die individually and lasts about 0.6 seconds.
   - A realistic dice tumble/rolling sound effect is played ("Rolling Dice.mp3" in public/sounds) when the dice are rolled.

10. Sound Effects:
   - When dice are rolled, a realistic dice tumble sound effect ("Rolling Dice.mp3") is played using the browser's Audio API.

8. After determining hits, the user can navigate to a second tab called "Wounds".
   - The wounds tab automatically receives the number of successful hits from the first tab.
   - The user can return to the hits tab and change their dice results; the wounds tab updates automatically.
   - In the wounds tab, the user enters "Attacker Strength" and "Target Toughness" values (each between 1 and 20) using custom spinner controls.
   - The number of dice to roll for wounds equals the number of successful hits from the first tab.
   - The threshold for a successful wound is determined by:
       - Strength is twice or more than Toughness: threshold 2+
       - Strength is more than Toughness: threshold 3+
       - Strength is equal to Toughness: threshold 4+
       - Strength is less than Toughness: threshold 5+
       - Strength is half or less than Toughness: threshold 6+
   - The wounds tab displays the number of wounded enemies with output similar in style to the hits tab (showing individual dice results and which succeeded).
7. Users must be able to reset the app to its initial state using a "refresh" button (labeled "REGROUP"):
   - All dice rolls are cleared (none shown).
   - All input boxes are emptied.
   - All settings and options are reset to their default values (including threshold reset to 1+).
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
- Input boxes are styled with custom CSS for a polished, visually distinct look.
- All numeric fields (dice count, threshold, strength, toughness) use custom up/down controls (spinner buttons) that are large and easy to use.
- Buttons and controls have hover and active effects for feedback.
- The "Attacks" label appears on a single line and is fully contained within its box.
- The threshold label is "WS/BS".

### Dice Display and Visibility
- Dice results are displayed prominently, with each die result shown in a styled box.
- Hits are visually highlighted (different background and border color).

### Button Alignment and Symmetry
- All buttons are centered and symmetrically arranged in button groups for a polished, balanced look.

## Non-Functional Requirements

- The app is responsive and usable on both desktop and mobile devices.
- The interface is intuitive and accessible, with large controls and clear feedback.
- Results are displayed promptly and clearly after rolling.

## Optional Features

- Option to re-roll dice with a single click. (Not implemented)
- Display statistics, such as average hits over multiple rolls. (Not implemented)
- Support for dark mode. (Partially supported via CSS color-scheme)

---

**Note:** Only standard six-sided dice (D6) are required for this app.
