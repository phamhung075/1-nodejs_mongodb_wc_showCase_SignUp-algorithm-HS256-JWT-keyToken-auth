'use strict'

const JWT = require ('jsonwebtoken');

const createTokenPair = async ( payload, cryptoKey ) => {
    try{
        //accessToken 
        const accessToken = await JWT.sign ( payload, cryptoKey, { //algorithm HS256 par default
            //algorithm: 'RS256', //lv2
            expiresIn: '2 days'
        }); 
        //payload: chua thong tin van chuyen mang di tu he thong nay sang he thong khac thong qua token
        //privateKey: khong luu vao database chi xay ra 1 lan khi sign -> day qua browser
        const refreshToken = await JWT.sign( payload, cryptoKey, {
            //algorithm: 'RS256', //lv2
            expiresIn: '7 days'
        }); 


        console.error(`accessToken verify::`, accessToken);
        console.error(`publicKey verify::`, cryptoKey);
        JWT.verify ( accessToken, cryptoKey, (err, decode) => {
            if(err){
                console.error(`error verify::`, err);
            }else{
                console.log(`decode verify::`, decode);
            }
        });

        //lv2
        // JWT.verify ( accessToken, publicKey, (err, decode) => {
        //     if(err){
        //         console.error(`error verify::`, err);
        //     }else{
        //         console.log(`decode verify::`, decode);
        //     }
        // }); 
        return { accessToken, refreshToken }
    }catch (error) {
        return error
    }
}

module.exports = {
    createTokenPair
}