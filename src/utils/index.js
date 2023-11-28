'use strict'

const _ = require('lodash');  //lodash ki hieu bang _

const getInfoData = ({ fileds = [], object = {} }) => {
    return _.pick( object, fileds)
}

module.exports = {
    getInfoData
}

