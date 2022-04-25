var async = require('async');
var Genre = require('../models/genre');
var Book = require('../models/book');
var genre = require('../models/genre');
var mongoose = require('mongoose');
const {body, validationResult} = require('express-validator');
// Display list of all Genre.
exports.genre_list = function(req, res, next) {
    Genre.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_genres){
        if(err){return next(err)}
        
        res.render('genre_list', {title: 'GenreList', genre_list: list_genres})
    })
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id);
    async.parallel({
        genre: function(callback){
            Genre.findById(req.params.id)
            .exec(callback);
        },
        genre_books: function(callback){
            Book.find({'genre': req.params.id})
            .exec(callback)
        },
    },
        function(err, results){
            if (err){return next(err)}
            if (results.genre == null){
                var err = new Error('Genre not found')
                err.status = 404
                return(next(err))
            }

            res.render('genre_detail', {title : 'Genre Detail', genre: results.genre, genre_books: results.genre_books})
            console.log(results)
        
    }) ;   
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res, next) {
    res.render('genre_form', {title: 'Create Genre'})
};

// Handle Genre create on POST.
exports.genre_create_post = [

    //Validate and sanitize the name field.
    body('name', 'Genre name required').trim().isLength({min: 1}).escape(),

    //Process request after validation and sanitization.
    (req, res , next) => {

        //Extract the validation errors from a request.
        const errors = validationResult(req)

        //Create a genre object with escaped and trimmed data
        var genre = new Genre(
            {name: req.body.name}
        );
        if(!errors.isEmpty()){
            //There are errors. Render the form again with sanitized values/errors messages.
            res.render('genre_form', {title: 'Create Genre', genre: genre, errors: errors.array()});
            return;
        }
        else{
            //Data from form is valid
            //Check if Genre with same name already exists.
            Genre.findOne({'name': req.body.name})
            .exec(function(err, found_genre){
                if(err){return next(err)}
                if(found_genre){
                    res.redirect(found_genre.url)
                }
                else{

                    genre.save(function(err){
                        if(err){return next(err);}
                        //Genre save. Redirect to genre detail page
                        res.redirect(genre.url);
                    });
                }
            });
        }
    }
]

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
