let app = require('express')()
let http = require('http').createServer(app)
let io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.send('Test')
})

io.on('connection', socket => {
  console.log('a user connected:', socket.id)
  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id)
  })
})

http.listen(8000)

//console.log(Math.floor(100000 + Math.random() * 900000))
