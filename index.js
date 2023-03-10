// `data` is the data you encrypted and passed into `evervault.run` from your server. The Function 
// automatically decrypts the data and maintains its structure so you can treat event exactly as 
// you did when you passed it into `evervault.run`.
exports.handler = async (data, context) => {
	
	let unEncryptedReturnString = '';
	let encryptedReturnArray = [];
	const http =  require("https")
	
	for(let i = 0;i<data.array.length;i++) {
		unEncryptedReturnString += ` name: ${data.array[i].name} `;
	}
	
	for(let i = 0;i<data.array.length;i++) {

        encryptedReturnArray.push(
			{
				"name" : context.encrypt(data.array[i].name)
			}
		);
	}	
	
	let url = `https://adrian-dev.blocworx.com/api/log-unencrypted-version?unEncryptedReturnString=${unEncryptedReturnString}`;

	http.get(url, res => {});
		
	
    return {
        encryptedData: encryptedReturnArray,
    };	
	
    // Check if the data sent into the Function included the `name` key
    /*if (data.name && typeof data.name === "string") {
        console.debug(`A name of length ${data.name.length} has arrived into the Function.`);
    
        // Process the decrypted name value, and re-encrypt the original name using the encrypt function available in the context parameter.

    } else {
        console.debug('An empty name has arrived into the Function.');
    
        return {
            message: 'Hello from a Function! Send an encrypted `name` parameter to show Function decryption in action',
        };
    }*/
};