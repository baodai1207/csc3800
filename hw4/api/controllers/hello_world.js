/* Created by Dai Huynh */
'use strict';

// Exports all the functions to perform on the db
module.exports = {
    getAll : getAll,
    addIt : addIt,
    getIt : getIt,
    updateIt : updateIt,
    deleteIt : deleteIt
};

var usergrid = require('usergrid');

var usergridClient = require('../../node_modules/usergrid/lib/client')

var usergrid = new usergridClient({
    orgId:'daihuynh',
    appId:'sandbox',
    baseUrl: 'https://apibaas-trial.apigee.net',
    URI: 'https://apibaas-trial.apigee.net',
    authMode: "NONE",
    clientId:'b3U6b7gmaBkQEeeiwhIuBzeXfQ',
    clientSecret:'b3U63bigQWmLLF8aJhnTaV1_xDZ4NTI'

});


/*GET*/
function getAll(req, res, next) {
    usergrid.GET('movies', function(error, usergridResponse, entities) {
        // if (usergridResponse.ok){
        res.json(usergridResponse.entities)
        // }
        // else{
        //     res.status(404).json("The list is unavailable");
        // }
    })
}
/*GET*/
function getIt (req, res, next){
    var name = req.swagger.params.title.value;

    usergrid.GET('movies', name, function(error, usergridResponse, entity) {
        //
        // if (usergridResponse.ok){
             res.json(usergridResponse.entities);
        // }
        // else{
//             res.status(404).json("Movie title is unavailable");
//         }
    })
}


/*POST*/
function addIt(req, res, next) {

    var title = req.swagger.params.title.value;

    var entity = {
        type: 'movies',
        name: title['title'],
        year: title['year'],
        actor: title['actor']
    }
    if (title['title'].length < 1)
        res.json( "Movie title is invalid!");
    else if (title['actor'].length < 3)
        res.json("Actors must have at least 3 persons");

    else if (title['year'].length < 1)
        res.json("Year is invalid");

    else
    {
        usergrid.POST(entity, function(error, usergridResponse, entity) {

            res.json("Movie added to the list!");

        })
    }

}
/*PUT*/
function updateIt(req, res, next) {
    var title = req.swagger.params.title.value;
    var info = req.swagger.params.year.value;

    usergrid.GET('movies', title, function(error, usergridResponse, entity) {
        if (error)
        {
            res.json("Movie is unavailable");
        }
        else
        {
            var entity = {
                type: 'movies',
                name: title,
                year: info['year'],
                actor: info['actor']
            }
            usergrid.PUT(title, { keywords: title }, function(error, usergridResponse) {
                if (error)
                {
                    res.json({error: error});
                }
                else
                {
                    res.json("Movie is updated in the list");
                }
            })
        }
    })

}
/*DELETE*/
function deleteIt(req, res, next) {
    var title = req.swagger.params.title.value;
    usergrid.DELETE('movies', title, function(error, usergridResponse) {
        if (usergridResponse.ok){
            res.status(200).json("Movie is deleted");
        }
        else{
            res.status(404).json("Movie is not found to delete");
        }
    })
}
