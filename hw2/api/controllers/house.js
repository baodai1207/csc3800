/* Created by Dai Huynh, homework 2 APIWeb */
'use strict';

var util = require('util');

module.exports = {
    getAll: getAll,
    getIt : getIt,
    putIt : putIt,
    postIt : postIt,
    deleteIt : deleteIt
};
// Call get function to get a list of house
function getAll(req, res, next){
    var getHouse = "calling GET function although we do not have database";
    res.json(getHouse);
}

//Call get function
function getIt(req, res, next) {
    var getID = req.swagger.params.id.value;
    res.json( "You get a house successful, Here your house ID: " + getID);
}

// Call post function
function postIt(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var getID = req.swagger.params.id.value;
    var postHouse = req.body;
    if (postHouse) {
        res.json({success: 'YEAH', description: "You added a new house", "Added": postHouse});
    }
    else {
        res.json({success: 'BOO', description: " Your request isn't valid "});
        res.status(204).send();
    }
}

// Call put function
    function putIt(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        var getId = req.swagger.params.id.value;
        var putHouse = req.body;
        if (putHouse) {
            res.json({success: 'YEAH', description: "Your house has been updated", "Updated": putHouse});
        } else {
            res.json({success: 'BOO', description: " Your request isn't valid "});
            res.status(204).send();
        }
    }

// Call delete function
    function deleteIt(req, res, next) {
        var getID = req.swagger.params.id.value;
        //var deleteHouse = req.body;
        if (getID) {
            res.json({success: 'YEAH', description: "Your house is deleted", "Deleted": getID});
        } else {
            res.json({success: 'BOO', description: " Your request isn't valid "});
            res.status(204).send();
        }
    }