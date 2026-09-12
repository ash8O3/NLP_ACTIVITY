import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { 
  UNIVERSITY_NAME, 
  DEPARTMENTS, 
  CAMPUS_FACILITIES, 
  TIMETABLE_DATA, 
  UPCOMING_EXAMS, 
  FEE_STRUCTURES, 
  COMMON_FAQS 
} from "./src/data/knowledgeBase";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Fallback rule-based NLP Matcher
function fallbackNlpMatcher(query: string, profile?: any) {
  const q = query.toLowerCase();
  
  // 1. Admissions
  if (
    q.includes("admiss") || 
    q.includes("apply") || 
    q.includes("eligib") || 
    q.includes("requirement") || 
    q.includes("entrance") || 
    q.includes("jee") || 
    q.includes("deadline") ||
    q.includes("document") ||
    q.includes("criteria")
  ) {
    return {
      category: "admissions",
      confidence: 0.94,
      entities: [
        { name: "Topic", value: "Admissions & Eligibility", type: "academic_process" },
        { name: "Cycle", value: "Academic Year 2026-2027", type: "session" }
      ],
      text: `### 🎓 Admissions & Eligibility Guide (2026-2027)\n\nAt **${UNIVERSITY_NAME}**, admissions are currently open for Undergraduate (B.Tech, BBA) and Postgraduate (M.Tech, MBA, M.Sc, Ph.D.) programs.\n\n#### 📌 Key Admission Criteria:\n- **Undergraduate (B.Tech)**: Minimum **60% aggregate in 10+2** (Physics, Mathematics, and Chemistry/Computer Science). Valid score in **JEE Main**, State CET, or **AIST-ET** (University Online Entrance Exam).\n- **Postgraduate (M.Tech/MBA)**: Bachelor's degree with minimum 55% + valid **GATE/CAT/GMAT** or University PG-CET score.\n\n#### 🗓️ Important Deadlines:\n- **Phase 1 Application Close**: May 15, 2026\n- **Phase 2 Final Deadline**: **June 30, 2026**\n- **Classes Commencement**: August 20, 2026\n\n#### 📄 Required Documents:\n1. 10th & 12th Official Mark Sheets\n2. Entrance Exam Scorecard\n3. Transfer / Migration Certificate\n4. Government ID Proof (Passport / Aadhaar / National ID)\n5. 4 Recent Passport Size Photographs\n\n*Need to calculate fees or check scholarships? Ask me about fee structures or scholarship waivers!*`,
      quickReplies: [
        "What are the scholarship options available?",
        "How much is the application fee?",
        "What are the B.Tech Computer Science fees?",
        "How can I apply online?"
      ],
      links: [
        { label: "Check Fee Structure", action: "modal", target: "fee_calc" },
        { label: "View Departments", action: "modal", target: "departments" }
      ]
    };
  }

  // 2. Fees & Scholarships
  if (
    q.includes("fee") || 
    q.includes("cost") || 
    q.includes("tuition") || 
    q.includes("scholarship") || 
    q.includes("installment") || 
    q.includes("refund") || 
    q.includes("waiver") ||
    q.includes("price") ||
    q.includes("pay")
  ) {
    return {
      category: "fees",
      confidence: 0.96,
      entities: [
        { name: "QueryType", value: "Financial & Tuition", type: "finance" },
        { name: "Currencies", value: "USD / INR Supported", type: "payment" }
      ],
      text: `### 💳 Tuition Fees & Scholarship Overview\n\nHere is the official fee and financial aid breakdown for **${UNIVERSITY_NAME}**:\n\n#### 📊 Academic Tuition (Per Semester):\n- **Undergraduate (B.Tech / BBA)**: **$5,200 total** ($4,200 Tuition + $450 Lab/Library + $250 Activity + $300 Dev)\n- **Postgraduate (M.Tech / MBA)**: **$6,600 total** ($5,400 Tuition + $600 Lab/Library + $250 Activity + $350 Dev)\n\n#### 🏠 Hostel & Accommodation Options:\n- **Single AC Room (with 4-Course Mess)**: $1,800 / semester\n- **Double Sharing AC (with Mess)**: $1,350 / semester\n- **Double Sharing Non-AC (with Mess)**: $950 / semester\n- **Triple Sharing Non-AC (with Mess)**: $750 / semester\n\n#### 🏆 Scholarships & Waivers:\n- **Chancellor's Merit Scholarship**: **100% Tuition Waiver** for top 2% rankers / 95%+ high school score.\n- **Dean's Academic Excellence**: **50% Tuition Waiver** for maintaining CGPA 9.2+.\n- **Women in STEM Leadership**: **$2,000 / year grant** for female tech students.\n- **Need-Based Aid**: Up to 60% fee subsidy for family income under $25,000 / ₹5L.\n\n#### 📅 Payment Schedule & Installments:\nInstallments can be split across 3 milestones: **40%** at registration, **30%** after 45 days, and **30%** prior to midterm exams.`,
      quickReplies: [
        "How do I apply for the Merit Scholarship?",
        "What are the hostel room choices and dining plans?",
        "What is the late fee policy?",
        "What is the fee payment due date for Fall 2026?"
      ],
      links: [
        { label: "Open Fee Calculator", action: "modal", target: "fee_calc" },
        { label: "Scholarships Guide", action: "query", target: "Tell me more about scholarship eligibility" }
      ]
    };
  }

  // 3. Timetable & Schedule
  if (
    q.includes("timetable") || 
    q.includes("schedule") || 
    q.includes("class") || 
    q.includes("routine") || 
    q.includes("slot") || 
    q.includes("timing") || 
    q.includes("calendar") ||
    q.includes("lecture") ||
    q.includes("lab slot")
  ) {
    const sem = profile?.major || "Computer Science";
    return {
      category: "timetable",
      confidence: 0.95,
      entities: [
        { name: "Program", value: sem, type: "department" },
        { name: "Schedule Mode", value: "Spring Semester 2026", type: "calendar" }
      ],
      text: `### 📅 Academic Timetable & Class Schedule\n\nClasses at **${UNIVERSITY_NAME}** are held Monday through Friday with standard 90-minute lecture blocks.\n\n#### ⏰ Standard Class Timing Slots:\n- **Period 1**: 09:00 AM – 10:30 AM (Lecture Hall Complex)\n- **Period 2**: 11:00 AM – 12:30 PM (Lecture Hall Complex)\n- **Lunch Break**: 12:30 PM – 02:00 PM (Dining Halls / Cafeteria)\n- **Period 3 / Lab Block**: 02:00 PM – 04:30 PM (Specialized Laboratories)\n\n#### 💻 Sample Schedule (CS Semester 4):\n- **Monday**: \n  * 09:00 - 10:30 AM: *Design & Analysis of Algorithms* (Hall A-102)\n  * 11:00 - 12:30 PM: *Database Management Systems* (Hall A-102)\n  * 02:00 - 04:30 PM: *Algorithms Lab Batch A* (Lab 208)\n- **Tuesday**: \n  * 09:00 - 10:30 AM: *Operating Systems Architecture* (Hall B-201)\n  * 11:00 - 12:30 PM: *Discrete Mathematics* (Hall B-201)\n- **Wednesday**: \n  * 09:00 - 10:30 AM: *Algorithms* & 11:00 AM: *DBMS* | 02:00 PM: *DBMS Lab* (Lab 214)\n\n*You can view and filter all department timetables using the interactive Timetable Hub!*`,
      quickReplies: [
        "Show me the Electrical Engineering timetable",
        "When is the midterm semester break?",
        "Where is Computer Science Lab 208 located?",
        "What are the Friday elective slots?"
      ],
      links: [
        { label: "Open Timetable Hub", action: "modal", target: "timetable" },
        { label: "View Upcoming Exams", action: "modal", target: "exams" }
      ]
    };
  }

  // 4. Examinations & Grading
  if (
    q.includes("exam") || 
    q.includes("test") || 
    q.includes("hall ticket") || 
    q.includes("admit card") || 
    q.includes("grade") || 
    q.includes("gpa") || 
    q.includes("cgpa") || 
    q.includes("reval") ||
    q.includes("backlog") ||
    q.includes("passing")
  ) {
    return {
      category: "examinations",
      confidence: 0.97,
      entities: [
        { name: "Session", value: "Spring 2026 Examinations", type: "assessment" },
        { name: "Attendance Barrier", value: "75% Mandatory", type: "policy" }
      ],
      text: `### 📝 Examination Schedule & Academic Policies\n\n#### 🗓️ Spring 2026 Major Examination Dates:\n- **CS401 (Algorithms)**: April 18, 2026 | 09:30 AM - 12:30 PM (Exam Hall 1)\n- **CS402 (DBMS)**: April 21, 2026 | 09:30 AM - 12:30 PM (Exam Hall 1)\n- **CS403 (Operating Systems)**: April 24, 2026 | 09:30 AM - 12:30 PM (Exam Hall 2)\n- **MA401 (Discrete Math)**: April 27, 2026 | 09:30 AM - 12:30 PM (Exam Hall 1)\n- **HU401 (Ethics & Comm)**: April 30, 2026 | 02:00 PM - 04:00 PM (Seminar Hall 1)\n\n#### 📋 Important Examination Rules:\n1. **Attendance Requirement**: Strict minimum of **75% attendance** across all registered courses to be eligible for hall ticket issuance.\n2. **Admit Card / Hall Ticket**: Downloadable 7 days before exams from the Student Portal under *Academics > Hall Tickets*. Printed copy + Physical ID required.\n3. **Grading System (10-Point Scale)**:\n   * **O (Outstanding)**: 90-100% (Grade Point 10.0)\n   * **A+ (Excellent)**: 80-89% (Grade Point 9.0)\n   * **A (Very Good)**: 70-79% (Grade Point 8.0)\n   * **B+ (Good)**: 60-69% (Grade Point 7.0)\n   * **Passing Minimum**: 40% (Grade Point 4.0)\n4. **Revaluation & Re-checking**: Applications open for 14 days after result publication ($20 / ₹750 per paper).`,
      quickReplies: [
        "How do I download my exam hall ticket?",
        "What is the revaluation procedure?",
        "What is the minimum attendance requirement?",
        "When will Spring 2026 results be published?"
      ],
      links: [
        { label: "View Exam Schedule", action: "modal", target: "exams" },
        { label: "Library Exam Hours (24/7)", action: "query", target: "What are library hours during exam week?" }
      ]
    };
  }

  // 5. Departments & Faculty
  if (
    q.includes("department") || 
    q.includes("faculty") || 
    q.includes("hod") || 
    q.includes("professor") || 
    q.includes("computer science") || 
    q.includes("electrical") || 
    q.includes("mechanical") || 
    q.includes("biotech") || 
    q.includes("business") ||
    q.includes("contact")
  ) {
    return {
      category: "departments",
      confidence: 0.93,
      entities: [
        { name: "Directory", value: "Academic Faculty & HODs", type: "department" },
        { name: "Offices", value: "Main Campus Academic Blocks", type: "locations" }
      ],
      text: `### 🏛️ Academic Departments & Faculty Contacts\n\n**${UNIVERSITY_NAME}** comprises five premier academic schools:\n\n1. **Computer Science & Engineering (CSE)**\n   - **HOD**: Dr. Aris Thorne (PhD, MIT)\n   - **Email**: \`cs.dept@apex.edu\` | **Phone**: +1 (555) 019-2030\n   - **Office**: Turing Building, 2nd Floor (Room CS-201)\n   - **Key Labs**: High Performance AI Cluster, Cyber Threat Simulation Lab\n\n2. **Electrical & Electronics Engineering (EEE)**\n   - **HOD**: Dr. Priya Sharma (PhD, Stanford)\n   - **Email**: \`ee.dept@apex.edu\` | **Phone**: +1 (555) 019-2041\n   - **Office**: Tesla Hall, 1st Floor (Room EE-104)\n\n3. **Mechanical & Aerospace Engineering (MAE)**\n   - **HOD**: Dr. Marcus Vance (PhD, Caltech)\n   - **Email**: \`me.dept@apex.edu\` | **Office**: Von Braun Complex (Room ME-110)\n\n4. **Biotechnology & Biomedical Engineering (BME)**\n   - **HOD**: Dr. Elena Rostova (PhD, Cambridge)\n   - **Email**: \`bio.dept@apex.edu\` | **Office**: Franklin Life Sciences (Room BT-305)\n\n5. **School of Business & Management (SBM)**\n   - **HOD**: Dr. Robert Sterling (PhD, Harvard)\n   - **Email**: \`business@apex.edu\` | **Office**: Management Pavilion (Room SB-401)\n\n*Faculty visiting hours are typically 2:30 PM – 4:30 PM on weekdays.*`,
      quickReplies: [
        "How do I book an appointment with the CS HOD?",
        "What research labs are in the Mechanical department?",
        "Who is the advisor for Business Analytics?",
        "Where is the Alan Turing Building located?"
      ],
      links: [
        { label: "Browse All Departments", action: "modal", target: "departments" },
        { label: "Campus Facilities", action: "modal", target: "facilities" }
      ]
    };
  }

  // 6. Campus Facilities & Student Services
  if (
    q.includes("facility") || 
    q.includes("library") || 
    q.includes("hostel") || 
    q.includes("gym") || 
    q.includes("sports") || 
    q.includes("medical") || 
    q.includes("health") || 
    q.includes("clinic") || 
    q.includes("wifi") || 
    q.includes("internet") || 
    q.includes("food") || 
    q.includes("canteen") || 
    q.includes("dining") || 
    q.includes("bus") || 
    q.includes("transport")
  ) {
    return {
      category: "facilities",
      confidence: 0.96,
      entities: [
        { name: "Services", value: "Campus Amenities & Infrastructure", type: "facility" },
        { name: "Emergency", value: "ext. 5555 (24/7)", type: "hotline" }
      ],
      text: `### 🏢 Campus Facilities & Student Amenities\n\nHere are the operating hours and key details for core facilities across **${UNIVERSITY_NAME}**:\n\n- 📚 **Dr. APJ Abdul Kalam Central Library**:\n  * **Hours**: Mon–Sat: 8:00 AM – 11:00 PM | Sunday: 10:00 AM – 6:00 PM (**24/7 during exam periods**)\n  * **Features**: 180,000+ volumes, 40 private study pods, IEEE/ACM/JSTOR digital access, RFID auto-issue.\n\n- 🏥 **Health & Medical Center**:\n  * **Hours**: **24/7 Emergency & In-Patient** | OPD: 8:30 AM – 7:00 PM\n  * **Emergency Hotline**: Dial ext. **5555** from any campus phone or call (555) 019-5555\n  * Free primary care, basic prescriptions, psychological counseling, and on-site ICU ambulances.\n\n- 🏋️ **Olympic Sports & Fitness Complex**:\n  * **Hours**: Daily 6:00 AM – 9:30 PM\n  * **Features**: 50m indoor heated pool, 2-floor gymnasium, synthetic turf football pitch, badminton & tennis courts.\n\n- 🌐 **Campus Wi-Fi & IT Helpdesk**:\n  * Connect to \`eduroam\` using student email. Free licenses for Office 365, MATLAB, JetBrains, and AutoCAD.\n  * Walk-in desk: Turing Block Ground Floor (8:00 AM – 8:00 PM).\n\n- 🥗 **Central Food Court & Dining**:\n  * Open 7:30 AM – 11:30 PM (Night canteen open till 2:00 AM during exams). Subway, Starbucks kiosk, Asian noodle bar, Wood-fired pizza.`,
      quickReplies: [
        "What are the library book borrowing rules?",
        "How do I report a Wi-Fi issue to IT support?",
        "What are the mess meal timings?",
        "What are the shuttle bus routes to metro stations?"
      ],
      links: [
        { label: "Explore All Facilities", action: "modal", target: "facilities" },
        { label: "Medical Emergency Help", action: "query", target: "What is the emergency medical contact number?" }
      ]
    };
  }

  // 7. General / Conversational Greeting
  return {
    category: "general",
    confidence: 0.88,
    entities: [{ name: "Intent", value: "Student Support & Query Resolution", type: "assistant" }],
    text: `Hello! I am your **${UNIVERSITY_NAME} NLP Student Assistant**. I am here to help answer questions and guide you through everything on campus!\n\nI can help you with:\n1. 🎓 **Admissions**: Eligibility requirements, entrance tests, document checklists & deadlines.\n2. 💳 **Fees & Financial Aid**: Semester tuition breakdowns, installment options & merit scholarships.\n3. 📅 **Timetable & Schedules**: Daily class routines, lecture halls, lab slots & semester calendars.\n4. 📝 **Examinations**: Mid-Term and Final schedules, hall tickets, grading policies & re-evaluations.\n5. 🏛️ **Departments & Faculty**: HOD directory, professor office hours & research lab facilities.\n6. 🏢 **Campus Facilities**: Central Library hours, 24/7 health center, hostel services, gym & food court.\n\nHow can I help you today? Feel free to ask in natural language or select one of the suggested topics below!`,
    quickReplies: [
      "What are the admission requirements for B.Tech?",
      "How much is the tuition fee per semester?",
      "Show me the class schedule for CS semester 4",
      "When are the Spring 2026 final exams?",
      "What are the Central Library hours?"
    ],
    links: [
      { label: "Fee Calculator", action: "modal", target: "fee_calc" },
      { label: "Timetable Hub", action: "modal", target: "timetable" },
      { label: "Exam Hub", action: "modal", target: "exams" }
    ]
  };
}

// System instruction for Gemini model
const SYSTEM_INSTRUCTION = `You are "CampusBot", the premier intelligent NLP Student Assistant for ${UNIVERSITY_NAME}.
Your role is to assist prospective students, current undergraduate & postgraduate students, parents, and faculty with accurate, clear, and empathetic answers across 6 core domains:
1. Admissions (eligibility, deadlines, documents, entrance scores)
2. Fees & Financial Aid (tuition structures, installments, scholarships, hostel costs)
3. Timetable & Schedules (class timings, 90-min lecture blocks, lab sessions, halls)
4. Examinations & Grading (exam schedules, hall tickets, 75% attendance rule, 10-point GPA scale, revaluation)
5. Academic Departments & Faculty (CSE, EEE, MAE, BME, SBM, HOD names, contact info, lab facilities)
6. Campus Facilities & Services (Central Library timings, 24/7 Health Clinic ext. 5555, Sports Complex, Dining, IT Support)

KNOWLEDGE BASE:
- University: Apex Institute of Science & Technology (AIST)
- Departments:
  * Computer Science (CSE) - HOD: Dr. Aris Thorne (PhD MIT), Turing Bldg Room CS-201, cs.dept@apex.edu.
  * Electrical & Electronics (EEE) - HOD: Dr. Priya Sharma (PhD Stanford), Tesla Hall Room EE-104, ee.dept@apex.edu.
  * Mechanical & Aerospace (MAE) - HOD: Dr. Marcus Vance (PhD Caltech), Von Braun Complex Room ME-110, me.dept@apex.edu.
  * Biotechnology (BME) - HOD: Dr. Elena Rostova (PhD Cambridge), Franklin Center Room BT-305, bio.dept@apex.edu.
  * School of Business (SBM) - Dean: Dr. Robert Sterling (PhD Harvard), Pavilion Room SB-401, business@apex.edu.
- Tuition Fees:
  * Undergraduate: $5,200/sem ($4,200 tuition + $1,000 lab/library/activity/development).
  * Postgraduate: $6,600/sem ($5,400 tuition + $1,200 fees).
  * Hostel: Single AC ($1,800/sem), Double AC ($1,350/sem), Double Non-AC ($950/sem), Triple ($750/sem) including 4-course dining.
  * Scholarships: Chancellor's Merit (100% waiver for top 2%), Dean's Award (50% waiver for 9.2+ CGPA), Women in STEM ($2k/year), Need-Based (up to 60% subsidy).
  * Installments: 40% at registration, 30% at 45 days, 30% before midterms.
- Timetable & Classes:
  * Standard slots: 9:00-10:30 AM, 11:00-12:30 PM, Lunch 12:30-2:00 PM, Labs 2:00-4:30 PM/5:00 PM.
  * CS Sem 4: Algorithms (Mon/Wed 9-10:30 Hall A-102), DBMS (Mon/Wed 11-12:30 Hall A-102), OS (Tue/Thu 9-10:30 Hall B-201), Discrete Math (Tue 11-12:30 Hall B-201), Labs in 208/214.
- Examinations:
  * Spring 2026 finals: CS401 (Apr 18), CS402 (Apr 21), CS403 (Apr 24), MA401 (Apr 27), HU401 (Apr 30).
  * 75% attendance mandatory. Hall tickets available 7 days prior. Re-evaluation fee $20/paper within 14 days of results.
- Facilities:
  * Library: Mon-Sat 8am-11pm, Sun 10am-6pm, 24/7 during exam weeks. 180k books, 40 study pods.
  * Health Center: 24/7 Emergency & in-patient, ext. 5555, ambulance on stand-by, free doctor consultation and mental health counseling.
  * Sports: 6am-9:30pm daily, 50m heated pool, 2-floor gym, football turf, tennis & badminton courts.
  * IT Helpdesk: Turing Block Ground Floor, eduroam Wi-Fi, free Office 365/MATLAB/JetBrains.
  * Dining: SAC Central Food Court 7:30am-11:30pm (night canteen till 2am in exam weeks), Starbucks kiosk, Subway, salad bar.

OUTPUT FORMAT:
Always return your response as a valid JSON object matching this schema:
{
  "category": "admissions" | "fees" | "timetable" | "examinations" | "departments" | "facilities" | "general",
  "confidence": number (between 0.8 and 1.0),
  "entities": [{ "name": string, "value": string, "type": string }],
  "text": string (formatted in clean, elegant Markdown with headings, bullet points, and bold terms),
  "quickReplies": string[] (3 to 4 relevant follow-up questions the student might ask next),
  "links": [{ "label": string, "action": "modal" | "query", "target": string }]
}
Ensure the text is helpful, professional, structured, and easy to read.`;

// API Endpoints
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, studentProfile } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message string is required." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Use rich fallback rule-based NLP matcher
      const fallbackResult = fallbackNlpMatcher(message, studentProfile);
      return res.json(fallbackResult);
    }

    // Call Gemini 3.7 Flash with structured JSON output
    const prompt = `Student Profile: Major=${studentProfile?.major || "Computer Science"}, Semester=${studentProfile?.semester || 4}, Type=${studentProfile?.studentType || "undergraduate"}.
Conversation History:
${(history || []).slice(-6).map((h: any) => `${h.role === 'user' ? 'Student' : 'CampusBot'}: ${h.text}`).join("\n")}

Student's Latest Query: "${message}"

Analyze the student's query using NLP, classify the intent, extract entities, answer thoroughly grounded in the university facts, provide 3-4 natural follow-up suggested queries, and format as JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.3,
      }
    });

    const responseText = response.text;
    if (!responseText) {
      const fallback = fallbackNlpMatcher(message, studentProfile);
      return res.json(fallback);
    }

    try {
      const parsed = JSON.parse(responseText);
      return res.json(parsed);
    } catch (parseErr) {
      console.warn("Failed to parse Gemini JSON output, using fallback:", parseErr);
      const fallback = fallbackNlpMatcher(message, studentProfile);
      return res.json(fallback);
    }
  } catch (error: any) {
    console.error("Chat API error:", error);
    const fallback = fallbackNlpMatcher(req.body?.message || "", req.body?.studentProfile);
    return res.json(fallback);
  }
});

// Category and FAQ endpoints
app.get("/api/faqs", (req, res) => {
  res.json(COMMON_FAQS);
});

app.get("/api/departments", (req, res) => {
  res.json(DEPARTMENTS);
});

app.get("/api/facilities", (req, res) => {
  res.json(CAMPUS_FACILITIES);
});

app.get("/api/timetables", (req, res) => {
  res.json(TIMETABLE_DATA);
});

app.get("/api/fees", (req, res) => {
  res.json(FEE_STRUCTURES);
});

app.get("/api/exams", (req, res) => {
  res.json(UPCOMING_EXAMS);
});

app.post("/api/feedback", (req, res) => {
  const { messageId, feedback, query } = req.body;
  console.log(`[Feedback Logged] ID: ${messageId}, Vote: ${feedback}, Query: "${query}"`);
  res.json({ success: true, message: "Thank you for your feedback!" });
});

// Vite middleware / Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Student Query Assistant server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
