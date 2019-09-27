var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

async function getBalance(address){
    return  await web3.eth.getBalance(address);
}

const fs = require('fs');
const keystoreFolder = '/home/ubuntu/.ethereum/keystore';

var addresses = [];

async function main(){
    fs.readdirSync(keystoreFolder).forEach(file => {
        var address = file.split('--').splice(-1)[0];
        //console.log(address);
        addresses.push(address);
    });
    console.log("addresses: ", addresses.length);

    for(var i = 0; i < addresses.length; i++){
	var balance = await getBalance(addresses[i]);
	if(balance > 0){
	    console.log(addresses[i], balance/1e18);
	}
    }
}

main();