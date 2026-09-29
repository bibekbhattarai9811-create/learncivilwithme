// The full self-study roadmap: phases → modules → tasks.
// Task ids must stay stable — progress is stored against them.
// Every link below was checked to load a real page (2026-09-28).

export type TaskKind = "learn" | "practice" | "build" | "milestone";

/** free = anyone, no account needed to pay; student = free with a student email/enrollment; paid = costs money */
export type Cost = "free" | "student" | "paid";

export type Resource = { label: string; url: string; cost: Cost; note?: string };

export type Task = {
  id: string;
  text: string;
  kind: TaskKind;
  hours?: number;
  links?: Resource[]; // exact places to do this task
};

export type Module = {
  id: string;
  title: string;
  why: string;
  concepts: string[]; // key ideas + formulas to master
  resources: Resource[]; // extra / alternative sources for the whole module
  tasks: Task[];
};

export type Phase = {
  id: string;
  num: number;
  title: string;
  when: string;
  goal: string;
  color: string; // tailwind text color class for accents
  modules: Module[];
};

const free = (label: string, url: string, note?: string): Resource => ({ label, url, cost: "free", note });
const nptel = (id: string, name: string) => free(`NPTEL: ${name} (video lectures)`, `https://nptel.ac.in/courses/${id}`);

const R = {
  // ── Math
  khanAlg1: free("Khan Academy: Algebra 1", "https://www.khanacademy.org/math/algebra"),
  khanAlg2: free("Khan Academy: Algebra 2", "https://www.khanacademy.org/math/algebra2"),
  khanTrig: free("Khan Academy: Trigonometry", "https://www.khanacademy.org/math/trigonometry"),
  khanPrecalc: free("Khan Academy: Precalculus", "https://www.khanacademy.org/math/precalculus"),
  khanCalc1: free("Khan Academy: Calculus 1", "https://www.khanacademy.org/math/calculus-1"),
  khanCalc2: free("Khan Academy: Calculus 2", "https://www.khanacademy.org/math/calculus-2"),
  khanMulti: free("Khan Academy: Multivariable Calculus", "https://www.khanacademy.org/math/multivariable-calculus"),
  khanLin: free("Khan Academy: Linear Algebra", "https://www.khanacademy.org/math/linear-algebra"),
  khanDE: free("Khan Academy: Differential Equations", "https://www.khanacademy.org/math/differential-equations"),
  khanStats: free("Khan Academy: Statistics & Probability", "https://www.khanacademy.org/math/statistics-probability"),
  khanPhys: free("Khan Academy: AP/College Physics 1", "https://www.khanacademy.org/science/ap-college-physics-1"),
  khanInterest: free("Khan Academy: Interest and debt", "https://www.khanacademy.org/economics-finance-domain/core-finance/interest-tutorial"),
  paulsAlg: free("Paul's Online Notes: Algebra", "https://tutorial.math.lamar.edu/Classes/Alg/Alg.aspx"),
  paulsAlgProb: free("Paul's Online Notes: Algebra practice problems", "https://tutorial.math.lamar.edu/Problems/Alg/Alg.aspx"),
  paulsCalc1: free("Paul's Online Notes: Calculus I", "https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx"),
  paulsCalc2: free("Paul's Online Notes: Calculus II", "https://tutorial.math.lamar.edu/Classes/CalcII/CalcII.aspx"),
  paulsCalc3: free("Paul's Online Notes: Calculus III", "https://tutorial.math.lamar.edu/Classes/CalcIII/CalcIII.aspx"),
  paulsCentroid: free("Paul's Online Notes: Center of Mass (centroids)", "https://tutorial.math.lamar.edu/Classes/CalcII/CenterOfMass.aspx"),
  paulsCross: free("Paul's Online Notes: Cross Product", "https://tutorial.math.lamar.edu/Classes/CalcII/CrossProduct.aspx"),
  paulsDE: free("Paul's Online Notes: Differential Equations", "https://tutorial.math.lamar.edu/Classes/DE/DE.aspx"),
  osAlgTrig: free("OpenStax: Algebra and Trigonometry 2e (free textbook)", "https://openstax.org/details/books/algebra-and-trigonometry-2e"),
  osCalc1: free("OpenStax: Calculus Vol. 1 (free textbook)", "https://openstax.org/details/books/calculus-volume-1"),
  osCalc2: free("OpenStax: Calculus Vol. 2 (free textbook)", "https://openstax.org/details/books/calculus-volume-2"),
  osCalc3: free("OpenStax: Calculus Vol. 3 (free textbook)", "https://openstax.org/details/books/calculus-volume-3"),
  osStats: free("OpenStax: Introductory Statistics 2e (free textbook)", "https://openstax.org/details/books/introductory-statistics-2e"),
  osPhys: free("OpenStax: University Physics Vol. 1 (free textbook)", "https://openstax.org/details/books/university-physics-volume-1"),
  mit1801: free("MIT 18.01SC Single Variable Calculus", "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/"),
  mit1806: free("MIT 18.06SC Linear Algebra (Gilbert Strang)", "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/"),
  mit1803: free("MIT 18.03SC Differential Equations", "https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/"),
  mit801: free("MIT 8.01SC Classical Mechanics", "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/"),
  mit1151: free("MIT 1.151 Probability & Statistics in Engineering", "https://ocw.mit.edu/courses/1-151-probability-and-statistics-in-engineering-spring-2005/"),
  b1bLin: free("3Blue1Brown: Essence of Linear Algebra (videos)", "https://www.3blue1brown.com/topics/linear-algebra"),
  b1bCalc: free("3Blue1Brown: Essence of Calculus (videos)", "https://www.3blue1brown.com/topics/calculus"),

  // ── Engineering fundamentals
  statics: free("Engineering Statics: Open and Interactive (free textbook)", "https://engineeringstatics.org/"),
  mechMap: free("Mechanics Map: statics, dynamics & materials (free)", "https://mechanicsmap.psu.edu/"),
  nptelSOM: nptel("105105108", "Strength of Materials, IIT Kharagpur"),
  nptelMoM: nptel("105106172", "Mechanics of Materials, IIT Madras"),
  mit2001: free("MIT 2.001 Mechanics & Materials I", "https://ocw.mit.edu/courses/2-001-mechanics-materials-i-fall-2006/"),
  nptelFluids: nptel("105103192", "Fluid Mechanics, IIT Guwahati"),
  barMeir: free("Fluid Mechanics by Bar-Meir (free textbook)", "https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fluid_Mechanics_(Bar-Meir)"),
  mit206: free("MIT 2.06 Fluid Dynamics", "https://ocw.mit.edu/courses/2-06-fluid-dynamics-spring-2013/"),
  nptelMaterials: nptel("105106206", "Basic Construction Materials, IIT Madras"),
  nptelConcreteTech: nptel("105102012", "Concrete Technology, IIT Delhi"),
  pavement: free("Pavement Interactive: asphalt & pavement guide (free)", "https://pavementinteractive.org/"),
  mit1011: free("MIT 1.011 Project Evaluation (engineering economics)", "https://ocw.mit.edu/courses/1-011-project-evaluation-spring-2011/"),
  nspe: free("NSPE Code of Ethics for Engineers", "https://www.nspe.org/career-growth/ethics/code-ethics"),

  // ── Civil core
  udoeyo: free("Structural Analysis by Udoeyo (free textbook)", "https://eng.libretexts.org/Bookshelves/Civil_Engineering/Structural_Analysis_(Udoeyo)"),
  nptelSA1: nptel("105101085", "Structural Analysis I, IIT Bombay"),
  nptelSA2: nptel("105101086", "Structural Analysis II, IIT Bombay"),
  nptelMatrix: nptel("105105180", "Matrix Method of Structural Analysis, IIT Kharagpur"),
  mit1054: free("MIT 1.054 Mechanics & Design of Concrete Structures", "https://ocw.mit.edu/courses/1-054-mechanics-and-design-of-concrete-structures-spring-2004/"),
  nptelRC: {
    ...nptel("105105105", "Design of Reinforced Concrete Structures, IIT Kharagpur"),
    note: "Uses the Indian code (IS 456). The theory is identical; US design uses ACI 318 factors.",
  },
  aisc: free("AISC 360 Steel Specification (free PDF download)", "https://www.aisc.org/aisc/publications/current-standards/", "Free download after a free AISC account"),
  nptelSteel: {
    ...nptel("105105162", "Design of Steel Structures, IIT Kharagpur"),
    note: "Uses the Indian code (IS 800). Same principles as AISC.",
  },
  verruijt: free("Soil Mechanics by Arnold Verruijt (free PDF book)", "https://geo.verruijt.net/software/SoilMechBook2012.pdf"),
  nptelSoil: nptel("105105168", "Soil Mechanics / Geotechnical Engineering I, IIT Kharagpur"),
  foundation: free("Fundamentals of Foundation Engineering (free textbook)", "https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Foundation_Engineering_and_their_Applications_2e"),
  nptelFoundation: nptel("105105176", "Foundation Engineering, IIT Kharagpur"),
  nptelHydrology: nptel("105103213", "Engineering Hydrology, IIT Guwahati"),
  nptelHydraulics: nptel("105103096", "Hydraulics, IIT Guwahati"),
  hec22: free("FHWA HEC-22 Urban Drainage Design Manual (free PDF, US standard)", "https://www.fhwa.dot.gov/engineering/hydraulics/pubs/10009/10009.pdf"),
  usgs: free("USGS Water Science School", "https://www.usgs.gov/water-science-school"),
  hec: free("USACE HEC-RAS / HEC-HMS (free hydraulics software)", "https://www.hec.usace.army.mil/software/"),
  mit185: free("MIT 1.85 Water & Wastewater Treatment Engineering", "https://ocw.mit.edu/courses/1-85-water-and-wastewater-treatment-engineering-spring-2006/"),
  nptelWater: nptel("105105201", "Water Supply Engineering, IIT Kharagpur"),
  nptelWaste: nptel("105105048", "Wastewater Management, IIT Kharagpur"),
  fot: free("Fundamentals of Transportation (free textbook)", "https://eng.libretexts.org/Bookshelves/Civil_Engineering/Fundamentals_of_Transportation"),
  nptelTrans: nptel("105101087", "Transportation Engineering I, IIT Bombay"),
  nptelGeometric: nptel("105107220", "Geometric Design of Highways, IIT Roorkee"),
  nptelTraffic: nptel("105101008", "Traffic Engineering & Management, IIT Bombay"),
  nptelSurvey: nptel("105104101", "Surveying, IIT Kanpur"),
  nptelSurvey2: nptel("105107122", "Surveying, IIT Roorkee"),
  pmBook: free("Project Management for Construction (free textbook)", "https://ecampusontario.pressbooks.pub/projectmanagementforconstructionanddeconstruction/"),
  mit1040: free("MIT 1.040 Project Management", "https://ocw.mit.edu/courses/1-040-project-management-spring-2009/"),
  nptelCPM: nptel("105103093", "Construction Planning and Management, IIT Guwahati"),
  nptelSafety: nptel("105102206", "Safety in Construction, IIT Delhi"),

  // ── Software
  autodesk: {
    label: "Autodesk Education: AutoCAD, Civil 3D, Revit",
    url: "https://www.autodesk.com/education/edu-software/overview",
    cost: "student",
    note: "Free for 1 year (renewable) if you're an enrolled student. Otherwise AutoCAD costs roughly $2,000/yr.",
  } satisfies Resource,
  librecad: free("LibreCAD: free 2D CAD (AutoCAD alternative)", "https://librecad.org/"),
  freecad: free("FreeCAD: free 3D/BIM modeler (Revit alternative)", "https://www.freecad.org/"),
  bimBook: free("Building Information: BIM fundamentals (free textbook)", "https://eng.libretexts.org/Bookshelves/Civil_Engineering/Building_Information_-_Representation_and_Management_-_Fundamentals_and_Principles_(Koutamanis)"),
  libreoffice: free("LibreOffice Calc: free spreadsheet (Excel alternative)", "https://www.libreoffice.org/", "Google Sheets also works free"),
  ftool: free("Ftool: free 2D frame analysis program", "https://www.ftool.com.br/"),
  opensees: free("OpenSees: free structural/earthquake analysis", "https://opensees.berkeley.edu/"),
  python: free("Official Python tutorial", "https://docs.python.org/3/tutorial/"),
  qgis: free("QGIS: free GIS software", "https://qgis.org/"),
  projectlibre: free("ProjectLibre: free scheduling (MS Project alternative)", "https://www.projectlibre.com/"),

  // ── Career, exams, licensing
  bls: free("US Bureau of Labor Statistics: Civil Engineers", "https://www.bls.gov/ooh/architecture-and-engineering/civil-engineers.htm"),
  boards: free("NCEES: find your state licensing board", "https://ncees.org/licensing-boards/"),
  ncees: free("NCEES FE exam page (FE Reference Handbook is free)", "https://ncees.org/exams/fe-exam/"),
  myncees: free("MyNCEES account (free sign-up)", "https://account.ncees.org/"),
  nceesPe: free("NCEES PE exam page", "https://ncees.org/exams/pe-exam/"),
  abet: free("ABET accredited program search", "https://amspub.abet.org/aps/name-search"),
  asce: { label: "ASCE membership", url: "https://www.asce.org/membership", cost: "student", note: "Free for students; paid for others" } satisfies Resource,
  osha: { label: "OSHA Outreach Training (10/30-hour card)", url: "https://www.osha.gov/training/outreach", cost: "paid", note: "Roughly $60–$200 from an authorized trainer" } satisfies Resource,
  aci: { label: "ACI certification programs", url: "https://www.concrete.org/certification.aspx", cost: "paid", note: "Fee set by local ACI chapter; employers often pay" } satisfies Resource,
  nicet: { label: "NICET technician certification", url: "https://www.nicet.org/", cost: "paid", note: "Application & exam fees; employers often pay" } satisfies Resource,
} satisfies Record<string, Resource>;

export const PHASES: Phase[] = [
  {
    id: "orientation",
    num: 0,
    title: "Orientation & Setup",
    when: "Week 1",
    goal: "Understand the job, the licensing path, and set up a study system you'll actually stick to.",
    color: "text-sky-400",
    modules: [
      {
        id: "o-field",
        title: "What civil engineers actually do",
        why: "Knowing the sub-disciplines helps you choose where to focus later.",
        concepts: [
          "Five main areas (these are also the PE Civil exam areas): Structural, Geotechnical, Transportation, Water Resources & Environmental, Construction.",
          "Engineer vs technician: engineers design and take legal responsibility (they sign and seal drawings). Technicians draft, test, inspect, and survey.",
          "In the US, the legal title 'Professional Engineer (PE)' is granted by each state board, not by a school.",
        ],
        resources: [R.asce],
        tasks: [
          { id: "o1", text: "Read about the job and each of the 5 sub-disciplines; write 2 sentences on which interests you most", kind: "learn", hours: 2, links: [R.bls] },
          { id: "o2", text: "Look up your state board's PE requirements (degree + experience rules) and save the link", kind: "milestone", hours: 1, links: [R.boards] },
          { id: "o3", text: "Browse the free MIT and NPTEL civil course catalogs so you know what's available", kind: "learn", hours: 1, links: [free("NPTEL course catalog (filter: Civil Engineering)", "https://nptel.ac.in/courses")] },
        ],
      },
      {
        id: "o-system",
        title: "Build your study system",
        why: "Self-study fails without structure. Consistency beats intensity.",
        concepts: [
          "Target 15–20 hours/week. Two hours on weekdays + one longer weekend block.",
          "Rule: 1/3 watching or reading, 2/3 solving problems. Engineering is learned with a pencil.",
          "Keep one notebook per subject and a 'formula sheet' you rewrite from memory each week.",
        ],
        resources: [],
        tasks: [
          { id: "o4", text: "Set your weekly hours goal on the Study Log page", kind: "milestone" },
          { id: "o5", text: "Get an FE-approved scientific calculator (e.g., TI-36X Pro or Casio fx-115ES PLUS, about $20) — see the calculator policy on the FE page", kind: "milestone", links: [R.ncees] },
          { id: "o6", text: "Create a free MyNCEES account and download the free FE Reference Handbook (you'll use it for years)", kind: "milestone", hours: 1, links: [R.myncees] },
        ],
      },
    ],
  },
  {
    id: "math",
    num: 1,
    title: "Math Foundations",
    when: "Months 1–4",
    goal: "Build the math every later subject depends on. Don't rush this phase.",
    color: "text-violet-400",
    modules: [
      {
        id: "m-alg",
        title: "Algebra & Trigonometry",
        why: "Every engineering calculation is algebra. Trig resolves forces into components.",
        concepts: [
          "Solving linear & quadratic equations; quadratic formula x = (−b ± √(b²−4ac)) / 2a",
          "Systems of equations (2–3 unknowns): substitution and elimination",
          "Exponents, logarithms, and unit-consistent rearranging of formulas",
          "SOH-CAH-TOA; Fx = F cos θ, Fy = F sin θ",
          "Law of sines & law of cosines (surveying & truss geometry)",
          "Radians vs degrees; π rad = 180°",
        ],
        resources: [R.osAlgTrig, R.khanPrecalc],
        tasks: [
          { id: "m1", text: "Complete Khan Academy Algebra 1 and Algebra 2 (pass each unit test)", kind: "learn", hours: 30, links: [R.khanAlg1, R.khanAlg2, R.paulsAlg] },
          { id: "m2", text: "Complete Khan Academy Trigonometry, including law of sines/cosines", kind: "learn", hours: 15, links: [R.khanTrig] },
          { id: "m3", text: "Solve 50 word problems where you build the equation yourself", kind: "practice", hours: 10, links: [R.paulsAlgProb] },
        ],
      },
      {
        id: "m-calc1",
        title: "Calculus I & II",
        why: "Derivatives give slopes and rates (deflection, flow). Integrals give areas, centroids, and moments of inertia.",
        concepts: [
          "Limits and derivatives: power, product, quotient, chain rule",
          "Maxima/minima: set f′(x) = 0 (e.g., where bending moment is maximum, shear V = 0)",
          "Integrals: area under a curve, ∫xⁿ dx = xⁿ⁺¹/(n+1)",
          "Centroid x̄ = ∫x dA / ∫dA; moment of inertia I = ∫y² dA",
          "Series and Taylor approximations (used in numerical methods)",
        ],
        resources: [R.b1bCalc, R.osCalc1, R.osCalc2, R.mit1801],
        tasks: [
          { id: "m4", text: "Finish Calculus 1 (limits, derivatives, applications)", kind: "learn", hours: 45, links: [R.khanCalc1, R.paulsCalc1] },
          { id: "m5", text: "Finish Calculus 2 (integration techniques, applications, series)", kind: "learn", hours: 45, links: [R.khanCalc2, R.paulsCalc2] },
          { id: "m6", text: "Derive the centroid and I of a rectangle and a triangle using integrals", kind: "practice", hours: 3, links: [R.paulsCentroid] },
        ],
      },
      {
        id: "m-calc3",
        title: "Multivariable Calculus",
        why: "Needed for fluids, stress in 3D, and understanding the derivations in textbooks.",
        concepts: [
          "Partial derivatives and gradients",
          "Double & triple integrals (areas, volumes, mass)",
          "Vectors: dot product (work, projections), cross product (moments M = r × F)",
        ],
        resources: [R.osCalc3],
        tasks: [
          { id: "m7", text: "Complete vectors, partial derivatives and multiple integrals", kind: "learn", hours: 35, links: [R.khanMulti, R.paulsCalc3] },
          { id: "m8", text: "Compute 10 moments using the cross product M = r × F", kind: "practice", hours: 3, links: [R.paulsCross] },
        ],
      },
      {
        id: "m-linalg",
        title: "Linear Algebra",
        why: "Structural analysis software solves [K]{d} = {F} — huge systems of linear equations.",
        concepts: [
          "Matrices, determinants, inverses",
          "Solving Ax = b with Gaussian elimination",
          "Eigenvalues/eigenvectors (vibration modes of buildings)",
        ],
        resources: [R.khanLin],
        tasks: [
          { id: "m9", text: "Watch the Essence of Linear Algebra series (all chapters)", kind: "learn", hours: 4, links: [R.b1bLin] },
          { id: "m10", text: "Work through MIT 18.06SC problem sets 1–5 (solutions included)", kind: "practice", hours: 25, links: [R.mit1806] },
        ],
      },
      {
        id: "m-de",
        title: "Differential Equations",
        why: "Beam deflection (EI y″ = M), consolidation of soils, and flow are all differential equations.",
        concepts: [
          "First-order ODEs: separable and linear",
          "Second-order linear ODEs with constant coefficients",
          "Beam equation: EI d²y/dx² = M(x) — integrate twice with boundary conditions",
        ],
        resources: [R.mit1803],
        tasks: [
          { id: "m11", text: "Complete first- and second-order ODE units", kind: "learn", hours: 35, links: [R.khanDE, R.paulsDE] },
          { id: "m12", text: "Derive the deflection of a cantilever with end load by integrating EI y″ = M", kind: "practice", hours: 2, links: [R.mechMap] },
        ],
      },
      {
        id: "m-stats",
        title: "Probability & Statistics",
        why: "Material strength testing, load factors, traffic, and rainfall are all statistical. It's also on the FE.",
        concepts: [
          "Mean, median, mode, standard deviation, variance",
          "Normal distribution, z-scores, confidence intervals",
          "Linear regression and correlation",
          "Probability: combinations, independent events, binomial distribution",
        ],
        resources: [R.mit1151],
        tasks: [
          { id: "m13", text: "Complete statistics & probability (OpenStax chapters 1–7 and 12 cover the same)", kind: "learn", hours: 30, links: [R.khanStats, R.osStats] },
          { id: "m14", text: "Analyze a set of 30 concrete cylinder test results (mean, std dev) in a spreadsheet", kind: "practice", hours: 2, links: [R.libreoffice] },
        ],
      },
    ],
  },
  {
    id: "fundamentals",
    num: 2,
    title: "Engineering Fundamentals",
    when: "Months 4–8",
    goal: "Master the engineering science core. Statics and Mechanics of Materials are the most important courses you will take.",
    color: "text-amber-400",
    modules: [
      {
        id: "f-phys",
        title: "Physics: Mechanics",
        why: "Newton's laws are the foundation of every structural and fluid calculation.",
        concepts: [
          "Newton's laws: ΣF = ma; for statics ΣF = 0",
          "Work, energy, power; conservation of energy",
          "Momentum and impulse",
          "Units: SI (N, m, Pa) and US customary (lb, ft, psi, kip = 1000 lb)",
        ],
        resources: [R.mit801],
        tasks: [
          { id: "f1", text: "Complete physics mechanics (OpenStax chapters 1–11 as your textbook)", kind: "learn", hours: 40, links: [R.khanPhys, R.osPhys] },
          { id: "f2", text: "Solve 40 end-of-chapter problems (mixed SI and US units)", kind: "practice", hours: 15, links: [R.osPhys] },
        ],
      },
      {
        id: "f-statics",
        title: "Statics ★",
        why: "The single most important subject. Every structure is designed by first finding the forces in it.",
        concepts: [
          "Free-body diagrams — always draw one first",
          "Equilibrium: ΣFx = 0, ΣFy = 0, ΣM = 0",
          "Supports: pin (2 reactions), roller (1), fixed (3)",
          "Trusses: method of joints and method of sections",
          "Distributed loads → equivalent point load at the centroid",
          "Centroids, moment of inertia, parallel axis theorem I = Ī + Ad²",
          "Friction: F ≤ μN",
          "Shear and bending moment diagrams (dV/dx = −w, dM/dx = V)",
        ],
        resources: [],
        tasks: [
          { id: "f3", text: "Read Engineering Statics chapters 1–10 (free, interactive)", kind: "learn", hours: 40, links: [R.statics] },
          { id: "f4", text: "Solve 100 statics problems (FBD drawn for every single one)", kind: "practice", hours: 40, links: [R.statics, R.mechMap] },
          { id: "f5", text: "Analyze a 7-member truss by hand, then check it in Ftool", kind: "practice", hours: 3, links: [R.ftool] },
          { id: "f6", text: "Draw shear & moment diagrams for 20 beams; check them with this site's Beam Calculator", kind: "practice", hours: 8, links: [R.mechMap] },
        ],
      },
      {
        id: "f-dyn",
        title: "Dynamics",
        why: "Tested on the FE, and the basis for earthquake and vibration engineering.",
        concepts: [
          "Kinematics: v = v₀ + at, s = v₀t + ½at², v² = v₀² + 2as",
          "Projectile & curvilinear motion",
          "Kinetics: F = ma, work-energy, impulse-momentum",
          "Simple vibration: natural frequency ω = √(k/m)",
        ],
        resources: [R.osPhys],
        tasks: [
          { id: "f7", text: "Study particle kinematics and kinetics", kind: "learn", hours: 25, links: [R.mechMap, R.mit801] },
          { id: "f8", text: "Solve 40 dynamics problems", kind: "practice", hours: 15, links: [R.mechMap] },
        ],
      },
      {
        id: "f-mom",
        title: "Mechanics of Materials ★",
        why: "Tells you whether a member is strong and stiff enough. Directly used in every design.",
        concepts: [
          "Stress σ = P/A; strain ε = δ/L; Hooke's law σ = Eε",
          "Axial deformation δ = PL/(AE)",
          "Bending stress σ = Mc/I = M/S",
          "Shear stress in beams τ = VQ/(Ib)",
          "Torsion τ = Tr/J",
          "Deflection of beams (e.g., simply supported UDL: 5wL⁴/384EI)",
          "Column buckling: Pcr = π²EI/(KL)²",
          "Mohr's circle, principal stresses",
          "Thermal strain ε = αΔT",
        ],
        resources: [R.nptelMoM],
        tasks: [
          { id: "f9", text: "Complete a full Mechanics of Materials course", kind: "learn", hours: 50, links: [R.nptelSOM, R.mit2001] },
          { id: "f10", text: "Solve 100 problems covering all concept bullets above", kind: "practice", hours: 40, links: [R.mechMap] },
          { id: "f11", text: "Build a spreadsheet that checks a rectangular timber beam for bending, shear and deflection", kind: "build", hours: 4, links: [R.libreoffice] },
        ],
      },
      {
        id: "f-fluids",
        title: "Fluid Mechanics",
        why: "The base for hydraulics, hydrology, water supply and drainage design.",
        concepts: [
          "Hydrostatic pressure p = γh (γ water = 62.4 lb/ft³ = 9.81 kN/m³)",
          "Buoyancy, forces on submerged surfaces",
          "Continuity Q = A₁V₁ = A₂V₂",
          "Bernoulli's equation and energy equation with head loss",
          "Pipe flow: Reynolds number, Darcy-Weisbach h_f = f(L/D)(V²/2g), Hazen-Williams",
          "Open channel: Manning's equation",
        ],
        resources: [R.mit206],
        tasks: [
          { id: "f12", text: "Complete a Fluid Mechanics course", kind: "learn", hours: 40, links: [R.nptelFluids, R.barMeir] },
          { id: "f13", text: "Solve 60 fluid mechanics problems", kind: "practice", hours: 25, links: [R.barMeir] },
        ],
      },
      {
        id: "f-mat",
        title: "Engineering Materials",
        why: "You must know how concrete, steel, wood, asphalt and soil behave.",
        concepts: [
          "Stress-strain curve: elastic, yield, ultimate, ductility",
          "Concrete: f′c at 28 days, water-cement ratio ↓ ⇒ strength ↑, curing, slump test",
          "Steel: A992 (Fy = 50 ksi) for shapes, Grade 60 rebar (fy = 60 ksi), E = 29,000 ksi",
          "Aggregates: gradation, specific gravity, absorption",
          "Asphalt binder and mix basics; wood species and grades",
        ],
        resources: [R.pavement],
        tasks: [
          { id: "f14", text: "Study a construction materials course", kind: "learn", hours: 25, links: [R.nptelMaterials, R.nptelConcreteTech] },
          { id: "f15", text: "Learn the slump, cylinder compression, and sieve analysis tests; write the procedure for each", kind: "learn", hours: 3, links: [R.nptelConcreteTech, R.pavement] },
        ],
      },
      {
        id: "f-econ",
        title: "Engineering Economics & Ethics",
        why: "Engineers choose between alternatives on cost. Ethics and economics are both on the FE.",
        concepts: [
          "Time value of money: F = P(1+i)ⁿ, P = F/(1+i)ⁿ",
          "Annuities (A/P, P/A factors), present worth, annual worth",
          "Benefit-cost ratio, break-even, depreciation (straight line)",
          "NSPE Code: public safety, health and welfare come first",
        ],
        resources: [],
        tasks: [
          { id: "f16", text: "Learn interest and the time value of money, then use the FE handbook interest tables", kind: "learn", hours: 12, links: [R.khanInterest, R.mit1011] },
          { id: "f17", text: "Read the NSPE Code of Ethics carefully (it's tested on the FE)", kind: "learn", hours: 3, links: [R.nspe] },
        ],
      },
    ],
  },
  {
    id: "software",
    num: 3,
    title: "Drawing & Software Skills",
    when: "Months 2–12 (in parallel)",
    goal: "Get job-ready skills early. Software skills are how you get hired before you're licensed.",
    color: "text-emerald-400",
    modules: [
      {
        id: "s-draw",
        title: "Technical Drawing & Reading Plans",
        why: "You must read construction drawings fluently before you can produce them.",
        concepts: [
          "Orthographic projection: plan, elevation, section",
          "Scales: 1/4\" = 1'-0\", 1\" = 20' (civil), 1:100 (metric)",
          "Plan sheet order: G (general), C (civil), S (structural), A, M, E, P",
          "Symbols, line types, dimensioning, title blocks, revision clouds",
        ],
        resources: [],
        tasks: [
          { id: "s1", text: "Download a free public-bid plan set from your city or state DOT website and identify every sheet type", kind: "practice", hours: 4 },
          { id: "s2", text: "Hand-sketch plan, elevation and section of your own room to scale", kind: "practice", hours: 3 },
        ],
      },
      {
        id: "s-cad",
        title: "AutoCAD",
        why: "The #1 required skill in entry-level civil job postings.",
        concepts: [
          "Layers, blocks, xrefs, dimension styles",
          "Model space vs paper space, viewports, plotting to scale",
          "Precision drawing: object snaps, coordinates, polar tracking",
        ],
        resources: [R.librecad],
        tasks: [
          { id: "s3", text: "Install AutoCAD with your free student license (or LibreCAD if not eligible) and complete a beginner course", kind: "learn", hours: 25, links: [R.autodesk, R.librecad] },
          { id: "s4", text: "Redraw 3 sheets from a real plan set to scale with proper layers", kind: "build", hours: 15 },
          {
            id: "s5",
            text: "Optional: earn the Autodesk Certified Professional: AutoCAD credential (paid exam)",
            kind: "milestone",
            links: [{ label: "Autodesk certification", url: "https://www.autodesk.com/certification/overview", cost: "paid", note: "Exam fee; not required — a portfolio proves the same skill for free" }],
          },
        ],
      },
      {
        id: "s-excel",
        title: "Spreadsheets for Engineers",
        why: "Most design calcs in real offices live in spreadsheets.",
        concepts: [
          "Named ranges, absolute references, data validation",
          "IF, LOOKUP/XLOOKUP, Goal Seek, Solver",
          "Charts for test data; clean, checkable calculation layout",
        ],
        resources: [],
        tasks: [{ id: "s6", text: "Build a reusable calc sheet template (inputs / calcs / outputs / checks)", kind: "build", hours: 5, links: [R.libreoffice] }],
      },
      {
        id: "s-civil3d",
        title: "Civil 3D",
        why: "The standard for roads, grading, drainage and site design.",
        concepts: ["Surfaces from survey points, contours", "Alignments, profiles, corridors", "Grading, pipe networks, quantity takeoff"],
        resources: [],
        tasks: [
          { id: "s7", text: "Install Civil 3D (free student license) and complete its built-in tutorials", kind: "learn", hours: 30, links: [R.autodesk] },
          { id: "s8", text: "Model a small road: surface, alignment, profile, corridor, earthwork volumes", kind: "build", hours: 15 },
        ],
      },
      {
        id: "s-revit",
        title: "Revit / BIM",
        why: "Building projects are delivered in BIM. Structural offices use Revit daily.",
        concepts: ["Families, levels, grids", "Structural framing, foundations, rebar basics", "Sheets and schedules"],
        resources: [R.bimBook],
        tasks: [
          { id: "s9", text: "Model a 2-storey building structure in Revit (student license) or FreeCAD BIM and produce sheets", kind: "build", hours: 25, links: [R.autodesk, R.freecad] },
        ],
      },
      {
        id: "s-analysis",
        title: "Structural Analysis Software",
        why: "Used for any real structure. You must be able to check its output by hand.",
        concepts: [
          "Nodes, members, releases, supports",
          "Load cases & load combinations (ASCE 7)",
          "Always verify software output with a hand calc",
          "Commercial tools (SAP2000, ETABS, RISA) are expensive — learn the concepts on free tools; employers provide licenses",
        ],
        resources: [R.opensees],
        tasks: [{ id: "s10", text: "Model a portal frame in Ftool and verify the reactions by hand", kind: "build", hours: 10, links: [R.ftool] }],
      },
      {
        id: "s-code",
        title: "Python & GIS",
        why: "Automating calcs and working with maps makes you stand out. You already code — use it.",
        concepts: [
          "Python: numpy, pandas, matplotlib for engineering data",
          "QGIS: layers, DEMs, watershed delineation",
          "HEC-RAS / HEC-HMS for hydraulics & hydrology (free from USACE)",
        ],
        resources: [R.hec, R.projectlibre],
        tasks: [
          { id: "s11", text: "Write a Python script that computes beam reactions and moments and plots the diagrams", kind: "build", hours: 6, links: [R.python] },
          { id: "s12", text: "Delineate a watershed from a DEM in QGIS", kind: "build", hours: 6, links: [R.qgis] },
        ],
      },
    ],
  },
  {
    id: "core",
    num: 4,
    title: "Civil Engineering Core",
    when: "Months 8–20",
    goal: "Learn the actual civil design subjects covered in the FE Civil and PE Civil exams.",
    color: "text-orange-400",
    modules: [
      {
        id: "c-sa",
        title: "Structural Analysis",
        why: "Find forces in real structures: indeterminate beams, frames and trusses.",
        concepts: [
          "Determinacy & stability",
          "Influence lines (moving loads on bridges)",
          "Deflection: virtual work, moment-area",
          "Indeterminate analysis: force method, slope-deflection, moment distribution",
          "Intro to the stiffness (matrix) method",
          "Loads per ASCE 7: dead, live, snow, wind, seismic; LRFD combos e.g. 1.2D + 1.6L",
        ],
        resources: [R.nptelMatrix],
        tasks: [
          { id: "c1", text: "Read the free Structural Analysis textbook alongside the NPTEL video lectures", kind: "learn", hours: 60, links: [R.udoeyo, R.nptelSA1, R.nptelSA2] },
          { id: "c2", text: "Solve 60 problems (end-of-chapter), including 10 with moment distribution", kind: "practice", hours: 30, links: [R.udoeyo] },
        ],
      },
      {
        id: "c-rc",
        title: "Reinforced Concrete Design (ACI 318)",
        why: "Concrete is the most-used construction material on Earth.",
        concepts: [
          "Whitney stress block: a = As·fy / (0.85 f′c b)",
          "Flexural strength φMn = φ As fy (d − a/2), φ = 0.9 for tension-controlled",
          "Shear: φVc + φVs, stirrup spacing",
          "Slabs one-way/two-way, columns (interaction diagrams), footings",
          "Development length, cover, minimum steel",
          "ACI 318 itself is paid — but the FE Handbook contains every ACI equation you need for the FE, free",
        ],
        resources: [R.nptelRC],
        tasks: [
          { id: "c3", text: "Study reinforced concrete design (MIT lecture notes + NPTEL videos)", kind: "learn", hours: 60, links: [R.mit1054, R.nptelRC] },
          { id: "c4", text: "Design a simply supported RC beam end-to-end: loads → flexure → shear → deflection", kind: "practice", hours: 6, links: [R.mit1054] },
        ],
      },
      {
        id: "c-steel",
        title: "Steel Design (AISC 360)",
        why: "Steel frames, bridges and industrial structures.",
        concepts: [
          "Tension members: yielding and rupture",
          "Compression members: KL/r, AISC column curves",
          "Beams: Zx, lateral-torsional buckling (Lb, Lp, Lr)",
          "Bolted and welded connections",
          "The AISC 360 Specification is a free download; the full Steel Manual (shape tables) is paid",
        ],
        resources: [R.nptelSteel],
        tasks: [
          { id: "c5", text: "Study steel design: read AISC 360 chapters D, E, F with the NPTEL lectures", kind: "learn", hours: 50, links: [R.aisc, R.nptelSteel] },
          { id: "c6", text: "Design a W-shape floor beam and a column for a small building bay", kind: "practice", hours: 6, links: [R.aisc] },
        ],
      },
      {
        id: "c-geo",
        title: "Geotechnical Engineering",
        why: "Every structure sits on soil. Most failures start in the ground.",
        concepts: [
          "Phase relationships: e, n, w, S, γ — Se = wGs",
          "Classification: USCS & AASHTO, Atterberg limits",
          "Effective stress σ′ = σ − u",
          "Compaction (Proctor), permeability (Darcy v = ki)",
          "Consolidation settlement, shear strength (Mohr-Coulomb τ = c + σ′ tan φ)",
          "Bearing capacity (Terzaghi), lateral earth pressure (Rankine), slope stability",
        ],
        resources: [R.nptelFoundation],
        tasks: [
          { id: "c7", text: "Study soil mechanics: Verruijt's free book + NPTEL lectures", kind: "learn", hours: 50, links: [R.verruijt, R.nptelSoil] },
          { id: "c8", text: "Solve 50 soil mechanics problems", kind: "practice", hours: 25, links: [R.verruijt] },
          { id: "c9", text: "Design a spread footing for a column load (bearing + settlement check)", kind: "practice", hours: 4, links: [R.foundation] },
        ],
      },
      {
        id: "c-water",
        title: "Hydraulics, Hydrology & Environmental",
        why: "Stormwater, water supply and wastewater are a huge share of civil work.",
        concepts: [
          "Rational method Q = CiA; SCS curve number method",
          "Hydrographs, detention pond sizing",
          "Manning's equation for channels & storm sewers",
          "Water treatment: coagulation, sedimentation, filtration, disinfection",
          "Wastewater: BOD, activated sludge",
        ],
        resources: [R.usgs, R.hec, R.nptelWaste],
        tasks: [
          { id: "c10", text: "Study hydrology & hydraulic engineering", kind: "learn", hours: 40, links: [R.nptelHydrology, R.nptelHydraulics] },
          { id: "c11", text: "Study water & wastewater treatment basics", kind: "learn", hours: 25, links: [R.mit185, R.nptelWater] },
          { id: "c12", text: "Size a storm sewer for a small parking lot using the rational method and Manning (US method)", kind: "practice", hours: 4, links: [R.hec22] },
        ],
      },
      {
        id: "c-trans",
        title: "Transportation Engineering",
        why: "Roads, intersections, traffic — very common entry-level work at DOTs.",
        concepts: [
          "Stopping sight distance = reaction distance + braking distance",
          "Horizontal curves (radius, superelevation) and vertical curves",
          "Traffic flow q = k·v, level of service",
          "Pavement design basics (flexible vs rigid)",
          "AASHTO Green Book (paid) & MUTCD (free from FHWA)",
        ],
        resources: [R.nptelTraffic, R.pavement],
        tasks: [
          { id: "c13", text: "Read the free Fundamentals of Transportation textbook with the NPTEL lectures", kind: "learn", hours: 40, links: [R.fot, R.nptelTrans] },
          { id: "c14", text: "Design a horizontal and vertical curve for a 40 mph road", kind: "practice", hours: 4, links: [R.nptelGeometric, R.fot] },
        ],
      },
      {
        id: "c-survey",
        title: "Surveying",
        why: "All civil projects start with survey data. It's on the FE.",
        concepts: [
          "Differential leveling: HI = BM + BS; Elev = HI − FS",
          "Bearings vs azimuths, traverses, closure errors",
          "Horizontal distance = slope distance × cos θ",
          "Earthwork: average end area V = L(A₁ + A₂)/2",
          "GPS/GNSS, total stations, coordinate systems",
        ],
        resources: [R.nptelSurvey2],
        tasks: [
          { id: "c15", text: "Study surveying fundamentals", kind: "learn", hours: 25, links: [R.nptelSurvey] },
          { id: "c16", text: "Compute a closed traverse with closure error & adjustment in a spreadsheet", kind: "practice", hours: 4, links: [R.libreoffice] },
        ],
      },
      {
        id: "c-cm",
        title: "Construction Engineering & Management",
        why: "Where most engineers start: on site, estimating, scheduling.",
        concepts: [
          "Quantity takeoff and cost estimating",
          "CPM scheduling: forward/backward pass, float, critical path",
          "Contracts (lump sum, unit price, design-build), RFIs, submittals, change orders",
          "Formwork, earthmoving productivity, OSHA safety",
        ],
        resources: [R.mit1040, R.nptelSafety],
        tasks: [
          { id: "c17", text: "Read the free construction project management textbook with NPTEL lectures", kind: "learn", hours: 30, links: [R.pmBook, R.nptelCPM] },
          { id: "c18", text: "Build a CPM schedule for a small house project (15+ activities)", kind: "practice", hours: 4, links: [R.projectlibre] },
        ],
      },
    ],
  },
  {
    id: "career",
    num: 5,
    title: "Get Into the Industry",
    when: "Month 9 onward",
    goal: "Get paid work in civil engineering while you study. Experience is required for the license anyway.",
    color: "text-rose-400",
    modules: [
      {
        id: "k-certs",
        title: "Entry certifications (paid, optional)",
        why: "Cheap, fast credentials that help you get hired. Many employers pay for these after hiring you — ask before paying yourself.",
        concepts: [
          "OSHA 30 Construction — site safety, widely requested",
          "ACI Concrete Field Testing Technician – Grade I",
          "NICET (e.g., Construction Materials Testing, Highway) — technician credentials",
          "None of these are required for the FE or PE",
        ],
        resources: [],
        tasks: [
          { id: "k1", text: "Earn an OSHA 30-hour Construction card", kind: "milestone", hours: 30, links: [R.osha] },
          { id: "k2", text: "Earn ACI Concrete Field Testing Technician Grade I", kind: "milestone", hours: 20, links: [R.aci] },
          { id: "k3", text: "Earn a NICET Level I certification", kind: "milestone", hours: 30, links: [R.nicet] },
        ],
      },
      {
        id: "k-job",
        title: "Land your first civil job",
        why: "Start as a technician — you'll learn more on a real project in a month than a semester of reading.",
        concepts: [
          "Target roles: CAD/BIM drafter, engineering technician, survey tech/rod person, materials testing tech, construction inspector, estimator assistant",
          "Employers: state DOT, city/county public works, consulting firms, contractors, testing labs",
          "Resume: skills + certifications + portfolio link at the top",
        ],
        resources: [R.bls],
        tasks: [
          { id: "k4", text: "Write a one-page resume and put your portfolio link at the top", kind: "build", hours: 3 },
          { id: "k5", text: "Join ASCE (free as a student) and attend 2 local branch meetings to network", kind: "milestone", links: [R.asce] },
          { id: "k6", text: "Apply to 20 technician/drafter roles (internships count)", kind: "milestone" },
          { id: "k7", text: "Get hired in a civil engineering role", kind: "milestone" },
          { id: "k8", text: "Start a weekly experience log (projects, tasks, supervising PE) — boards ask for this", kind: "milestone" },
        ],
      },
    ],
  },
  {
    id: "portfolio",
    num: 6,
    title: "Portfolio Projects",
    when: "Months 10–24",
    goal: "Prove you can design. Each project = calcs + drawings + a short write-up on a web page.",
    color: "text-cyan-400",
    modules: [
      {
        id: "p-projects",
        title: "Six design projects",
        why: "A portfolio is your proof. Show hand calcs AND software.",
        concepts: [
          "Always show: design criteria, loads, assumptions, code references, calcs, drawings, conclusion",
          "Check every software result with a hand calc",
          "Publish free on GitHub Pages or a personal site (like your EquipGuard project)",
        ],
        resources: [],
        tasks: [
          { id: "p1", text: "Wood-framed deck: joists, beam, posts, footings + drawings", kind: "build", hours: 20 },
          { id: "p2", text: "Steel-framed single-storey building bay: beams, columns, base plates", kind: "build", hours: 30, links: [R.aisc] },
          { id: "p3", text: "Reinforced concrete 2-storey building frame (Ftool/OpenSees) + hand checks", kind: "build", hours: 40, links: [R.ftool, R.opensees] },
          { id: "p4", text: "Site grading & storm drainage for a small parking lot", kind: "build", hours: 30, links: [R.hec22] },
          { id: "p5", text: "Rural road alignment with horizontal/vertical curves and earthwork", kind: "build", hours: 30, links: [R.fot] },
          { id: "p6", text: "Python/spreadsheet engineering tool published with documentation", kind: "build", hours: 20, links: [R.python] },
        ],
      },
    ],
  },
  {
    id: "fe",
    num: 7,
    title: "FE Civil Exam",
    when: "Months 18–24",
    goal: "Pass the NCEES Fundamentals of Engineering (Civil) exam and become an Engineer Intern (EI/EIT).",
    color: "text-lime-400",
    modules: [
      {
        id: "fe-prep",
        title: "FE Civil preparation",
        why: "Passing the FE is the first official step to a PE license — and it proves your self-study.",
        concepts: [
          "Computer-based, taken at Pearson VUE centers year-round. Exam fee is $225, paid to NCEES.",
          "About 110 questions in a ~6-hour appointment; the only reference is the searchable NCEES Reference Handbook (free)",
          "Topics: math & stats, ethics, economics, statics, dynamics, mechanics of materials, materials, fluids, surveying, water resources & environmental, structural, geotechnical, transportation, construction",
          "Many states let engineering students take the FE near the end of their degree. Check your board.",
          "Learn to FIND formulas in the handbook fast (Ctrl+F) — speed matters",
        ],
        resources: [R.boards],
        tasks: [
          { id: "fe1", text: "Confirm your state's FE eligibility rules", kind: "milestone", hours: 1, links: [R.boards] },
          { id: "fe2", text: "Score 80%+ in every category of this site's Practice page", kind: "practice", hours: 20 },
          { id: "fe3", text: "Work 300+ FE-style problems using ONLY the free NCEES Handbook", kind: "practice", hours: 100, links: [R.myncees] },
          {
            id: "fe4",
            text: "Take the official NCEES FE Civil practice exam under timed conditions",
            kind: "practice",
            hours: 6,
            links: [{ ...R.myncees, label: "NCEES practice exam (in MyNCEES)", cost: "paid", note: "Small fee; the closest thing to the real exam — worth it" }],
          },
          { id: "fe5", text: "Register and pass the FE Civil exam ($225)", kind: "milestone", links: [{ ...R.ncees, cost: "paid", label: "NCEES FE exam registration" }] },
          { id: "fe6", text: "Apply to your state board for Engineer Intern (EI/EIT) certification", kind: "milestone", links: [R.boards] },
        ],
      },
    ],
  },
  {
    id: "pe",
    num: 8,
    title: "Credential & PE License",
    when: "Years 2–10",
    goal: "Complete a legal route to licensure and pass the PE Civil exam.",
    color: "text-yellow-300",
    modules: [
      {
        id: "pe-route",
        title: "Choose your licensure route",
        why: "Most US states require an ABET-accredited degree. If you're already enrolled in one, finish it — you're on the main route.",
        concepts: [
          "Route A: ABET-accredited degree (full-time, part-time or online). If your current civil program is ABET-accredited, this is your route.",
          "Route B: a few state boards accept long experience (often 8–12+ years) in place of a degree. Rules change — confirm directly with the board.",
          "Route C: ABET-accredited Engineering Technology degree — some states accept it with extra experience.",
          "Once licensed in one state, you can usually get licensed in others through comity (NCEES Record).",
        ],
        resources: [],
        tasks: [
          { id: "pe1", text: "Check that your civil engineering program is ABET-accredited (search your school)", kind: "milestone", hours: 1, links: [R.abet] },
          { id: "pe2", text: "Email your state board to confirm the exact route for your situation (save their written answer)", kind: "milestone", hours: 1, links: [R.boards] },
          { id: "pe3", text: "Open an NCEES Record to store your experience and references", kind: "milestone", hours: 2, links: [R.myncees] },
        ],
      },
      {
        id: "pe-exam",
        title: "PE Civil exam",
        why: "The final exam. Pass it, and you can legally sign and seal civil engineering work.",
        concepts: [
          "Computer-based, taken after your state-required experience (typically 4 years post-degree, under a PE)",
          "Choose one depth module: Construction, Geotechnical, Structural, Transportation, or Water Resources & Environmental",
          "Exam and state license fees apply (several hundred dollars total) — see NCEES for current prices",
        ],
        resources: [],
        tasks: [
          { id: "pe4", text: "Accumulate the required years of progressive engineering experience under a PE", kind: "milestone" },
          { id: "pe5", text: "Get references from licensed PEs who supervised you", kind: "milestone" },
          { id: "pe6", text: "Pass the PE Civil exam", kind: "milestone", links: [{ ...R.nceesPe, cost: "paid" }] },
          { id: "pe7", text: "Receive your PE license 🎉", kind: "milestone" },
        ],
      },
    ],
  },
];

export const ALL_TASKS: (Task & { phaseId: string; moduleId: string; moduleTitle: string })[] = PHASES.flatMap((p) =>
  p.modules.flatMap((m) => m.tasks.map((t) => ({ ...t, phaseId: p.id, moduleId: m.id, moduleTitle: m.title }))),
);

export const TOTAL_HOURS = ALL_TASKS.reduce((s, t) => s + (t.hours ?? 0), 0);

/** every unique resource used anywhere, for the cost page */
export const ALL_RESOURCES: Resource[] = [
  ...new Map(
    PHASES.flatMap((p) => p.modules.flatMap((m) => [...m.resources, ...m.tasks.flatMap((t) => t.links ?? [])])).map((r) => [
      `${r.url}|${r.cost}`,
      r,
    ]),
  ).values(),
];

export function phaseTasks(p: Phase) {
  return p.modules.flatMap((m) => m.tasks);
}

export function getPhase(id: string) {
  return PHASES.find((p) => p.id === id);
}
