let app = require('express')()
let http = require('http').createServer(app)
let io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.send('Test')
})

users = []

createUser = name => {
  users.push({ name: name, role: '' })
  console.log(users)
}

io.on('connection', socket => {
  console.log('Host connected:', socket.id)
  socket.on('disconnect', () => {
    console.log('Host disconnected:', socket.id)
  })

  socket.on('hostRoom', roomNum => {
    console.log('hosted')
    const nsp = io.of('/' + roomNum)
    nsp.on('connection', room => {
      console.log('connected:', Object.keys(nsp.connected))
      room.on('createUser', name => createUser(name))
    })
  })
})
http.listen(8000)
