/* Created by Dai Huynh */
'use strict';

// Exports all the functions to perform on the db
module.exports = {
    getAll : getAll,
    addIt : addIt,
    getIt : getIt,
    updateIt : updateIt,
    deleteIt : deleteIt,
    addReview: addReview,
    delReview: delReview

};

var usergrid = require('usergrid');

var usergridClient = require('../../node_modules/usergrid/lib/client')

var _ = require('lodash');

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
        if (usergridResponse.ok){

            res.json(usergridResponse.entities)
            }
        else{
             res.json("The list is unavailable");
            }
    })
}
/*GET*/

function getIt (req, res, next){
    var title = req.swagger.params.title.value;
    var reviews = req.swagger.params.review.value;


    usergrid.GET('movies', title, function(error, usergridResponse, entity) {
    if (usergridResponse.ok)
    {
        if (!reviews)
        {
            res.json(usergridResponse.entity);
        }
        else 
        {
            var options = {
            type:"reviews",
            ql: "movie = '" + entity.name +"'"
            }
            usergrid.GET(options, function(error, usergridResponse2, entities) 
            {
                res.json({ 
                    movie: usergridResponse,
                    reviews: usergridResponse2.entities
                }).end();
            })
            
        }
    }
    else{
      res.json("Movie is unavailable!");
    }
})

}



/*POST*/
function addIt(req, res, next) {

    var title = req.swagger.params.title.value;

    var entity = {
        type: 'movies',
        name: title['title'],
        year: title['year'],
        actor: title['actor'],
        review: title['review']
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

/*POST REVIEW */
/*
function addReview (req,res, next){
    var title = req.swagger.params.title.value;
    var review = req.swagger.params.review.value;
    _.assign(review, {type: 'review'});
    usergrid.GET("movies", title, function(error, usergridResponse, entities) {
        if (!error)
        {
            var name = entities.name;
            _.assign(review, {movie: name});
            
            if (review['title'].length < 1)
                res.json("movie is undefined");
            else if(review['rate'].length < 1)
                res.json("review rate is undefined");
            else if(review['quote'].length < 1)
                res.json("review is undefined");
            else usergrid.POST(review, function (err, response, review) 
            {
                    if (err) 
                    {
                        res.json({message: err});
                    }
                    else 
                    {
                        review.save(usergrid, function (err) 
                        {

                            if (err) 
                            {
                                res.status(500).json(err).end();
                            }
                            else res.json({
                                message: 'Review added!',
                                review: review
                            }).end();
                        });
                    }
                })
                
        }

        else
            res.json("Movie does not exist! review cannot be added.");
    });
}
*/

function addReview (req,res){
    var review = req.swagger.params.review.value;
    _.assign(review, {type: 'review'});
    usergrid.GET("movies", req.swagger.params.title.value, function(error, usergridResponse, movie) {
        if (!error){
            var movietitle = movie.name;
            //give movie name to review, only if movie exists already
            _.assign(review, {movie: movietitle});
            if(_.isUndefined(review.movie))
                res.json({ Error: "movie undefined."});
            else if(_.isUndefined(review.rate))
                res.json({ Error: "movie rate undefined." });
            else if(_.isUndefined(review.quote))
                res.json({ Error: "movie quote undefined." });

            else usergrid.POST(review, function (err, response, review) {
                    if (err) {
                        res.json({message: err});
                    }
                    else {
                        review.save(usergrid, function (err) {

                            if (err) {
                                res.status(500).json(err).end();
                            }
                            else res.json({
                                message: 'Review added',
                                review: response
                            }).end();
                        });
                    }
                })
        }
        else
            res.json({error: error});
    });
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
    usergrid.DELETE('movies', title, function (error, usergridResponse) {
        if (usergridResponse.ok) {
            res.json("Movie is deleted");
        }
        else {
            res.json("Movie is not found to delete");
        }
    })
}

/*DELETE REVIEW*/
function delReview (req, res, next){
    var title = req.swagger.params.title.value;
    usergrid.DELETE('reviews', title, function(error, usergridResponse){
    if (usergridResponse.ok){
        res.json("Review is deleted!");
    }
    else 
    {
        re.json({error: error});
    }
})
}


