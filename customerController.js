'use strict'

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',//127.0.0.1
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'asiakas'
});

module.exports = {
  haeTyypit: function (req, res) {
    connection.query('SELECT Avain, Lyhenne, Selite FROM Asiakastyyppi', function (error, results, fields) {
      // console.log("Data = " + JSON.stringify(results));
      res.json(results);
    });
  },


  haeAsiakkaat: function (req, res) {
    var nimi = req.query.nimi;
    var osoite = req.query.osoite;
    var avain = req.query.avain;

    var sql = "SELECT * FROM ASIAKAS WHERE 1=1";
    if (req.query.hasOwnProperty('nimi') != false) {
      sql = sql + " AND nimi like '" + nimi + "%'";
    }
    if (req.query.hasOwnProperty('osoite') != false) {
      sql = sql + " AND osoite like '" + osoite + "%'";
    }
    if (req.query.hasOwnProperty('avain') != false) {
      sql = sql + " AND asty_avain like '" + avain + "%'";
    }
    connection.query(sql, function (error, results, fields) {
      // console.log("Data = " + JSON.stringify(results));
      res.json(results);
    });
  },

  lisaaAsiakas: function (req, res) {
    var nimi = req.body.nimi;
    var osoite = req.body.osoite;
    var postinro = req.body.postinro;
    var postitmp = req.body.postitmp;
    var avain = req.body.avain;

    console.log(nimi, osoite, postinro, postitmp, avain)

    var sql =
      "INSERT INTO ASIAKAS (NIMI, OSOITE, POSTINRO, POSTITMP, LUONTIPVM, ASTY_AVAIN)" +
      "VALUES ('" + nimi + "', '" + osoite + "', '" + postinro + "', '" + postitmp + "', NOW(), " + avain + ")";
    if (nimi && osoite && postinro && postitmp && avain != "") {
      connection.query(sql, function (err, result) {
        if (err) {
          console.log("ei toimi")
          res.send("400")
        } else {
          console.log("lisätty asiakas")
          res.send("200")
        }
      })
    } else {
      connection.query(function (err, result) {
        console.log("ei toimi")
        res.send("400")
      })
    }

  },

  poistaAsiakas: function (req, res) {
    // var id = req.body.avain;
    var id = req.params.id;
    console.log(id);

    var sql = "DELETE FROM ASIAKAS WHERE AVAIN = '" + id + "'";

    connection.query(sql, function (err, result) {
      res.send("onnistui!");
      console.log(sql);
      console.log("asiakas poistettu")
    })
  }
};