// FE-style practice questions. `answer` is the index of the correct choice.

export type Question = {
  id: string;
  cat: Category;
  q: string;
  choices: string[];
  answer: number;
  why: string;
};

export const CATEGORIES = [
  "Mathematics",
  "Statics",
  "Dynamics",
  "Mechanics of Materials",
  "Fluids & Hydraulics",
  "Geotechnical",
  "Structural & Materials",
  "Transportation",
  "Surveying",
  "Economics & Ethics",
  "Construction",
  "Water & Environmental",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const QUESTIONS: Question[] = [
  // ── Mathematics
  { id: "ma1", cat: "Mathematics", q: "What is the slope of the line through (2, 3) and (6, 11)?", choices: ["0.5", "2", "4", "8"], answer: 1, why: "m = (11 − 3)/(6 − 2) = 8/4 = 2." },
  { id: "ma2", cat: "Mathematics", q: "If f(x) = x³, what is f′(2)?", choices: ["6", "8", "12", "24"], answer: 2, why: "f′(x) = 3x², so f′(2) = 3·4 = 12." },
  { id: "ma3", cat: "Mathematics", q: "Evaluate ∫₀² 3x² dx.", choices: ["4", "6", "8", "12"], answer: 2, why: "∫3x² dx = x³. Evaluated from 0 to 2: 8 − 0 = 8." },
  { id: "ma4", cat: "Mathematics", q: "The roots of x² − 5x + 6 = 0 are:", choices: ["1 and 6", "2 and 3", "−2 and −3", "−1 and 6"], answer: 1, why: "Factor: (x − 2)(x − 3) = 0 → x = 2 or 3." },
  { id: "ma5", cat: "Mathematics", q: "The mean of the data set 4, 8, 6, 10, 12 is:", choices: ["6", "7", "8", "10"], answer: 2, why: "Sum = 40, n = 5, mean = 40/5 = 8." },
  { id: "ma6", cat: "Mathematics", q: "The determinant of the matrix [[3, 1], [2, 4]] is:", choices: ["10", "12", "14", "−10"], answer: 0, why: "det = (3)(4) − (1)(2) = 12 − 2 = 10." },

  // ── Statics
  { id: "st1", cat: "Statics", q: "A simply supported beam spans 10 m with a 20 kN point load at midspan. What is each support reaction?", choices: ["5 kN", "10 kN", "20 kN", "40 kN"], answer: 1, why: "By symmetry each support carries half: 20/2 = 10 kN." },
  { id: "st2", cat: "Statics", q: "A simply supported beam spans 6 m (supports A and B). A 30 kN load acts 2 m from A. What is the reaction at A?", choices: ["10 kN", "15 kN", "20 kN", "30 kN"], answer: 2, why: "ΣM_A = 0: R_B·6 = 30·2 → R_B = 10 kN. ΣFy = 0: R_A = 30 − 10 = 20 kN." },
  { id: "st3", cat: "Statics", q: "A 100 N force acts at 30° above the horizontal. Its horizontal component is closest to:", choices: ["50.0 N", "70.7 N", "86.6 N", "100 N"], answer: 2, why: "Fx = F cos θ = 100 cos 30° = 86.6 N." },
  { id: "st4", cat: "Statics", q: "A cantilever 3 m long carries a 10 kN point load at its free end. The moment at the fixed support is:", choices: ["3.33 kN·m", "10 kN·m", "15 kN·m", "30 kN·m"], answer: 3, why: "M = P·L = 10 × 3 = 30 kN·m." },
  { id: "st5", cat: "Statics", q: "How many reaction components does a fixed support provide in a 2D problem?", choices: ["1", "2", "3", "4"], answer: 2, why: "A fixed support resists horizontal force, vertical force, and moment: 3 reactions." },
  { id: "st6", cat: "Statics", q: "A uniform load of 5 kN/m acts over 8 m. Its equivalent resultant force and location are:", choices: ["40 kN at 4 m", "40 kN at 8 m", "20 kN at 4 m", "13.3 kN at 2.67 m"], answer: 0, why: "Resultant = w·L = 5 × 8 = 40 kN, acting at the centroid of the load: L/2 = 4 m." },

  // ── Mechanics of Materials
  { id: "mm1", cat: "Mechanics of Materials", q: "A 50 kN axial load acts on a bar with cross-sectional area 500 mm². The normal stress is:", choices: ["10 MPa", "25 MPa", "100 MPa", "250 MPa"], answer: 2, why: "σ = P/A = 50,000 N / 500 mm² = 100 N/mm² = 100 MPa." },
  { id: "mm2", cat: "Mechanics of Materials", q: "A 2 m long bar elongates 2 mm. The strain is:", choices: ["0.0001", "0.001", "0.01", "0.1"], answer: 1, why: "ε = δ/L = 2 mm / 2000 mm = 0.001." },
  { id: "mm3", cat: "Mechanics of Materials", q: "A rectangular section is 100 mm wide and 200 mm deep. Its moment of inertia about the horizontal centroidal axis is:", choices: ["16.7 × 10⁶ mm⁴", "33.3 × 10⁶ mm⁴", "66.7 × 10⁶ mm⁴", "133 × 10⁶ mm⁴"], answer: 2, why: "I = bh³/12 = 100 × 200³ / 12 = 100 × 8×10⁶ / 12 = 66.7 × 10⁶ mm⁴." },
  { id: "mm4", cat: "Mechanics of Materials", q: "A simply supported beam of span 8 m carries a uniform load of 10 kN/m. The maximum bending moment is:", choices: ["40 kN·m", "80 kN·m", "160 kN·m", "320 kN·m"], answer: 1, why: "M_max = wL²/8 = 10 × 64 / 8 = 80 kN·m." },
  { id: "mm5", cat: "Mechanics of Materials", q: "A beam section has S = 1.0 × 10⁶ mm³ and carries M = 80 kN·m. The maximum bending stress is:", choices: ["8 MPa", "80 MPa", "800 MPa", "0.08 MPa"], answer: 1, why: "σ = M/S = 80 × 10⁶ N·mm / 1.0 × 10⁶ mm³ = 80 MPa." },
  { id: "mm6", cat: "Mechanics of Materials", q: "If the effective length of a pin-ended column is doubled, its Euler buckling load becomes:", choices: ["2× larger", "½ as large", "¼ as large", "Unchanged"], answer: 2, why: "Pcr = π²EI/(KL)². Doubling L multiplies (KL)² by 4, so Pcr drops to ¼." },

  // ── Fluids
  { id: "fl1", cat: "Fluids & Hydraulics", q: "The gauge pressure at a depth of 10 m in fresh water (γ = 9.81 kN/m³) is:", choices: ["9.81 kPa", "98.1 kPa", "981 kPa", "10 kPa"], answer: 1, why: "p = γh = 9.81 × 10 = 98.1 kPa." },
  { id: "fl2", cat: "Fluids & Hydraulics", q: "Water flows at 3 m/s in a pipe of area 0.2 m² that reduces to 0.1 m². The velocity in the smaller section is:", choices: ["1.5 m/s", "3 m/s", "6 m/s", "12 m/s"], answer: 2, why: "Continuity: A₁V₁ = A₂V₂ → 0.2 × 3 = 0.1 × V₂ → V₂ = 6 m/s." },
  { id: "fl3", cat: "Fluids & Hydraulics", q: "In Manning's equation, which change INCREASES flow velocity in an open channel?", choices: ["Increasing roughness n", "Increasing channel slope S", "Decreasing hydraulic radius R", "Adding vegetation to the channel"], answer: 1, why: "V = (k/n) R^(2/3) S^(1/2). Velocity increases with slope and hydraulic radius, and decreases with roughness." },
  { id: "fl4", cat: "Fluids & Hydraulics", q: "Flow in a pipe with Reynolds number 500 is:", choices: ["Laminar", "Turbulent", "Transitional", "Supersonic"], answer: 0, why: "Pipe flow is laminar when Re < about 2,000–2,300." },

  // ── Geotechnical
  { id: "ge1", cat: "Geotechnical", q: "A soil has porosity n = 0.40. Its void ratio e is closest to:", choices: ["0.29", "0.40", "0.67", "1.50"], answer: 2, why: "e = n/(1 − n) = 0.40/0.60 = 0.667." },
  { id: "ge2", cat: "Geotechnical", q: "A sample contains 20 g of water and 100 g of dry solids. Its water content is:", choices: ["16.7%", "20%", "25%", "83%"], answer: 1, why: "w = M_water / M_solids = 20/100 = 20% (water content uses dry mass, not total)." },
  { id: "ge3", cat: "Geotechnical", q: "At a point in soil, total stress = 100 kPa and pore water pressure = 40 kPa. The effective stress is:", choices: ["40 kPa", "60 kPa", "100 kPa", "140 kPa"], answer: 1, why: "σ′ = σ − u = 100 − 40 = 60 kPa." },
  { id: "ge4", cat: "Geotechnical", q: "In the Unified Soil Classification System (USCS), 'CL' means:", choices: ["Coarse loam", "Clay of low plasticity", "Clay of high liquidity", "Clean limestone"], answer: 1, why: "C = clay, L = low plasticity (liquid limit < 50). CH is high plasticity." },
  { id: "ge5", cat: "Geotechnical", q: "The standard/modified Proctor test is used to determine:", choices: ["Permeability", "Maximum dry density and optimum moisture content", "Shear strength", "Liquid limit"], answer: 1, why: "Proctor compaction tests give the moisture–density curve: max dry unit weight at optimum water content." },

  // ── Structural & Materials
  { id: "sm1", cat: "Structural & Materials", q: "The modulus of elasticity of structural steel is approximately:", choices: ["3,600 ksi", "10,000 ksi", "29,000 ksi", "60,000 ksi"], answer: 2, why: "E_steel ≈ 29,000 ksi (≈ 200 GPa). 3,600 ksi is typical of normal-weight concrete." },
  { id: "sm2", cat: "Structural & Materials", q: "Concrete compressive strength f′c is normally specified at what age?", choices: ["7 days", "14 days", "28 days", "90 days"], answer: 2, why: "Design strength f′c is specified at 28 days unless noted otherwise." },
  { id: "sm3", cat: "Structural & Materials", q: "In a simply supported reinforced concrete beam, the longitudinal steel is placed near the bottom mainly to resist:", choices: ["Compression", "Tension", "Torsion", "Shrinkage only"], answer: 1, why: "Positive moment puts the bottom in tension; concrete is weak in tension, so steel carries it." },
  { id: "sm4", cat: "Structural & Materials", q: "Increasing the water-cement ratio of a concrete mix generally:", choices: ["Increases strength", "Decreases strength", "Has no effect on strength", "Reduces workability"], answer: 1, why: "More water → more porosity → lower strength (and higher workability)." },
  { id: "sm5", cat: "Structural & Materials", q: "The basic LRFD load combination for dead (D) and live (L) load per ASCE 7 is:", choices: ["D + L", "1.4D + 1.4L", "1.2D + 1.6L", "0.9D + 1.0L"], answer: 2, why: "1.2D + 1.6L is the typical governing gravity combination (1.4D alone is another)." },

  // ── Transportation
  { id: "tr1", cat: "Transportation", q: "60 mi/h is equal to:", choices: ["60 ft/s", "73.3 ft/s", "88 ft/s", "96.5 ft/s"], answer: 2, why: "60 mi/h × 5280 ft/mi ÷ 3600 s/h = 88 ft/s (quick rule: mi/h × 1.467)." },
  { id: "tr2", cat: "Transportation", q: "A driver travelling 88 ft/s has a perception-reaction time of 2.5 s. The reaction distance is:", choices: ["35 ft", "176 ft", "220 ft", "264 ft"], answer: 2, why: "d = v·t = 88 × 2.5 = 220 ft (AASHTO uses 2.5 s for design)." },
  { id: "tr3", cat: "Transportation", q: "A road rises 3 ft over a horizontal distance of 100 ft. Its grade is:", choices: ["0.3%", "3%", "30%", "33%"], answer: 1, why: "Grade = rise/run = 3/100 = 0.03 = 3%." },
  { id: "tr4", cat: "Transportation", q: "Stopping sight distance is the sum of:", choices: ["Reaction distance + braking distance", "Passing distance + braking distance", "Decision distance + lane width", "Braking distance only"], answer: 0, why: "SSD = distance traveled during perception-reaction + distance to brake to a stop." },

  // ── Surveying
  { id: "su1", cat: "Surveying", q: "BM elevation = 100.00 m, backsight = 1.50 m, foresight to point P = 2.25 m. The elevation of P is:", choices: ["98.50 m", "99.25 m", "100.75 m", "103.75 m"], answer: 1, why: "HI = 100.00 + 1.50 = 101.50 m. Elev P = 101.50 − 2.25 = 99.25 m." },
  { id: "su2", cat: "Surveying", q: "A slope distance of 100 m is measured on a 10° slope. The horizontal distance is closest to:", choices: ["17.4 m", "90.0 m", "98.5 m", "101.5 m"], answer: 2, why: "H = S cos θ = 100 cos 10° = 98.48 m." },
  { id: "su3", cat: "Surveying", q: "A bearing of S 30° E corresponds to an azimuth (from north, clockwise) of:", choices: ["30°", "120°", "150°", "210°"], answer: 2, why: "South is 180°; turning 30° toward east: 180° − 30° = 150°." },
  { id: "su4", cat: "Surveying", q: "Two cross sections 50 ft apart have areas of 100 ft² and 140 ft². By average end area, the volume is:", choices: ["6,000 ft³", "7,000 ft³", "12,000 ft³", "240 ft³"], answer: 0, why: "V = L(A₁ + A₂)/2 = 50 × (100 + 140)/2 = 6,000 ft³ (≈ 222 yd³)." },

  // ── Economics & Ethics
  { id: "ec1", cat: "Economics & Ethics", q: "$1,000 is invested at 5% compounded annually. Its value after 2 years is:", choices: ["$1,050.00", "$1,100.00", "$1,102.50", "$1,105.00"], answer: 2, why: "F = P(1 + i)ⁿ = 1000 × 1.05² = $1,102.50." },
  { id: "ec2", cat: "Economics & Ethics", q: "What is the present worth of $1,210 received in 2 years at 10% interest?", choices: ["$1,000", "$1,010", "$1,100", "$968"], answer: 0, why: "P = F/(1 + i)ⁿ = 1210 / 1.21 = $1,000." },
  { id: "ec3", cat: "Economics & Ethics", q: "A $50,000 upgrade saves $10,000 per year. The simple payback period is:", choices: ["2 years", "5 years", "10 years", "50 years"], answer: 1, why: "Payback = cost / annual savings = 50,000 / 10,000 = 5 years." },
  { id: "ec4", cat: "Economics & Ethics", q: "According to the NSPE Code of Ethics, an engineer's paramount obligation is to:", choices: ["The employer", "The client", "The safety, health, and welfare of the public", "The engineering profession"], answer: 2, why: "Fundamental Canon 1: hold paramount the safety, health, and welfare of the public." },

  // ── Construction
  { id: "co1", cat: "Construction", q: "A slab measures 30 ft × 20 ft × 6 in thick. The concrete volume is closest to:", choices: ["11.1 yd³", "22.2 yd³", "100 yd³", "300 yd³"], answer: 0, why: "30 × 20 × 0.5 = 300 ft³; 300 / 27 = 11.1 yd³." },
  { id: "co2", cat: "Construction", q: "In CPM scheduling, activities on the critical path have a total float of:", choices: ["Zero", "One day", "Equal to project duration", "Negative always"], answer: 0, why: "Critical activities have zero total float — any delay delays the project." },
  { id: "co3", cat: "Construction", q: "A formal written request from the contractor asking the designer to clarify the drawings is called a(n):", choices: ["Submittal", "RFI (Request for Information)", "Change order", "Punch list"], answer: 1, why: "An RFI asks for clarification; a change order modifies the contract scope/price." },
  { id: "co4", cat: "Construction", q: "A slab measures 10 m × 5 m × 0.2 m. The concrete volume is:", choices: ["1 m³", "5 m³", "10 m³", "50 m³"], answer: 2, why: "V = 10 × 5 × 0.2 = 10 m³." },

  // ── Water & Environmental
  { id: "we1", cat: "Water & Environmental", q: "Using the rational method Q = CiA with C = 0.5, i = 2 in/hr, A = 10 acres, the peak runoff is about:", choices: ["1 cfs", "5 cfs", "10 cfs", "20 cfs"], answer: 2, why: "Q = 0.5 × 2 × 10 = 10 cfs (in US units, acre·in/hr ≈ 1.008 cfs)." },
  { id: "we2", cat: "Water & Environmental", q: "BOD, a key wastewater parameter, stands for:", choices: ["Basic Organic Density", "Biochemical Oxygen Demand", "Bulk Outflow Discharge", "Biological Ozone Dose"], answer: 1, why: "Biochemical Oxygen Demand: oxygen used by microbes to decompose organic matter (often 5-day BOD₅)." },
  { id: "we3", cat: "Water & Environmental", q: "The usual order of conventional surface water treatment is:", choices: ["Filtration → coagulation → sedimentation → disinfection", "Coagulation/flocculation → sedimentation → filtration → disinfection", "Disinfection → filtration → sedimentation → coagulation", "Sedimentation → disinfection → coagulation → filtration"], answer: 1, why: "Coagulate and flocculate particles, settle them, filter the rest, then disinfect." },

  // ════════════════ Set 2 ════════════════

  // ── Mathematics
  { id: "ma7", cat: "Mathematics", q: "Solve the system x + y = 10 and x − y = 2. What is x?", choices: ["4", "6", "8", "12"], answer: 1, why: "Add the equations: 2x = 12 → x = 6 (and y = 4)." },
  { id: "ma8", cat: "Mathematics", q: "The area of a circle with a diameter of 10 m is closest to:", choices: ["31.4 m²", "78.5 m²", "157 m²", "314 m²"], answer: 1, why: "A = πd²/4 = π(100)/4 = 78.5 m². (31.4 m is the circumference.)" },
  { id: "ma9", cat: "Mathematics", q: "log₁₀(1000) equals:", choices: ["2", "3", "10", "100"], answer: 1, why: "10³ = 1000, so log₁₀(1000) = 3." },
  { id: "ma10", cat: "Mathematics", q: "The distance between points (1, 2) and (4, 6) is:", choices: ["3", "4", "5", "7"], answer: 2, why: "d = √[(4−1)² + (6−2)²] = √(9 + 16) = √25 = 5." },
  { id: "ma11", cat: "Mathematics", q: "If y = sin(2x), then dy/dx is:", choices: ["cos(2x)", "2 cos(2x)", "−2 cos(2x)", "½ cos(2x)"], answer: 1, why: "Chain rule: d/dx sin(u) = cos(u)·du/dx, with u = 2x, du/dx = 2." },
  { id: "ma12", cat: "Mathematics", q: "The POPULATION standard deviation of 2, 4, 4, 4, 5, 5, 7, 9 is:", choices: ["1.5", "2.0", "2.14", "4.0"], answer: 1, why: "Mean = 40/8 = 5. Squared deviations sum to 9+1+1+1+0+0+4+16 = 32. Variance = 32/8 = 4, σ = 2. (Sample std dev would be √(32/7) = 2.14.)" },
  { id: "ma13", cat: "Mathematics", q: "Two fair coins are tossed. The probability that both land heads is:", choices: ["0.125", "0.25", "0.5", "0.75"], answer: 1, why: "Independent events: P = ½ × ½ = ¼ = 0.25." },
  { id: "ma14", cat: "Mathematics", q: "The dot product of vectors A = (1, 2, 3) and B = (4, −5, 6) is:", choices: ["12", "20", "32", "−12"], answer: 0, why: "A·B = (1)(4) + (2)(−5) + (3)(6) = 4 − 10 + 18 = 12." },
  { id: "ma15", cat: "Mathematics", q: "45° expressed in radians is closest to:", choices: ["0.393", "0.785", "1.571", "3.142"], answer: 1, why: "45° × π/180 = π/4 = 0.785 rad." },

  // ── Statics
  { id: "st7", cat: "Statics", q: "In an ideal pin-jointed truss loaded only at its joints, each member carries:", choices: ["Axial force only", "Bending moment only", "Shear and moment", "Axial force and moment"], answer: 0, why: "Truss members are two-force members, so they carry only tension or compression along their axis." },
  { id: "st8", cat: "Statics", q: "A triangle has a height of 9 m. Its centroid is located how far above its base?", choices: ["2 m", "3 m", "4.5 m", "6 m"], answer: 1, why: "The centroid of a triangle is h/3 from the base: 9/3 = 3 m." },
  { id: "st9", cat: "Statics", q: "A rectangle is 100 mm wide and 300 mm deep. Its moment of inertia about its BASE is:", choices: ["2.25 × 10⁸ mm⁴", "6.75 × 10⁸ mm⁴", "9.0 × 10⁸ mm⁴", "1.8 × 10⁹ mm⁴"], answer: 2, why: "I_base = bh³/3 = 100 × 300³/3 = 9.0 × 10⁸ mm⁴. (Parallel axis: Ī + Ad² = 2.25×10⁸ + 30,000 × 150² = 9.0×10⁸.)" },
  { id: "st10", cat: "Statics", q: "A 500 N block rests on a floor with μs = 0.3. The horizontal force needed to start it sliding is:", choices: ["50 N", "150 N", "300 N", "1,667 N"], answer: 1, why: "F = μs·N = 0.3 × 500 = 150 N." },
  { id: "st11", cat: "Statics", q: "A beam has a pin at A (x = 0), a roller at B (x = 8 m), and a 12 kN load at x = 10 m (on the overhang). The reaction at A is:", choices: ["3 kN upward", "3 kN downward", "12 kN upward", "15 kN upward"], answer: 1, why: "ΣM_A = 0: R_B·8 = 12·10 → R_B = 15 kN up. ΣFy: R_A = 12 − 15 = −3 kN, i.e. 3 kN downward (the support holds the beam down)." },
  { id: "st12", cat: "Statics", q: "A 100 N weight hangs from two symmetric cables, each at 60° above the horizontal. The tension in each cable is closest to:", choices: ["50.0 N", "57.7 N", "86.6 N", "100 N"], answer: 1, why: "ΣFy: 2T sin 60° = 100 → T = 100/(2 × 0.866) = 57.7 N." },
  { id: "st13", cat: "Statics", q: "A beam with a fixed support at one end and a roller at the other is:", choices: ["Statically determinate", "Indeterminate to the 1st degree", "Indeterminate to the 2nd degree", "Unstable"], answer: 1, why: "Reactions = 3 (fixed) + 1 (roller) = 4. Equilibrium equations = 3. Degree of indeterminacy = 4 − 3 = 1." },

  // ── Dynamics
  { id: "dy1", cat: "Dynamics", q: "A car starts from rest and accelerates at 2 m/s² for 5 s. Its final speed is:", choices: ["2.5 m/s", "5 m/s", "10 m/s", "25 m/s"], answer: 2, why: "v = v₀ + at = 0 + 2 × 5 = 10 m/s." },
  { id: "dy2", cat: "Dynamics", q: "A car starts from rest and accelerates at 2 m/s² for 5 s. How far does it travel?", choices: ["10 m", "25 m", "50 m", "100 m"], answer: 1, why: "s = v₀t + ½at² = 0 + ½ × 2 × 25 = 25 m." },
  { id: "dy3", cat: "Dynamics", q: "An object is dropped from rest 20 m above the ground (g = 9.81 m/s², no air resistance). Its impact speed is closest to:", choices: ["9.9 m/s", "14.0 m/s", "19.8 m/s", "39.2 m/s"], answer: 2, why: "v = √(2gh) = √(2 × 9.81 × 20) = √392.4 = 19.8 m/s." },
  { id: "dy4", cat: "Dynamics", q: "The kinetic energy of a 1,000 kg car moving at 20 m/s is:", choices: ["20 kJ", "100 kJ", "200 kJ", "400 kJ"], answer: 2, why: "KE = ½mv² = ½ × 1000 × 400 = 200,000 J = 200 kJ." },
  { id: "dy5", cat: "Dynamics", q: "A 4 kg mass hangs on a spring with k = 400 N/m. The natural circular frequency is:", choices: ["0.1 rad/s", "10 rad/s", "20 rad/s", "100 rad/s"], answer: 1, why: "ω = √(k/m) = √(400/4) = √100 = 10 rad/s." },
  { id: "dy6", cat: "Dynamics", q: "A vehicle travels at 20 m/s around a curve of radius 100 m. Its centripetal acceleration is:", choices: ["0.2 m/s²", "2 m/s²", "4 m/s²", "5 m/s²"], answer: 2, why: "a = v²/r = 400/100 = 4 m/s²." },
  { id: "dy7", cat: "Dynamics", q: "A 2 kg cart moving at 3 m/s hits a 1 kg cart at rest and they stick together. Their common speed is:", choices: ["1 m/s", "1.5 m/s", "2 m/s", "3 m/s"], answer: 2, why: "Conservation of momentum: 2 × 3 = (2 + 1)v → v = 6/3 = 2 m/s." },

  // ── Mechanics of Materials
  { id: "mm7", cat: "Mechanics of Materials", q: "A steel bar (E = 200 GPa) is 2 m long with A = 1,000 mm² and carries 100 kN tension. Its elongation is:", choices: ["0.1 mm", "0.5 mm", "1.0 mm", "2.0 mm"], answer: 2, why: "δ = PL/(AE) = (100,000 N × 2,000 mm)/(1,000 mm² × 200,000 MPa) = 1.0 mm." },
  { id: "mm8", cat: "Mechanics of Materials", q: "A solid shaft of diameter 50 mm carries a torque of 1 kN·m. The maximum shear stress is closest to:", choices: ["20.4 MPa", "40.7 MPa", "81.5 MPa", "163 MPa"], answer: 1, why: "τ = Tc/J = 16T/(πd³) = 16 × 10⁶ N·mm / (π × 50³) = 40.7 MPa." },
  { id: "mm9", cat: "Mechanics of Materials", q: "A rectangular beam 100 mm × 200 mm carries a shear force of 30 kN. The maximum shear stress is:", choices: ["1.5 MPa", "2.25 MPa", "3.0 MPa", "4.5 MPa"], answer: 1, why: "For a rectangle, τ_max = 1.5V/A = 1.5 × 30,000 / 20,000 = 2.25 MPa (at the neutral axis)." },
  { id: "mm10", cat: "Mechanics of Materials", q: "A 10 m steel rail (α = 12 × 10⁻⁶ /°C) warms by 50 °C and is free to expand. It lengthens by:", choices: ["0.6 mm", "6 mm", "60 mm", "600 mm"], answer: 1, why: "δ = αΔTL = 12×10⁻⁶ × 50 × 10,000 mm = 6 mm." },
  { id: "mm11", cat: "Mechanics of Materials", q: "A steel rail (E = 200 GPa, α = 12 × 10⁻⁶ /°C) is fully restrained and warms by 50 °C. The thermal stress is:", choices: ["12 MPa", "60 MPa", "120 MPa", "240 MPa"], answer: 2, why: "σ = EαΔT = 200,000 × 12×10⁻⁶ × 50 = 120 MPa (compression)." },
  { id: "mm12", cat: "Mechanics of Materials", q: "Poisson's ratio for structural steel is approximately:", choices: ["0.10", "0.30", "0.50", "0.70"], answer: 1, why: "ν ≈ 0.3 for steel (≈ 0.15–0.2 for concrete). It can never exceed 0.5 for an isotropic material." },
  { id: "mm13", cat: "Mechanics of Materials", q: "At a point, σx = 80 MPa, σy = 20 MPa, τxy = 0. The maximum in-plane shear stress is:", choices: ["20 MPa", "30 MPa", "50 MPa", "60 MPa"], answer: 1, why: "Mohr's circle radius = √[((σx − σy)/2)² + τ²] = (80 − 20)/2 = 30 MPa." },
  { id: "mm14", cat: "Mechanics of Materials", q: "If a cantilever's length is doubled (same end load, section and material), its tip deflection becomes:", choices: ["2×", "4×", "8×", "16×"], answer: 2, why: "δ = PL³/(3EI). Doubling L gives 2³ = 8 times the deflection." },
  { id: "mm15", cat: "Mechanics of Materials", q: "The theoretical effective length factor K for a column fixed at the base and free at the top is:", choices: ["0.5", "0.7", "1.0", "2.0"], answer: 3, why: "Fixed-free (flagpole) columns buckle like half of a pinned column twice as long: K = 2.0." },

  // ── Fluids & Hydraulics
  { id: "fl5", cat: "Fluids & Hydraulics", q: "Water discharges from a small orifice 5 m below the water surface of a large open tank. Ideal jet velocity is closest to:", choices: ["4.9 m/s", "7.0 m/s", "9.9 m/s", "49 m/s"], answer: 2, why: "Torricelli: V = √(2gh) = √(2 × 9.81 × 5) = 9.9 m/s." },
  { id: "fl6", cat: "Fluids & Hydraulics", q: "Water flows at 2 m/s in a 0.3 m diameter pipe. The flow rate is closest to:", choices: ["0.071 m³/s", "0.141 m³/s", "0.6 m³/s", "0.283 m³/s"], answer: 1, why: "A = π(0.3)²/4 = 0.0707 m². Q = VA = 2 × 0.0707 = 0.141 m³/s." },
  { id: "fl7", cat: "Fluids & Hydraulics", q: "Water (ν = 1 × 10⁻⁶ m²/s) flows at 1 m/s in a 0.1 m pipe. The Reynolds number and regime are:", choices: ["1,000 — laminar", "10,000 — turbulent", "100,000 — turbulent", "1,000,000 — laminar"], answer: 2, why: "Re = VD/ν = (1 × 0.1)/10⁻⁶ = 100,000 > ~4,000 → turbulent." },
  { id: "fl8", cat: "Fluids & Hydraulics", q: "A rectangular channel is 4 m wide with 1 m flow depth. The hydraulic radius is:", choices: ["0.5 m", "0.667 m", "1.0 m", "4.0 m"], answer: 1, why: "A = 4 × 1 = 4 m². Wetted perimeter P = 4 + 2(1) = 6 m. R = A/P = 0.667 m." },
  { id: "fl9", cat: "Fluids & Hydraulics", q: "A 0.5 m³ object is fully submerged in fresh water. The buoyant force is closest to:", choices: ["0.5 kN", "4.9 kN", "9.8 kN", "49 kN"], answer: 1, why: "Buoyancy = γ_water × V = 9.81 kN/m³ × 0.5 m³ = 4.9 kN." },
  { id: "fl10", cat: "Fluids & Hydraulics", q: "Water flows at 2 m/s through 100 m of 0.2 m pipe with Darcy friction factor f = 0.02. The head loss is closest to:", choices: ["0.20 m", "1.02 m", "2.04 m", "4.08 m"], answer: 2, why: "h_f = f(L/D)(V²/2g) = 0.02 × 500 × (4/19.62) = 2.04 m." },
  { id: "fl11", cat: "Fluids & Hydraulics", q: "Open-channel flow with a Froude number greater than 1 is:", choices: ["Subcritical", "Critical", "Supercritical", "Laminar"], answer: 2, why: "Fr > 1: supercritical (fast, shallow). Fr < 1: subcritical. Fr = 1: critical." },
  { id: "fl12", cat: "Fluids & Hydraulics", q: "The pressure at the bottom of 10 ft of water (γ = 62.4 lb/ft³) is closest to:", choices: ["0.43 psi", "4.33 psi", "62.4 psi", "624 psi"], answer: 1, why: "p = γh = 62.4 × 10 = 624 lb/ft² ÷ 144 in²/ft² = 4.33 psi (rule: 0.433 psi per ft of water)." },

  // ── Geotechnical
  { id: "ge6", cat: "Geotechnical", q: "A soil has a moist unit weight of 20 kN/m³ and a water content of 25%. Its dry unit weight is:", choices: ["15 kN/m³", "16 kN/m³", "18 kN/m³", "25 kN/m³"], answer: 1, why: "γd = γ/(1 + w) = 20/1.25 = 16 kN/m³." },
  { id: "ge7", cat: "Geotechnical", q: "A saturated soil has w = 20% and Gs = 2.70. Its void ratio is:", choices: ["0.27", "0.54", "0.74", "1.35"], answer: 1, why: "Se = wGs with S = 1: e = 0.20 × 2.70 = 0.54." },
  { id: "ge8", cat: "Geotechnical", q: "A clay has liquid limit 45 and plastic limit 20. Its plasticity index is:", choices: ["20", "25", "45", "65"], answer: 1, why: "PI = LL − PL = 45 − 20 = 25." },
  { id: "ge9", cat: "Geotechnical", q: "Using Darcy's law with k = 1 × 10⁻⁴ m/s, hydraulic gradient i = 0.5, and area A = 2 m², the flow rate is:", choices: ["5 × 10⁻⁵ m³/s", "1 × 10⁻⁴ m³/s", "2 × 10⁻⁴ m³/s", "1 × 10⁻³ m³/s"], answer: 1, why: "Q = kiA = 10⁻⁴ × 0.5 × 2 = 1 × 10⁻⁴ m³/s." },
  { id: "ge10", cat: "Geotechnical", q: "The Rankine active earth pressure coefficient for a cohesionless soil with φ = 30° is:", choices: ["0.25", "0.333", "0.5", "3.0"], answer: 1, why: "Ka = (1 − sin φ)/(1 + sin φ) = (1 − 0.5)/(1 + 0.5) = 1/3. (Kp = 3.0.)" },
  { id: "ge11", cat: "Geotechnical", q: "A 6 m retaining wall holds dry sand with γ = 18 kN/m³ and Ka = 1/3. The total active force per metre of wall is:", choices: ["36 kN/m", "54 kN/m", "108 kN/m", "324 kN/m"], answer: 2, why: "Pa = ½ Ka γ H² = 0.5 × (1/3) × 18 × 36 = 108 kN/m, acting at H/3 above the base." },
  { id: "ge12", cat: "Geotechnical", q: "The water table is at the ground surface and γsat = 20 kN/m³ (γw = 9.81). The effective vertical stress at 5 m depth is closest to:", choices: ["49 kPa", "51 kPa", "100 kPa", "149 kPa"], answer: 1, why: "σ′ = (γsat − γw) × z = (20 − 9.81) × 5 = 50.95 ≈ 51 kPa." },
  { id: "ge13", cat: "Geotechnical", q: "A soil has c = 10 kPa and φ = 30°. On a plane with effective normal stress 100 kPa, the shear strength is closest to:", choices: ["50 kPa", "58 kPa", "68 kPa", "110 kPa"], answer: 2, why: "Mohr-Coulomb: τ = c + σ′ tan φ = 10 + 100 × 0.577 = 67.7 kPa." },
  { id: "ge14", cat: "Geotechnical", q: "In USCS, a soil with more than 50% passing the No. 200 sieve is classified as:", choices: ["Coarse-grained", "Fine-grained", "Gravel", "Organic peat"], answer: 1, why: "≥ 50% passing No. 200 (0.075 mm) → fine-grained (silts and clays). Otherwise coarse-grained." },

  // ── Structural & Materials
  { id: "sm6", cat: "Structural & Materials", q: "An RC beam has b = 300 mm, As = 1,500 mm², fy = 420 MPa, f′c = 28 MPa. The depth of the Whitney stress block a is closest to:", choices: ["44 mm", "75 mm", "88 mm", "105 mm"], answer: 2, why: "a = As·fy / (0.85 f′c b) = (1500 × 420)/(0.85 × 28 × 300) = 630,000/7,140 = 88.2 mm." },
  { id: "sm7", cat: "Structural & Materials", q: "Per ACI 318, the strength reduction factor φ for a tension-controlled flexural section is:", choices: ["0.65", "0.75", "0.90", "1.00"], answer: 2, why: "φ = 0.90 for tension-controlled sections (0.65 for tied compression-controlled, 0.75 for shear)." },
  { id: "sm8", cat: "Structural & Materials", q: "An RC beam has As = 1,500 mm², fy = 420 MPa, stress-block depth a = 88.2 mm and effective depth d = 500 mm. The nominal moment Mn is closest to:", choices: ["144 kN·m", "258 kN·m", "287 kN·m", "315 kN·m"], answer: 2, why: "Mn = As fy (d − a/2) = 630,000 N × (500 − 44.1) mm = 287 × 10⁶ N·mm = 287 kN·m. (φMn = 0.9 × 287 = 258 kN·m.)" },
  { id: "sm9", cat: "Structural & Materials", q: "The specified minimum yield strength of ASTM A992 steel (used for W-shapes) is:", choices: ["36 ksi", "50 ksi", "60 ksi", "65 ksi"], answer: 1, why: "A992: Fy = 50 ksi, Fu = 65 ksi. A36 is 36 ksi; Grade 60 rebar is 60 ksi." },
  { id: "sm10", cat: "Structural & Materials", q: "A pinned column (K = 1.0) is 4,000 mm long with radius of gyration r = 50 mm. Its slenderness ratio KL/r is:", choices: ["40", "80", "160", "200"], answer: 1, why: "KL/r = 1.0 × 4000 / 50 = 80." },
  { id: "sm11", cat: "Structural & Materials", q: "Influence lines are mainly used to:", choices: ["Find the effect of a moving load at a point", "Draw deflected shapes", "Find centroids", "Design concrete mixes"], answer: 0, why: "An influence line shows how a reaction, shear or moment at one point varies as a unit load moves across the structure (e.g., trucks on bridges)." },
  { id: "sm12", cat: "Structural & Materials", q: "A continuous beam rests on a pin and two rollers (three supports). Its degree of static indeterminacy is:", choices: ["0", "1", "2", "3"], answer: 1, why: "Reactions = 2 + 1 + 1 = 4; equilibrium equations = 3; 4 − 3 = 1." },
  { id: "sm13", cat: "Structural & Materials", q: "A steel tension member has Ag = 5.0 in² and Fy = 50 ksi. Its LRFD design strength for yielding (φ = 0.90) is:", choices: ["180 kips", "225 kips", "250 kips", "278 kips"], answer: 1, why: "φPn = φ Fy Ag = 0.90 × 50 × 5.0 = 225 kips. (Also check rupture on the net area in a real design.)" },
  { id: "sm14", cat: "Structural & Materials", q: "Using Ec = 57,000√f′c (psi), the modulus of normal-weight concrete with f′c = 4,000 psi is closest to:", choices: ["2,000 ksi", "3,600 ksi", "4,000 ksi", "29,000 ksi"], answer: 1, why: "Ec = 57,000 × √4000 = 57,000 × 63.2 = 3,605,000 psi ≈ 3,600 ksi." },

  // ── Transportation
  { id: "tr5", cat: "Transportation", q: "Using d = V²/[30(f ± G)] with V = 60 mi/h, f = 0.35 and a level road, the braking distance is closest to:", choices: ["171 ft", "257 ft", "343 ft", "514 ft"], answer: 2, why: "d = 60²/(30 × 0.35) = 3600/10.5 = 343 ft." },
  { id: "tr6", cat: "Transportation", q: "Traffic has a density of 40 veh/mi and a space-mean speed of 50 mi/h. The flow rate is:", choices: ["90 veh/h", "1,250 veh/h", "2,000 veh/h", "4,000 veh/h"], answer: 2, why: "q = k × v = 40 × 50 = 2,000 veh/h." },
  { id: "tr7", cat: "Transportation", q: "An hourly volume is 1,800 veh and the highest 15-minute count is 500 veh. The peak hour factor is:", choices: ["0.80", "0.90", "0.95", "1.11"], answer: 1, why: "PHF = V / (4 × V15,max) = 1800 / (4 × 500) = 0.90." },
  { id: "tr8", cat: "Transportation", q: "A horizontal curve has radius R = 1,000 ft and deflection angle Δ = 30°. Its length is closest to:", choices: ["268 ft", "500 ft", "524 ft", "1,047 ft"], answer: 2, why: "L = RΔ (radians) = 1000 × (30π/180) = 523.6 ft." },
  { id: "tr9", cat: "Transportation", q: "A vertical curve connects a +3% grade to a −2% grade. The curve is a:", choices: ["Sag curve with A = 1%", "Crest curve with A = 5%", "Sag curve with A = 5%", "Crest curve with A = 1%"], answer: 1, why: "Going uphill then downhill forms a crest. A = |g₂ − g₁| = |−2 − 3| = 5%." },
  { id: "tr10", cat: "Transportation", q: "Using e + f = V²/(15R), a 50 mi/h vehicle on a 1,000 ft radius curve requires e + f of about:", choices: ["0.033", "0.083", "0.167", "0.333"], answer: 2, why: "V²/(15R) = 2500/(15 × 1000) = 0.167." },
  { id: "tr11", cat: "Transportation", q: "For V = 60 mi/h, emax = 0.08 and f = 0.12, the minimum curve radius from R = V²/[15(e + f)] is:", choices: ["600 ft", "1,000 ft", "1,200 ft", "2,000 ft"], answer: 2, why: "R = 3600 / (15 × 0.20) = 3600/3 = 1,200 ft." },
  { id: "tr12", cat: "Transportation", q: "Level of Service (LOS) A on a highway describes:", choices: ["Free-flow conditions", "Stable flow near capacity", "Forced/breakdown flow", "Stopped traffic"], answer: 0, why: "LOS ranges from A (free flow, best) to F (breakdown, worst)." },

  // ── Surveying
  { id: "su5", cat: "Surveying", q: "An azimuth of 250° corresponds to a bearing of:", choices: ["S 20° W", "S 70° W", "N 70° W", "S 70° E"], answer: 1, why: "250° lies in the SW quadrant. Bearing angle = 250° − 180° = 70° → S 70° W." },
  { id: "su6", cat: "Surveying", q: "A traverse line is 100 ft long with an azimuth of 60°. Its departure (east–west component) is:", choices: ["50.0 ft", "57.7 ft", "86.6 ft", "100 ft"], answer: 2, why: "Departure = L sin(azimuth) = 100 sin 60° = 86.6 ft. Latitude = L cos(azimuth) = 50.0 ft." },
  { id: "su7", cat: "Surveying", q: "A closed traverse has ΣLatitudes = +0.30 ft and ΣDepartures = −0.40 ft. The linear error of closure is:", choices: ["0.10 ft", "0.35 ft", "0.50 ft", "0.70 ft"], answer: 2, why: "Error = √(0.30² + 0.40²) = √0.25 = 0.50 ft." },
  { id: "su8", cat: "Surveying", q: "A traverse with a 2,500 ft perimeter has a 0.50 ft linear misclosure. Its relative precision is:", choices: ["1:1,250", "1:2,500", "1:5,000", "1:50,000"], answer: 2, why: "Precision = 0.50/2500 = 1/5,000." },
  { id: "su9", cat: "Surveying", q: "On a topographic map, contour lines that are very close together indicate:", choices: ["Flat ground", "Steep slope", "A depression only", "A river"], answer: 1, why: "Close spacing means a large elevation change over a short distance, i.e. a steep slope." },
  { id: "su10", cat: "Surveying", q: "A BM has elevation 50.00 ft. The backsight on it is 3.20 ft and the foresight to point Q is 1.10 ft. The elevation of Q is:", choices: ["45.70 ft", "47.90 ft", "52.10 ft", "54.30 ft"], answer: 2, why: "HI = 50.00 + 3.20 = 53.20 ft. Elev Q = 53.20 − 1.10 = 52.10 ft." },

  // ── Economics & Ethics
  { id: "ec5", cat: "Economics & Ethics", q: "A $10,000 loan at 10% per year is repaid in 5 equal annual payments. Each payment is closest to:", choices: ["$2,000", "$2,200", "$2,638", "$3,000"], answer: 2, why: "A = P × i(1+i)ⁿ/[(1+i)ⁿ − 1] = 10,000 × 0.1 × 1.6105/0.6105 = 10,000 × 0.2638 = $2,638." },
  { id: "ec6", cat: "Economics & Ethics", q: "Equipment costs $50,000, has a salvage value of $10,000 and an 8-year life. Annual straight-line depreciation is:", choices: ["$5,000", "$6,250", "$7,500", "$10,000"], answer: 0, why: "D = (Cost − Salvage)/Life = (50,000 − 10,000)/8 = $5,000 per year." },
  { id: "ec7", cat: "Economics & Ethics", q: "A project has present-worth benefits of $1.5 M and present-worth costs of $1.2 M. Its B/C ratio and verdict are:", choices: ["0.80 — reject", "1.25 — acceptable", "0.30 — reject", "2.70 — acceptable"], answer: 1, why: "B/C = 1.5/1.2 = 1.25. A B/C ≥ 1.0 means the project is economically justified." },
  { id: "ec8", cat: "Economics & Ethics", q: "A nominal interest rate of 12% per year compounded monthly gives an effective annual rate of about:", choices: ["12.00%", "12.36%", "12.68%", "13.00%"], answer: 2, why: "i_eff = (1 + 0.12/12)¹² − 1 = 1.01¹² − 1 = 0.1268 = 12.68%." },
  { id: "ec9", cat: "Economics & Ethics", q: "A PE is asked to seal drawings that were not prepared under their direct supervisory control. The PE should:", choices: ["Seal them if the firm's owner asks", "Seal them after a quick review", "Refuse to seal them", "Seal them with a disclaimer"], answer: 2, why: "Engineers may only sign and seal work they prepared or directly supervised. Doing otherwise violates licensure law and the NSPE Code." },
  { id: "ec10", cat: "Economics & Ethics", q: "A contractor bidding on your project offers you free tickets to a major sporting event. You should:", choices: ["Accept, since it's small", "Accept but not tell anyone", "Decline the gift", "Accept if the contractor wins anyway"], answer: 2, why: "Engineers must not accept gifts or favors that could influence (or appear to influence) decisions on work they are responsible for." },
  { id: "ec11", cat: "Economics & Ethics", q: "The present worth of $1,000 per year for 3 years at 10% interest is closest to:", choices: ["$2,487", "$2,727", "$3,000", "$3,310"], answer: 0, why: "P = A × [1 − (1+i)⁻ⁿ]/i = 1000 × (0.9091 + 0.8264 + 0.7513) = $2,487." },

  // ── Construction
  { id: "co5", cat: "Construction", q: "Activities: A (3 d) precedes B (5 d) and C (4 d); both B and C precede D (2 d). The total float of activity C is:", choices: ["0 days", "1 day", "2 days", "4 days"], answer: 1, why: "Path A-B-D = 10 d (critical). Path A-C-D = 9 d. Float of C = 10 − 9 = 1 day." },
  { id: "co6", cat: "Construction", q: "100 yd³ of bank (in-place) soil has a 25% swell. The loose volume to haul is:", choices: ["75 yd³", "80 yd³", "125 yd³", "133 yd³"], answer: 2, why: "Loose volume = bank volume × (1 + swell) = 100 × 1.25 = 125 yd³." },
  { id: "co7", cat: "Construction", q: "An excavator's ideal output is 150 yd³/h. With a 50-minute working hour and an 8-hour shift, daily production is:", choices: ["900 yd³", "1,000 yd³", "1,200 yd³", "1,500 yd³"], answer: 1, why: "150 × (50/60) = 125 yd³/h × 8 h = 1,000 yd³/day." },
  { id: "co8", cat: "Construction", q: "In US practice, a #5 reinforcing bar has a nominal diameter of:", choices: ["0.5 in", "0.625 in", "0.75 in", "5 mm"], answer: 1, why: "US bar numbers (#3–#8) equal the diameter in eighths of an inch: #5 = 5/8 in = 0.625 in." },
  { id: "co9", cat: "Construction", q: "A contract that pays the contractor a fixed rate per measured quantity of work (e.g., per yd³) is a:", choices: ["Lump-sum contract", "Unit-price contract", "Cost-plus contract", "Design-build contract"], answer: 1, why: "Unit-price contracts pay the bid unit rate × actual measured quantities, which suits earthwork and paving with uncertain quantities." },
  { id: "co10", cat: "Construction", q: "Shop drawings, product data and samples sent by the contractor for the engineer's review are called:", choices: ["RFIs", "Submittals", "Change orders", "Addenda"], answer: 1, why: "Submittals show how the contractor intends to meet the design. Addenda are changes issued before bids close." },
  { id: "co11", cat: "Construction", q: "A crew of 4 workers at $30/h works an 8-hour day. The daily labor cost is:", choices: ["$240", "$480", "$960", "$1,200"], answer: 2, why: "4 × 8 h × $30/h = $960." },
  { id: "co12", cat: "Construction", q: "Under OSHA construction standards (Subpart M), fall protection is generally required at heights of:", choices: ["4 ft", "6 ft", "10 ft", "15 ft"], answer: 1, why: "In construction, fall protection is generally required at 6 ft or more above a lower level (general industry uses 4 ft)." },

  // ── Water & Environmental
  { id: "we4", cat: "Water & Environmental", q: "A 1,000 m³ tank receives a flow of 250 m³/h. The hydraulic detention time is:", choices: ["0.25 h", "2 h", "4 h", "25 h"], answer: 2, why: "t = V/Q = 1000/250 = 4 h." },
  { id: "we5", cat: "Water & Environmental", q: "A wastewater flow of 1,000 m³/day carries 200 mg/L of BOD. The daily BOD mass load is:", choices: ["2 kg/day", "20 kg/day", "200 kg/day", "2,000 kg/day"], answer: 2, why: "1 mg/L = 1 g/m³. Load = 1000 m³/d × 200 g/m³ = 200,000 g/d = 200 kg/day." },
  { id: "we6", cat: "Water & Environmental", q: "A clarifier with surface area 50 m² treats 1,000 m³/day. Its overflow (surface loading) rate is:", choices: ["0.05 m/day", "20 m³/m²·day", "50 m³/m²·day", "1,000 m³/m²·day"], answer: 1, why: "Overflow rate = Q/A = 1000/50 = 20 m³/m²·day (= 20 m/day)." },
  { id: "we7", cat: "Water & Environmental", q: "Water hardness is caused mainly by dissolved:", choices: ["Sodium and potassium", "Calcium and magnesium", "Iron and chlorine", "Nitrogen and phosphorus"], answer: 1, why: "Hardness comes from multivalent cations, mainly Ca²⁺ and Mg²⁺, usually expressed as mg/L CaCO₃." },
  { id: "we8", cat: "Water & Environmental", q: "In the NRCS (SCS) curve number method, a HIGHER curve number means:", choices: ["More infiltration, less runoff", "More runoff", "Longer time of concentration", "A larger watershed"], answer: 1, why: "CN ranges ~30–100. Higher CN (e.g., pavement ≈ 98) means less infiltration and more runoff." },
  { id: "we9", cat: "Water & Environmental", q: "The time of concentration of a watershed is the time for runoff to:", choices: ["Evaporate", "Travel from the hydraulically most distant point to the outlet", "Fill a detention pond", "Infiltrate 1 inch"], answer: 1, why: "Tc is the travel time from the hydraulically most remote point. In the rational method, rainfall intensity i is chosen for a duration = Tc." },
  { id: "we10", cat: "Water & Environmental", q: "A river (10 m³/s, 5 mg/L) receives a discharge (2 m³/s, 35 mg/L). The fully mixed concentration is:", choices: ["5 mg/L", "10 mg/L", "20 mg/L", "40 mg/L"], answer: 1, why: "C = (Q₁C₁ + Q₂C₂)/(Q₁ + Q₂) = (50 + 70)/12 = 10 mg/L." },
];
