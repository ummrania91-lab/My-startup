import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingState from '../components/LoadingState';
import { getUserProfile, updateUserProfile, POPULAR_SUBJECTS } from '../services/api';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [subjectInput, setSubjectInput] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getUserProfile().then((p) => { setProfile(p); setForm(p); setLoading(false); });
  }, []);

  const addSubject = () => {
    const s = subjectInput.trim();
    if (s && !form.subjects.includes(s)) {
      setForm({ ...form, subjects: [...form.subjects, s] });
      setSubjectInput('');
    }
  };

  const removeSubject = (s) => setForm({ ...form, subjects: form.subjects.filter((x) => x !== s) });

  const addGoal = (goal) => {
    if (goal && !form.goals.includes(goal)) setForm({ ...form, goals: [...form.goals, goal] });
  };

  const removeGoal = (g) => setForm({ ...form, goals: form.goals.filter((x) => x !== g) });

  const handleSave = async () => {
    await updateUserProfile(form);
    setProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div className="min-h-screen bg-sb-cream"><Navbar /><LoadingState message="Loading profile..." /></div>;

  return (
    <div className="min-h-screen bg-sb-cream">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-sb-brown-dark">🤖 Your Profile</h1>
            <p className="text-sb-brown-med">SkillBites remembers your goals, style, and progress.</p>
          </div>
          {!editing && (
            <button onClick={() => setEditing(true)} className="bg-sb-green hover:bg-sb-green-dark text-white text-sm font-semibold px-5 py-2 rounded-full transition-all">
              Edit
            </button>
          )}
        </div>

        {saved && (
          <div className="mb-4 bg-sb-green/10 border border-sb-green/30 text-sb-green-dark text-sm font-medium px-4 py-3 rounded-xl">
            Profile saved successfully!
          </div>
        )}

        <div className="space-y-6">
          {/* Name */}
          <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6">
            <label className="block text-sm font-semibold text-sb-brown-dark mb-2">Display Name</label>
            {editing ? (
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border-2 border-sb-sand rounded-xl px-4 py-2.5 text-sm focus:border-sb-green outline-none" />
            ) : (
              <p className="text-sb-brown">{profile.name}</p>
            )}
          </div>

          {/* Learning Style */}
          <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6">
            <label className="block text-sm font-semibold text-sb-brown-dark mb-3">Learning Style</label>
            <div className="flex flex-wrap gap-2">
              {['visual', 'reading', 'auditory', 'hands-on'].map((s) => (
                <button
                  key={s}
                  onClick={() => editing && setForm({ ...form, learningStyle: s })}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                    (editing ? form.learningStyle : profile.learningStyle) === s
                      ? 'bg-sb-green text-white'
                      : editing ? 'bg-sb-beige text-sb-brown-med hover:bg-sb-sand/50 cursor-pointer' : 'bg-sb-beige text-sb-brown-med'
                  }`}
                >
                  {s === 'visual' && '🎨 '}{s === 'reading' && '📖 '}{s === 'auditory' && '🔊 '}{s === 'hands-on' && '🛠 '}{s}
                </button>
              ))}
            </div>
          </div>

          {/* Level */}
          <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6">
            <label className="block text-sm font-semibold text-sb-brown-dark mb-3">Level</label>
            <div className="flex gap-2">
              {['beginner', 'intermediate', 'advanced'].map((l) => (
                <button
                  key={l}
                  onClick={() => editing && setForm({ ...form, level: l })}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                    (editing ? form.level : profile.level) === l
                      ? 'bg-sb-green text-white'
                      : editing ? 'bg-sb-beige text-sb-brown-med hover:bg-sb-sand/50 cursor-pointer' : 'bg-sb-beige text-sb-brown-med'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6">
            <label className="block text-sm font-semibold text-sb-brown-dark mb-2">My Subjects</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {(editing ? form.subjects : profile.subjects).map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 bg-sb-green/10 text-sb-green-dark text-sm font-medium px-3 py-1.5 rounded-full">
                  {s}
                  {editing && <button onClick={() => removeSubject(s)} className="hover:text-red-500">×</button>}
                </span>
              ))}
            </div>
            {editing && (
              <div className="flex gap-2">
                <input
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSubject())}
                  placeholder="Add a subject..."
                  list="profile-subjects"
                  className="flex-1 border-2 border-sb-sand rounded-xl px-4 py-2 text-sm focus:border-sb-green outline-none"
                />
                <datalist id="profile-subjects">{POPULAR_SUBJECTS.map((s) => <option key={s} value={s} />)}</datalist>
                <button onClick={addSubject} type="button" className="bg-sb-green text-white px-4 py-2 rounded-xl text-sm font-semibold">Add</button>
              </div>
            )}
          </div>

          {/* Goals */}
          <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6">
            <label className="block text-sm font-semibold text-sb-brown-dark mb-2">My Goals</label>
            <div className="space-y-2 mb-3">
              {(editing ? form.goals : profile.goals).map((g) => (
                <div key={g} className="flex items-center gap-2 bg-sb-beige rounded-xl px-4 py-2.5">
                  <span className="text-sm text-sb-brown flex-1">{g}</span>
                  {editing && <button onClick={() => removeGoal(g)} className="text-sb-brown-med hover:text-red-500 text-lg">×</button>}
                </div>
              ))}
            </div>
            {editing && (
              <input
                placeholder="Add a goal and press Enter..."
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addGoal(e.target.value.trim()); e.target.value = ''; } }}
                className="w-full border-2 border-sb-sand rounded-xl px-4 py-2 text-sm focus:border-sb-green outline-none"
              />
            )}
          </div>

          {/* Study preferences */}
          <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6">
            <label className="block text-sm font-semibold text-sb-brown-dark mb-2">
              Daily Study Goal: <span className="text-sb-green">{editing ? form.dailyGoalMinutes : profile.dailyGoalMinutes} min</span>
            </label>
            {editing ? (
              <input type="range" min="15" max="300" step="15" value={form.dailyGoalMinutes} onChange={(e) => setForm({ ...form, dailyGoalMinutes: Number(e.target.value) })} className="w-full accent-sb-green" />
            ) : (
              <div className="bg-sb-beige rounded-full h-3">
                <div className="h-full bg-sb-green rounded-full" style={{ width: `${(profile.dailyGoalMinutes / 300) * 100}%` }} />
              </div>
            )}
          </div>

          {/* Weak / Strong areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-2xl border border-red-200/50 p-5">
              <h4 className="font-heading font-bold text-red-700 mb-2">Weak Areas</h4>
              <div className="flex flex-wrap gap-2">
                {profile.weakAreas.map((a) => (
                  <span key={a} className="bg-red-100 text-red-700 text-sm font-medium px-3 py-1 rounded-full">{a}</span>
                ))}
              </div>
            </div>
            <div className="bg-sb-green/5 rounded-2xl border border-sb-green/20 p-5">
              <h4 className="font-heading font-bold text-sb-green-dark mb-2">Strong Areas</h4>
              <div className="flex flex-wrap gap-2">
                {profile.strongAreas.map((a) => (
                  <span key={a} className="bg-sb-green/10 text-sb-green-dark text-sm font-medium px-3 py-1 rounded-full">{a}</span>
                ))}
              </div>
            </div>
          </div>

          {editing && (
            <div className="flex gap-3">
              <button onClick={handleSave} className="flex-1 bg-sb-green hover:bg-sb-green-dark text-white font-semibold py-3 rounded-full transition-all">Save Changes</button>
              <button onClick={() => { setEditing(false); setForm(profile); }} className="px-6 py-3 border-2 border-sb-sand text-sb-brown-med rounded-full font-semibold hover:bg-sb-beige transition-all">Cancel</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
