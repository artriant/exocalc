# Exocalc 🪐

Exocalc is an iterative solver engine (currently demostrated on exoplanets and primarily on their physical characteristics).
Although it can be currenlty used for planets and other celestial bodies like moons, dwarf planets Etc.

It simulates a step-by-step reasoning process where known physical values are repeatedly fed through a 'pool' of equations. Each iteration can produce new values, which are then reused in further iterations until no new information can be extracted.

## Core Idea

Instead of solving equations in isolation (or in a fixed order - given that specific inputs are filled), Exocalc builds a propagation system that deterministically solves problems through iterative inference:

- You provide a small set of known values
- The system applies physics equations in both forward and reverse forms
- New values are derived iteratively
- The process repeats until convergence

## Features

- Iterative equation-solving engine
- Bidirectional equation support (forward & inverse forms)
- Internal SI unit system (We solve everything in SI in the background))
- Support for astronomical reference bodies (Earth, Jupiter, etc.)
- Step-by-step console logging of solving process
- Conflict-aware input validation
- Quality-of-life tools:
  - Instant unit conversion & comparison mode
  - Quick unit swap buttons
  - Enter-to-recalculate
  - Auto-recalculation mode

## Live Demo

https://artriant.github.io/exocalc/

## Info / Documentation

See [`Info.html`](https://artriant.github.io/exocalc/Info.html) for more details on:

- The general logic
- Scientific conventions used
- Unit system
- Physical constants
- Calculation methodology
- Background theory and usage guidelines

## Status

Early working version (v0.7 prototype).  
Active development ongoing.