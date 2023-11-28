"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const RoleShop = require("../auth/constant");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");




class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step1: check email exist
      const hodelShop = await shopModel.findOne({ email }).lean(); //lean query nhanh, giam tai size , tra ve mot object javascript thuan tuy
      if (hodelShop) {
        return {
          code: "xxxx",
          message: "Shop already registered",
        };
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });
      // step2: if newShop created successful refresh token
      if (newShop) {
        // // created privateKey, publicKey lv2
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: 'pkcs1',  //public key CryptoGraphy Standards 1
        //     format: 'pem',
        //   },
        //   privateKeyEncoding: {
        //     type: 'pkcs1',  //public key CryptoGraphy Standards 1
        //     format: 'pem',
        //   },
        // });

        // created privateKey, publicKey lv0

        const cryptoKey = crypto.randomBytes(64).toString('hex');


        //console.log({ cryptoKey }); // save collection KeyStore

        // // created privateKey, publicKey lv2
        // const publicKeyString = await KeyTokenService.createKeyToken({
        //   userId: newShop._id,
        //   publicKey,
        // });


        // created privateKey, publicKey lv0
        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          cryptoKey,
        });


        if (!keyStore) {
          return {
            code: "xxxx",
            message: "cryptoKey error",
          };
        }

        //lv2
        // const publicKeyString = await KeyTokenService.createKeyToken({
        //   userId: newShop._id,
        //   publicKey,
        // });


        // if (!publicKeyString) {
        //   return {
        //     code: "xxxx",
        //     message: "publicKeyString error",
        //   };
        // }

        // const publicKeyObject = crypto.createPublicKey(publicKeyString);
        // console.log(`publicKeyObject::`, publicKeyObject);

        // // created token pair
        // const tokens = await createTokenPair({userId: newShop._id, email }, publicKeyString, privateKey);
        // console.log(`Created Token Success::`, tokens);



        // created token pair
        const tokens = await createTokenPair({userId: newShop._id, email }, cryptoKey);
        console.log(`Created Token Success::`, tokens);

        return {
          code: 201,
          metadata: {
            shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop}),
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      console.error(error)
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
