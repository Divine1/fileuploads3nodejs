const fs = require("fs")

console.log(fs.readFileSync("./image.png",{encoding:"base64"}))