const express = require("express")
const cors = require("cors")

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

console.log("SERVER RESTARTED SUCCESSFULLY 🚀")

app.get("/", (req, res) => {
    res.send("DDD Backend Running 🚀")
})

// ACTIVITY API
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

// STUDENT PERFORMANCE API (WITH SORTING + REAL-TIME SIMULATION)
app.get("/student-performance", (req, res) => {

    let students = [
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

    // REAL-TIME SIMULATION
    students = students.map(s => ({
        ...s,
        totalPoints: s.totalPoints + Math.floor(Math.random() * 5)
    }))

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

// SESSION OVERVIEW API
app.get("/session/:id", (req, res) => {
    const sessionId = req.params.id

    const session = {
        sessionId: sessionId,
        sessionStatus: "Live",
        totalStudents: 3,
        totalQuestions: 10,
        totalPoints: 230
    }

    res.json(session)
})

// QUESTION ANALYTICS API
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

// ACHIEVEMENTS API
app.get("/achievements/:sessionId", (req, res) => {
    const achievements = [
        { studentId: "101", badge: "Top Performer" },
        { studentId: "102", badge: "Consistent Learner" },
        { studentId: "103", badge: "Fast Responder" }
    ]

    res.json(achievements)
})

// POINTS INSIGHTS API
app.get("/points/:sessionId", (req, res) => {
    const pointsData = {
        avgPoints: 76,
        highestPoints: 90,
        lowestPoints: 60
    }

    res.json(pointsData)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})