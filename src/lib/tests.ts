// End-of-phase tests + the final exam.
// Phases covered by the FE bank draw from QUESTIONS; the others use the
// test-only questions below (kept out of the FE Practice page on purpose).
import { QUESTIONS, type Category, type Question } from "./questions";

type TestQ = Omit<Question, "cat"> & { cat: string };

const PHASE_QUESTIONS: Record<string, TestQ[]> = {
  orientation: [
    { id: "to1", cat: "Orientation", q: "In the United States, who grants the Professional Engineer (PE) license?", choices: ["The university you graduated from", "Each state's engineering licensing board", "ASCE", "The federal Department of Labor"], answer: 1, why: "Licensure is controlled state by state. NCEES writes the exams, but each state board issues the license." },
    { id: "to2", cat: "Orientation", q: "Which of these is NOT one of the five PE Civil depth areas?", choices: ["Structural", "Geotechnical", "Transportation", "Petroleum"], answer: 3, why: "The five areas are Construction, Geotechnical, Structural, Transportation, and Water Resources & Environmental." },
    { id: "to3", cat: "Orientation", q: "What is the usual order of steps to a US PE license?", choices: ["PE exam → degree → FE exam", "Degree → FE exam → supervised experience → PE exam", "FE exam → PE exam → degree", "Experience → PE exam → FE exam"], answer: 1, why: "Typical path: accredited degree, pass the FE, gain ~4 years of supervised experience, then pass the PE." },
    { id: "to4", cat: "Orientation", q: "Engineer Intern (EI/EIT) status is normally granted after:", choices: ["Getting a technician job", "Passing the FE exam and applying to the state board", "Passing the PE exam", "Joining ASCE"], answer: 1, why: "Passing the FE (and meeting the board's education rules) makes you eligible for EI/EIT certification." },
    { id: "to5", cat: "Orientation", q: "How many years of supervised experience do most states require before the PE (with an accredited degree)?", choices: ["1 year", "2 years", "4 years", "10 years"], answer: 2, why: "About 4 years of progressive experience under a licensed PE is the common requirement." },
    { id: "to6", cat: "Orientation", q: "Most states require an engineering degree accredited by:", choices: ["ABET", "NCEES", "OSHA", "ASTM"], answer: 0, why: "ABET (EAC) accreditation is the standard education requirement for licensure." },
    { id: "to7", cat: "Orientation", q: "The key legal difference between an engineer (PE) and a technician is that the PE:", choices: ["Uses more software", "Works only in offices", "Takes legal responsibility for designs and can seal drawings", "Earns certifications faster"], answer: 2, why: "Only a licensed PE can sign and seal engineering documents and take legal responsibility for them." },
    { id: "to8", cat: "Orientation", q: "On the FE exam, the only reference material you may use is:", choices: ["Any textbook you bring", "Your own formula sheet", "The searchable NCEES FE Reference Handbook on screen", "Nothing at all"], answer: 2, why: "NCEES provides the electronic Reference Handbook during the exam. No personal notes or books are allowed." },
    { id: "to9", cat: "Orientation", q: "For self-study, the most effective way to spend most of your study time is:", choices: ["Watching lecture videos", "Re-reading notes", "Solving problems with pencil and paper", "Highlighting textbooks"], answer: 2, why: "Engineering skill comes from working problems; aim for about two-thirds of your time solving." },
  ],
  software: [
    { id: "ts1", cat: "Drawing & Software", q: "On a drawing at a scale of 1\" = 20', a line measures 3.5 inches. Its real length is:", choices: ["7 ft", "35 ft", "70 ft", "700 ft"], answer: 2, why: "3.5 in × 20 ft/in = 70 ft." },
    { id: "ts2", cat: "Drawing & Software", q: "On a drawing at 1/4\" = 1'-0\", a wall measures 2 inches. Its real length is:", choices: ["0.5 ft", "4 ft", "8 ft", "24 ft"], answer: 2, why: "Each 1/4 inch is 1 ft, so 2 in = 8 quarter-inches = 8 ft." },
    { id: "ts3", cat: "Drawing & Software", q: "In AutoCAD, the standard practice is to:", choices: ["Draw at full size in model space and set scale in paper-space viewports", "Draw everything already scaled down in model space", "Draw only in paper space", "Use a different file for every scale"], answer: 0, why: "Model everything 1:1 in model space; layouts (paper space) hold title blocks and scaled viewports." },
    { id: "ts4", cat: "Drawing & Software", q: "In a plan set, sheets numbered with the prefix \"S\" (e.g., S-101) are:", choices: ["Survey sheets", "Structural sheets", "Site sheets", "Specification sheets"], answer: 1, why: "Common discipline prefixes: G general, C civil, S structural, A architectural, M/E/P mechanical, electrical, plumbing." },
    { id: "ts5", cat: "Drawing & Software", q: "A section view shows:", choices: ["The object from directly above", "The object as if cut through, revealing the inside", "Only the outline of the site", "A 3D rendering"], answer: 1, why: "A section is an imaginary cut that shows internal construction such as rebar, layers and footings." },
    { id: "ts6", cat: "Drawing & Software", q: "In CAD, layers are mainly used to:", choices: ["Make the file smaller", "Organize objects and control their visibility, color and lineweight", "Store dimensions only", "Link to other drawings"], answer: 1, why: "Layers group objects (e.g., C-ROAD, S-COLS) so you can control display and plotting by category." },
    { id: "ts7", cat: "Drawing & Software", q: "An Xref (external reference) in AutoCAD is:", choices: ["A deleted object", "Another drawing file linked into the current one", "A dimension style", "A printer setting"], answer: 1, why: "Xrefs link a separate DWG (like a survey base) so updates to that file appear everywhere it is referenced." },
    { id: "ts8", cat: "Drawing & Software", q: "The main difference between BIM (e.g., Revit) and 2D CAD is that BIM:", choices: ["Can't print sheets", "Uses intelligent 3D objects with data, and views are generated from one model", "Is only for architects", "Has no dimensions"], answer: 1, why: "In BIM, plans, sections, schedules and quantities all come from the same data-rich model." },
    { id: "ts9", cat: "Drawing & Software", q: "In GIS and Civil 3D, a DEM is:", choices: ["A drawing exchange format", "A digital elevation model: a grid of ground elevations", "A design manual", "A type of survey instrument"], answer: 1, why: "DEMs represent terrain and are used for watershed delineation, grading and contours." },
    { id: "ts10", cat: "Drawing & Software", q: "The contour interval on a topographic map is:", choices: ["The horizontal distance between contour lines", "The vertical elevation difference between adjacent contours", "The map scale", "The number of contour lines"], answer: 1, why: "E.g., a 2 ft contour interval means each line is 2 ft higher or lower than its neighbor." },
    { id: "ts11", cat: "Drawing & Software", q: "A revision cloud on a drawing indicates:", choices: ["Areas with weather concerns", "Changes made in a specific revision", "Landscaping", "Items not to be built"], answer: 1, why: "Revision clouds with a delta tag highlight what changed since the last issued version." },
    { id: "ts12", cat: "Drawing & Software", q: "In Civil 3D, a corridor is built from:", choices: ["Layers and blocks", "An alignment, a profile and an assembly (typical section)", "A point cloud only", "Pipe networks only"], answer: 1, why: "The assembly is swept along the alignment at the profile elevations to create the 3D road model." },
  ],
  career: [
    { id: "tc1", cat: "Career", q: "An OSHA 30-hour Construction card shows training in:", choices: ["Structural design", "Construction site safety", "Surveying", "Project accounting"], answer: 1, why: "OSHA Outreach courses cover hazard recognition and safety on construction sites." },
    { id: "tc2", cat: "Career", q: "ACI Concrete Field Testing Technician – Grade I certifies you to:", choices: ["Design concrete mixes", "Perform field tests on fresh concrete (slump, air, temperature, unit weight) and make cylinders", "Seal concrete drawings", "Run a ready-mix plant"], answer: 1, why: "Grade I covers standard field tests on fresh concrete and making/curing test specimens." },
    { id: "tc3", cat: "Career", q: "A slump test on fresh concrete measures its:", choices: ["Compressive strength", "Workability (consistency)", "Air content", "Temperature"], answer: 1, why: "Slump indicates how easily concrete flows and can be placed. Strength is tested on cured cylinders." },
    { id: "tc4", cat: "Career", q: "NICET certifications are designed for:", choices: ["Licensed PEs", "Engineering technicians", "Architects", "Lawyers"], answer: 1, why: "NICET certifies engineering technicians in areas like materials testing, highway construction and inspection." },
    { id: "tc5", cat: "Career", q: "On a project, an RFI from the contractor is answered by:", choices: ["The building inspector", "The designer / engineer of record", "The supplier", "The owner's accountant"], answer: 1, why: "RFIs ask the design team to clarify the contract documents." },
    { id: "tc6", cat: "Career", q: "Why should you keep a weekly experience log from your first civil job?", choices: ["It's required by OSHA", "State boards ask for detailed, verified experience when you apply for the PE", "To calculate your salary", "It replaces the FE exam"], answer: 1, why: "Licensure applications need dates, duties and supervising PEs, and records made at the time are far more accurate." },
    { id: "tc7", cat: "Career", q: "As a technician, you notice what looks like an error on a sealed structural drawing. You should:", choices: ["Fix it yourself on the drawing", "Ignore it, since it's sealed", "Tell the engineer of record (through your supervisor) right away", "Post about it online"], answer: 2, why: "Only the engineer of record may change sealed documents; raising it promptly protects public safety." },
    { id: "tc8", cat: "Career", q: "Which entry-level role best teaches how designs are actually built in the field?", choices: ["Construction inspector", "Accountant", "Receptionist", "Graphic designer"], answer: 0, why: "Inspectors compare construction to plans and specs every day, which is great preparation for design work." },
    { id: "tc9", cat: "Career", q: "A nuclear density gauge is used on a construction site to measure:", choices: ["Concrete strength", "In-place density and moisture of compacted soil", "Asphalt temperature", "Rebar spacing"], answer: 1, why: "Field technicians use it to check that fills and subgrades meet the specified compaction." },
    { id: "tc10", cat: "Career", q: "Standard concrete cylinders for compressive strength testing in the US are:", choices: ["2 in × 4 in", "4 in × 8 in or 6 in × 12 in", "12 in × 24 in", "Cubes, not cylinders"], answer: 1, why: "ASTM C31/C39 cylinders are 6×12 in or 4×8 in, usually broken at 7 and 28 days." },
    { id: "tc11", cat: "Career", q: "A field test gives a dry density of 118 pcf. The Proctor maximum dry density is 125 pcf, and the spec requires 95% compaction. The result is:", choices: ["94.4%: fails", "94.4%: passes", "105.9%: passes", "95.0%: passes"], answer: 0, why: "Percent compaction = 118/125 = 94.4%, which is below the 95% required, so the area must be reworked." },
    { id: "tc12", cat: "Career", q: "An inspector's daily report is important mainly because it:", choices: ["Replaces the drawings", "Is the official record of work done, conditions and problems on site", "Sets the contractor's pay rate", "Is only for training"], answer: 1, why: "Daily reports are used for payments, claims and disputes, so they must be accurate and written the same day." },
    { id: "tc13", cat: "Career", q: "Near the end of a project, a list of unfinished or defective items the contractor must fix is called a:", choices: ["Punch list", "Submittal log", "Bid tab", "Change order"], answer: 0, why: "The punch list is walked and signed off before final completion and payment." },
    { id: "tc14", cat: "Career", q: "A change order is:", choices: ["A request for information", "A written change to the contract's scope, price or schedule", "A daily report", "A safety violation notice"], answer: 1, why: "Change orders formally modify the contract and are signed by both owner and contractor." },
    { id: "tc15", cat: "Career", q: "On a jobsite, an SDS is a:", choices: ["Site design sketch", "Safety Data Sheet describing a chemical's hazards and handling", "Soil density sample", "Structural design standard"], answer: 1, why: "Under OSHA hazard communication, SDSs must be available for chemicals used on site." },
    { id: "tc16", cat: "Career", q: "Under OSHA, a protective system (sloping, shoring or a trench box) is generally required for trenches at least:", choices: ["2 ft deep", "5 ft deep", "10 ft deep", "20 ft deep"], answer: 1, why: "Trenches 5 ft or deeper need protection unless they're entirely in stable rock. Trench collapse is a leading cause of construction deaths." },
    { id: "tc17", cat: "Career", q: "Air is deliberately entrained in concrete mainly to:", choices: ["Increase strength", "Improve freeze–thaw durability", "Reduce cost", "Speed up curing"], answer: 1, why: "Tiny air bubbles relieve pressure from freezing water. Entrained air actually slightly lowers strength." },
    { id: "tc18", cat: "Career", q: "When the engineer reviews a contractor's shop drawings, they mainly check:", choices: ["The contractor's profit", "General conformance with the design intent and contract documents", "Every dimension the fabricator will use", "The paint color only"], answer: 1, why: "The review confirms the submittal follows the design. The contractor stays responsible for dimensions and fabrication." },
    { id: "tc19", cat: "Career", q: "Without a degree yet, the strongest way to show an employer you can do CAD/design work is:", choices: ["A long list of courses watched", "A portfolio of real drawings and calculations", "A social media following", "A generic cover letter"], answer: 1, why: "Concrete work samples prove skill directly, and interviewers can ask you to explain them." },
  ],
  portfolio: [
    { id: "tp1", cat: "Design Process", q: "Before sizing any member, the first step of a design calculation is to:", choices: ["Pick the biggest section available", "Define the design criteria: code, loads and assumptions", "Draw the final sheets", "Estimate the cost"], answer: 1, why: "Everything depends on the governing code, the load cases and the stated assumptions." },
    { id: "tp2", cat: "Design Process", q: "Why should you check structural software results with a quick hand calculation?", choices: ["Software is never correct", "To catch input and modeling errors (wrong units, supports, loads)", "Hand calcs are required by every code", "To make the report longer"], answer: 1, why: "Most software mistakes are user mistakes. A simple hand check catches gross errors fast." },
    { id: "tp3", cat: "Design Process", q: "The gravity load path in a wood deck is:", choices: ["Footings → posts → beam → joists → decking", "Decking → joists → beam → posts → footings → soil", "Joists → decking → soil", "Beam → decking → joists → posts"], answer: 1, why: "Load flows from the surface down through each supporting element to the ground." },
    { id: "tp4", cat: "Design Process", q: "In LRFD design, a member is adequate when:", choices: ["φRn ≥ ΣγᵢQᵢ (factored resistance ≥ factored load effect)", "Rn ≤ ΣQ", "The member is the lightest available", "Deflection is zero"], answer: 0, why: "Design strength (resistance × φ) must be at least the required strength from factored load combinations." },
    { id: "tp5", cat: "Design Process", q: "Which is a SERVICEABILITY check rather than a strength check?", choices: ["Bending capacity", "Shear capacity", "Live-load deflection limit such as L/360", "Bolt rupture"], answer: 2, why: "Serviceability covers comfort and function (deflection, vibration, cracking), not collapse." },
    { id: "tp6", cat: "Design Process", q: "Which item does NOT belong in a professional calculation package?", choices: ["Design criteria and code references", "Assumptions and load derivations", "Clear results with a check against capacity", "Decorative styling that hides intermediate steps"], answer: 3, why: "A reviewer must be able to follow every step; hiding steps defeats the purpose of the package." },
    { id: "tp7", cat: "Design Process", q: "Which is a LIVE load?", choices: ["The self-weight of a concrete slab", "Permanent partitions and finishes", "People and movable furniture in an office", "The weight of the roof framing"], answer: 2, why: "Live loads are transient (occupancy, movable items). Dead loads are permanent self-weight and fixed elements." },
    { id: "tp8", cat: "Design Process", q: "Floor joists are spaced 16 in on center and the floor load is 50 psf. The line load on each joist is about:", choices: ["33 lb/ft", "50 lb/ft", "67 lb/ft", "800 lb/ft"], answer: 2, why: "Tributary width = 16/12 = 1.33 ft. w = 50 psf × 1.33 ft = 66.7 lb/ft." },
    { id: "tp9", cat: "Design Process", q: "Beams spaced 8 ft apart support a floor load of 100 psf. The line load on an interior beam is:", choices: ["0.1 kip/ft", "0.8 kip/ft", "8 kip/ft", "12.5 kip/ft"], answer: 1, why: "w = 100 psf × 8 ft = 800 lb/ft = 0.8 kip/ft." },
    { id: "tp10", cat: "Design Process", q: "A simply supported beam spans 20 ft and carries w = 0.8 kip/ft. The maximum moment is:", choices: ["16 kip·ft", "40 kip·ft", "80 kip·ft", "160 kip·ft"], answer: 1, why: "M = wL²/8 = 0.8 × 400 / 8 = 40 kip·ft." },
    { id: "tp11", cat: "Design Process", q: "A steel beam has a factored moment Mu = 90 kip·ft, with Fy = 50 ksi and φ = 0.9. The required plastic section modulus Zx is:", choices: ["12 in³", "20 in³", "24 in³", "32 in³"], answer: 2, why: "Zx ≥ Mu/(φFy) = (90 × 12 kip·in)/(0.9 × 50 ksi) = 1080/45 = 24 in³." },
    { id: "tp12", cat: "Design Process", q: "A beam carries D = 1.0 kip/ft and L = 1.5 kip/ft. The governing LRFD factored load is:", choices: ["1.4 kip/ft", "2.5 kip/ft", "3.6 kip/ft", "4.0 kip/ft"], answer: 2, why: "1.2D + 1.6L = 1.2 + 2.4 = 3.6 kip/ft, which exceeds 1.4D = 1.4 kip/ft, so it governs." },
    { id: "tp13", cat: "Design Process", q: "Why does LRFD multiply loads by factors above 1.0 and resistance by φ below 1.0?", choices: ["To make members as cheap as possible", "To account for uncertainty in both loads and material strength", "Because codes require round numbers", "To convert units"], answer: 1, why: "Load factors cover higher-than-expected loads; φ covers weaker-than-expected materials and workmanship." },
    { id: "tp14", cat: "Design Process", q: "A column carries 200 kips (service load) and the allowable soil bearing pressure is 4 ksf. The square footing side length needed is about:", choices: ["5.0 ft", "7.1 ft", "10.0 ft", "50 ft"], answer: 1, why: "Area = 200/4 = 50 ft². Side = √50 = 7.07 ft, so use about 7.25 ft in practice." },
    { id: "tp15", cat: "Design Process", q: "A steel beam passes strength but fails the deflection limit. The most effective fix is to:", choices: ["Use higher-strength steel", "Choose a section with a larger moment of inertia (deeper beam)", "Paint the beam", "Increase the load factors"], answer: 1, why: "Deflection depends on EI. All structural steel has about the same E, so only a larger I (or shorter span) helps." },
    { id: "tp16", cat: "Design Process", q: "A moment of 40 kip·ft converted to kip·in is:", choices: ["3.33 kip·in", "40 kip·in", "480 kip·in", "4,800 kip·in"], answer: 2, why: "Multiply by 12 in/ft: 40 × 12 = 480 kip·in. Unit slips are among the most common design errors." },
    { id: "tp17", cat: "Design Process", q: "Why do firms have a second engineer independently check calculations before drawings are issued?", choices: ["It's only a formality", "To catch errors and wrong assumptions before they reach construction", "To slow the project down", "To share the fee"], answer: 1, why: "Independent checks catch mistakes the original designer overlooks, which is much cheaper than fixing them after construction." },
  ],
  pe: [
    { id: "tl1", cat: "Licensure", q: "Getting licensed in a second state based on your existing PE license is called:", choices: ["Reciprocity by exam", "Comity", "Grandfathering", "Apprenticeship"], answer: 1, why: "Comity licensure accepts your existing qualifications, usually through an NCEES Record." },
    { id: "tl2", cat: "Licensure", q: "An NCEES Record is used to:", choices: ["Book Pearson VUE seats", "Store verified education, exams, experience and references to send to state boards", "Store CAD files", "Pay ASCE dues"], answer: 1, why: "It saves time when applying in multiple states because the documents are verified once." },
    { id: "tl3", cat: "Licensure", q: "In most states, offering engineering services to the public without a license is:", choices: ["Allowed if you have a degree", "Allowed for small projects", "Illegal", "Allowed after passing the FE"], answer: 2, why: "Practicing engineering, or using restricted titles like 'Professional Engineer', without a license violates state law." },
    { id: "tl4", cat: "Licensure", q: "To renew a PE license, most states require:", choices: ["Retaking the PE exam", "Continuing education (professional development hours, PDH)", "A new degree", "Nothing"], answer: 1, why: "Most boards require a set number of PDHs each renewal cycle." },
    { id: "tl5", cat: "Licensure", q: "A licensed civil PE who is a transportation specialist is asked to seal a complex hospital structural design. They should:", choices: ["Seal it, since a PE can seal anything", "Decline unless they're competent in that area", "Seal it with a disclaimer", "Ask a technician to review it"], answer: 1, why: "Engineers may practice only in areas where they are competent by education and experience." },
    { id: "tl6", cat: "Licensure", q: "References on a PE application usually must come from:", choices: ["Friends and family", "Licensed PEs who know your engineering work", "Professors only", "Any coworker"], answer: 1, why: "Boards want licensed engineers who can verify the quality and level of your experience." },
    { id: "tl7", cat: "Licensure", q: "The NCEES SE (Structural Engineering) exam is:", choices: ["Required for every civil engineer", "A 16-hour exam needed for structural licensure in some states", "The same as the FE", "Only for bridges in Europe"], answer: 1, why: "Some states (e.g., for significant structures) require the SE license beyond the PE." },
    { id: "tl8", cat: "Licensure", q: "On the PE Civil exam you choose:", choices: ["All five depth areas", "One depth module (e.g., Structural or Geotechnical)", "No depth area", "Any two depth areas"], answer: 1, why: "The current PE Civil exam has a common breadth portion plus one chosen depth module." },
    { id: "tl9", cat: "Licensure", q: "When a PE seals a drawing, they are stating that:", choices: ["The drawing is pretty", "The work was prepared by them or under their responsible charge, and they take responsibility for it", "The contractor approved it", "The building is insured"], answer: 1, why: "The seal is a legal statement of responsibility for the engineering on that document." },
    { id: "tl10", cat: "Licensure", q: "\"Responsible charge\" means:", choices: ["Being paid for a project", "Direct control and personal supervision of the engineering work", "Owning the engineering firm", "Reviewing the drawings after construction"], answer: 1, why: "A PE may seal only work they directly controlled and supervised, not work they merely glanced at." },
    { id: "tl11", cat: "Licensure", q: "Who develops and scores the FE and PE exams?", choices: ["Each state board independently", "NCEES", "ASCE", "ABET"], answer: 1, why: "NCEES writes and scores the exams; state boards use the results to grant licenses." },
    { id: "tl12", cat: "Licensure", q: "If you fail the FE exam, NCEES allows you to:", choices: ["Never retake it", "Retake it, up to 3 attempts in a 12-month period", "Retake it only after 5 years", "Retake it the next day as often as you like"], answer: 1, why: "You may test once per testing window and at most three times in any 12-month period." },
    { id: "tl13", cat: "Licensure", q: "An engineer finds a serious safety problem, and their employer refuses to act. According to the NSPE Code, they should:", choices: ["Stay silent to keep their job", "Notify the employer or client and, if needed, other appropriate authorities", "Post it anonymously online first", "Fix it secretly on their own"], answer: 1, why: "When public safety is endangered and judgment is overruled, engineers must notify their employer or client and other authorities as appropriate." },
    { id: "tl14", cat: "Licensure", q: "An engineer is asked to evaluate bids, and one bidder is a company the engineer partly owns. The engineer should:", choices: ["Evaluate quietly and fairly", "Disclose the conflict of interest (and step back from that decision)", "Favor the company since they know it's good", "Ignore it; small stakes don't count"], answer: 1, why: "Engineers must disclose known or potential conflicts of interest to their employer or client." },
    { id: "tl15", cat: "Licensure", q: "A PE license issued by Arkansas lets you practice engineering:", choices: ["In every US state", "In Arkansas; other states require their own license (often through comity)", "Anywhere in the world", "Only in your home city"], answer: 1, why: "Licenses are state-specific. To practice in another state, apply there (an NCEES Record speeds it up)." },
    { id: "tl16", cat: "Licensure", q: "State boards want your engineering experience to be \"progressive.\" This means:", choices: ["Experience at a progressive company", "Increasing responsibility and complexity over time", "At least 10 different employers", "Only design work, never field work"], answer: 1, why: "Boards look for growth, from basic tasks toward independent engineering judgment." },
    { id: "tl17", cat: "Licensure", q: "A PE's license has lapsed because they didn't renew. Until it's reinstated, they:", choices: ["Can still seal drawings", "May not practice engineering or seal documents as a PE", "Can practice if their firm is licensed", "Only need to pay a fine later"], answer: 1, why: "Practicing or sealing with a lapsed license counts as unlicensed practice." },
    { id: "tl18", cat: "Licensure", q: "Which of these does NOT count toward the PE experience requirement in most states?", choices: ["Designing drainage under a PE's supervision", "Field engineering on a highway project", "Unsupervised work completely unrelated to engineering", "Structural analysis under a licensed engineer"], answer: 2, why: "Qualifying experience must be engineering work, usually under the supervision of a licensed PE." },
    { id: "tl19", cat: "Licensure", q: "Your FE and PE results are mostly used by:", choices: ["Universities for admissions", "State licensing boards to decide licensure", "Employers to set salaries", "OSHA"], answer: 1, why: "The exams are a licensure requirement. Boards combine them with your education and experience." },
  ],
};

const fe = (cats: Category[]) => QUESTIONS.filter((q) => cats.includes(q.cat));
const ALL_FE = QUESTIONS;
const ALL_EXTRA = Object.values(PHASE_QUESTIONS).flat();

export type TestDef = {
  id: string; // phase id, or "final"
  title: string;
  count: number;
  pass: number; // percent
  minutes?: number; // optional time guide
  pool: TestQ[];
};

export const TESTS: TestDef[] = [
  { id: "orientation", title: "Phase 0 test: Orientation", count: 8, pass: 70, pool: PHASE_QUESTIONS.orientation },
  { id: "math", title: "Phase 1 test: Math Foundations", count: 10, pass: 70, pool: fe(["Mathematics"]) },
  {
    id: "fundamentals",
    title: "Phase 2 test: Engineering Fundamentals",
    count: 15,
    pass: 70,
    pool: fe(["Statics", "Dynamics", "Mechanics of Materials", "Fluids & Hydraulics", "Economics & Ethics"]),
  },
  { id: "software", title: "Phase 3 test: Drawing & Software", count: 10, pass: 70, pool: PHASE_QUESTIONS.software },
  {
    id: "core",
    title: "Phase 4 test: Civil Engineering Core",
    count: 20,
    pass: 70,
    pool: fe(["Structural & Materials", "Geotechnical", "Transportation", "Surveying", "Construction", "Water & Environmental"]),
  },
  { id: "career", title: "Phase 5 test: Getting Into the Industry", count: 8, pass: 70, pool: PHASE_QUESTIONS.career },
  { id: "portfolio", title: "Phase 6 test: Design Process", count: 6, pass: 70, pool: PHASE_QUESTIONS.portfolio },
  { id: "fe", title: "Phase 7 test: FE Mock Exam", count: 25, pass: 70, minutes: 75, pool: ALL_FE },
  { id: "pe", title: "Phase 8 test: Licensure & PE", count: 8, pass: 70, pool: PHASE_QUESTIONS.pe },
  { id: "final", title: "Final Exam: Road to PE", count: 40, pass: 75, minutes: 120, pool: [...ALL_FE, ...ALL_EXTRA] },
];

export const PHASE_TEST_IDS = TESTS.filter((t) => t.id !== "final").map((t) => t.id);

export function getTest(id: string) {
  return TESTS.find((t) => t.id === id);
}

function shuffle<T>(a: T[]) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

/** a fresh random paper: random questions, shuffled choices */
export function makePaper(t: TestDef): TestQ[] {
  return shuffle(t.pool)
    .slice(0, t.count)
    .map((q) => {
      const order = shuffle(q.choices.map((_, k) => k));
      return { ...q, choices: order.map((k) => q.choices[k]), answer: order.indexOf(q.answer) };
    });
}

export type { TestQ };
export const TEST_ONLY_QUESTIONS = ALL_EXTRA;
