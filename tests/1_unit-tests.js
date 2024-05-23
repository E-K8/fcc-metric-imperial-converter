const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('Function convertHandler.getNum(input)', function () {
    test('Whole number input', function (done) {
      let input = '32l';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal number', function (done) {
      let input = '32.2L';
      assert.equal(convertHandler.getNum(input), 32.2);
      done();
    });

    test('Fractional input', function (done) {
      let input = '32/3L';
      assert.equal(convertHandler.getNum(input), 32 / 3);
      done();
    });

    test('Fractional Input w/ Decimal', function (done) {
      let input = '9/3.3L';
      assert.equal(convertHandler.getNum(input), 9 / 3.3);
      done();
    });

    test('Invalid input (double fraction)', function (done) {
      let input = '32/3/3L';
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });

    test('No numerical input', function (done) {
      let input = 'L';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite('Function converHandler.getUnit(input)', function () {
    test('For each valid unit inputs', function (done) {
      let input = [
        'gal',
        'l',
        'mi',
        'km',
        'lbs',
        'kg',
        'GAL',
        'L',
        'MI',
        'KM',
        'LBS',
        'KG',
      ];

      let output = [
        'gal',
        'L',
        'mi',
        'km',
        'lbs',
        'kg',
        'gal',
        'L',
        'mi',
        'km',
        'lbs',
        'kg',
      ];

      input.forEach(function (el, index) {
        assert.equal(convertHandler.getUnit(el), output[index]);
      });
      done();
    });

    test('Unknown unit input', function (done) {
      assert.equal(convertHandler.getUnit('34kilograms', undefined));
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function () {
    test('For each valid unit input', function (done) {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function (el, i) {
        assert.equal(convertHandler.getReturnUnit(el), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHangler.spellOutUnit(unit)', function () {
    test('For each valid unit input', function (done) {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      let expect = [
        'gallons',
        'liters',
        'miles',
        'kilometers',
        'pounds',
        'kilograms',
      ];
      input.forEach(function (el, i) {
        assert.equal(convertHandler.spellOutUnit(el), expect[i]);
      });
      done();
    });
  });
});
