let http = require('http');

let server = http.createServer((req, res)=>{
    console.log("I am a server")
    res.end("ab aaaaaaayeg amajaa")
    
})

server.listen(3000, ()=>{
    console.log("I am server")
    
})