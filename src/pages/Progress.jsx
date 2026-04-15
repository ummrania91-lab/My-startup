import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingState from '../components/LoadingState';
import { getProgressData } from '../services/api';

export default function Progress() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProgressData().then((d) => { setData(d); setLoading(false); });
  }, []);

  if (loading) return <div className="min-h-screen bg-sb-cream"><Navbar /><LoadingState message="Loading your progress..." /></div>;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxHours = Math.max(...data.weeklyHours);

  return (
    <div className="min-h-screen bg-sb-cream">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-heading text-3xl font-bold text-sb-brown-dark mb-2">📊 Progress Dashboard</h1>
        <p className="text-sb-brown-med mb-8">Track your growth and find your weak spots.</p>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Study Hours', value: `${data.totalStudyHours}h`, icon: '⏱', color: 'text-sb-green' },
            { label: 'Day Streak', value: data.streak, icon: '🔥', color: 'text-sb-brown' },
            { label: 'Topics Done', value: data.topicsCompleted, icon: '✅', color: 'text-sb-green-dark' },
            { label: 'Avg Score', value: `${data.averageScore}%`, icon: '🎯', color: 'text-sb-brown' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-5 text-center">
              <p className="text-2xl mb-1">{s.icon}</p>
              <p className={`text-2xl font-bold font-heading ${s.color}`}>{s.value}</p>
              <p className="text-xs text-sb-brown-med mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly activity chart */}
          <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6">
            <h3 className="font-heading font-bold text-lg text-sb-brown-dark mb-4">Weekly Activity</h3>
            <div className="flex items-end justify-between gap-2 h-40">
              {data.weeklyHours.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-medium text-sb-brown-med">{h}h</span>
                  <div
                    className="w-full bg-sb-green/80 rounded-t-lg transition-all duration-500"
                    style={{ height: `${maxHours > 0 ? (h / maxHours) * 100 : 0}%`, minHeight: '4px' }}
                  />
                  <span className="text-xs text-sb-brown-med">{days[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject strengths */}
          <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6">
            <h3 className="font-heading font-bold text-lg text-sb-brown-dark mb-4">Subject Strengths</h3>
            <div className="space-y-4">
              {data.subjectStrengths.map((s) => {
                const color = s.status === 'strong' ? 'bg-sb-green' : s.status === 'weak' ? 'bg-red-400' : 'bg-yellow-400';
                const badge = s.status === 'strong' ? 'text-sb-green-dark bg-sb-green/10' : s.status === 'weak' ? 'text-red-600 bg-red-50' : 'text-yellow-700 bg-yellow-50';
                return (
                  <div key={s.subject}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-sb-brown-dark">{s.subject}</span>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badge}`}>{s.score}%</span>
                    </div>
                    <div className="bg-sb-beige rounded-full h-2">
                      <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${s.score}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="mt-6 bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6">
          <h3 className="font-heading font-bold text-lg text-sb-brown-dark mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {data.recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-sb-beige/50">
                <span className="text-xs text-sb-brown-med font-medium w-20 flex-shrink-0">{a.date}</span>
                <span className="text-sm text-sb-brown-dark flex-1">{a.action}</span>
                {a.score !== null && <span className="text-sm font-semibold text-sb-green">{a.score}%</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
