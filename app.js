const express = require("express");
const server = express();

server.use(express.static(__dirname + "/public"));

server.get("/", (req, res) => {
 
  res.sendFile(__dirname + "/HTML/start.html");
});

server.get("/select_tree.html", (req, res) => {
 
    res.sendFile(__dirname + "/HTML/select_tree.html");
});

server.get("/select_graph.html", (req, res) => {
 
    res.sendFile(__dirname + "/HTML/select_graph.html");
});

server.get("/select_heap.html", (req, res) => {
 
    res.sendFile(__dirname + "/HTML/select_heap.html");
});
server.get("/select_stack.html", (req, res) => {
 
    res.sendFile(__dirname + "/HTML/select_stack.html");
});

server.get("/select_queue.html", (req, res) => {
 
    res.sendFile(__dirname + "/HTML/select_queue.html");
});

server.get("/select_linked_list.html", (req, res) => {
 
    res.sendFile(__dirname + "/HTML/select_linked_list.html");
});

server.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log("The server is listening on port 3000");
});