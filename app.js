/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer,gamePlaying; // declare variables

init(); // check below to initialize function

//dice = Math.floor(Math.random() * 6) + 1;  //Math.floor = remove decimal, Math.random = generate a random number between 0 to 1

//document.querySelector('#current-' + activePlayer).textContent = dice;  //to pass a variable
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var score = document.querySelector('#score-' + activePlayer).textContent; // read the content in a HTML document

// style a css

//document.querySelector('.dice').style.display = 'none';

// set score and current score to zero, used another method to select elements

//document.getElementById('score-0').textContent = 0;
//document.getElementById('current-0').textContent = 0;
//document.getElementById('score-1').textContent = 0;
//document.getElementById('current-1').textContent = 0;

    // configure ROLE DICE button
    
    // anonymus function
document.querySelector('.btn-roll').addEventListener('click',function(){
    
    // state variable gamePlaying, its already a boolean, 
    if(gamePlaying){
    
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. display the result

        // convert document.querySelector('.dice') to variable so no need to repeat it
        var diceDOM = document.querySelector('.dice');

        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. update the round score IF the rolled number was not a 1

        if(dice !== 1){

            //Add score
            roundScore = roundScore + dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            
            
            
            //exercise - consecutive 6 scores
            
            /*
            
            1. create an array to store inputs
            
            2. compare last and last previous inputs of the array
            
            3. if both inputs are ==6, then reset the roundscore and playerscore
            
            4. switch player
            
            var currentScore = [];
            
            for(var i = 0; i < currentScore.length; i++){
                
                currentScore[i] = dice;
                console.log(currentScore);
                
            }
            
            */
            

        } else {

            //switch player
            nextPlayer();   
        }

    }
    
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    
        if(gamePlaying){
            
            // add round score to global score
            scores[activePlayer] += roundScore;

            // display global score in UI

            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

            // switch player
            // display won if player has reached 100

            if(scores[activePlayer] >= 20){

                document.getElementById('name-' + activePlayer).textContent = 'WINNER !';
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');

                gamePlaying = false;

            } else {
                
                nextPlayer();
                
            }
        
        }
    
    });


function nextPlayer() {
    
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = roundScore;
        document.getElementById('current-1').textContent = roundScore;
        
        //toggle active player style
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    
};
    

// start new game

document.querySelector('.btn-new').addEventListener('click',init);


function init(){
    
   
    scores = [0,0]; //
    roundScore = 0;
    activePlayer = 0; // 0 = player 1, 1 = player 2
    
    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    

    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
    
    gamePlaying = true;
}


