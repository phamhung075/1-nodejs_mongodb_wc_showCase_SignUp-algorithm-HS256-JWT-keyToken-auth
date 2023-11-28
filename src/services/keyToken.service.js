"use strict";

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, cryptoKey }) => {
    try {

      const tokens = await keytokenModel.create({
        user: userId,
        publicKey: cryptoKey
      });
      return tokens ? publicKey : null; 
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
