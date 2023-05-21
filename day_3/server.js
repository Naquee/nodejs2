//EXPRESS START HERE L1

const express = require("express");

const fs=require("fs");
const { stringify } = require("querystring");

const app = express();

app.use(express.json())

// app.get("/", (req,res) => {
//     // res.send("welcpme to Home page")
//     const readStream = fs.createReadStream("./data.txt", {encoding:"utf-8"})
//   readStream.pipe(res)
// })

// app.get("/profile",(req,res) => {
//     res.send("Welcome to Profoile")
// })

// app.post("/uploaddata", (req,res) => {
//     // console.log(req.body)
//     fs.appendFileSync("./data.txt", JSON.stringify(req.body), {encoding:"utf-8"})

//     res.send("thnks for upload")
// })

//CRUD APPLICATION 

app.get("/", (req,res) => {
    res.send("welcpme to Home page")
})

app.get("/products/:id", (req,res) => {
    // for Id
    // serch like that http://localhost:8500/products/12
    const {id} = req.params
    res.send("here is your paoducts" + id)
})

app.get("/products", (req,res) => {
//    for query
// search like that http://localhost:8500/products?price=200
const {price} = req.query;
res.send("here are your products of Price" + price)
})

app.get("/products", (req,res) => {
    const data = fs.readFileSync("./db.json", {encoding:"utf-8"})
    const parsedData = JSON.parse(data)
    const products = parsedData.products
    // console.log(products)
    res.send(products)
    res.send("Here is Your Products")
})

app.post("/addproducts", (req,res) => {
    // step1 accessing the produc the clint is sending
    // const product = JSON.stringify(req.body);
    // console.log(products)
    // step2 read the file
    const file = fs.readFileSync("./db.json",{encoding:"utf-8"} )
    let parsedFile = JSON.parse(file)
    // console.log(parsedFile.products)
    parsedFile.products.push(req.body)
    // console.log(parsedFile)
    // step3 write the file back
    parsedFile=JSON.stringify(parsedFile)
    fs.writeFileSync("./db.json", parsedFile , {encoding:"utf-8"})
    res.send("Your Products is Added")
})


app.listen(8500, () => {
    console.log("listen on port 8500")
})