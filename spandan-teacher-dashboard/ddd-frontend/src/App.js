import { useEffect, useState } from "react"

function App() {
  const [students, setStudents] = useState([])
  const [questions, setQuestions] = useState([])
  const [session, setSession] = useState({})

  const fetchData = () => {
    fetch("http://localhost:3000/student-performance")
      .then(res => res.json())
      .then(data => setStudents(data))

    fetch("http://localhost:3000/questions/1")
      .then(res => res.json())
      .then(data => setQuestions(data))

    fetch("http://localhost:3000/session/1")
      .then(res => res.json())
      .then(data => setSession(data))
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>DDD Teacher Dashboard 🚀</h1>

      <h2>Session Overview</h2>
      <p>Status: {session.sessionStatus}</p>
      <p>Total Students: {session.totalStudents}</p>
      <p>Total Questions: {session.totalQuestions}</p>
      <p>Total Points: {session.totalPoints}</p>

      <h2>Student Performance</h2>

      <select onChange={(e) => {
        fetch(`http://localhost:3000/student-performance?sortBy=${e.target.value}&order=desc`)
          .then(res => res.json())
          .then(data => setStudents(data))
      }}>
        <option value="">Sort By</option>
        <option value="totalPoints">Points</option>
        <option value="correctAnswers">Accuracy</option>
        <option value="avgResponseTime">Response Time</option>
      </select>

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

      <h2>Achievements</h2>
      <ul>
        {students.map(s => (
          <li key={s.studentId}>
            {s.studentId} - {s.totalPoints > 80 ? "🏆 Top Performer" : "⭐ Active"}
          </li>
        ))}
      </ul>

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
              <td>{q.correctPercentage}</td>
              <td>{q.avgAnswerTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App