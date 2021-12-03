const PDFDocument = require('pdfkit');
const fs = require('fs');
const sharp = require("sharp")
const ps=require("prompt-sync");
const { font } = require('pdfkit');


"use strict" ;
const prompt=ps();
takeInput=()=>{
let hname=prompt("Enter your name   :");
let dob=prompt("Enter your DOB  :" );
let mm=dob.slice(3,5);
let dd=dob.slice(0,2);
let yob=dob.slice(6,dob.length);
let gender=prompt("M/F :");
let hfname=prompt("Enter your Father Name Hindi :");
let hvill=prompt("Enter Village Name  hindi :");
let hvtc=prompt("Enter vtc Name  Hindi :");
let hstreet=prompt("Steet : hindi");
let hpo=prompt("post : hindi");
let hsdist=prompt("Subdistic : hindi");
let hdist=prompt("Enter Distt Name  Hindi :");
let pin=prompt("Pincode");

let uid=prompt("Adhar Number :");

let ename=prompt("Enter your name English  :");
let efname=prompt("Enter your Father Name English :");
let evtc=prompt("Enter vtc Name  english :");
let evill=prompt("Enter Village Name  english :");
let estreet=prompt("Steet : English");
let epo=prompt("Steet : English");
let edist=prompt("Enter vtc Name  english :");
let esdist=prompt("Subdistic : English");

}

function genQR(){
   var QRCode = require("qrcode-svg");
console.log(`genQr function`);
   var qrcode = new QRCode({ 
     content: `<?xml version="1.0" encoding="UTF-8"?> <PrintLetterBarcodeData uid=${uid} name="" gender="M" yob="" co="" house="" street="" vtc="" po="" dist="" subdist="" state="" pc="" dob=""/>`,
     padding: 4,
     width: 256,
     height: 256,
     color: "#000000",
     background: "#ffffff",
     ecl: "M"
   });
   
   qrcode.save("qr.svg", function (error) {
     if (error) throw error;
     
     console.log("QR Code saved!");
   });
   return 1;
  }




svgTopdf=()=>{
  sharp("qr.svg")
  .png()
  .toFile("qr.jpg")
  .then(function(info) {
    console.log(info)
  })
  .catch(function(err) {
    console.log(err)
    console.log(`svgt o pdf function`)

  })

}
 




genPdf=()=>{
const doc = new PDFDocument({size:'A4'});
doc.pipe(fs.createWriteStream('images.pdf'));

doc.image('adcp.jpg', 0,0,{height: 229, width: 595});

doc.image('ph.jpg',54,45,{width:52,height:70});
doc.image('qr.jpg',448,46,{width:89.2,height:93.1});



doc.fillColor('red').font('font.ttf').fontSize(8).text('', 115.6,44).moveDown(0.1);
doc.font('arial.ttf').fontSize(8).text('');
doc.font('arial.ttf').fontSize(8).text('',162.7,64.7);


doc.font('uid.TTF').fontSize(12.87).text('',113.1,141.5);
doc.font('uid.TTF').fontSize(8.5).text('',130.3,157.1);


//hindi Adress
doc.font('font.ttf').fontSize(9).text(' ',314.8,42.9);
doc.font('font.ttf').fontSize(8).text('',300.5,50.1);
doc.font('font.ttf').fontSize(8).text('n',300.5,57.6);

//english Address
doc.font('arial.ttf').fontSize(8).text('',315.6,79.1);
doc.font('arial.ttf').fontSize(8).text('',300.7,85);
doc.font('arial.ttf').fontSize(8).text('',300.5,92.3);

//uid Numebr
doc.font('uid.TTF').fontSize(12.87).text('',376,141.5);
doc.font('uid.TTF').fontSize(8.5).text('',393,157.1);


doc.end();
}



setTimeout(genQR,0);
setTimeout(svgTopdf,1500);
setTimeout(genPdf,3000);

