# Exocalc 🪐

**Exocalc** is a demo for a deterministic iterative solver, focusing on the physical characteristics of exoplanets (though it can be used for other celestial bodies too). 
What you get looks like a typical web calculator, but you quickly notice it has multiple inputs and solves problems bidirectionaly, whereas most calculators solve equations in only one direction.

## Core Idea of the Solver

Instead of relying on a fixed calculation order, the solver propagates the known values(aka inputs) through a shared "pool of equations." Newly derived values are reused in the next iteration until no further information can be extracted.

- You provide a small set of known values (for example, mass and radius).
- The system applies physics equations in both forward and reverse forms.
- New values are derived iteratively.
- The process repeats until convergence.

## Features

- Iterative equation-solving engine
- Bidirectional equation support (forward and inverse forms)
- Internal SI unit system (everything is solved in SI in the background)
- Support for reference units (such as Earth and Jupiter units)
- Step-by-step console logging of the solving process
- Conflict-aware input validation
- Quality-of-life tools:
  - Instant unit conversion in the output when comparison mode is ON
  - Quick unit swap buttons
  - Enter-to-recalculate
  - Auto-recalculation mode

## Live Demo

https://artriant.github.io/exocalc/

## Info / Documentation

See <a href="https://artriant.github.io/exocalc/Info.html" target="_blank"><code>Info.html</code></a> for more details on:

- The general logic and idea of the solver
- Unit system constant and coventional values
- Background, theory and usage guidelines

## Status

Early working version (v0.7 prototype).  
Active development ongoing.