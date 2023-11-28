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
      const hodelShop = await shopModel.findOne({ email }).lean(); //lean make query faster, less size , return object javascript 
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

        // created privateKey, publicKey lv0

        const cryptoKey = crypto.randomBytes(64).toString('hex');

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
