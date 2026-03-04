## Developer Agent Instructions

## Purpose
This file provides instructions for the developer agent responsible for implementing project requirements.

## Implementation Rules
1. **Source of Truth:**
   - Only implement requirements explicitly listed in [Requirements.md](Requirements.md).
   - Ignore any requirements not present in [Requirements.md](Requirements.md).

2. **Update Code Command:**
   - When instructed to "update code":
     - Review all requirements in [Requirements.md](Requirements.md).
     - Identify requirements that are not yet implemented in the codebase.
     - Implement only the missing requirements.

3. **No Assumptions:**
   - Do not infer, guess, or add requirements from any other source.
   - Do not implement features, fixes, or changes unless they directly correspond to a listed requirement.

4. **Traceability:**
   - Ensure each code change is traceable to a specific requirement in [Requirements.md](Requirements.md).
   - Reference the requirement in code comments where appropriate.

5. **Repeatable Process:**
   - On every "update code" request, repeat the process: check [Requirements.md](Requirements.md), identify missing implementations, and implement them.


---

# Code Architecture Overview

The Dice Roller Web App is implemented as a React single-page application (SPA) using functional components and React hooks for state management. The main architectural elements are:

- **Entry Point:**
   - The app is bootstrapped in `src/main.jsx`, which renders the root `App` component into the DOM.

- **App Component (`src/App.jsx`):**
   - Contains all core UI and logic for both the "Hits" and "Wounds" tabs.
   - Uses React `useState` for managing user inputs, dice results, tab selection, and wounds logic.
   - Implements requirement traceability via code comments referencing [Requirements.md](Requirements.md).
   - Handles tab navigation, dice rolling, wounds calculation, and reset functionality.

- **Styling:**
   - CSS files (`src/App.css`, `src/index.css`) provide responsive and accessible styles for the app interface.

- **Assets:**
   - Static assets (e.g., SVGs) are located in `src/assets/`.

All business logic and UI are contained within the `App` component for simplicity and direct traceability to requirements. The architecture is designed for clarity, maintainability, and ease of mapping requirements to implementation.

**Note:** If all requirements are implemented, no changes should be made when "update code" is requested.