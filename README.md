
# Exocalc

Exocalc is an iterative solver for planetary physics problems.

It works by simulating a step-by-step reasoning process where known physical values are repeatedly fed through a network of equations. Each iteration may produce new derived values, which are then reused in further iterations until no new information can be extracted.

## Core idea

Instead of solving equations in isolation, Exocalc builds a propagation system:

- You provide a small set of known values
- The system applies physics equations in both forward and reverse form
- New values are derived iteratively
- The process repeats until convergence

## Features

- Iterative equation solving engine
- Bidirectional equation support (forward and reverse forms)
- SI unit internal system
- Support for conventional astronomical constants (Earth, Jupiter, etc.)
- Detailed console logging of solving steps
- Conflict-aware input system (avoids inconsistent values)

## Live Demo

https://artriant.github.io/exocalc/

## Info / Documentation

See `Info.html` for full explanation of:
- Scientific conventions used
- Unit system
- Physical constants
- Calculation methodology

## Status

This is an early working version (v0.7 prototype).  
The project is under active development.