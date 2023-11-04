const express =require("express");
const app = express();
const fs = require("fs");

const multer = require("multer");
const multipart = multer()

const s3 = require("./s3");

app.use(express.json())

var signatures = {
    JVBERi0: "application/pdf",
    R0lGODdh: "image/gif",
    R0lGODlh: "image/gif",
    iVBORw0KGgo: "image/png",
    "/9j/": "image/jpg"
  };
  
  function detectMimeType(b64) {
    for (var s in signatures) {
      if (b64.indexOf(s) === 0) {
        return signatures[s];
      }
    }
  }

  const getfilename = (mimetype)=>{

    let split = mimetype.split("/");
    return `${Math.random()}.${split[1]}`;

  }

app.post("/base64",async (req,res)=>{

    let {base64string}  = req.body;
    let mimetype = detectMimeType(base64string);

    console.log("mimetype ",mimetype)
    //fs.writeFileSync("test.png",base64string,{encoding:"base64"});
    let buff = Buffer.from(base64string,"base64");
    let filename = getfilename(mimetype);
    console.log("filename ",filename);
    await s3.upload(`${filename}`, mimetype,buff);

    res.send({});
})


app.post("/binary", multipart.any(), async (req,res)=>{

    console.log(req.files)

    if(req.files){
        for(let i=0;i<req.files.length;i++){
            let item = req.files[i];
            //fs.writeFileSync(item.originalname,item.buffer);
            await s3.upload(`${Math.random()}_${item.originalname}`, item.mimetype,item.buffer);
        }
    }

    res.send({});
})


app.listen(4000,()=>{
    console.log("listening in port 4000");
})