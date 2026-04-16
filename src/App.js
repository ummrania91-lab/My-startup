import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import Dashboard from './pages/Dashboard';
import Course from './pages/Course';

// 1. AI Agent Context to store student pacing and guidelines
export const StudyContext = createContext();

function App() {
  // Global state for the AI Agent to track student pace and materials
  const [studentData, setStudentData] = useState({
    pace: 'steady', // 'steady', 'fast', or 'deep-dive'
    completedModules: [],
    currentNotes: "",
    savedFlashcards: []
  });

  // AI Agent Guidelines - Internalized logic for the companion
  const agentGuidelines = {
    style: "Feynman Technique",
    colors: { primary: "#F5F5DC", accent: "#2E7D32", text: "#5D4037" },
    features: ["Summarize", "Flashcards", "Timetable", "Stylus Notes"]
  };

  return (
    <StudyContext.Provider value={{ studentData, setStudentData, agentGuidelines }}>
      <HashRouter>
        <div className="min-h-screen bg-[#F5F5DC] text-[#5D4037]"> 
          {/* Main App Container with your beige theme */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/course/:courseId" element={<Course />} />
          </Routes>
        </div>
      </HashRouter>
    </StudyContext.Provider>
  );
}

export default App;
