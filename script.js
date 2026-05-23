// script.js

const G = 6.67430e-11; // Gravitational Constant in N(m/kg)^2 or m^3 kg^-1 s^-2, Concentional value

function isValidNumber(value) {
  return value !== null && value !== undefined && (typeof value !== 'string' || value.trim() !== '') && isFinite(value);
}

//The Variables Template:

//value:default Value
//unit: Always the SI base unit (for internal math).
//label: Label in the UI
//type: Category of units
//displayUnit: Default display unit (can also be used to overide defaults with ['unit1', 'unit2'] )

const variablesTemplate = {
  radius: {
    value: null,
    unit: 'm',
    label: 'Mean Radius',
    type: 'length_r',
    displayUnit: 'R_earth'
  },
  radiusEquator: {
    value: null,
    unit: 'm',
    label: 'R equator (a)',
    type: 'length_r',
    displayUnit: 'R_earth'
  },
  radiusPole: {
    value: null,
    unit: 'm',
    label: 'R polar (c)',
    type: 'length_r',
    displayUnit: 'R_earth'
  },
  flattening: {
    value: null,
    unit: 'raw',
    label: 'Flattening (f)',
    type: 'flatness',
    displayUnit: 'raw'
  },
  circumference: {
    value: null,
    unit: 'm',
    label: 'Mean Circumference',
    type: 'length_c',
    displayUnit: 'C_earth'
  },
  circumferenceEquator: {
    value: null,
    unit: 'm',
    label: 'C (Eq)',
    type: 'length_c',
    displayUnit: 'C_earth'
  },
  C_meridional: {
  value: null,
  unit: 'm',
  label: 'C (Meridional)',
  type: 'length_c',
  displayUnit: 'C_earth'
  },  
  meanArea: {
    value: null,
    unit: 'm^2',
    label: 'Mean Area',
    type: 'area',
    displayUnit: 'A_earth'
  },
  oblateArea: {
    value: null,
    unit: 'm^2',
    label: 'Oblate Area',
    type: 'area',
    displayUnit: 'A_earth'
  },
  volume: {
    value: null,
    unit: 'm^3',
    label: 'Volume',
    type: 'volume',
    displayUnit: 'V_earth'
  },

  mass: {
    value: null,
    unit: 'kg',
    label: 'Mass',
    type: 'mass',
    displayUnit: 'M_earth'
  },
  density: {
    value: null,
    unit: 'kg/m^3',
    label: 'Density',
    type: 'density',
    displayUnit: 'rho_earth'
  },
  surfaceGravity: {
    value: null,
    unit: 'm/s^2',
    label: 'Surface Gravity (Mean)',
    type: 'acceleration',
    displayUnit: 'g_earth'
  },
  surfaceGravityPole: {
    value: null,
    unit: 'm/s^2',
    label: 'SG (p)',
    type: 'acceleration',
    displayUnit: 'g_earth'
  },
  surfaceGravityEquator: {
    value: null,
    unit: 'm/s^2',
    label: 'SG (Eq)',
    type: 'acceleration',
    displayUnit: 'g_earth'
  },
  centrifugalAccEq: {
    value: null,
    unit: 'm/s^2',
    label: 'a-c (Eq)',
    type: 'acceleration',
    displayUnit: 'g_earth'
  },

  surfaceGravityEffectiveEq: {
    value: null,
    unit: 'm/s^2',
    label: 'SG (Eq) eff.',
    type: 'acceleration',
    displayUnit: 'g_earth'
  },
  escapeVelocity: {
    value: null,
    unit: 'm/s',
    label: 'Esc. Velocity',
    type: 'speed',
    displayUnit: 'km/s'
  },
  escapeVelocityEquator: {
    value: null,
    unit: 'm/s',
    label: 'Esc V(eq)',
    type: 'speed',
    displayUnit: 'km/s'
  },
  linearVelocity: {
    value: null,
    unit: 'm/s',
    label: '𝑣rot',
    type: 'speed',
    displayUnit: 'km/s'
  },
  linearVelocityEquator: {
    value: null,
    unit: 'm/s',
    label: '𝑣rot(eq)',
    type: 'speed',
    displayUnit: 'km/s'
  },

  siderealDay: {
    value: null,
    unit: 's',
    label: 'T (sr)',
    type: 'time',
    displayUnit: 'day'
  },
  rotationRate: {
    value: null,
    unit: 'rad/s',
    label: 'ω (sr)',
    type: 'angular_speed',
    displayUnit: 'rpd'
  },

};

const units = {
  length_r: { // radii
    m: {
      toSI: 1,
      label: 'm'
    },
    km: {
      toSI: 1000,
      label: 'km'
    },
    'R_earth': {
      toSI: 6.3781366e6,
      label: 'R⊕'
    },
    'R_jupiter': {
      toSI: 7.1492e7,
      label: 'RJ'
    },
  },
  length_c: { // circumferences
    m: {
      toSI: 1,
      label: 'm'
    },
    km: {
      toSI: 1000,
      label: 'km'
    },
    'C_earth': {
      toSI: 40075014,
      label: 'C⊕'
    }, //  Derived from the conventional radiuses above
    'C_jupiter': {
      toSI: 449197484,
      label: 'CJ'
    }, //
  },
  mass: {
    kg: {
      toSI: 1,
      label: 'kg'
    },
    t: {
      toSI: 1000,
      label: 't'
    },
    'M_earth': {
      toSI: 5.9722e24,
      label: 'M⊕'
    }, //Derived from the geocentric gravitational constant
    'M_jupiter': {
      toSI: 1.8981e27,
      label: 'MJ'
    }, //Deriver from the Jovian gravitational constant
  },
  density: {
    'kg/m^3': {
      toSI: 1,
      label: 'kg/m³'
    },
    'g/cm^3': {
      toSI: 1000,
      label: 'g/cm³'
    },
    'rho_earth': {
      toSI: 5514,
      label: 'ρ⊕'
    },
    'rho_jupiter': {
      toSI: 1326,
      label: 'ρJ'
    },
  },
  acceleration: {
    'm/s^2': {
      toSI: 1,
      label: 'm/s²'
    },
    'g_earth': {
      toSI: 9.80665,
      label: 'g⊕'
    }, //conventionally defined constant known as standard gravity (gn)
    'g_jupiter': {
      toSI: 24.79,
      label: 'gJ'
    }, //is the accepted mean surface gravity of Jupiter. Unlike Earth's standard gravity, this value is a mean derived from observational data, which accounts for the variations in gravity across Jupiter's surface caused by its rapid rotation and shape. It is a reliable and accurate value for general astronomical use.
    'logg': {
      toSI: 0.01, // 1 cm/s² = 0.01 m/s²
      label: 'log(g)',
      isLog: true // custom flag so we can treat it differently
    },
  },
  volume: {
    'm^3': {
      toSI: 1,
      label: 'm³'
    },
    'km^3': {
      toSI: 1e9,
      label: 'km³'
    },
    'V_earth': {
      toSI: 1.08321e21,
      label: 'V⊕'
    }, //is the volume of a perfect sphere with a radius equal to the conventional mean radius of Earth (6,371 km). This is a standard value used for Earth's total volume in most astronomical calculations.
    'V_jupiter': {
      toSI: 1.43128e24,
      label: 'VJ'
    }, //is the volume of a spheroid with the IAU-defined nominal equatorial radius (71,492 km) and nominal polar radius (66,854 km) of Jupiter. This is the conventional value used for Jupiter's volume in professional astronomy.
  },
  flatness: {
    'raw': {
      toSI: 1,
      label: 'raw'
    },
    '%': {
      toSI: 0.01,
      label: '%'
    },
  },
  speed: {
    'm/s': {
      toSI: 1,
      label: 'm/s'
    },
    'km/s': {
      toSI: 1000,
      label: 'km/s'
    },
    'km/h': {
      toSI: 1000 / 3600,
      label: 'km/h'
    },
    'mi/h': {
      toSI: 1609.34 / 3600,
      label: 'mph'
    },
    'mach': {
      toSI: 343,
      label: 'Mach'
    },
    'V_earth_esc': {
      toSI: 11186,
      label: 'V⊕_esc'
    }, //The value of 11,186 m/s is the standard, accepted escape velocity from Earth's mean surface. It's derived using the conventional values for Earth's gravitational parameter (GM E) and its mean radius.
    'V_jupiter_esc': {
      toSI: 59500,
      label: 'VJ_esc'
    }, //he value of 59,500 m/s is the widely accepted mean escape velocity from Jupiter's surface. It's calculated using Jupiter's conventional gravitational parameter (GM J) and its nominal equatorial radius.
  },
  area: {
    'm^2': {
      toSI: 1,
      label: 'm²'
    },
    'km^2': {
      toSI: 1e6,
      label: 'km²'
    },
    'A_earth': {
      toSI: 5.1006447e14,
      label: 'A⊕'
    }, //The value is the surface area of a perfect sphere with the same radius as Earth's conventional mean radius (6,371 km). This is the standard value used for Earth's total surface area.
    'A_jupiter': {
      toSI: 6.1419e16,
      label: 'AJ'
    }, //The value is the surface area of an oblate spheroid that has the same dimensions as Jupiter's conventional nominal equatorial and polar radii. Since Jupiter is a gas giant and not a perfect sphere, this value provides a more accurate representation of its surface area than a simple spherical model.
    //Both of these values are consistent with the conventional radii you've used throughout your calculator, ensuring your final unit set is internally coherent and scientifically sound.
  },
  time: {
    s: {
      toSI: 1,
      label: 's'
    },
    min: {
      toSI: 60,
      label: 'min'
    },
    hour: {
      toSI: 3600,
      label: 'h'
    },
    day: {
      toSI: 86400,
      label: 'day'
    },
    'day_sr': {
      toSI: 86164.0905,
      label: 'Day(SR)'
    },
    year: {
      toSI: 31557600,
      label: 'yr'
    } // Julian year
  },
  angular_speed: {
    'rad/s': {
      toSI: 1,
      label: 'rad/s'
    },
    'rpm': {
      toSI: (2 * Math.PI) / 60,
      label: 'rpm'
    },
    'rpd': {
      toSI: (2 * Math.PI) / 86400,
      label: 'rot/day'
    }
  }
};

function convertToSI(value, fromUnit, unitType) {
  if (value === null || value === undefined)
    return null;
  const unitInfo = units[unitType]?.[fromUnit];
  if (unitInfo.isLog) { //Input is log10(g [cm/s^2]), so convert back to m/s^2
    return Math.pow(10, value) * 0.01;
  }
  if (!unitInfo) {
    console.error(`Unknown unit or unit type during conversion to SI: ${fromUnit} (${unitType})`);
    return null;
  }
  return value * unitInfo.toSI;
}

function convertFromSI(value, toUnit, unitType) {
  if (value === null || value === undefined)
    return null;
  const unitInfo = units[unitType]?.[toUnit];
  if (unitInfo.isLog) { // Convert from m/s^2 to log10(g [cm/s^2])
    return Math.log10(value / 0.01);
  }
  if (!unitInfo) {
    console.error(`Unknown unit or unit type during conversion from SI: ${toUnit} (${unitType})`);
    return null;
  }
  if (unitInfo.toSI === 0) {
    console.error(`Conversion factor to SI is zero for unit: ${toUnit}`);
    return null;
  }
  return value / unitInfo.toSI;
}

function validateInput(varName, inputValue) {
  const varData = variablesTemplate[varName];
  if (!varData)
    return true;

  const parsedValue = parseFloat(inputValue);

  if (inputValue.trim() === '' || isNaN(parsedValue)) {
    return true;
  }

  switch (varName) {
  case 'radius':
  case 'radiusEquator':
  case 'radiusPole':
  case 'volume':
  case 'mass':
  case 'density':
  case 'surfaceGravity':
  case 'escapeVelocity':
  case 'escapeVelocityEquator':
  case 'linearVelocity':
  case 'linearVelocityEquator':
  case 'meanArea':
  case 'oblateArea':
    return parsedValue > 0;
  case 'flattening':
    const selectedUnit = variableElements[varName]?.unitSelect?.value || varData.unit;
    if (selectedUnit === '%') {
      return parsedValue >= 0 && parsedValue < 100;
    } else {
      return parsedValue >= 0 && parsedValue < 1;
    }
  default:
    return true;
  }
}
// ===================================================
//  EQUATION LIBRARY
// ===================================================
// Each equation defines how one variable can be derived from others.
// Structure:
//   name        → Unique identifier
//   inputs      → Required known variables
//   output      → Variable this equation can compute
//   calculate() → Implementation returning the result in SI units
//   isDerived   → Marks secondary (non-primary) equations
// ===================================================
const equations = [

  // ---------------------------------------------------
  //  MASS–DENSITY–VOLUME RELATION
  // ---------------------------------------------------
  {
    name: 'densityFromMassAndVolume',
    formula: 'ρ = M / V',
	// Standard Density equation: ρ = M / V
    inputs: ['mass', 'volume'],
    output: 'density',
    calculate: (vars) => {
      const M = vars.mass.value;
      const V = vars.volume.value;
      if (isValidNumber(M) && isValidNumber(V)) {
        if (V === 0) {
          console.error("Calculation Error (densityFromMassAndVolume): Volume is zero.");
          return null;
        }
        if (M < 0) {
          console.error("Calculation Error (densityFromMassAndVolume): Mass cannot be negative.");
          return null;
        }
        return M / V;
      }
      return null;
    }
  }, {
    name: 'massFromDensityAndVolume',
    formula: 'M = ρ × V',
	// Solving for  → M = ρ * V
    inputs: ['density', 'volume'],
    output: 'mass',
    calculate: (vars) => {
      const rho = vars.density.value;
      const V = vars.volume.value;
      if (isValidNumber(rho) && isValidNumber(V)) {
        if (rho < 0) {
          console.error("Calculation Error (massFromDensityAndVolume): Density cannot be negative.");
          return null;
        }
        return rho * V;
      }
      return null;
    }
  }, {
    name: 'volumeFromMassAndDensity',
    formula: 'V = M / ρ',
	// Solving for →  V = M / ρ
    inputs: ['mass', 'density'],
    output: 'volume',
    calculate: (vars) => {
      const M = vars.mass.value;
      const rho = vars.density.value;
      if (isValidNumber(M) && isValidNumber(rho)) {
        if (rho === 0) {
          console.error("Calculation Error (volumeFromMassAndDensity): Density is zero.");
          return null;
        }
        if (M < 0) {
          console.error("Calculation Error (volumeFromMassAndDensity): Mass cannot be negative.");
          return null;
        }
        return M / rho;
      }
      return null;
    }
  },
  // ---------------------------------------------------
  //  CIRCUMFERENCE–RADIUS–RELATION
  // ---------------------------------------------------
  {
    name: 'circumferenceFromRadius', 
    formula: 'C = 2πR',
	// Standard Circumference equation: C = 2 * π * R
    inputs: ['radius'],
    output: 'circumference',
    calculate: (vars) => {
      const R = vars.radius.value;
      if (isValidNumber(R) && R > 0) {
        return 2 * Math.PI * R;
      }
      return null;
    }
  }, {
    name: 'radiusFromCircumference',
    formula: 'R = C / 2π',
	// Solving for → R = C / 2π
    inputs: ['circumference'],
    output: 'radius',
    calculate: (vars) => {
      const C = vars.circumference.value;
      if (isValidNumber(C) && C > 0) {
        return C / (2 * Math.PI);
      }
      return null;
    }
  }, {
    name: 'circumferenceEquatorFromRadiusEquator',
    formula: 'C_eq = 2πR_eq',
	// Standard Circumference equation for the equator: C_eq = 2 * π * R_eq
    inputs: ['radiusEquator'],
    output: 'circumferenceEquator',
    calculate: (vars) => {
      const Req = vars.radiusEquator.value;
      if (isValidNumber(Req) && Req > 0) {
        return 2 * Math.PI * Req;
      }
      return null;
    }
  }, {
    name: 'radiusEquatorFromCircumferenceEquator', 
    formula: 'R_eq = C_eq / 2π',
	// Solving for  → R_eq = C_eq / (2π)
    inputs: ['circumferenceEquator'],
    output: 'radiusEquator',
    calculate: (vars) => {
      const Ceq = vars.circumferenceEquator.value;
      if (isValidNumber(Ceq) && Ceq > 0) {
        return Ceq / (2 * Math.PI);
      }
      return null;
    }
  },
  
  //NEW
{
  name: 'meridionalCircumferenceFromReqRp',
  formula: 'C_mer = 4R_eqE(e)',
  // Meridional circumference of an oblate spheroid:
  // C_mer = 4 * Req * E(k),
  // where k = e = sqrt(1 - (Rp/Req)^2) and E(k) is the complete elliptic integral of the 2nd kind.
  inputs: ['radiusEquator', 'radiusPole'],
  output: 'C_meridional',
  calculate: (vars) => {
    const a = vars.radiusEquator.value; // Req
    const c = vars.radiusPole.value;    // Rp

    if (!isValidNumber(a) || !isValidNumber(c)) return null;
    if (a <= 0 || c <= 0) {
      console.error("meridionalCircumferenceFromReqRp: radii must be positive.");
      return null;
    }
    if (c > a) {
      console.error("meridionalCircumferenceFromReqRp: polar radius cannot exceed equatorial radius for an oblate spheroid.");
      return null;
    }

    // eccentricity
    const e2 = 1 - (c * c) / (a * a);
    const e = Math.sqrt(Math.max(0, e2));

    // Complete elliptic integral of the second kind E(k).
    // Use a Maclaurin series in k^2 (accurate for planetary eccentricities):
    // E(k) = π/2 * [1 - (1/4)k^2 - (3/64)k^4 - (5/256)k^6 - (175/16384)k^8 + ...]
    // NOTE: the series is in powers of k^2. Do NOT pass k where the series expects k^2.
    const k2 = e * e;
    const k4 = k2 * k2;
    const k6 = k4 * k2;
    const k8 = k4 * k4;

    const E =
      (Math.PI / 2) *
      (1 -
        (1 / 4) * k2 -
        (3 / 64) * k4 -
        (5 / 256) * k6 -
        (175 / 16384) * k8);

    return 4 * a * E;
  }
},
  
  
  
  // ---------------------------------------------------
  //  VOLUME–RADIUS–RELATION
  // ---------------------------------------------------
  {
    name: 'volumeFromRadius', 
    formula: 'V = (4/3)πR³',
	// Standard Volume Equation for a perfect sphere V = (4/3) * π * R^3
    inputs: ['radius'],
    output: 'volume',
    calculate: (vars) => {
      const R = vars.radius.value;
      if (isValidNumber(R)) {
        if (R < 0) {
          console.error("Calculation Error (volumeFromRadius): Radius cannot be negative.");
          return null;
        }
        return (4 / 3) * Math.PI * Math.pow(R, 3);
      }
      return null;
    }
  }, {
    name: 'radiusFromVolume', 
    formula: 'R = ∛(3V / 4π)',
	// Solving for R = cuberoot(3V/4π)
    inputs: ['volume'],
    output: 'radius',
    calculate: (vars) => {
      const V = vars.volume.value;
      if (isValidNumber(V)) {
        if (V < 0) {
          console.error("Calculation Error (radiusFromVolume): Volume cannot be negative.");
          return null;
        }
        return Math.cbrt((3 * V) / (4 * Math.PI));
      }
      return null;
    }
  },
  // ---------------------------------------------------
  //  GRAVITY–MASS–RADIUS-RELATIONS
  // ---------------------------------------------------  
  {
    name: 'surfaceGravityFromMassAndRadius',
    formula: 'g = GM / R²',
	// Standard equation for gravity: g = G * M / R^2       (Inverse square law) 
    inputs: ['mass', 'radius'],
    output: 'surfaceGravity',
    calculate: (vars) => {
      const M = vars.mass.value;
      const R = vars.radius.value;

      if (isValidNumber(M) && isValidNumber(R)) {
        if (R <= 0) {
          console.error("Calculation Error (surfaceGravityFromMassAndRadius): Radius must be positive.");
          return Infinity;
        }
        return (G * M) / Math.pow(R, 2);
      }
      return null;
    }
  }, {
    name: 'radiusFromMassAndGravity',
    formula: 'R = √(GM / g)',
	// Solving for  → R = sqrt(GM/g)
    inputs: ['mass', 'surfaceGravity'],
    output: 'radius',
    calculate: (vars) => {
      const M = vars.mass.value;
      const g = vars.surfaceGravity.value;

      if (isValidNumber(M) && isValidNumber(g)) {
        if (M < 0) {
          console.error("Calculation Error (radiusFromMassAndGravity): Mass cannot be negative.");
          return null;
        }
        if (g <= 0) {
          console.error("Calculation Error (radiusFromMassAndGravity): Surface gravity must be positive.");
          return null;
        }
        const R_squared = (G * M) / g;
        if (R_squared < 0) {
          console.error("Calculation Error (radiusFromMassAndGravity): R_squared is negative (should not happen if inputs are valid).");
          return null;
        }
        return Math.sqrt(R_squared);
      }
      return null;
    }
  }, {
    name: 'massFromGravityAndRadius',
    formula: 'M = gR² / G',
	// Solving for  → M = gR^2 / G
    inputs: ['surfaceGravity', 'radius'],
    output: 'mass',
    calculate: (vars) => {
      const g = vars.surfaceGravity.value;
      const R = vars.radius.value;

      if (isValidNumber(g) && isValidNumber(R)) {
        if (R < 0) {
          console.error("Calculation Error (massFromGravityAndRadius): Radius cannot be negative.");
          return null;
        }
        if (g < 0) {
          console.error("Calculation Error (massFromGravityAndRadius): Surface gravity cannot be negative.");
          return null;
        }
        return (g * Math.pow(R, 2)) / G;
      }
      return null;
    }
  }, {
    name: 'surfaceGravityEQFromMassAndRadiusEq', 
    formula: 'g_eq = GM / R_eq²',
	// Standart Gravity (inverse square law) equation applied on the equator: g_eq = G*M / Req^2
    inputs: ['mass', 'radiusEquator'],
    output: 'surfaceGravityEquator',
    calculate: (vars) => {
      const M = vars.mass.value;
      const Req = vars.radiusEquator.value;

      if (isValidNumber(M) && isValidNumber(Req)) {
        if (M <= 0) {
          console.error("Calculation Error (surfaceGravityEQFromMassAndRadius): Mass must be positive.");
          return null;
        }
        if (Req <= 0) {
          console.error("Calculation Error (surfaceGravityEQFromMassAndRadius): Equatorial Radius must be positive.");
          return null;
        }
        return (G * M) / Math.pow(Req, 2);
      }
      return null;
    }
  }, {
    name: 'radiusEquatorFromMassAndSurfaceGravityEQ', 
    formula: 'R_eq = √(GM / g_eq)',
	// Solving for  → Req = sqrt(G*M / g_eq)
    inputs: ['mass', 'surfaceGravityEquator'],
    output: 'radiusEquator',
    calculate: (vars) => {
      const M = vars.mass.value;
      const g_eq = vars.surfaceGravityEquator.value;
      if (isValidNumber(M) && isValidNumber(g_eq)) {
        if (M <= 0) {
          console.error("radiusEquatorFromMassAndSurfaceGravityEQ: Mass must be positive.");
          return null;
        }
        if (g_eq <= 0) {
          console.error("radiusEquatorFromMassAndSurfaceGravityEQ: g_eq must be positive.");
          return null;
        }
        return Math.sqrt((G * M) / g_eq);
      }
      return null;
    }
  }, {
    name: 'massFromSurfaceGravityEQAndRadiusEQ',
    formula: 'M = g_eqR_eq² / G',
	// Solving for  → M = g_eq * Req^2 / G
    inputs: ['surfaceGravityEquator', 'radiusEquator'],
    output: 'mass',
    calculate: (vars) => {
      const g_eq = vars.surfaceGravityEquator.value;
      const Req = vars.radiusEquator.value;
      if (isValidNumber(g_eq) && isValidNumber(Req)) {
        if (g_eq <= 0) {
          console.error("massFromSurfaceGravityEQAndRadius: g_eq must be positive.");
          return null;
        }
        if (Req <= 0) {
          console.error("massFromSurfaceGravityEQAndRadius: Equatorial Radius must be positive.");
          return null;
        }
        return (g_eq * Math.pow(Req, 2)) / G;
      }
      return null;
    }
  }, {
    name: 'surfaceGravityPoleFromMassAndRadiusPole', 
    formula: 'g_p = GM / R_p²',
	// Standard Gravity (inverse square law) equation applied on the pole: g_pole = G * M / Rp^2
    inputs: ['mass', 'radiusPole'],
    output: 'surfaceGravityPole',
    calculate: (vars) => {
      const M = vars.mass.value;
      const Rp = vars.radiusPole.value;

      if (isValidNumber(M) && isValidNumber(Rp)) {
        if (M <= 0) {
          console.error("Calculation Error (surfaceGravityPoleFromMassAndRadius): Mass must be positive.");
          return null;
        }
        if (Rp <= 0) {
          console.error("Calculation Error (surfaceGravityPoleFromMassAndRadius): Polar Radius must be positive.");
          return null;
        }
        return (G * M) / Math.pow(Rp, 2);
      }
      return null;
    }
  }, {
    name: 'radiusPoleFromMassAndSurfaceGravityPole',
    formula: 'R_p = √(GM / g_p)',
	// Solving for  → Rp = sqrt(G*M / g_p)
    inputs: ['mass', 'surfaceGravityPole'],
    output: 'radiusPole',
    calculate: (vars) => {
      const M = vars.mass.value;
      const g_p = vars.surfaceGravityPole.value;
      if (isValidNumber(M) && isValidNumber(g_p)) {
        if (M <= 0) {
          console.error("radiusPoleFromMassAndSurfaceGravityPole: Mass must be positive.");
          return null;
        }
        if (g_p <= 0) {
          console.error("radiusPoleFromMassAndSurfaceGravityPole: g_p must be positive.");
          return null;
        }
        return Math.sqrt((G * M) / g_p);
      }
      return null;
    }
  }, {
    name: 'massFromSurfaceGravityPoleAndRadiusPole', 
    formula: 'M = g_pR_p² / G',
	// Solving for  → M = g_p * Rp^2 / G
    inputs: ['surfaceGravityPole', 'radiusPole'],
    output: 'mass',
    calculate: (vars) => {
      const g_p = vars.surfaceGravityPole.value;
      const Rp = vars.radiusPole.value;
      if (isValidNumber(g_p) && isValidNumber(Rp)) {
        if (g_p <= 0) {
          console.error("massFromSurfaceGravityPoleAndRadius: g_p must be positive.");
          return null;
        }
        if (Rp <= 0) {
          console.error("massFromSurfaceGravityPoleAndRadius: Polar Radius must be positive.");
          return null;
        }
        return (g_p * Math.pow(Rp, 2)) / G;
      }
      return null;
    }
  },
  // ---------------------------------------------------
  //  GRAVITY-DENSITY–RADIUS–RELATIONS
  // ---------------------------------------------------  
  {
    name: 'surfaceGravityFromDensityAndRadius', 
    formula: 'g = (4/3)πGρR',
	// Derived equation: g = (4/3) * π * G * ρ * R  // Derived equations are mathematical products of 2 or more standard equations.
    inputs: ['density', 'radius'],
    output: 'surfaceGravity',
    isDerived: true,
    calculate: (vars) => {
      const rho = vars.density.value;
      const R = vars.radius.value;
      const PI = Math.PI;
      const fourThirds = 4 / 3;

      if (isValidNumber(rho) && isValidNumber(R)) {
        if (rho < 0) {
          console.error("Calculation Error (surfaceGravityFromDensityAndRadius): Density cannot be negative.");
          return null;
        }
        if (R < 0) {
          console.error("Calculation Error (surfaceGravityFromDensityAndRadius): Radius cannot be negative.");
          return null;
        }
        return fourThirds * PI * G * rho * R;
      }
      return null;
    }
  }, {
    name: 'radiusFromSurfaceGravityAndDensity', 
    formula: 'R = 3g / (4πGρ)',
	// Solving for →  R = 3 * g / (4 * G * ρ * π)
    inputs: ['surfaceGravity', 'density'],
    output: 'radius',
    isDerived: true,
    calculate: (vars) => {
      const g = vars.surfaceGravity.value;
      const rho = vars.density.value;
      const PI = Math.PI;

      if (isValidNumber(g) && isValidNumber(rho)) {
        if (rho <= 0) {
          console.error("Calculation Error (radiusFromSurfaceGravityAndDensity): Density must be positive.");
          return null;
        }
        if (g < 0) {
          console.error("Calculation Error (radiusFromSurfaceGravityAndDensity): Surface gravity cannot be negative.");
          return null;
        }
        return (3 * g) / (4 * G * rho * PI);
      }
      return null;
    }
  },
  // ---------------------------------------------------
  //  FLATENING-RADII–RELATIONS
  // ---------------------------------------------------  
  {
    name: 'flatteningFromRadii',
    formula: 'f = (R_eq - R_p) / R_eq',
	// Standart Equation for Flattening: f = (Req-Rp) / Req
    inputs: ['radiusEquator', 'radiusPole'],
    output: 'flattening',
    calculate: (vars) => {
      const Req = vars.radiusEquator.value;
      const Rp = vars.radiusPole.value;

      if (isValidNumber(Req) && isValidNumber(Rp)) {
        if (Req <= 0) {
          console.error("Calculation Error (flatteningFromRadii): Equatorial Radius (Req) must be positive.");
          return null;
        }
        if (Rp < 0) {
          console.error("Calculation Error (flatteningFromRadii): Polar Radius (Rp) cannot be negative.");
          return null;
        }
        if (Rp > Req) {
          console.error("Calculation Error (flatteningFromRadii): Polar Radius (Rp) cannot be greater than Equatorial Radius (Req) for a flattened spheroid.");
          return null;
        }

        return (Req - Rp) / Req;
      }
      return null;
    }
  }, {
    name: 'radiusEquatorFromFlatteningAndPoleRadius', 
    formula: 'R_eq = R_p / (1 - f)',
	//Solving for  → Req = Rp / (1 - f)
    inputs: ['flattening', 'radiusPole'],
    output: 'radiusEquator',
    calculate: (vars) => {
      const f = vars.flattening.value;
      const Rp = vars.radiusPole.value;

      if (isValidNumber(f) && isValidNumber(Rp)) {
        if (f < 0 || f >= 1) {
          console.error("Calculation Error (radiusEquatorFromFlatteningAndPoleRadius): Flattening must be between 0 and 1.");
          return null;
        }
        if (Rp <= 0) {
          console.error("Calculation Error (radiusEquatorFromFlatteningAndPoleRadius): Polar Radius (Rp) must be positive.");
          return null;
        }

        const denominator = 1 - f;
        if (denominator === 0) {
          console.error("Calculation Error (radiusEquatorFromFlatteningAndPoleRadius): Denominator is zero (f = 1).");
          return null;
        }

        return Rp / denominator;
      }
      return null;
    }
  }, {
    name: 'radiusPoleFromFlatteningAndEquatorialRadius', 
    formula: 'R_p = R_eq(1 - f)',
	// Solving for  → Rp = Req * (1 - f)
    inputs: ['flattening', 'radiusEquator'],
    output: 'radiusPole',
    calculate: (vars) => {
      const f = vars.flattening.value;
      const Req = vars.radiusEquator.value;

      if (isValidNumber(f) && isValidNumber(Req)) {
        if (f < 0 || f >= 1) {
          console.error("Calculation Error (radiusPoleFromFlatteningAndEquatorialRadius): Flattening must be between 0 and 1.");
          return null;
        }
        if (Req <= 0) {
          console.error("Calculation Error (radiusPoleFromFlatteningAndEquatorialRadius): Equatorial Radius (Req) must be positive.");
          return null;
        }

        return Req * (1 - f);
      }
      return null;
    }
  },
  // ---------------------------------------------------
  //  RADIUS-RADII–RELATIONS
  // ---------------------------------------------------  
  {
    name: 'radiusFromEquatorialAndPolarVolumetric', 
    formula: 'R = ∛(R_eq²R_p)',
	// Standard equation for Mean Radius R = (Req^2 * Rp)^1/3
    inputs: ['radiusEquator', 'radiusPole'],
    output: 'radius',
    calculate: (vars) => {
      const Req = vars.radiusEquator.value;
      const Rp = vars.radiusPole.value;

      if (isValidNumber(Req) && isValidNumber(Rp)) {
        if (Req <= 0) {
          console.error("Calculation Error (radiusFromEquatorialAndPolarVolumetric): Equatorial Radius (Req) must be positive.");
          return null;
        }
        if (Rp <= 0) {
          console.error("Calculation Error (radiusFromEquatorialAndPolarVolumetric): Polar Radius (Rp) must be positive.");
          return null;
        }

        return Math.pow(Math.pow(Req, 2) * Rp, 1 / 3);
      }
      return null;
    }
  }, {
    name: 'radiusEquatorFromMeanRadiusAndPolarRadius', 
    formula: 'R_eq = √(R³ / R_p)',
	// Solving for  → Req = sqrt(R^3 / Rp)
    inputs: ['radius', 'radiusPole'],
    output: 'radiusEquator',
    calculate: (vars) => {
      const R = vars.radius.value;
      const Rp = vars.radiusPole.value;

      if (isValidNumber(R) && isValidNumber(Rp)) {
        if (R <= 0) {
          console.error("Calculation Error (radiusEquatorFromMeanRadiusAndPolarRadius): Mean Radius (R) must be positive.");
          return null;
        }
        if (Rp <= 0) {
          console.error("Calculation Error (radiusEquatorialFromMeanRadiusAndPolarRadius): Polar Radius (Rp) must be positive.");
          return null;
        }

        const reqSquared = Math.pow(R, 3) / Rp;
        if (reqSquared < 0) {
          console.error("Calculation Error (radiusEquatorFromMeanRadiusAndPolarRadius): Value under square root is negative.");
          return null;
        }
        return Math.sqrt(reqSquared);
      }
      return null;
    }
  }, {
    name: 'radiusPoleFromMeanRadiusAndEquatorialRadius', 
    formula: 'R_p = R³ / R_eq²',
	// Solving for  → Rp = (R^3)/Req^2
    inputs: ['radius', 'radiusEquator'],
    output: 'radiusPole',
    calculate: (vars) => {
      const R = vars.radius.value;
      const Req = vars.radiusEquator.value;

      if (isValidNumber(R) && isValidNumber(Req)) {
        if (R <= 0) {
          console.error("Calculation Error (radiusPoleFromMeanRadiusAndEquatorialRadius): Mean Radius (R) must be positive.");
          return null;
        }
        if (Req <= 0) {
          console.error("Calculation Error (radiusPoleFromMeanRadiusAndEquatorialRadius): Equatorial Radius (Req) must be positive.");
          return null;
        }

        return Math.pow(R, 3) / Math.pow(Req, 2);
      }
      return null;
    }
  },
  // ---------------------------------------------------
  //  RADII-FLATENING-RADIUS–RELATION
  // ---------------------------------------------------    
  {
    name: 'radiusEquatorFromMeanRadiusAndFlattening', 
    formula: 'R_eq = R / ∛(1 - f)',
	// Req = R / (1 - f)^(1/3)                                (DERIVED)
    inputs: ['radius', 'flattening'],
    output: 'radiusEquator',
    isDerived: true,
    calculate: (vars) => {
      const R = vars.radius.value;
      const f = vars.flattening.value;

      if (isValidNumber(R) && isValidNumber(f)) {
        if (R <= 0) {
          console.error("Calculation Error (radiusEquatorFromMeanRadiusAndFlattening): Mean radius must be positive.");
          return null;
        }
        if (f < 0 || f >= 1) {
          console.error("Calculation Error (radiusEquatorFromMeanRadiusAndFlattening): Flattening must be in [0,1).");
          return null;
        }
        // exact cube-root formula
        return R / Math.cbrt(1 - f);
      }
      return null;
    }
  }, /*{
  name: 'radiusPoleFromMeanRadiusAndFlattening', 
  // Rp = R * (1 - f)^(2/3)  // Excluded temporarily since the above introduces Req so one iteration later Rp will be calculated, from flattening and Req (via radiusPoleFromFlatteningAndEquatorialRadius)
  inputs: ['radius', 'flattening'],
  output: 'radiusPole',
  isDerived: true,
  calculate: (vars) => {
  const R = vars.radius.value;
  const f = vars.flattening.value;

  if (isValidNumber(R) && isValidNumber(f)) {
  if (R <= 0) {
  console.error("Calculation Error (radiusPoleFromMeanRadiusAndFlattening): Mean radius must be positive.");
  return null;
  }
  if (f < 0 || f >= 1) {
  console.error("Calculation Error (radiusPoleFromMeanRadiusAndFlattening): Flattening must be in [0,1).");
  return null;
  }
  return R * Math.pow(1 - f, 2/3);
  }
  return null;
  }
  },*/

  // ---------------------------------------------------
  //  ESCAPE VELOCITY-MASS-RADIUS–RELATIONS
  // ---------------------------------------------------     
  {
    name: 'escapeVelocityFromMassAndRadius', 
    formula: 'v_esc = √(2GM / R)',
	// Standard Escape Velocity equation v_esc = sqrt(2GM/R)
    inputs: ['mass', 'radius'],
    output: 'escapeVelocity',
    calculate: (vars) => {
      const M = vars.mass.value;
      const R = vars.radius.value;

      if (isValidNumber(M) && isValidNumber(R)) {
        if (M <= 0) {
          console.error("Calculation Error (escapeVelocityFromMassAndRadius): Mass (M) must be positive.");
          return null;
        }
        if (R <= 0) {
          console.error("Calculation Error (escapeVelocityFromMassAndRadius): Radius (R) must be positive.");
          return null;
        }

        return Math.sqrt((2 * G * M) / R);
      }
      return null;
    }
  }, {
    name: 'massFromEscapeVelocityAndRadius',
    formula: 'M = v_esc²R / 2G',
	// Solving for  → M = (v_esc^2 * R) / (2G)
    inputs: ['escapeVelocity', 'radius'],
    output: 'mass',
    calculate: (vars) => {
      const v_esc = vars.escapeVelocity.value;
      const R = vars.radius.value;

      if (isValidNumber(v_esc) && isValidNumber(R)) {
        if (v_esc < 0) {
          console.error("Calculation Error (massFromEscapeVelocityAndRadius): Escape velocity cannot be negative.");
          return null;
        }
        if (R <= 0) {
          console.error("Calculation Error (massFromEscapeVelocityAndRadius): Radius (R) must be positive.");
          return null;
        }

        return (Math.pow(v_esc, 2) * R) / (2 * G);
      }
      return null;
    }
  }, {
    name: 'radiusFromEscapeVelocityAndMass', 
    formula: 'R = 2GM / v_esc²',
	// Solving for  → R = (2GM) / v_esc^2
    inputs: ['escapeVelocity', 'mass'],
    output: 'radius',
    calculate: (vars) => {
      const v_esc = vars.escapeVelocity.value;
      const M = vars.mass.value;

      if (isValidNumber(v_esc) && isValidNumber(M)) {
        if (v_esc <= 0) {
          console.error("Calculation Error (radiusFromEscapeVelocityAndMass): Escape velocity must be positive.");
          return null;
        }
        if (M <= 0) {
          console.error("Calculation Error (radiusFromEscapeVelocityAndMass): Mass (M) must be positive.");
          return null;
        }

        return (2 * G * M) / Math.pow(v_esc, 2);
      }
      return null;
    }
  }, {
    name: 'escapeVelocityEquatorFromMassAndRadiusEquator',
    formula: 'v_esc_eq = √(2GM / R_eq)',
	// Escape Velocity equation applied at the equator: v_esc_eq = sqrt(2GM/Req)
    inputs: ['mass', 'radiusEquator'],
    output: 'escapeVelocityEquator',
    calculate: (vars) => {
      const M = vars.mass.value;
      const Req = vars.radiusEquator.value;

      if (isValidNumber(M) && isValidNumber(Req)) {
        if (M <= 0) {
          console.error("Calculation Error (escapeVelocityEquatorFromMassAndRadiusEquator): Mass (M) must be positive.");
          return null;
        }
        if (Req <= 0) {
          console.error("Calculation Error (escapeVelocityEquatorFromMassAndRadiusEquator): Equatorial Radius (Req) must be positive.");
          return null;
        }

        return Math.sqrt((2 * G * M) / Req);
      }
      return null;
    }
  }, {
    name: 'massFromEscapeVelocityEquatorAndRadiusEquator',
    formula: 'M = v_esc_eq²R_eq / 2G',
	// Solving for → M = (v_esc_eq^2 * Req) / (2G)
    inputs: ['escapeVelocityEquator', 'radiusEquator'],
    output: 'mass',
    calculate: (vars) => {
      const v_esc_eq = vars.escapeVelocityEquator.value;
      const Req = vars.radiusEquator.value;

      if (isValidNumber(v_esc_eq) && isValidNumber(Req)) {
        if (v_esc_eq < 0) {
          console.error("Calculation Error (massFromEscapeVelocityEquatorAndRadiusEquator): Equatorial escape velocity cannot be negative.");
          return null;
        }
        if (Req <= 0) {
          console.error("Calculation Error (massFromEscapeVelocityEquatorAndRadiusEquator): Equatorial Radius (Req) must be positive.");
          return null;
        }

        return (Math.pow(v_esc_eq, 2) * Req) / (2 * G);
      }
      return null;
    }
  }, {
    name: 'radiusEquatorFromEscapeVelocityEquatorAndMass',
    formula: 'R_eq = 2GM / v_esc_eq²',
	// Solving for → Req = (2GM) / v_esc_eq^2
    inputs: ['escapeVelocityEquator', 'mass'],
    output: 'radiusEquator',
    calculate: (vars) => {
      const v_esc_eq = vars.escapeVelocityEquator.value;
      const M = vars.mass.value;

      if (isValidNumber(v_esc_eq) && isValidNumber(M)) {
        if (v_esc_eq <= 0) {
          console.error("Calculation Error (radiusEquatorFromEscapeVelocityEquatorAndMass): Equatorial escape velocity must be positive.");
          return null;
        }
        if (M <= 0) {
          console.error("Calculation Error (radiusEquatorFromEscapeVelocityEquatorAndMass): Mass (M) must be positive.");
          return null;
        }

        return (2 * G * M) / Math.pow(v_esc_eq, 2);
      }
      return null;
    }
  },
  // ---------------------------------------------------
  //  AREA-RADIUS–RELATIONS
  // ---------------------------------------------------   
  {
    name: 'meanAreaFromRadius', 
    formula: 'A = 4πR²',
	// Standart Area equation for a perfect sphere A = 4πR^2
    inputs: ['radius'],
    output: 'meanArea',
    calculate: (vars) => {
      const R = vars.radius.value;
      if (isValidNumber(R)) {
        if (R < 0) {
          console.error("Calculation Error (meanAreaFromRadius): Radius cannot be negative.");
          return null;
        }
        return 4 * Math.PI * Math.pow(R, 2);
      }
      return null;
    }
  }, {
    name: 'radiusFromMeanArea',
    formula: 'R = √(A / 4π)',
	// Solving for  → R = sqrt(A / (4π))
    inputs: ['meanArea'],
    output: 'radius',
    calculate: (vars) => {
      const A = vars.meanArea.value;

      if (isValidNumber(A)) {
        if (A < 0) {
          console.error("Calculation Error (radiusFromMeanArea): Mean Area cannot be negative.");
          return null;
        }

        return Math.sqrt(A / (4 * Math.PI));
      }
      return null;
    }
  }, {
    name: 'oblateAreaFromRadii',
    formula: 'A_oblate = 2πa² + π(c²/e)ln((1+e)/(1-e))',
    // Standart equation for Area for an oblate spheroid
	inputs: ['radiusEquator', 'radiusPole'],
    output: 'oblateArea',
    calculate: (vars) => {
      const a = vars.radiusEquator.value;
      const c = vars.radiusPole.value;

      if (isValidNumber(a) && isValidNumber(c)) {
        if (a <= 0) {
          console.error("Calculation Error (oblateAreaFromRadii): Equatorial Radius (a) must be positive.");
          return null;
        }
        if (c <= 0) {
          console.error("Calculation Error (oblateAreaFromRadii): Polar Radius (c) must be positive.");
          return null;
        }
        if (c > a) {
          console.error("Calculation Error (oblateAreaFromRadii): Polar Radius (c) cannot be greater than Equatorial Radius (a) for an oblate spheroid.");
          return null;
        }

        if (a === c) {
          return 4 * Math.PI * Math.pow(a, 2);
        }

        const e_squared = 1 - Math.pow(c, 2) / Math.pow(a, 2);
        if (e_squared < 0) {
          console.error("Calculation Error (oblateAreaFromRadii): e_squared is negative.");
          return null;
        }
        const e = Math.sqrt(e_squared);

        if (e === 1) {
          console.warn("Calculation Warning (oblateAreaFromRadii): Degenerate oblate spheroid (c=0), formula might be unstable.");
          return 2 * Math.PI * Math.pow(a, 2);
        }
        if (e === 0) {
          return 4 * Math.PI * Math.pow(a, 2);
        }

        return 2 * Math.PI * Math.pow(a, 2) + Math.PI * (Math.pow(c, 2) / e) * Math.log((1 + e) / (1 - e));
      }
      return null;
    }
  },
  // ---------------------------------------------------
  //  ROTATIONAL RATE/PERIOD
  // ---------------------------------------------------   
  {
    name: 'rotationRateFromSiderealDay', 
    formula: 'ω = 2π / T',
	// Standart equation for the rotational rate ω = 2π / T
    inputs: ['siderealDay'],
    output: 'rotationRate',
    calculate: (vars) => {
      const T = vars.siderealDay.value;
      if (isValidNumber(T) && T > 0) {
        return (2 * Math.PI) / T;
      }
      return null;
    }
  }, {
  name: 'siderealDayFromRotationRate',
  formula: 'T = 2π / ω',
  // Solving for  → T = 2π / ω
  inputs: ['rotationRate'],
  output: 'siderealDay',
  calculate: (vars) => {
    const ω = vars.rotationRate.value;
    if (isValidNumber(ω)) {
      if (ω <= 0) {
        console.error("siderealDayFromRotationRate: Rotation rate must be positive.");
        return null;
      }
      return (2 * Math.PI) / ω;
    }
    return null;
   }
  },
  // ---------------------------------------------------
  //  LINEAR VELOCITY AT THE MEAN RADIUS
  // ---------------------------------------------------
  {
    name: 'linearVelocityFromRotationAndRadius',
    formula: 'v_rot = ωR',
    // Standard tangential/linear velocity at mean radius: v_rot = ω * R
    inputs: ['rotationRate', 'radius'],
    output: 'linearVelocity',
    calculate: (vars) => {
      const ω = vars.rotationRate.value;
      const R = vars.radius.value;
      if (isValidNumber(ω) && isValidNumber(R)) {
        if (ω < 0) {
          console.error("linearVelocityFromRotationAndRadius: Rotation rate cannot be negative.");
          return null;
        }
        if (R <= 0) {
          console.error("linearVelocityFromRotationAndRadius: Mean radius must be positive.");
          return null;
        }
        return ω * R;
      }
      return null;
    }
  }, {
    name: 'radiusFromLinearVelocityAndRotation',
    formula: 'R = v_rot / ω',
    // Solving for → R = v_rot / ω
    inputs: ['linearVelocity', 'rotationRate'],
    output: 'radius',
    calculate: (vars) => {
      const v_rot = vars.linearVelocity.value;
      const ω = vars.rotationRate.value;
      if (isValidNumber(v_rot) && isValidNumber(ω)) {
        if (v_rot < 0) {
          console.error("radiusFromLinearVelocityAndRotation: Linear velocity cannot be negative.");
          return null;
        }
        if (ω <= 0) {
          console.error("radiusFromLinearVelocityAndRotation: Rotation rate must be positive.");
          return null;
        }
        return v_rot / ω;
      }
      return null;
    }
  }, {
    name: 'rotationFromLinearVelocityAndRadius',
    formula: 'ω = v_rot / R',
    // Solving for → ω = v_rot / R
    inputs: ['linearVelocity', 'radius'],
    output: 'rotationRate',
    calculate: (vars) => {
      const v_rot = vars.linearVelocity.value;
      const R = vars.radius.value;
      if (isValidNumber(v_rot) && isValidNumber(R)) {
        if (v_rot < 0) {
          console.error("rotationFromLinearVelocityAndRadius: Linear velocity cannot be negative.");
          return null;
        }
        if (R <= 0) {
          console.error("rotationFromLinearVelocityAndRadius: Mean radius must be positive.");
          return null;
        }
        return v_rot / R;
      }
      return null;
    }
  },
  // ---------------------------------------------------
  //  LINEAR VELOCITY AT THE EQUATOR
  // ---------------------------------------------------
  {
    name: 'linearVelocityEquatorFromRotationAndRadiusEq',
    formula: 'v_rot_eq = ωR_eq',
    // Standard tangential/linear velocity at the equator: v_rot = ω * Req
    inputs: ['rotationRate', 'radiusEquator'],
    output: 'linearVelocityEquator',
    calculate: (vars) => {
      const ω = vars.rotationRate.value;
      const Req = vars.radiusEquator.value;
      if (isValidNumber(ω) && isValidNumber(Req)) {
        if (ω < 0) {
          console.error("linearVelocityEquatorFromRotationAndRadiusEq: Rotation rate cannot be negative.");
          return null;
        }
        if (Req <= 0) {
          console.error("linearVelocityEquatorFromRotationAndRadiusEq: Req must be positive.");
          return null;
        }
        return ω * Req;
      }
      return null;
    }
  }, {
    name: 'radiusEqFromLinearVelocityEquatorAndRotation',
    formula: 'R_eq = v_rot_eq / ω',
    // Solving for → Req = v_rot / ω
    inputs: ['linearVelocityEquator', 'rotationRate'],
    output: 'radiusEquator',
    calculate: (vars) => {
      const v_rot = vars.linearVelocityEquator.value;
      const ω = vars.rotationRate.value;
      if (isValidNumber(v_rot) && isValidNumber(ω)) {
        if (v_rot < 0) {
          console.error("radiusEqFromLinearVelocityEquatorAndRotation: Linear velocity cannot be negative.");
          return null;
        }
        if (ω <= 0) {
          console.error("radiusEqFromLinearVelocityEquatorAndRotation: Rotation rate must be positive.");
          return null;
        }
        return v_rot / ω;
      }
      return null;
    }
  }, {
    name: 'rotationFromLinearVelocityEquatorAndRadiusEq',
    formula: 'ω = v_rot_eq / R_eq',
    // Solving for → ω = v_rot / Req
    inputs: ['linearVelocityEquator', 'radiusEquator'],
    output: 'rotationRate',
    calculate: (vars) => {
      const v_rot = vars.linearVelocityEquator.value;
      const Req = vars.radiusEquator.value;
      if (isValidNumber(v_rot) && isValidNumber(Req)) {
        if (v_rot < 0) {
          console.error("rotationFromLinearVelocityEquatorAndRadiusEq: Linear velocity cannot be negative.");
          return null;
        }
        if (Req <= 0) {
          console.error("rotationFromLinearVelocityEquatorAndRadiusEq: Equatorial radius must be positive.");
          return null;
        }
        return v_rot / Req;
      }
      return null;
    }
  },

  // ---------------------------------------------------
  //  CENTRIFUGAL ACELERATION AT THE EQUATOR
  // ---------------------------------------------------
  {
    name: 'centrifugalAccEqFromRotationAndRadiusEq', 
    formula: 'a_c = ω²R_eq',
	// Standard equation for Centripetal/fugal applied on the Equator a_c = ω^2 * Req
    inputs: ['rotationRate', 'radiusEquator'],
    output: 'centrifugalAccEq',
    calculate: (vars) => {
      const ω = vars.rotationRate.value;
      const Req = vars.radiusEquator.value;
      if (isValidNumber(ω) && isValidNumber(Req)) {
        if (Req <= 0) {
          console.error("centrifugalAccEqFromRotationAndRadiusEq: Req must be positive.");
          return null;
        }
        return Math.pow(ω, 2) * Req;
      }
      return null;
    }
  }, {
  name: 'radiusEqFromCentrifugalAccEqAndRotation',
  formula: 'R_eq = a_c / ω²',
  // Solving for  →  R_eq = a_c / ω²
  inputs: ['centrifugalAccEq', 'rotationRate'],
  output: 'radiusEquator',
  calculate: (vars) => {
    const a_c = vars.centrifugalAccEq.value;
    const ω = vars.rotationRate.value;
    if (isValidNumber(a_c) && isValidNumber(ω)) {
      if (ω === 0) {
        console.error("radiusEqFromCentrifugalAccEqAndRotation: Rotation rate ω cannot be zero.");
        return null;
      }
      if (a_c < 0) {
        console.error("radiusEqFromCentrifugalAccEqAndRotation: Centrifugal acceleration cannot be negative.");
        return null;
      }
      return a_c / Math.pow(ω, 2);
    }
    return null;
  }
}, {
  name: 'rotationFromCentrifugalAccEqAndRadiusEq',
  formula: 'ω = √(a_c / R_eq)',
  // Solving for  →  ω = √(a_c / R_eq)
  inputs: ['centrifugalAccEq', 'radiusEquator'],
  output: 'rotationRate',
  calculate: (vars) => {
    const a_c = vars.centrifugalAccEq.value;
    const R_eq = vars.radiusEquator.value;
    if (isValidNumber(a_c) && isValidNumber(R_eq)) {
      if (R_eq <= 0) {
        console.error("rotationFromCentrifugalAccEqAndRadiusEq: Equatorial radius must be positive.");
        return null;
      }
      if (a_c < 0) {
        console.error("rotationFromCentrifugalAccEqAndRadiusEq: Centrifugal acceleration cannot be negative.");
        return null;
      }
      return Math.sqrt(a_c / R_eq);
    }
    return null;
   }
  },
  // ---------------------------------------------------
  //  EFFECTIVE GRAVITY AT THE EQUATOR (Inv sq model estimate)
  // ---------------------------------------------------  
  {
    name: 'surfaceGravityEffectiveEqFromGEqAndCentrifugal', 
    formula: 'g_eff_eq = g_eq - a_c',
	//Effective Gravity at the Equator standard substitution of the 2 vectors: g_eff_eq = g_eq - a_c
    inputs: ['surfaceGravityEquator', 'centrifugalAccEq'],
    output: 'surfaceGravityEffectiveEq',
    calculate: (vars) => {
      const g_eq = vars.surfaceGravityEquator.value;
      const a_c = vars.centrifugalAccEq.value;
      if (isValidNumber(g_eq) && isValidNumber(a_c)) {
        return g_eq - a_c;
      }
      return null;
    }
  }, {
  name: 'surfaceGravityEquatorFromEffectiveAndCentrifugal',
  formula: 'g_eq = g_eff_eq + a_c',
  // Solving for  →  g_eq = g_eff_eq + a_c
  inputs: ['surfaceGravityEffectiveEq', 'centrifugalAccEq'],
  output: 'surfaceGravityEquator',
  calculate: (vars) => {
    const g_eff_eq = vars.surfaceGravityEffectiveEq.value;
    const a_c = vars.centrifugalAccEq.value;

    if (isValidNumber(g_eff_eq) && isValidNumber(a_c)) {
      return g_eff_eq + a_c;
    }
    return null;
   }
  }, {
  name: 'centrifugalAccEqFromGEqAndEffective',
  formula: 'a_c = g_eq - g_eff_eq',
  // Solving for  →  a_c = g_eq - g_eff_eq
  inputs: ['surfaceGravityEquator', 'surfaceGravityEffectiveEq'],
  output: 'centrifugalAccEq',
  calculate: (vars) => {
    const g_eq = vars.surfaceGravityEquator.value;
    const g_eff_eq = vars.surfaceGravityEffectiveEq.value;

    if (isValidNumber(g_eq) && isValidNumber(g_eff_eq)) {
      return g_eq - g_eff_eq;
    }
    return null;
   }
  },
  // ---------------------------------------------------
  //  MORE DERIVED RELATIONS ASSISTING THE SOLVER
  // ---------------------------------------------------
  {
  name: 'radiusFromEscapeVelocityAndDensity',
  formula: 'R = √(3v_esc² / 8πGρ)',
  // Derived relation combining radius, escape velocity and density:
  // R = √( (3 · vₑ²) / (8 · G · π · ρ) )
  // Derived from vₑ = √(2·G·M/R) and M = (4/3)·π·R³·ρ
  isDerived: true,
  inputs: ['escapeVelocity', 'density'],
  output: 'radius',
  calculate: (vars) => {
    const v_esc = vars.escapeVelocity.value;
    const rho = vars.density.value;

    if (isValidNumber(v_esc) && isValidNumber(rho)) {
      if (v_esc <= 0) {
        console.error("Calculation Error (radiusFromEscapeVelocityAndDensity): Escape velocity must be positive.");
        return null;
      }
      if (rho <= 0) {
        console.error("Calculation Error (radiusFromEscapeVelocityAndDensity): Density must be positive.");
        return null;
      }

      // Apply derived formula: R = √( (3 * v_esc²) / (8 * G * π * ρ) )
      return Math.sqrt((3 * Math.pow(v_esc, 2)) / (8 * G * Math.PI * rho));
    }

    return null;
   }
  }, {
  name: 'radiusFromEscapeVelocityAndSurfaceGravity',
  formula: 'R = v_esc² / 2g',
  // Derived relation combining radius escape velocity and surface gravity:
  // R = v_esc^2 / (2 · g)
  // Derived from: v_esc^2 = 2·G·M / R  and  g = G·M / R^2
  isDerived: true,
  inputs: ['escapeVelocity', 'surfaceGravity'],
  output: 'radius',
  calculate: (vars) => {
    const v_esc = vars.escapeVelocity.value;
    const g = vars.surfaceGravity.value;

    if (isValidNumber(v_esc) && isValidNumber(g)) {
      if (v_esc <= 0) {
        console.error("Calculation Error (radiusFromEscapeVelocityAndSurfaceGravity): Escape velocity must be positive.");
        return null;
      }
      if (g <= 0) {
        console.error("Calculation Error (radiusFromEscapeVelocityAndSurfaceGravity): Surface gravity must be positive.");
        return null;
      }

      // R = v_esc^2 / (2 * g)
      return Math.pow(v_esc, 2) / (2 * g);
    }
    return null;
  }
},
  

];

const calculatorForm = document.getElementById('calculatorForm');
const calculateButton = document.getElementById('calculateButton');
const logSkipsCheckbox = document.getElementById('logSkipsCheckbox');
const maxIterationsInput = document.getElementById('maxIterationsInput');
const enableDerivedEquationsCheckbox = document.getElementById('enableDerivedEquationsCheckbox');
const compareModeCheckbox = document.getElementById('compareModeCheckbox');
const autoRecalcModeCheckbox = document.getElementById('autoRecalcModeCheckbox');

const earthUnitsBtn = document.getElementById('earthUnitsBtn');
const jupiterUnitsBtn = document.getElementById('jupiterUnitsBtn');

const variableElements = {};
let lastCalculatedVariables = null;

function addSectionHeader(title) {
  const hr = document.createElement('hr');
  const h3 = document.createElement('h3');
  h3.textContent = title;
  calculatorForm.appendChild(hr);
  calculatorForm.appendChild(h3);
}

function generateForm() {
  if (!calculatorForm) {
    console.error("Error: '#calculatorForm' element not found in HTML.");
    return;
  }

  for (const varName in variablesTemplate) {

    //add sections
    if (varName === 'radius')
      addSectionHeader('Geometrical Properties');
    if (varName === 'mass')
      addSectionHeader('Massiveness');
    if (varName === 'surfaceGravity')
      addSectionHeader('Gravitation');
    if (varName === 'siderealDay')
      addSectionHeader('Rotation');

    const varData = variablesTemplate[varName];
    const unitType = varData.type;
    const availableUnits = units[unitType] || {};

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('variable-row');

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('variable-input');

    const label = document.createElement('label');
    label.setAttribute('for', `${varName}Input`);
    label.textContent = `${varData.label}:`;

    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('id', `${varName}Input`);
    input.setAttribute('step', 'any');

    if (varName === 'oblateArea') {
      input.disabled = true;
    }

    let unitSelect = null;
    if (Object.keys(availableUnits).length > 0) {
      unitSelect = document.createElement('select');
      unitSelect.setAttribute('id', `${varName}UnitSelect`);

      for (const unitKey in availableUnits) {
        const option = document.createElement('option');
        option.value = unitKey;
        option.textContent = availableUnits[unitKey].label;
        if (Array.isArray(varData.displayUnit) ? varData.displayUnit[0] === unitKey : varData.displayUnit === unitKey) {
          option.selected = true;
        }
        unitSelect.appendChild(option);
      }

      // Add event listener for unit change
      unitSelect.addEventListener('change', () => {
        handleUnitChange();
      });
    }

    input.addEventListener('input', () => {
      const inputValue = input.value;
      const isValid = validateInput(varName, inputValue);
      const parsedValue = parseFloat(inputValue);

      if (inputValue.trim() !== '' && !isNaN(parsedValue) && isValid) {
        inputDiv.classList.add('known');
      } else {
        inputDiv.classList.remove('known');
      }

      if (!isValid && inputValue.trim() !== '' && !isNaN(parsedValue)) {
        inputDiv.classList.add('invalid');
      } else {
        inputDiv.classList.remove('invalid');
      }
      inputDiv.classList.remove('invalid-relation');

      if (variableElements[varName] && variableElements[varName].output) {
        variableElements[varName].output.textContent = '';
      }
    });

    inputDiv.appendChild(label);
    inputDiv.appendChild(input);
    if (unitSelect) {
      inputDiv.appendChild(unitSelect);
    }

    const outputDiv = document.createElement('div');
    outputDiv.classList.add('variable-output');
    const outputSpan = document.createElement('span');
    outputSpan.setAttribute('id', `${varName}Output`);
    outputSpan.classList.add('output-value');

    outputDiv.appendChild(outputSpan);

    rowDiv.appendChild(inputDiv);
    rowDiv.appendChild(outputDiv);

    calculatorForm.appendChild(rowDiv);

    variableElements[varName] = {
      input: input,
      output: outputSpan,
      unitSelect: unitSelect,
      inputDiv: inputDiv
    };
  }
}

function solveEquations(vars, eqs, maxIterations, logSkips, enableDerivedEquations) {
  let somethingCalculated = true;
  let iterations = 0;

  console.log("--- Starting New Calculation ---"); // Moved from calculateButton click
  console.log("Starting solve cycle with initial variables:", JSON.parse(JSON.stringify(vars)));

  while (somethingCalculated && iterations < maxIterations) {
    somethingCalculated = false;
    iterations++;
    console.log(`--- Iteration %c${iterations}%c ---`, 'color: yellow; font-weight: bold;', '');

    const knownThisIterationStart = {};
    for (const varName in vars) {
      if (isValidNumber(vars[varName].value)) {
        knownThisIterationStart[varName] = vars[varName].value;
      }
    }

    let iterationCalculated = false;

    for (const eq of eqs) {
      if (eq.isDerived && !enableDerivedEquations) {
        continue;
      }

      if (isValidNumber(vars[eq.output].value)) {
        if (isFinite(vars[eq.output].value)) {
          continue;
        }
      }

      const inputsKnown = eq.inputs.every(inputVar =>
          isValidNumber(knownThisIterationStart[inputVar]));

      if (inputsKnown) {
        const calculatedValue = eq.calculate(vars);

        if (isValidNumber(calculatedValue) && !isValidNumber(vars[eq.output].value)) {
          if (isFinite(calculatedValue) || !isFinite(vars[eq.output].value)) {
            vars[eq.output].value = calculatedValue;
            somethingCalculated = true;
            iterationCalculated = true;

            let equationNameDisplay = eq.name;
            let equationFormulaDisplay = eq.formula ? ` → ${eq.formula}` : '';
            let equationNameColor = 'color: green;';

            if (eq.isDerived) {
              equationNameDisplay = `${eq.name} (Derived)`;
              equationNameColor = 'color: #bf9b30;';
            }

            console.log(
              `%cSUCCESS%c: Calculated ${eq.output} = ${calculatedValue} using %c${equationNameDisplay}%c${equationFormulaDisplay}`,
              'color: green; font-weight: bold;',
              '',
              equationNameColor,
              ''
            );

          } else if (logSkips) {
            console.log(`%cSKIP%c: ${eq.name} calculated a non-finite value, but output already has a finite value.`, 'color: red; font-weight: bold;', '');
          }

        } else if (logSkips && !isValidNumber(calculatedValue)) {
          console.log(`%cFAIL%c: ${eq.name} calculation returned invalid or null value.`, 'color: red; font-weight: bold;', '');
        } else if (logSkips && isValidNumber(vars[eq.output].value)) {
          console.log(`%cSKIP%c: ${eq.output} already has a valid value.`, 'color: red; font-weight: bold;', '');
        }

      } else {
        if (logSkips) {
          const missingInputs = eq.inputs.filter(inputVar =>
              !isValidNumber(knownThisIterationStart[inputVar])).join(', ');
          console.log(`%cSKIP%c: Cannot calculate ${eq.output} using ${eq.name}. Inputs missing: ${missingInputs}`, 'color: red; font-weight: bold;', '');
        }
      }
    }

    if (!iterationCalculated) {
      somethingCalculated = false;
    }
  }

  if (iterations >= maxIterations) {
    console.warn(`Reached maximum iterations (%c${maxIterations}%c), potential infinite loop or unresolved variables.`, 'color: orange; font-weight: bold;', '');
  }
  console.log("Solve cycle finished. Final variables state:", JSON.parse(JSON.stringify(vars)));
}

function updateOutputDisplay(vars) {
  if (!vars)
    return;

  for (const varName in vars) {
    const variableData = vars[varName];
    const outputElement = variableElements[varName]?.output;
    const unitSelectElement = variableElements[varName]?.unitSelect;
    const varTemplateData = variablesTemplate[varName];

    if (!outputElement || !varTemplateData)
      continue;

    let displayUnitKey;
    if (unitSelectElement && unitSelectElement.value && units[varTemplateData.type]?.[unitSelectElement.value]) {
      displayUnitKey = unitSelectElement.value;
    } else {
      displayUnitKey = Array.isArray(varTemplateData.displayUnit) ? varTemplateData.displayUnit[0] : varTemplateData.displayUnit;
    }

    const displayUnitLabel = units[varTemplateData.type]?.[displayUnitKey]?.label || displayUnitKey;

    if (isValidNumber(variableData.value)) {
      const unitType = varTemplateData.type;
      const displayValue = convertFromSI(variableData.value, displayUnitKey, unitType);

      if (isValidNumber(displayValue)) {
        let formattedValue;

        const absValue = Math.abs(displayValue);
        if (Math.abs(displayValue - Math.round(displayValue)) < 1e-9) {
          formattedValue = Math.round(displayValue).toString();
        } else if (absValue >= 1e5 || (absValue < 1e-3 && absValue !== 0)) {
          formattedValue = displayValue.toExponential(6);
        } else {
          formattedValue = displayValue.toFixed(6);
        }

        outputElement.textContent = `${formattedValue} ${displayUnitLabel}`;

      } else {
        outputElement.textContent = `Conversion Error (${displayUnitLabel})`;
      }
    } else if (variableData.value !== null && variableData.value !== undefined && !isFinite(variableData.value)) {
      outputElement.textContent = `${variableData.value.toString()} (${displayUnitLabel})`;
    } else {
      outputElement.textContent = '';
    }
  }
}

function setAllComparisonUnits(targetUnitSuffix) {
  for (const varName in variableElements) {
    const unitSelect = variableElements[varName]?.unitSelect;
    const varTemplateData = variablesTemplate[varName];

    if (unitSelect && varTemplateData) {
      const unitType = varTemplateData.type;
      let targetUnitKey = '';

      switch (unitType) {
      case 'length_r':
        if (targetUnitSuffix === 'earth')
          targetUnitKey = 'R_earth';
        else if (targetUnitSuffix === 'jupiter')
          targetUnitKey = 'R_jupiter';
        else if (targetUnitSuffix === 'si')
          targetUnitKey = 'm';
        else if (targetUnitSuffix === 'bigsi')
          targetUnitKey = 'km';
        break;
      case 'length_c':
        if (targetUnitSuffix === 'earth')
          targetUnitKey = 'C_earth';
        else if (targetUnitSuffix === 'jupiter')
          targetUnitKey = 'C_jupiter';
        else if (targetUnitSuffix === 'si')
          targetUnitKey = 'm';
        else if (targetUnitSuffix === 'bigsi')
          targetUnitKey = 'km';
        break;
      case 'mass':
        if (targetUnitSuffix === 'earth')
          targetUnitKey = 'M_earth';
        else if (targetUnitSuffix === 'jupiter')
          targetUnitKey = 'M_jupiter';
        else if (targetUnitSuffix === 'si')
          targetUnitKey = 'kg';
        else if (targetUnitSuffix === 'bigsi')
          targetUnitKey = 't';
        break;
      case 'density':
        if (targetUnitSuffix === 'earth')
          targetUnitKey = 'rho_earth';
        else if (targetUnitSuffix === 'jupiter')
          targetUnitKey = 'rho_jupiter';
        else if (targetUnitSuffix === 'si' || targetUnitSuffix === 'bigsi')
          targetUnitKey = 'kg/m^3';
        break;
      case 'volume':
        if (targetUnitSuffix === 'earth')
          targetUnitKey = 'V_earth';
        else if (targetUnitSuffix === 'jupiter')
          targetUnitKey = 'V_jupiter';
        else if (targetUnitSuffix === 'si')
          targetUnitKey = 'm^3';
        else if (targetUnitSuffix === 'bigsi')
          targetUnitKey = 'km^3';
        break;
      case 'acceleration':
        if (targetUnitSuffix === 'earth')
          targetUnitKey = 'g_earth';
        else if (targetUnitSuffix === 'jupiter')
          targetUnitKey = 'g_jupiter';
        else if (targetUnitSuffix === 'si' || targetUnitSuffix === 'bigsi')
          targetUnitKey = 'm/s^2';
        break;
      case 'area':
        if (targetUnitSuffix === 'earth')
          targetUnitKey = 'A_earth';
        else if (targetUnitSuffix === 'jupiter')
          targetUnitKey = 'A_jupiter';
        else if (targetUnitSuffix === 'si')
          targetUnitKey = 'm^2';
        else if (targetUnitSuffix === 'bigsi')
          targetUnitKey = 'km^2';
        break;
      case 'speed':
        if (varName === 'escapeVelocity' || varName === 'escapeVelocityEquator') {
          if (targetUnitSuffix === 'earth')
            targetUnitKey = 'V_earth_esc';
          else if (targetUnitSuffix === 'jupiter')
            targetUnitKey = 'V_jupiter_esc';
          else if (targetUnitSuffix === 'si')
            targetUnitKey = 'm/s';
          else if (targetUnitSuffix === 'bigsi')
            targetUnitKey = 'km/s';
        } else if (varName === 'linearVelocity' || varName === 'linearVelocityEquator') {
          if (targetUnitSuffix === 'si')
            targetUnitKey = 'm/s';
          else if (targetUnitSuffix === 'bigsi')
            targetUnitKey = 'km/s';
        }
        break;
      case 'flatness':
        // Skip flattening as requested - leave unchanged
        break;
      }

      if (targetUnitKey && units[unitType]?.[targetUnitKey]) {
        const optionExists = Array.from(unitSelect.options).some(option => option.value === targetUnitKey);
        if (optionExists) {
          unitSelect.value = targetUnitKey;
        }
      }
    }
  }

  // Handle mode-specific actions after unit changes
  handleUnitChange();
}

function handleUnitChange() {
  const compareMode = compareModeCheckbox && compareModeCheckbox.checked;
  const autoRecalcMode = autoRecalcModeCheckbox && autoRecalcModeCheckbox.checked;

  if (compareMode) {
    // Compare mode: only update output display
    if (lastCalculatedVariables) {
      updateOutputDisplay(lastCalculatedVariables);
    }
  } else if (autoRecalcMode) {
    // Auto recalc mode: trigger full recalculation
    if (calculateButton) {
      calculateButton.click();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  generateForm();

  const calculateButton = document.getElementById('calculateButton');
  const logSkipsCheckbox = document.getElementById('logSkipsCheckbox');
  const maxIterationsInput = document.getElementById('maxIterationsInput');
  const enableDerivedEquationsCheckbox = document.getElementById('enableDerivedEquationsCheckbox');
  const compareModeCheckbox = document.getElementById('compareModeCheckbox');
  const autoRecalcModeCheckbox = document.getElementById('autoRecalcModeCheckbox');

  const earthUnitsBtn = document.getElementById('earthUnitsBtn');
  const jupiterUnitsBtn = document.getElementById('jupiterUnitsBtn');
  const siUnitsBtn = document.getElementById('siUnitsBtn');
  const bigSiUnitsBtn = document.getElementById('bigSiUnitsBtn');

  if (!calculateButton) {
    console.error("Error: '#calculateButton' not found.");
    return;
  }
  if (!logSkipsCheckbox) {
    console.error("Error: '#logSkipsCheckbox' not found.");
    return;
  }
  if (!maxIterationsInput) {
    console.error("Error: '#maxIterationsInput' not found.");
    return;
  }
  if (!enableDerivedEquationsCheckbox) {
    console.error("Error: '#enableDerivedEquationsCheckbox' not found.");
    return;
  }
  if (!compareModeCheckbox) {
    console.error("Error: '#compareModeCheckbox' not found.");
    return;
  }
  if (!autoRecalcModeCheckbox) {
    console.error("Error: '#autoRecalcModeCheckbox' not found.");
    return;
  }
  if (!earthUnitsBtn) {
    console.error("Error: '#earthUnitsBtn' not found.");
    return;
  }
  if (!jupiterUnitsBtn) {
    console.error("Error: '#jupiterUnitsBtn' not found.");
    return;
  }
  if (!siUnitsBtn) {
    console.error("Error: '#siUnitsBtn' not found.");
    return;
  }
  if (!bigSiUnitsBtn) {
    console.error("Error: '#bigSiUnitsBtn' not found.");
    return;
  }

  calculateButton.addEventListener('click', () => {
    let hasInvalidInputs = false;
    let hasRelationalErrors = false;

    for (const varName in variableElements) {
      const inputElement = variableElements[varName].input;
      const inputDiv = variableElements[varName].inputDiv;

      const inputValue = inputElement.value;
      const isValid = validateInput(varName, inputValue);

      if (inputValue.trim() !== '' && !isNaN(parseFloat(inputValue)) && isValid) {
        inputDiv.classList.add('known');
      } else {
        inputDiv.classList.remove('known');
      }

      if (!isValid && inputValue.trim() !== '' && !isNaN(parseFloat(inputValue))) {
        inputDiv.classList.add('invalid');
        hasInvalidInputs = true;
      } else {
        inputDiv.classList.remove('invalid');
      }

      inputDiv.classList.remove('invalid-relation');

      if (variableElements[varName] && variableElements[varName].output) {
        variableElements[varName].output.textContent = '';
      }
    }

    const reqInput = variableElements.radiusEquator.input;
    const rpInput = variableElements.radiusPole.input;
    const meanRInput = variableElements.radius.input;

    const reqDiv = variableElements.radiusEquator.inputDiv;
    const rpDiv = variableElements.radiusPole.inputDiv;
    const meanRDiv = variableElements.radius.inputDiv;

    const reqValue = parseFloat(reqInput.value);
    const rpValue = parseFloat(rpInput.value);
    const meanRValue = parseFloat(meanRInput.value);

    if (!isNaN(reqValue) && !isNaN(rpValue) && reqValue > 0 && rpValue > 0) {
      if (rpValue > reqValue) {
        hasRelationalErrors = true;
        reqDiv.classList.add('invalid-relation');
        rpDiv.classList.add('invalid-relation');
        console.error("Input Error: Polar Radius (Rp) cannot be greater than Equatorial Radius (Req) for a flattened spheroid.");
      }
    }

    if (!isNaN(reqValue) && !isNaN(meanRValue) && reqValue > 0 && meanRValue > 0) {
      if (reqValue < meanRValue) {
        hasRelationalErrors = true;
        reqDiv.classList.add('invalid-relation');
        meanRDiv.classList.add('invalid-relation');
        console.error("Input Error: Equatorial Radius (Req) cannot be less than Mean Radius (R) for an oblate spheroid.");
      }
    }

    if (hasInvalidInputs || hasRelationalErrors) {
      console.warn("Calculation aborted: Please fix input values.");
      return;
    }

    const currentVariables = JSON.parse(JSON.stringify(variablesTemplate));

    for (const varName in variableElements) {
      const inputElement = variableElements[varName].input;
      const unitSelectElement = variableElements[varName].unitSelect;
      const varTemplateData = variablesTemplate[varName];

      const parsedValue = parseFloat(inputElement.value);
      const selectedUnit = unitSelectElement && unitSelectElement.value ? unitSelectElement.value : varTemplateData.unit;

      currentVariables[varName].inputUnit = selectedUnit;

      if (!isNaN(parsedValue)) {
        const unitType = varTemplateData.type;
        currentVariables[varName].value = convertToSI(parsedValue, selectedUnit, unitType);
      } else {
        currentVariables[varName].value = null;
      }
    }

    const logSkips = logSkipsCheckbox.checked;
    const maxIterations = parseInt(maxIterationsInput.value);
    const finalMaxIterations = (!isNaN(maxIterations) && maxIterations > 0) ? maxIterations : 50;
    const enableDerivedEquations = enableDerivedEquationsCheckbox.checked;

    console.clear();
    console.log("--- Starting New Calculation ---");

    solveEquations(currentVariables, equations, finalMaxIterations, logSkips, enableDerivedEquations);

    lastCalculatedVariables = currentVariables;

    updateOutputDisplay(lastCalculatedVariables);

    console.log("--- Calculation Finished ---");
  });

  enableDerivedEquationsCheckbox.addEventListener('change', () => {
    // No specific action needed here if its state is only read in calculateButton click
  });

  // Mutual exclusion logic for compare and auto recalc modes
  compareModeCheckbox.addEventListener('change', () => {
    if (compareModeCheckbox.checked && autoRecalcModeCheckbox.checked) {
      autoRecalcModeCheckbox.checked = false;
    }
  });

  autoRecalcModeCheckbox.addEventListener('change', () => {
    if (autoRecalcModeCheckbox.checked && compareModeCheckbox.checked) {
      compareModeCheckbox.checked = false;
    }
  });

  earthUnitsBtn.addEventListener('click', () => {
    setAllComparisonUnits('earth');
  });

  jupiterUnitsBtn.addEventListener('click', () => {
    setAllComparisonUnits('jupiter');
  });

  siUnitsBtn.addEventListener('click', () => {
    setAllComparisonUnits('si');
  });

  bigSiUnitsBtn.addEventListener('click', () => {
    setAllComparisonUnits('bigsi');
  });

  // Add Enter key listener for calculate button
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      calculateButton.click();
    }
  });
});
