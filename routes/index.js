var express = require('express');
var router = express.Router();
var dbConnect = require('../config/connect');
const { render } = require('../app');

router.get('/', function(req, res, next) {
  res.render('index');
});

// GET home page
router.get('/home', function(req, res) {
  dbConnect.query("SELECT * FROM NodeJS_CRUD.employees;", function(err, data) {
    if (err) throw err;
    res.render('home', { data: data });
  });
});

// ADD new employee
router.get('/add', function(req, res) {
  dbConnect.query("SELECT account_id, username FROM NodeJS_CRUD.accounts;", function(err, data) {
    if (err) throw err;
    res.render('add', { data: data });
  });
});

router.post('/add', function(req, res) {
  dbConnect.query(`INSERT INTO NodeJS_CRUD.employees (name, age, gender, address, email, phone, account_id) VALUES('${req.body.nameInput}','${req.body.ageInput}','${req.body.genderInput}','${req.body.addressInput}','${req.body.emailInput}','${req.body.phoneInput}','${req.body.account_idInput}')`, function(err){
    if(err) throw err;
    res.redirect('/home')
  })
});

// DELETE employee
router.get('/delete/:employee_id', function(req, res) {
  dbConnect.query(`DELETE FROM NodeJS_CRUD.employees WHERE employee_id = ${req.params.employee_id};`, function(err) {
    if(err) throw err;
    res.redirect("/home");
  })
});

// EDIT employee
router.get('/edit/:employee_id', function(req, res) {
  var data = dbConnect.query(`SELECT * FROM NodeJS_CRUD.employees WHERE employee_id=${req.params.employee_id};`, function(err, result){
    if(err) throw err;
    data = {
      employee_id: result[0].employee_id,
      name: result[0].name,
      age: result[0].age,
      gender: result[0].gender,
      address: result[0].address,
      email: result[0].email,
      phone: result[0].phone,
      account_id: result[0].account_id
    }
    res.render('edit', { data });
  });
});

router.post('/edit/:employee_id', function(req, res) {
  dbConnect.query(`UPDATE NodeJS_CRUD.employees SET name = '${req.body.nameInput}', email = '${req.body.ageInput}', gender = '${req.body.genderInput}', address = '${req.body.addressInput}',email = '${req.body.emailInput}',phone = '${req.body.phoneInput}',account_id = '${req.body.account_idInput}' WHERE employee_id=${req.params.employee_id};`, function(err){
    if(err) throw err;
    res.redirect('/home');
  })
});

module.exports = router;
