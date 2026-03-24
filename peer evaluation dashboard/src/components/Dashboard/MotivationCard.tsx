import React, { useEffect, useState } from "react";

const quotes: string[] = [
  "Keep going, you're doing great 🚀",
  "Consistency beats motivation 💪",
  "Small progress is still progress 📈",
  "Push yourself, because no one else will 🔥",
  "Discipline = Freedom ⚡",
  "Dream big. Start small. Act now 🌱",
  "Success is built daily 🧱",
  "Stay focused and never give up 🎯",
  "You are stronger than you think 💥",
  "Make today count ⏳",
  "Hard work beats talent 💼",
  "Your only limit is you 🚧",
  "Believe in yourself 🌟",
  "Progress over perfection ✔️",
  "Keep learning, keep growing 📚",
  "Winners don’t quit 🏆",
];

const emojis: string[] = ["✨", "🔥", "💪", "🚀", "🌟", "⚡"];

const MotivationCard: React.FC = () => {
  const [quote, setQuote] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("✨");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // random quote
    const randomQuote =
      quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);

    // random emoji
    const randomEmoji =
      emojis[Math.floor(Math.random() * emojis.length)];
    setEmoji(randomEmoji);

    // animation
    setTimeout(() => setVisible(true), 200);
  }, []);

  const container: React.CSSProperties = {
    width: "100%",
    height: "100%",
    minHeight: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  };

  const glowBg: React.CSSProperties = {
    position: "absolute",
    width: "220px",
    height: "220px",
    background:
      "radial-gradient(circle, rgba(59,130,246,0.2), transparent)",
    filter: "blur(50px)",
  };

  const content: React.CSSProperties = {
    zIndex: 2,
    textAlign: "center",
    padding: "20px",
    transition: "all 0.8s ease",
    transform: visible ? "translateY(0)" : "translateY(20px)",
    opacity: visible ? 1 : 0,
  };

  const emojiStyle: React.CSSProperties = {
    fontSize: "38px",
    marginBottom: "12px",
    animation: "float 3s ease-in-out infinite",
  };

  const text: React.CSSProperties = {
    color: "#e5e7eb",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "1.5",
  };

  return (
    <div style={container}>
      <div style={glowBg}></div>

      <div style={content}>
        <div style={emojiStyle}>{emoji}</div>
        <div style={text}>{quote}</div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default MotivationCard;