const express =  require('express')
const app = express()
const dotenv = require("dotenv")
const { users } = require('./data')

// 백엔드 코드에서 Json 사용이 가능하게 설정
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 환경변수 로드
dotenv.config()

// CRUD
app.get('/', (req, res) => {
    res.json({ message: "후츠릿짱" })
})

app.get('/users', (req, res) => {
    res.json({
        name: "홍길동",
        mbti: "INTJ"
    }).status(200)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    console.log("🚀 ~ app.get ~ id:", id, 'type', typeof id)

    const findUser = users.find((item) => item.id === Number(id))
    console.log("🚀 ~ app.get ~ findUser:", findUser)

    if(!findUser) {
        res.status(404).json({
            message:'user not found.'
        })
    } else {
        res.status(200).json(findUser)
    }
})

app.post('/users', (req, res) => {
    const userInfo = req.body
    console.log('name', userInfo.name, 'mbti', userInfo.mbti)
    userInfo.id = Date.now();
    users.push(userInfo)
    res.status(201).json({ users })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('Server Running at...', PORT)
})