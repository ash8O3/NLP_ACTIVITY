import { DepartmentInfo, FacilityInfo, FAQItem, TimetableSlot, ExamInfo } from '../types';

export const UNIVERSITY_NAME = "Apex Institute of Science & Technology (AIST)";

export const CATEGORY_METADATA = {
  admissions: {
    label: "Admissions",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    badge: "bg-blue-600 text-white",
    icon: "GraduationCap",
    description: "Eligibility, application process, deadlines & document requirements",
  },
  fees: {
    label: "Fees & Aid",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badge: "bg-emerald-600 text-white",
    icon: "CreditCard",
    description: "Tuition structures, hostel fees, payment dates, scholarships & refunds",
  },
  timetable: {
    label: "Timetable",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    badge: "bg-purple-600 text-white",
    icon: "Calendar",
    description: "Class schedules, lecture halls, lab slots & academic semester calendar",
  },
  examinations: {
    label: "Examinations",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    badge: "bg-amber-600 text-white",
    icon: "FileText",
    description: "Mid/End-term dates, hall tickets, grading scale & re-evaluation rules",
  },
  departments: {
    label: "Departments",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    badge: "bg-indigo-600 text-white",
    icon: "Building2",
    description: "Faculty directory, HOD contacts, specialized labs & course offerings",
  },
  facilities: {
    label: "Facilities",
    color: "bg-rose-50 text-rose-700 border-rose-200",
    badge: "bg-rose-600 text-white",
    icon: "Landmark",
    description: "Library hours, hostels, medical clinic, sports arena & campus Wi-Fi",
  },
  general: {
    label: "General Help",
    color: "bg-slate-50 text-slate-700 border-slate-200",
    badge: "bg-slate-700 text-white",
    icon: "HelpCircle",
    description: "Campus policies, student portal, transit shuttles & general inquiries",
  },
};

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: "cs",
    name: "Computer Science & Engineering",
    code: "CSE",
    hod: "Dr. Aris Thorne (PhD, MIT)",
    email: "cs.dept@apex.edu",
    location: "Alan Turing Building, 2nd Floor (Room CS-201)",
    phone: "+1 (555) 019-2030",
    programs: ["B.Tech Computer Science", "B.Tech AI & Data Science", "M.Tech Software Systems", "Ph.D. in Computing"],
    labs: ["High Performance AI Cluster (Room 208)", "Cybersecurity Threat Lab (Room 214)", "Cloud & IoT Systems Lab (Room 219)"],
    description: "Focuses on algorithms, machine learning, decentralized systems, and scalable software architecture."
  },
  {
    id: "ee",
    name: "Electrical & Electronics Engineering",
    code: "EEE",
    hod: "Dr. Priya Sharma (PhD, Stanford)",
    email: "ee.dept@apex.edu",
    location: "Nikola Tesla Hall, 1st Floor (Room EE-104)",
    phone: "+1 (555) 019-2041",
    programs: ["B.Tech Electrical & Electronics", "M.Tech VLSI & Embedded Systems", "Ph.D. in Microelectronics"],
    labs: ["VLSI Chip Design Studio (Room 112)", "Smart Grid & Renewable Energy Lab (Room 118)", "Robotics & Micro-controllers Lab (Room 125)"],
    description: "Pioneering research in nano-electronics, autonomous robotics, and renewable micro-grids."
  },
  {
    id: "me",
    name: "Mechanical & Aerospace Engineering",
    code: "MAE",
    hod: "Dr. Marcus Vance (PhD, Caltech)",
    email: "me.dept@apex.edu",
    location: "Von Braun Engineering Complex, Ground Floor (Room ME-110)",
    phone: "+1 (555) 019-2055",
    programs: ["B.Tech Mechanical Engineering", "B.Tech Aerospace Systems", "M.Tech Thermal & Fluids"],
    labs: ["Subsonic Wind Tunnel Facility (Bay 4)", "Advanced 3D Additive Manufacturing Center (Bay 2)", "Mechatronics & CNC Hub (Bay 7)"],
    description: "Specialized in lightweight aerospace composites, thermodynamic simulation, and robotics automation."
  },
  {
    id: "bt",
    name: "Biotechnology & Biomedical Engineering",
    code: "BME",
    hod: "Dr. Elena Rostova (PhD, Cambridge)",
    email: "bio.dept@apex.edu",
    location: "Rosalind Franklin Life Sciences Center, 3rd Floor (Room BT-305)",
    phone: "+1 (555) 019-2062",
    programs: ["B.Tech Biotechnology", "B.Tech Biomedical Engineering", "M.Sc Bioinformatics"],
    labs: ["Genomic Sequencing & PCR Facility (Room 309)", "Biomaterials & Tissue Engineering Lab (Room 315)", "Neuro-engineering Research Core (Room 320)"],
    description: "Advancing genetic therapies, bio-sensing wearables, and tissue engineering solutions."
  },
  {
    id: "ba",
    name: "School of Business & Management",
    code: "SBM",
    hod: "Dr. Robert Sterling (PhD, Harvard)",
    email: "business@apex.edu",
    location: "Global Management Pavilion, 4th Floor (Room SB-401)",
    phone: "+1 (555) 019-2070",
    programs: ["BBA (Tech Management)", "MBA (Business Analytics)", "MBA (FinTech & Strategy)", "Executive MBA"],
    labs: ["Bloomberg Financial Trading Floor (Room 408)", "Consumer Insights Neuromarketing Lab (Room 412)"],
    description: "Integrating data science, quantitative finance, entrepreneurial venture incubation, and executive leadership."
  }
];

export const CAMPUS_FACILITIES: FacilityInfo[] = [
  {
    id: "library",
    name: "Dr. APJ Abdul Kalam Central Library",
    category: "academic",
    hours: "Monday - Saturday: 8:00 AM – 11:00 PM | Sunday: 10:00 AM – 6:00 PM (Open 24/7 during Exam Weeks)",
    location: "Central Campus Quad, Building 4",
    contact: "library@apex.edu | ext. 4100",
    highlights: [
      "180,000+ physical volumes & 500,000+ digital e-books (IEEE, ACM, Springer, JSTOR access)",
      "40 Silent Study pods bookable via Student App",
      "High-speed wireless scanning, RFID automated checkout kiosks, and thesis binding station",
      "Dedicated VR Simulation Learning Pods on 3rd floor"
    ],
    rules: "Valid Student ID required at turnstiles. Books issued for 21 days (UG) or 45 days (PG). Fine: $0.50/day overdue."
  },
  {
    id: "hostel",
    name: "University Residential Halls (North & South Quads)",
    category: "residential",
    hours: "Open 24/7 (Night Curfew: 10:30 PM for first-year undergraduates, biometric check-in)",
    location: "North Campus (Blocks A-D for Men), South Campus (Blocks E-H for Women)",
    contact: "warden@apex.edu | Emergency Warden: ext. 3333",
    highlights: [
      "Choice of Single AC, Double Deluxe, or Triple Sharing furnished rooms",
      "High-speed 1 Gbps fiber Wi-Fi in all residential blocks",
      "Four hygienic 4-course dining halls offering Continental, Asian, Indian, and Vegan menus",
      "Free laundry wash stations and weekly linen service"
    ],
    rules: "Quiet hours observed from 11:00 PM to 6:00 AM. Visitors permitted in common lounge only until 8:00 PM."
  },
  {
    id: "sports",
    name: "Apex Olympic Sports & Fitness Complex",
    category: "sports",
    hours: "Daily: 6:00 AM – 9:30 PM",
    location: "West Campus Sports Enclave",
    contact: "sports@apex.edu | ext. 4550",
    highlights: [
      "Olympic-size 50-meter temperature-controlled indoor swimming pool",
      "Modern 2-floor Gymnasium with certified personal trainers and recovery sauna",
      "Floodlit FIFA-standard artificial turf football field & 400m running track",
      "4 indoor wooden-floor badminton courts, 2 squash courts, and 3 outdoor tennis courts"
    ],
    rules: "Proper sports shoes and gym attire mandatory. Locker allocation upon showing valid student ID."
  },
  {
    id: "health",
    name: "University Health & Wellness Center",
    category: "medical",
    hours: "24/7 Emergency Services | OPD Timings: 8:30 AM – 7:00 PM Daily",
    location: "Ground Floor, Student Services Annex (East Wing)",
    contact: "health@apex.edu | 24/7 Emergency Line: (555) 019-5555",
    highlights: [
      "2 resident medical doctors, 4 registered nurses, and on-call specialist physicians",
      "Free primary consultation, basic diagnostic tests, and generic prescription medication",
      "Dedicated Mental Wellness & Psychological Counseling Cell with confidential sessions",
      "Two 24/7 ICU-equipped ambulances stationed on campus"
    ],
    rules: "Free medical care for enrolled students covered under university student health insurance plan."
  },
  {
    id: "it_center",
    name: "Campus Computing & IT Support Center",
    category: "tech",
    hours: "Monday - Friday: 8:00 AM – 8:00 PM | Saturday: 9:00 AM – 4:00 PM",
    location: "Turing Block, Ground Floor (Room IT-101)",
    contact: "ithelpdesk@apex.edu | ext. 2000",
    highlights: [
      "Eduroam Wi-Fi configuration & campus network credentials assistance",
      "Free student software licenses: Microsoft 365, MATLAB, AutoCAD, JetBrains, GitHub Pro",
      "Laptop hardware troubleshooting & university email recovery desk",
      "High Performance Computing (HPC) cluster account provisioning for research students"
    ],
    rules: "Submit IT tickets online via https://ithelp.apex.edu or visit the walk-in desk."
  },
  {
    id: "dining",
    name: "Central Food Court & Cafeterias",
    category: "dining",
    hours: "7:30 AM – 11:30 PM Daily (Night Canteen open until 2:00 AM during exams)",
    location: "Student Activity Center (SAC), Central Plaza",
    contact: "dining@apex.edu",
    highlights: [
      "6 diverse cuisines: Wood-fired Pizza, Asian Noodle Bar, Healthy Salad & Juice Station, Grill House",
      "Brand partners: Starbucks On-The-Go kiosk, Subway, and Gelato Corner",
      "Cashless digital payments: Student ID SmartPay, Apple Pay, Google Pay, UPI, credit cards",
      "Subsidized student meal options available every weekday"
    ],
    rules: "Clean tray return stations are located at all exits. Self-service dining."
  }
];

export const TIMETABLE_DATA: Record<string, TimetableSlot[]> = {
  "CS-Semester-4": [
    { id: "1", day: "Monday", time: "09:00 - 10:30 AM", subject: "Design & Analysis of Algorithms", code: "CS401", instructor: "Dr. Aris Thorne", room: "Hall A-102", type: "Lecture" },
    { id: "2", day: "Monday", time: "11:00 - 12:30 PM", subject: "Database Management Systems", code: "CS402", instructor: "Prof. Sarah Chen", room: "Hall A-102", type: "Lecture" },
    { id: "3", day: "Monday", time: "02:00 - 04:30 PM", subject: "Algorithms Lab (Batch A)", code: "CS401L", instructor: "Prof. Chen & TA", room: "Lab 208", type: "Lab" },
    { id: "4", day: "Tuesday", time: "09:00 - 10:30 AM", subject: "Operating Systems Architecture", code: "CS403", instructor: "Dr. David Miller", room: "Hall B-201", type: "Lecture" },
    { id: "5", day: "Tuesday", time: "11:00 - 12:30 PM", subject: "Discrete Mathematics & Graph Theory", code: "MA401", instructor: "Dr. Linda Gray", room: "Hall B-201", type: "Lecture" },
    { id: "6", day: "Wednesday", time: "09:00 - 10:30 AM", subject: "Design & Analysis of Algorithms", code: "CS401", instructor: "Dr. Aris Thorne", room: "Hall A-102", type: "Lecture" },
    { id: "7", day: "Wednesday", time: "11:00 - 12:30 PM", subject: "Database Management Systems", code: "CS402", instructor: "Prof. Sarah Chen", room: "Hall A-102", type: "Lecture" },
    { id: "8", day: "Wednesday", time: "02:00 - 04:30 PM", subject: "DBMS Lab (Batch A)", code: "CS402L", instructor: "Prof. Chen", room: "Lab 214", type: "Lab" },
    { id: "9", day: "Thursday", time: "09:00 - 10:30 AM", subject: "Operating Systems Architecture", code: "CS403", instructor: "Dr. David Miller", room: "Hall B-201", type: "Lecture" },
    { id: "10", day: "Thursday", time: "02:00 - 03:30 PM", subject: "Technical Communication & Ethics", code: "HU401", instructor: "Dr. Sarah Jenkins", room: "Seminar Hall 1", type: "Lecture" },
    { id: "11", day: "Friday", time: "10:00 - 11:30 AM", subject: "Machine Learning Elective", code: "CS405", instructor: "Dr. Angela Vance", room: "Hall A-105", type: "Lecture" },
    { id: "12", day: "Friday", time: "02:00 - 05:00 PM", subject: "Open Source Project / Hackathon Lab", code: "CS499", instructor: "Department Mentors", room: "Innovation Hub", type: "Tutorial" }
  ],
  "EE-Semester-4": [
    { id: "21", day: "Monday", time: "09:00 - 10:30 AM", subject: "Signals & Linear Systems", code: "EE401", instructor: "Dr. Priya Sharma", room: "Hall EE-101", type: "Lecture" },
    { id: "22", day: "Monday", time: "11:00 - 12:30 PM", subject: "Microprocessors & Microcontrollers", code: "EE402", instructor: "Prof. Kevin Patel", room: "Hall EE-101", type: "Lecture" },
    { id: "23", day: "Tuesday", time: "02:00 - 04:30 PM", subject: "Microcontroller Hardware Lab", code: "EE402L", instructor: "Prof. Patel", room: "Lab 112", type: "Lab" },
    { id: "24", day: "Wednesday", time: "09:00 - 10:30 AM", subject: "Power Electronics & Drives", code: "EE403", instructor: "Dr. R. Gupta", room: "Hall EE-101", type: "Lecture" },
    { id: "25", day: "Thursday", time: "10:00 - 11:30 AM", subject: "Electromagnetic Field Theory", code: "EE404", instructor: "Dr. Priya Sharma", room: "Hall EE-101", type: "Lecture" }
  ],
  "ME-Semester-4": [
    { id: "31", day: "Monday", time: "09:00 - 10:30 AM", subject: "Fluid Mechanics & Hydraulics", code: "ME401", instructor: "Dr. Marcus Vance", room: "Hall ME-102", type: "Lecture" },
    { id: "32", day: "Tuesday", time: "11:00 - 12:30 PM", subject: "Kinematics & Dynamics of Machines", code: "ME402", instructor: "Dr. Thomas Scott", room: "Hall ME-102", type: "Lecture" },
    { id: "33", day: "Wednesday", time: "02:00 - 05:00 PM", subject: "Fluid Mechanics & Thermal Lab", code: "ME401L", instructor: "Dr. Vance & Lab TAs", room: "Thermo Bay 3", type: "Lab" }
  ]
};

export const UPCOMING_EXAMS: ExamInfo[] = [
  { code: "CS401", subject: "Design & Analysis of Algorithms", date: "April 18, 2026", time: "09:30 AM - 12:30 PM", venue: "Exam Hall 1 (North Block)", duration: "3 Hours" },
  { code: "CS402", subject: "Database Management Systems", date: "April 21, 2026", time: "09:30 AM - 12:30 PM", venue: "Exam Hall 1 (North Block)", duration: "3 Hours" },
  { code: "CS403", subject: "Operating Systems Architecture", date: "April 24, 2026", time: "09:30 AM - 12:30 PM", venue: "Exam Hall 2 (Main Aud)", duration: "3 Hours" },
  { code: "MA401", subject: "Discrete Mathematics", date: "April 27, 2026", time: "09:30 AM - 12:30 PM", venue: "Exam Hall 1 (North Block)", duration: "3 Hours" },
  { code: "HU401", subject: "Technical Communication & Ethics", date: "April 30, 2026", time: "02:00 PM - 04:00 PM", venue: "Seminar Hall 1", duration: "2 Hours" }
];

export const FEE_STRUCTURES = {
  undergraduate: {
    tuitionPerSemester: 4200,
    labAndLibraryFee: 450,
    studentActivityAndGym: 250,
    developmentFee: 300,
    totalPerSemester: 5200,
    annualTotal: 10400,
    programs: ["B.Tech CSE", "B.Tech EEE", "B.Tech Mech", "B.Tech Biotech", "BBA"]
  },
  postgraduate: {
    tuitionPerSemester: 5400,
    labAndLibraryFee: 600,
    studentActivityAndGym: 250,
    developmentFee: 350,
    totalPerSemester: 6600,
    annualTotal: 13200,
    programs: ["M.Tech Software Systems", "M.Tech VLSI", "MBA Analytics", "M.Sc Bio"]
  },
  hostelOptions: [
    { type: "Single Occupancy (AC + Attached Bath)", feePerSemester: 1800, mealPlanIncluded: true },
    { type: "Double Sharing (AC + Attached Bath)", feePerSemester: 1350, mealPlanIncluded: true },
    { type: "Double Sharing (Non-AC)", feePerSemester: 950, mealPlanIncluded: true },
    { type: "Triple Sharing (Non-AC)", feePerSemester: 750, mealPlanIncluded: true }
  ],
  scholarships: [
    { name: "Apex Chancellor's Merit Scholarship", waiver: "100% Tuition Fee Waiver", eligibility: "Top 2% in Entrance Exam / 95%+ in High School Board" },
    { name: "Dean's Academic Excellence Award", waiver: "50% Tuition Fee Waiver", eligibility: "CGPA 9.2+ in preceding semester" },
    { name: "National Sports & Athletics Fellowship", waiver: "40% - 75% Waiver + Free Housing", eligibility: "State/National level medal winners" },
    { name: "Women in STEM Leadership Grant", waiver: "$2,000 / Year Grant", eligibility: "Enrolled female students in Engineering & Tech" },
    { name: "Need-Based Financial Support Fund", waiver: "Up to 60% Tuition Subsidy", eligibility: "Annual family income under $25,000 / ₹5,00,000" }
  ],
  paymentDates: {
    fallSemesterDueDate: "August 15, 2026",
    springSemesterDueDate: "January 10, 2026",
    installmentOption: "Available in 3 installments (40% at registration, 30% after 45 days, 30% before midterms)",
    lateFine: "$25 / ₹1,000 per week delayed after the final grace period."
  }
};

export const COMMON_FAQS: FAQItem[] = [
  {
    id: "adm-1",
    question: "What are the eligibility criteria and deadline for B.Tech Admissions 2026?",
    category: "admissions",
    shortAnswer: "Minimum 60% aggregate in 10+2 with Physics, Chemistry & Math. Application deadline for Fall 2026 is June 30, 2026.",
    fullAnswer: "To apply for B.Tech programs at Apex Institute:\n1. **Academic Eligibility**: Minimum 60% marks in 10+2 (or equivalent) with Physics, Mathematics, and Chemistry/Computer Science.\n2. **Entrance Exam**: Valid score in JEE Main, State CET, or the university's online entrance test (AIST-ET).\n3. **Application Deadline**: Phase 1 closes May 15, 2026; Phase 2 closes **June 30, 2026**.\n4. **Application Fee**: $40 / ₹1,500 (non-refundable) payable online.\n5. **Required Documents**: 10th & 12th Marksheets, Transfer Certificate, ID proof (Passport/Aadhaar), 4 passport photos, Entrance score card.",
    tags: ["admissions", "btech", "eligibility", "deadline", "application"]
  },
  {
    id: "fee-1",
    question: "What is the total fee for B.Tech Computer Science and how can I pay in installments?",
    category: "fees",
    shortAnswer: "Tuition is $4,200/sem plus $1,000 auxiliary fees ($5,200 total/sem). Installment plans allow 40%-30%-30% splits.",
    fullAnswer: "**B.Tech CSE Fee Breakdown (Per Semester)**:\n- Tuition Fee: $4,200 / ₹1,60,000\n- Lab, Computing & Library: $450\n- Student Gym & Amenities: $250\n- Campus Development: $300\n- **Total Per Semester**: **$5,200** (Annual: $10,400)\n\n**Installment Plan**:\n- **Installment 1 (40%)**: At semester course registration\n- **Installment 2 (30%)**: 45 days after semester start\n- **Installment 3 (30%)**: 14 days before Mid-Term exams\n*To apply for an installment plan, log in to Student Portal > Finance > Request Installment Schedule.*",
    tags: ["fees", "cs", "tuition", "installments", "cost", "payment"]
  },
  {
    id: "time-1",
    question: "How can I view my class timetable and what are the lecture timings?",
    category: "timetable",
    shortAnswer: "Classes run Mon-Fri from 9:00 AM to 5:00 PM. View live schedules in the Timetable tab or Student Portal.",
    fullAnswer: "Class slots operate in 90-minute blocks with 30-minute breaks:\n- **Slot 1**: 09:00 AM – 10:30 AM\n- **Slot 2**: 11:00 AM – 12:30 PM\n- **Lunch Break**: 12:30 PM – 02:00 PM\n- **Slot 3 / Lab Block**: 02:00 PM – 04:30 PM (or 5:00 PM)\n\nYou can access your personalized department timetable instantly via the **Timetable Hub** on this assistant, or download the weekly PDF through your Student Portal under 'My Academics > Schedule'.",
    tags: ["timetable", "schedule", "classes", "slots", "timing"]
  },
  {
    id: "exam-1",
    question: "What are the rules for examination hall ticket download and attendance criteria?",
    category: "examinations",
    shortAnswer: "Minimum 75% attendance required. Hall tickets are available on the portal 7 days prior to exam start.",
    fullAnswer: "**Examination & Hall Ticket Rules**:\n1. **Attendance Requirement**: Strict minimum **75% attendance** in each registered course. Students with 65-74% attendance with valid medical certificates may apply for condonation through Dean Academic.\n2. **Hall Ticket Release**: Available 7 days before exams on the portal (*Examinations > Download Admit Card*). You MUST carry a printed copy + Physical Student ID card.\n3. **No Electronic Devices**: Mobile phones, smart watches, and programmable calculators are strictly barred in the hall.\n4. **Re-evaluation**: Applications open for 14 days after result declaration ($20 / ₹750 per subject re-check fee).",
    tags: ["exams", "hall ticket", "attendance", "admit card", "rules", "revaluation"]
  },
  {
    id: "dept-1",
    question: "Who is the Head of Computer Science Department and where is the office located?",
    category: "departments",
    shortAnswer: "Dr. Aris Thorne is the HOD, located in Alan Turing Building, 2nd Floor (Room CS-201).",
    fullAnswer: "**Computer Science & Engineering Department Details**:\n- **Head of Department (HOD)**: Dr. Aris Thorne (PhD, MIT)\n- **Office Location**: Alan Turing Building, 2nd Floor (Room CS-201)\n- **Email**: cs.dept@apex.edu\n- **Direct Line**: +1 (555) 019-2030\n- **Office Visiting Hours**: Monday, Wednesday, Thursday: 2:30 PM – 4:30 PM\n- **Programs Offered**: B.Tech CSE, B.Tech AI & DS, M.Tech Software Systems, Ph.D.\n- **Department Advisor**: Prof. Sarah Chen (Room CS-205, cs.advisor@apex.edu)",
    tags: ["department", "cs", "hod", "contact", "office", "faculty"]
  },
  {
    id: "fac-1",
    question: "What are the Central Library timings, book borrowing limits, and digital access rules?",
    category: "facilities",
    shortAnswer: "Mon-Sat 8 AM - 11 PM, Sun 10 AM - 6 PM (24/7 during exam weeks). Undergraduates can borrow 5 books for 21 days.",
    fullAnswer: "**Central Library Information**:\n- **General Hours**: Mon – Sat: 8:00 AM – 11:00 PM | Sun: 10:00 AM – 6:00 PM\n- **Exam Week Hours**: **Open 24/7** with night study security\n- **Borrowing Entitlement**:\n  * Undergraduates: 5 books for 21 days (renewable twice online)\n  * Postgraduates: 8 books for 45 days\n  * PhD Scholars: 12 books for 90 days\n- **Digital Access**: Free off-campus VPN access to IEEE Xplore, ScienceDirect, ACM Digital Library, SpringerLink, and Statista.\n- **Facilities**: 40 private silent pods, RFID automated checkout, high-res scanning, café lounge.",
    tags: ["library", "timings", "books", "digital access", "study pods", "facilities"]
  },
  {
    id: "fac-2",
    question: "How do I access the campus health center and what emergency medical services are available?",
    category: "facilities",
    shortAnswer: "24/7 emergency clinic on Ground Floor of Student Services Annex. Dial ext. 5555 for immediate ambulance support.",
    fullAnswer: "**University Health & Medical Center**:\n- **Location**: Ground Floor, Student Services Annex (East Wing)\n- **Emergency Hotline**: Call ext. **5555** or (555) 019-5555 from any phone\n- **Operating Hours**: 24/7 Emergency & In-Patient | Regular OPD: 8:30 AM – 7:00 PM\n- **Services**: Free doctor consultation, initial emergency triage, generic medicines, nebulization, minor injury wound dressing.\n- **Mental Health & Counseling**: Free confidential psychological counselors available Mon-Fri (Book via student portal or walk-in).",
    tags: ["medical", "health", "hospital", "emergency", "doctor", "ambulance", "facilities"]
  }
];

export const PROMPT_CAROUSEL_ITEMS = [
  "What is the eligibility and application deadline for B.Tech admissions?",
  "How much is the semester fee for Computer Science and what scholarships exist?",
  "Show me the class timetable for CS Semester 4 this week",
  "When do the Spring 2026 final examinations start and what is the pass criteria?",
  "How do I contact the HOD of Electrical Engineering?",
  "What are the Central Library hours and book lending policies?"
];
