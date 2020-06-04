const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );

const errorHandler = require('./middleware/errorHandler');

const {
    Movies
} = require('./models/movie-model')
const {
    Actors
} = require('./models/actor-model')

const app = express();

/* 
    Endpoint URL: /api/add - movie - actor /: movie_ID
    ii.Send in the body of the request the id of the movie to update.
    If this id is missing use the errorHandling middleware that you will build in 
    the next challenge, make that handler send a 406 status with the message:
    “Id is missing in the body of the request”.

    iii.You need to validate that the movie_ID passed in the path parameters and 
    the id sent in the body of the request are the same.If they do not match use 
    the errorHandling middleware that you will build in the next challenge, 
    make that handler send a 409 status with the message: “id and movie_ID do not match”.

    iv.In the body of the request you should also pass the firstName and lastName 
    of the actor to add to the movie list.If any of these two are missing use the 
    errorHandling middleware that you will build in the next challenge, make that handler
    send a 403 status with the message: “You need to send both firstName and lastName of
    the actor to add to the movie list”.

    v.You need to validate that the actor and movie exists.If any doesn’ t exist use the
    errorHandling middleware that you will build in the next challenge, make that handler send
    a 404 status with the message: “The actor or movie do not exist”.

    vi.There is no need to validate that the actor to be added is not yet in the movie list.
    (If you include this validation you can gain 4 extra points in this exam, make sure to 
    send a 400 status with the message: “The actor is already in this movie list” using the 
    errorHandler that you will be building up in the next coding challenge).

    vii.On a success patch send back a 201 status with a json in the response holding the full movie
    information.
*/
app.patch('/api/add-movie-actor/:movie_ID',errorHandler,(req,res)=>{

    let paramsId = req.params.movie_ID
    let bodyId = req.body.id

    let firstName = req.body.firstName
    let lastName = req.body.lastName

    newActor = {
        firstName:firstName,
        lastName:lastName,
        actor_ID:bodyId
    }

    Movies  
        .addActorToMovieList(paramsId,newActor)
        .then(result=>{
            if(!result){
                res.statusMessage="error on patch"
                return res.status(403).end()
            }
            else{
                res.statusMessage = "successfull patch"
                return res.status(201).json(result)
            }
        })
        .catch(err => {
            res.statusMessage = "something is wrong with DB"
            console.log(err)
            return res.status(500).end()
        })


})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});