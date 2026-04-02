import { useEffect, useState } from "react"

function App() {
  const [students, setStudents] = useState([])
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/student-performance")
      .then(res => res.json())
      .then(data => setStudents(data))

    fetch("http://localhost:3000/questions/1")
      .then(res => res.json())
      .then(data => setQuestions(data))
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>DDD Teacher Dashboard 🚀</h1>

      <h2>Student Performance</h2>
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