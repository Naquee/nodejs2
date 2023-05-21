const http =require("http")
const fs=require("fs")

const server = http.createServer((req,res) => {
    // res.write("Welcome to the Bhopal")
    // res.end();
    // console.log(req.url)
    // res.end("Welcome to the Bhopal MP")

    if(req.url === "/posts"){
    //    return res.end("here are your posts")
    // return res.end(JSON.stringify([1,2,3,4]))
   
    const posts = fs.readFileSync("./posts.json", {encoding:"utf-8"})
    res.setHeader("content-type", 'application/json')
    return res.end(JSON.stringify(posts))
    }
    else if(req.url === "/"){
        // res.setHeader('content-type', 'text/plain')
        res.setHeader('content-type', 'text/html')
      return   res.end("<h1>WelCome to Homeopage</h1>")
    }
    else{
       return res.end("Invalid input")
    }
})

server.listen(5000)