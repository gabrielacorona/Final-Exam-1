const mongoose = require('mongoose');
/*
Actors data set: [{
        firstName: "Alex",
        lastName: "Miller",
        actor_ID: 123
    },
    {
        firstName: "Martha",
        lastName: "Sherman",
        actor_ID: 234
    },
    {
        firstName: "Adam",
        lastName: "Rieder",
        actor_ID: 345
    }
]
*/
const actorsSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    actor_ID: {
        type: Number,
        unique: true,
        required: true
    }
});

const actorsCollection = mongoose.model('actors', actorsSchema);

/* 
Using the same“ Server coding challenge”, write the following queries: 
getActorByName,
addActorToMovieList.
(You may also need to build getMovieByID)

b.You can add manually any actor and / or movie to your database to do 
the test.You could also
build up the POST endpoints to cover this functionality, however, 
this will not be graded.

c.You can find sample data sets in the last page of this exam.
*/
const Actors = {
    createActor: function (newActor) {
        return actorsCollection
            .create(newActor)
            .then(createdActor => {
                return createdActor;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    getActorByName: function (actorName,lastName) {
        return actorsCollection
            .findOne({
                firstName: actorName,
                lastName:lastName
            })
            .then(actor => {
                return actor
            })
            .catch(err => {
                console.log(err)
                return err;
            })
    }
    /*
        Your code goes here
    */
}

module.exports = {
    Actors
};