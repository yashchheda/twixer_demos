function main(){
    "use strict";

    var acct1 = {user: "acct1", pass: "pass1", voted: [], toVote: []},
        accts = [],
        tweets = [],
        acctNum = 0;

    accts.push(acct1);
    accts.push({user: "acct2", pass: "pass2", voted: [], toVote: []});
    createTweet("Hello");
    createTweet("Other tweet");

    $(".submit").on("click", function(){
        var text = $(".tweet").val(),
            $tweet = createTweetHTML(text);
        if(getIndexOfTweet(text, tweets) === -1){
            $(".vote-queue").append($tweet);
            createTweet(text); 
        }
        else{
            alert("Tweet with this text already being voted on!");
        }        
    });

    //Event handler for yes votes
    var upvoteClick = function(){
        var $tweet = $(this).parent(),
            text = $tweet.find("span").text(),
            toVote = accts[acctNum].toVote,
            voted = accts[acctNum].voted,
            usrIndex = getIndexOfTweet(text,toVote),
            twtIndex = getIndexOfTweet(text, tweets),
            tweet = toVote[usrIndex];

        //Set user's vote to yes in tweet stack
        tweets[twtIndex].ballot[acctNum] = 1;

        //Remove tweet from the users voting queue
        toVote.splice(usrIndex, 1);
        voted.push(tweet);
        $(".voted").append($("<p>").text(text));
        $tweet.remove();
    };

    //Event handler for no votes
    var downvoteClick = function(){
        var $tweet = $(this).parent(),
            text = $tweet.find("span").text(),
            toVote = accts[acctNum].toVote,
            voted = accts[acctNum].voted,
            usrIndex = getIndexOfTweet(text,toVote),
            twtIndex = getIndexOfTweet(text, tweets),
            tweet = toVote[usrIndex];

        //Set user's vote to yes in tweet stack
        tweets[twtIndex].ballot[acctNum] = 0;

        //Remove tweet from the users voting queue
        toVote.splice(usrIndex, 1);
        voted.push(tweet);
        $(".voted").append($("<p>").text(text));
        $tweet.remove();
    };

    //Creates tweet object and puts it in each users vote queue
    function createTweet(text){
        var tweet = {text: text},
            tweetBallot = {text: text, ballot: []};
            accts.forEach(function(acct){
                tweetBallot.ballot.push(2);
                acct.toVote.push(tweet);
            });
        tweets.push(tweetBallot);
    }

    //Prepares and return a tweet html object
    function createTweetHTML(text){
        var $tweet = $("<div>").addClass("tweet-obj"),
            $text = $("<span>").text(text),
            $upvote = $("<button>Yes</button>"),        
            $downvote = $("<button>No</button>");

        //initialize buttons
        $upvote.click(upvoteClick);
        $downvote.click(downvoteClick);

        //build tweet object
        $tweet.append($text);
        $tweet.append($upvote);
        $tweet.append($downvote);

        return $tweet; 
    }

    //returns the index of the tweet with the given text in the given array
    function getIndexOfTweet(text, voteStack){
        var i,
            index = -1;
        for(i=0;i<voteStack.length;i++){
            if(voteStack[i].text === text){
                index = i;
            }
        }
        return index;
    }

    //populates the page with tweets this user neeeds to vote on
    (function(acct){
        acct = acct1;
        var toVote = acct.toVote;

        toVote.forEach(function(tweet){
            $(".vote-queue").append(createTweetHTML(tweet.text));
        });
    })(accts[acctNum]);

    //shows all current tweets and the vote tally for each
    //TODO: Change this do alter the contents of HTML tags and not just rewrite it every time
    setInterval(function(){
        var yay,
            nay;
        $(".vote-tweet").remove();
        tweets.forEach(function(tweet){
            yay=0;
            nay=0;
            tweet.ballot.forEach(function(vote){
                if(vote === 0){
                    nay++;
                }
                if(vote === 1){
                    yay++;
                }                
            });
            $(".tweets").append(
                $("<p>").text("'"+tweet.text+"' Yes: "+yay+" No: "+nay).addClass("vote-tweet")
            );
        });

    }, 500);
}

$(document).ready(main);