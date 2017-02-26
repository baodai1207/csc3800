/*
    Author: Dai Huynh
    Create date: 2/25/2017
    Homework 2
 */
'use strict';

var util = require('util');
module.exports = {
    getIt : getIt,
    putIt : putIt,
    postIt : postIt,
    deleteIt : deleteIt
};

// Call get function
function getIt(req, res, next)
{
    // Because we have no database so we just return a message
    var getHouse = util.format('calling GET function although we do not have database');
    res.json(getHouse);
}
// Call put function
function putIt(req, res, next)
{
    var model = req.swagger.params.model.value;
    var putHouse = util.format( model, ' house model updated!');
    res.json(putHouse);
}
// Call post function
function postIt(req, res, next)
{
    var model = req.swagger.params.model.value;
    var postHouse = util.format( model,  ' house model added');
    res.json(postHouse);
}
// Call delete function
function deleteIt(req, res, next)
{
    var model = req.swagger.params.model.value;
    var deleteHouse = util.format(model, 'House deleted');
    res.json(deleteHouse);
}