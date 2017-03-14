/* Created by Dai Huynh */

'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
    hello: hello,
    github: github
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */


function hello(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.swagger.params.name.value || 'stranger';
  var hello = util.format('Hello, %s!', name);

  // this sends back a JSON response which is a single string
  res.json(hello);
}
function github(req, res) {
    var githubAPI = require("github");
    var gits = new githubAPI({
        version: '3.0.0'
    });
    var token = "yourtokenhere";
    var vault = require('avault').createVault(__dirname);

    vault.get('sigad', function (profilestring){
        var token = JSON.parse(profilestring);
        console.log(token);
        gits.authenticate({
            type: 'oauth',
            token: token.token
        });
    });

    gits.repos.getAll({username: "baodai1207"}, function(err, data){
        console.log("Got error: ", err);
        console.log("Got response: ", data);

        res.json(data);
    });
}

// function avault() {
//     var vault = require('avault').createVault(__dirname);
//     var keyName = 'key1';
//     vault.generateKey(keyName).then(
//         function (keyResponse) {
//             vault.store(keyName, '{"token": "accesstoken"}', 'sigad').then(
//                 function (storeResponse) {
//                     console.log('Ok', storeResponse);
//                 },
//                 function (err) {
//                     console.log('Error', err);
//                 });
//         },
//         function (err) {
//             console.log('Error', err);
//         });
// }
