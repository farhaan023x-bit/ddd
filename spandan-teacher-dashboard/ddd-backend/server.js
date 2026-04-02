const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/ddd")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err))

const activitySchema = new mongoose.Schema({
  userId: String,
  project: String,
  action: String,
  isCorrect: Boolean,
  responseTime: Number
})

const Activity = mongoose.model("Activity", activitySchema)

app.get("/", (req, res) => {
  res.send("DDD Backend Running 🚀")
})

app.post("/activity", async (req, res) => {
  const newActivity = new Activity(req.body)
  await newActivity.save()
  res.json({ message: "Saved in DB" })
})

app.get("/student-performance", async (req, res) => {
  const activities = await Activity.find()

  const map = {}

  activities.forEach(a => {
    if (!map[a.userId]) {
      map[a.userId] = {
        studentId: a.userId,
        questionsAttempted: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        totalPoints: 0,
        totalTime: 0
      }
    }

    map[a.userId].questionsAttempted++
    map[a.userId].totalTime += a.responseTime

    if (a.isCorrect) {
      map[a.userId].correctAnswers++
      map[a.userId].totalPoints += 10
    } else {
      map[a.userId].incorrectAnswers++
    }
  })

  let students = Object.values(map).map(s => ({
    ...s,
    avgResponseTime: (s.totalTime / s.questionsAttempted).toFixed(2)
  }))

  const sortBy = req.query.sortBy
  const order = req.query.order

  if (sortBy) {
    students.sort((a, b) => {
      if (order === "desc") return b[sortBy] - a[sortBy]
      return a[sortBy] - b[sortBy]
    })
  }

  res.json(students)
})

app.get("/questions/:sessionId", async (req, res) => {
  const activities = await Activity.find()

  const map = {}

  activities.forEach((a, i) => {
    const qId = "q" + (i % 3 + 1)

    if (!map[qId]) {
      map[qId] = {
        questionId: qId,
        responseCount: 0,
        correctCount: 0,
        totalTime: 0
      }
    }

    map[qId].responseCount++
    map[qId].totalTime += a.responseTime

    if (a.isCorrect) map[qId].correctCount++
  })

  const questions = Object.values(map).map(q => ({
    questionId: q.questionId,
    responseCount: q.responseCount,
    correctPercentage: ((q.correctCount / q.responseCount) * 100).toFixed(2),
    avgAnswerTime: (q.totalTime / q.responseCount).toFixed(2)
  }))

  res.json(questions)
})

app.get("/session/:id", async (req, res) => {
  const activities = await Activity.find()

  const totalStudents = new Set(activities.map(a => a.userId)).size
  const totalQuestions = activities.length
  const totalPoints = activities.filter(a => a.isCorrect).length * 10

  res.json({
    sessionId: req.params.id,
    sessionStatus: "completed",
    totalStudents,
    totalQuestions,
    totalPoints
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})