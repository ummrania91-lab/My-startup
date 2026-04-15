import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Tutor from './pages/Tutor';
import StudyPlan from './pages/StudyPlan';
import Flashcards from './pages/Flashcards';
import Progress from './pages/Progress';
import Research from './pages/Research';
import Assignment from './pages/Assignment';
import Focus from './pages/Focus';
import ExamPrep from './pages/ExamPrep';
import Profile from './pages/Profile';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/study-plan" element={<StudyPlan />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/research" element={<Research />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/exam-prep" element={<ExamPrep />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
