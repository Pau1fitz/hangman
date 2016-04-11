var $ = jQuery.noConflict();
var app = app || {};
(function(){
    "use strict";
    var turns, 
        token;

    app.initialize = {        
        init: function() {
            app.startGame.init(); 
            app.takeGuess.init();
            app.getSolution.init(); 
        }
    },

    app.startGame = {
        init : function() {
            turns = 7;
            $(".remaining-guesses .remaining").text(turns + " guesses left");
             $.ajax({
                    type: "POST",
                    url: "http://hangman-api.herokuapp.com/hangman"
                }).done( function (data){
                    $('.token').text(data.token);
                    $(".hangman-word").text(data.hangman);
               });
                
            app.newGame.init();
        }
    },

    app.newGame = {
        init: function() {
            $("#new-game").click(function() {
                app.startGame.init();
            })  
        }
    }

    app.takeGuess = {
        init: function() {
            $("#guess").click(function() {
               var letter = $(".letter").val();
               token = $('.token').text();
               $.ajax({
                    type: "PUT",
                    dataType: 'json',
                    url: "http://hangman-api.herokuapp.com/hangman",
                    data: { "token": token, "letter": letter}
                }).done( function (data){
                    $(".hangman-word").text(data.hangman);
                    $(".token").text(data.token);
                    $("input.letter").val("");
                    if(data.correct === false){
                        turns--;
                        $(".remaining-guesses .remaining").text(turns + " guesses left");  
                    }
                    
               });
            })
        }
     },

     app.getSolution = {
        init: function() {
            $("#solution").click(function() {
                token = $('.token').text();
                $.ajax({
                    type: "GET",
                    dataType: 'json',
                    url: "http://hangman-api.herokuapp.com/hangman",
                    data: { "token": token }
                }).done(function(data){
                    $(".hangman-word").text(data.solution);
                })
            });
        }
     }

    app.docOnReady = {
        init: function() {
            app.initialize.init();
        }
    };

    $(document).ready(app.docOnReady.init);

})(jQuery);