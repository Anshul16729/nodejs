//File Module Synchronously
const fs = require('fs')
// fs.writeFileSync('demo.txt','This is a demo file written in nodejs by fs module')  // creating a file
// fs.appendFileSync('demo.txt', 'This is a demo file written in nodejs by fs module & we are adding additional data in this with append module') //append additonal data

//READING A FILE
//Nodejs includes an additional data type called buffer. Buffer is mainly used to store binary data, while reading from a file or receiving packets over the network.
// (Not available in browser's JS).
const buf_data=fs.readFileSync('demo.txt') //read file 
console.log(buf_data)
const org_data=buf_data.toString()
console.log(org_data)
