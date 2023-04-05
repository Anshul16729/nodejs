//File Module Synchronously
const fs = require('fs')
// fs.writeFileSync('demo.txt','This is a demo file written in nodejs by fs module')  // creating a file
// fs.appendFileSync('demo.txt', 'This is a demo file written in nodejs by fs module & we are adding additional data in this with append module') //append additonal data

//READING A FILE
//Nodejs includes an additional data type called buffer. Buffer is mainly used to store binary data, while reading from a file or receiving packets over the network.
// (Not available in browser's JS).
// const buf_data=fs.readFileSync('demo.txt') //read file 
// console.log(buf_data)
// const org_data=buf_data.toString()
// console.log(org_data)

//Read file without buffer by encoding
// const encoded_data=fs.readFileSync('renamedFile.txt','utf-8')
// console.log(encoded_data)

//RENAMING A FILE
// fs.renameSync('demo.txt','syncFile.txt')

// fs.mkdirSync('anshul') //to create a new folder

// fs.rmdirSync('anshul') //to create a new folder

// fs.unlinkSync('renamedFile.txt') //to delete a file



//File Module Asynchronously
// fs.writeFile('asyncFile.txt','This file is written asynchronously by fs module',(err)=>{
// console.log("file is created")
// console.log(err)
// });

// fs.appendFile('asyncFile.txt','This file is written asynchronously by fs module & we are appending more data to this file',(err)=>{
//     console.log('Data has been added')
// })

// fs.readFile('asyncFile.txt','utf-8',(err,data)=>{
// console.log(err);
// console.log(data)
// })

// fs.rename('asyncThisFile.txt',(err)=>{
//     console.log('Data has been added')
// })


//Synchronous Vs Asynchronous
const sync_data=fs.readFileSync('syncFile.txt','utf-8')
console.log(sync_data)
console.log('Synchronous way-------')

fs.readFile('asyncFile.txt','utf-8',(err,data)=>{
    console.log(data)
})
console.log('Asynchronous way, after the data-------')


