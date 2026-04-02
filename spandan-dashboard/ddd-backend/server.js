const express = require("express")
const cors = require("cors")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

console.log("SERVER RESTARTED SUCCESSFULLY 🚀")

app.get("/", (req, res) => {
    res.send("DDD Backend Running 🚀")
})

app.get("/activity", (req, res) => {
    res.json({
        message: "Use POST /activity to send real data",
        sample: {
            userId: "101",
            project: "Spandan",
            action: "question_answered",
            isCorrect: true,
            responseTime: 12
        }
    })
})

app.post("/activity", (req, res) => {
    const data = req.body
    console.log("Activity received:", data)

    res.json({
        message: "Activity stored successfully",
        data: data
    })
})

app.get("/student-performance", (req, res) => {

    const students = [
        {
            studentId: "101",
            questionsAttempted: 10,
            correctAnswers: 8,
            incorrectAnswers: 2,
            totalPoints: 80,
            avgResponseTime: 12
        },
        {
            studentId: "102",
            questionsAttempted: 10,
            correctAnswers: 6,
            incorrectAnswers: 4,
            totalPoints: 60,
            avgResponseTime: 15
        },
        {
            studentId: "103",
            questionsAttempted: 10,
            correctAnswers: 9,
            incorrectAnswers: 1,
            totalPoints: 90,
            avgResponseTime: 10
        }
    ]

    const sortBy = req.query.sortBy
    const order = req.query.order

    if (sortBy) {
        students.sort((a, b) => {
            if (order === "desc") {
                return b[sortBy] - a[sortBy]
            } else {
                return a[sortBy] - b[sortBy]
            }
        })
    }

    res.json(students)
})

app.get("/session/:id", (req, res) => {
    const sessionId = req.params.id

    const session = {
        sessionId: sessionId,
        sessionStatus: "completed",
        totalStudents: 3,
        totalQuestions: 10,
        totalPoints: 230
    }

    res.json(session)
})

app.get("/questions/:sessionId", (req, res) => {
    const questions = [
        {
            questionId: "q1",
            responseCount: 30,
            correctPercentage: 70,
            avgAnswerTime: 12
        },
        {
            questionId: "q2",
            responseCount: 25,
            correctPercentage: 40,
            avgAnswerTime: 18
        },
        {
            questionId: "q3",
            responseCount: 28,
            correctPercentage: 85,
            avgAnswerTime: 10
        }
    ]

    res.json(questions)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})