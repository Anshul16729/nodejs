// Nodejs provides three ways to call asynchronous funtions
// 1. setImmediate()- we use setImmidiate() when we want to execute some function asynchronouly, but as some as possible & after finishing the current block.
// 2. setTimeout() - we use setTimeout() when we want to execute some function asynchronously, after a specified deay & after finishing the current block
// 3. process.nextTick() - callback scheduled during process.nextTick() will be processed after execution of the current phase.


console.log("it will always print first----->")
setTimeout(() => {
    console.log("setTimeout() called without any time----->") //always run just after console & process.nextTick() if there is no time given
});
setTimeout(() => {
    console.log("setTimeout() called after 2 secs----->")
}, 2000);
setImmediate(() => {
    console.log("setImmediate() called----->") //always run after console & process.nextTick(), & setTimeout() but if there is a time delay then it will be executed first
});
process.nextTick(() => {
    console.log("process.nextTick() called----->") //always run after console
});