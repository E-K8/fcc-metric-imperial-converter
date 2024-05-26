'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      res.json('invalid number and unit');
    }

    if (initNum === 'invalid number') {
      res.json('invalid number');
    }

    if (initUnit === 'invalid unit') {
      res.json('invalid unit');
    }

    const responseObject = {};
    responseObject['initNum'] = initNum;
    responseObject['initUnit'] = initUnit;
    responseObject['returnNum'] = returnNum;
    responseObject['returnUnit'] = returnUnit;
    responseObject['string'] = toString;

    res.json(responseObject);
  });
};
