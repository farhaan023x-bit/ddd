import React, { useEffect, useState } from "react";

interface Goal {
  title: string;
  target: number;
  progress: number;
  emoji: string;
}

const STORAGE_KEY = "daily_goals_v1";

// ✅ LOAD directly in useState (THIS IS THE FIX)
const getInitialGoals = (): Goal[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [
    { title: "Watch Videos", target: 3, progress: 1, emoji: "🎥" },
    { title: "Complete Quiz", target: 2, progress: 0, emoji: "📝" },
  ];
};

const DailyGoal: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(getInitialGoals);
  const [newGoal, setNewGoal] = useState("");
  const [target, setTarget] = useState(1);

  // ✅ SAVE only
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const getEmoji = (text: string) => {
    if (text.includes("study")) return "📚";
    if (text.includes("quiz")) return "📝";
    if (text.includes("video")) return "🎥";
    return "🎯";
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;

    setGoals([
      ...goals,
      {
        title: newGoal,
        target,
        progress: 0,
        emoji: getEmoji(newGoal.toLowerCase()),
      },
    ]);

    setNewGoal("");
    setTarget(1);
  };

  const increaseProgress = (index: number) => {
    const updated = [...goals];
    if (updated[index].progress < updated[index].target) {
      updated[index].progress++;
      setGoals(updated);
    }
  };

  const deleteGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
      
      {/* Title */}
      <div style={{ textAlign: "center", color: "#e5e7eb", fontWeight: 600 }}>
        🎯 Daily Goals
      </div>

      {/* Add Goal */}
      <div style={{ display: "flex", gap: "6px" }}>
        <input
          placeholder="New goal..."
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          style={{
            flex: 1,
            padding: "6px",
            borderRadius: "6px",
            border: "none",
            background: "#1f2937",
            color: "white",
          }}
        />

        <input
          type="number"
          min={1}
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          style={{
            width: "50px",
            borderRadius: "6px",
            border: "none",
            background: "#1f2937",
            color: "white",
            textAlign: "center",
          }}
        />

        <button onClick={addGoal} style={{ padding: "6px 10px", cursor: "pointer" }}>
          ➕
        </button>
      </div>

      {/* Goals */}
      {goals.map((goal, index) => {
        const percent = (goal.progress / goal.target) * 100;
        const completed = goal.progress >= goal.target;

        return (
          <div
            key={index}
            style={{
              background: completed ? "#16a34a" : "rgba(255,255,255,0.05)",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: "white" }}>
              <span>{goal.emoji} {goal.title}</span>

              <div style={{ display: "flex", gap: "8px" }}>
                <span>{goal.progress}/{goal.target}</span>

                {!completed && (
                  <span onClick={() => increaseProgress(index)} style={{ cursor: "pointer" }}>
                    ➕
                  </span>
                )}

                <span onClick={() => deleteGoal(index)} style={{ cursor: "pointer" }}>
                  🗑️
                </span>
              </div>
            </div>

            <div style={{ height: "6px", background: "#374151", marginTop: "6px" }}>
              <div style={{ width: `${percent}%`, height: "100%", background: "#3b82f6" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyGoal;