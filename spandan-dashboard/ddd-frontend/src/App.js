import { useEffect, useState } from "react"

function App() {
  const [students, setStudents] = useState([])
  const [questions, setQuestions] = useState([])
  const [session, setSession] = useState({})
  const [achievements, setAchievements] = useState([])
  const [points, setPoints] = useState({})

  const fetchData = () => {
    fetch("http://localhost:5000/student-performance")
      .then(res => res.json())
      .then(data => setStudents(data))

    fetch("http://localhost:5000/questions/1")
      .then(res => res.json())
      .then(data => setQuestions(data))

    fetch("http://localhost:5000/session/1")
      .then(res => res.json())
      .then(data => setSession(data))

    fetch("http://localhost:5000/achievements/1")
      .then(res => res.json())
      .then(data => setAchievements(data))

    fetch("http://localhost:5000/points/1")
      .then(res => res.json())
      .then(data => setPoints(data))
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const sortByPoints = () => {
    const sorted = [...students].sort((a, b) => b.totalPoints - a.totalPoints)
    setStudents(sorted)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>DDD Teacher Dashboard 🚀</h1>

      <h2>Session Overview</h2>
      <p>Status: {session.sessionStatus}</p>
      <p>Total Students: {session.totalStudents}</p>
      <p>Total Questions: {session.totalQuestions}</p>
      <p>Total Points: {session.totalPoints}</p>

      <h2>Student Performance</h2>
      <button onClick={sortByPoints}>Sort by Points</button>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Attempted</th>
            <th>Correct</th>
            <th>Incorrect</th>
            <th>Points</th>
            <th>Response Time</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.studentId}>
              <td>{s.studentId}</td>
              <td>{s.questionsAttempted}</td>
              <td>{s.correctAnswers}</td>
              <td>{s.incorrectAnswers}</td>
              <td>{s.totalPoints}</td>
              <td>{s.avgResponseTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "40px" }}>Question Analytics</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Responses</th>
            <th>Correct %</th>
            <th>Avg Time</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.questionId}>
              <td>{q.questionId}</td>
              <td>{q.responseCount}</td>
              <td style={{ color: q.correctPercentage < 50 ? "red" : "green" }}>
                {q.correctPercentage}
              </td>
              <td>{q.avgAnswerTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Achievements</h2>
      <ul>
        {achievements.map((a, index) => (
          <li key={index}>
            Student {a.studentId} - {a.badge}
          </li>
        ))}
      </ul>

      <h2>Points Insights</h2>
      <p>Average Points: {points.avgPoints}</p>
      <p>Highest Points: {points.highestPoints}</p>
      <p>Lowest Points: {points.lowestPoints}</p>

      <h2>Post Session Summary</h2>
      <p>Total Students: {session.totalStudents}</p>
      <p>Total Points: {session.totalPoints}</p>
    </div>
  )
}

export default App