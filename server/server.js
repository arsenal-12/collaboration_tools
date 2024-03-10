const mongoose = require('mongoose');

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

io.on("connection", socket => {
  socket.on("get-document", documentId => {
    const data = ""    
    socket.join(documentId)
    socket.emit("load-document", data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    // Add message handling code
    socket.on("message", message => {
      io.emit("message", message); // Broadcast the message to all clients
    });
  })

  // Add disconnect event handler
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
})
