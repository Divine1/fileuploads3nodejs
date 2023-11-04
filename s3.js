const {
    S3Client,
    PutObjectCommand
  } =require( "@aws-sdk/client-s3");

const prop = require("./.env")

let s3cli = new S3Client({
    credentials:{
        accessKeyId : prop.accessKeyId,
        secretAccessKey : prop.secretAccessKey
    },
    region : prop.region
});


const upload = async (key,mimetype,body)=>{
    let putobj = new PutObjectCommand({
        Bucket: prop.Bucket,
        Key: key,
        Body: body,
        "ContentType"  :mimetype
      })
      
    try{
        await s3cli.send(putobj);
    }
    catch(err){
        console.log(err);
    }
}

module.exports= {
    upload
}