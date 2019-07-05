let app = require('express')()
let http = require('http').createServer(app)
let io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.send('Test')
})

io.on('connection', socket => {
  console.log('Host connected:', socket.id)
  socket.on('disconnect', () => {
    console.log('Host disconnected:', socket.id)
  })

  socket.on('hostRoom', roomNum => {
    console.log('hosted')
    const nsp = io.of('/' + roomNum)
    nsp.on('connection', () => {
      console.log('user joined nsp')
      console.log('name:', nsp.name)
      console.log('connected:', Object.keys(nsp.connected))
      console.log('ids', nsp.ids)
    })
  })
})
http.listen(8000)
