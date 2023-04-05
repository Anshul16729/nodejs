//In module wrapper function we simply wrap the function in round braces & that makes our function private in nodejs.
//It is IIFE Immediately Invoked Function Expression
(function(exports,require,module,__filename,__dirname){
    const name="Anshul"
    console.log(name)
})

console.log(__filename)

