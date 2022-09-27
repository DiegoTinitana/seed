const fs = require('fs')
const exec = require('child_process').exec;
const path = require('path');

export const signBillXml = async () => {

    const JAR = path.join(__dirname, '../../', 'sriSignBill.jar');
    const xmlPath = path.join(__dirname, '../../', 'newxml.xml')
    const pathSignature = path.join(__dirname, '../../', 'diego_andres_tinitana_ortega.p12');
    const passSignature = "Estrellate12"
    const pathOut =path.join(__dirname, '../../', 'firmados');
    const nameFileOut = "testnode"

    const command = `java -jar ${JAR} ${xmlPath} ${pathSignature} ${passSignature} ${pathOut} ${nameFileOut}`;
    exec(command, function(err: any, result: any, stderr: any){

        if(err) { console.log(err, "?????") }
        if(stderr) {console.log(stderr, '<<<<<')}

        console.log(result, '>>>>>')

    }); 
}

const pathJava = (value: string): string => {
    const path = value.split("\\")
    return path.join('\\')
}