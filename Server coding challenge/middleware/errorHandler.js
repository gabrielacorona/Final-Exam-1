const {
    Movies
} = require('../models/movie-model')
const {
    Actors
} = require('../models/actor-model')


function errorHandler(error, req, res) {


    let paramsId = req.params.movie_ID
    let bodyId = req.body.id

    let firstName = req.body.firstName
    let lastName = req.body.lastName

    if (!bodyId) {
        res.statusMessage = "Id is missing in the body of the request"
        return res.statusMessage(406).end()
    }

    if (paramsId != bodyId) {
        res.statusMessage = "id and movie_ID do not match"
        return res.status(409).end()
    }

    if (!firstName || !lastName) {
        res.statusMessage = "You need to send both firstName and lastName of the actor to add to the movie list "
        return res.status(403).end()
    }
    

    Actors
        .getActorByName(firstName, lastName)
        .then(foundActor => {
            if (foundActor.length === 0) {
                res.statusMessage = "The actor or movie do not exist"
                return res.status(404).end()
            } else {
                Movies
                    .getMovieByID(paramsId)
                    .then(foundMovie => {
                        if (foundMovie.length === 0) {
                            res.statusMessage = "The actor or movie do not exist"
                            return res.status(404).end()
                        }
                    })
                    .catch(err => {
                        res.statusMessage = "something is wrong with DB"
                        console.log(err)
                        return res.status(500).end()
                    })
            }
        })
        .catch(err => {
            res.statusMessage = "something is wrong with DB"
            console.log(err)
            return res.status(500).end()
        })


        Movies
            .getAllMovies()
            .then(result=>{
                result.actors.forEach(actor => {
                    if(actor.firstName ==firstName && actor.lastName == lastName && actor.id == bodyId){
                        res.statusMessage = "The actor is already in this movie list"
                        return res.status(400).end()
                    }
                });
            })
//TODO EXTRA: check that actor isnt on the list already 

}

module.exports = errorHandler;