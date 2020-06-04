const mongoose = require('mongoose');
/*
Movies data set: [{
        movie_ID: 987,
        movie_title: "Movie 1",
        year: 2019,
        rating: 9.5,
        actors: []
    },
    {
        movie_ID: 876,
        movie_title: "Movie 2",
        year: 2010,
        rating: 7.2,
        actors: []
    },
    {
        movie_ID: 765,
        movie_title: "Movie 3",
        year: 1997,
        rating: 5.8,
        actors: []
    }
]
*/
const moviesSchema = mongoose.Schema({
    movie_ID: {
        type: Number,
        unique: true,
        required: true
    },
    movie_title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'actors',
        required: true
    }]
});

const moviesCollection = mongoose.model('movies', moviesSchema);

const Movies = {
    createMovie: function (newMovie) {
        return moviesCollection
            .create(newMovie)
            .then(createdMovie => {
                return createdMovie;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    getAllMovies:function(){
        return moviesCollection
                .find()
                .populate('actor', ['firstName', 'lastName', 'actor_ID'])
                .then(allMovies=>{
                    return allMovies;
                })
                .catch(err=>{
                    console.log(err);
                    throw new Error(err)
                })
    },
    getMovieByID: function (id) {
        return moviesCollection
            .findOne({
                movie_ID: id
            })
            .then(actor => {
                return actor
            })
            .catch(err => {
                console.log(err)
                return err;
            })
    },
    addActorToMovieList: function (idMovie, actors) {
        return moviesCollection
            .findOneAndUpdate({
                movie_ID: idMovie
            }, {
                $set: {
                    actors: actors
                }
            }, {
                new: true
            })
            .populate({
                path: 'actors'
            })
            .then(actor => {
                return actor
            })
            .catch(err => {
                console.log(err)
                return err;
            })
    }

}

module.exports = {
    Movies
};