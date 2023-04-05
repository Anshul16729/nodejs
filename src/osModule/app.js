const os = require('os')
const get_os_architecture=os.arch();
console.log(get_os_architecture)
const get_os_freeMemory=os.freemem();
const freeMemory=get_os_freeMemory/1024/1024;
console.log(`Free memory is ${freeMemory}`)
const get_os_totalMemory=os.totalmem();
const totalMemory=get_os_totalMemory/1024/1024;
console.log(`Total memory is ${totalMemory}`)
const get_desktop_name=os.hostname()
console.log(`Desktop name is ${get_desktop_name}`)
const get_plateform_name=os.platform()
console.log(`Plateform name is ${get_plateform_name}`)
const get_temp_directory=os.tmpdir()
console.log(`Temporary Directory is ${get_temp_directory}`)
const get_os_type=os.type()
console.log(`OS is ${get_os_type}`)
