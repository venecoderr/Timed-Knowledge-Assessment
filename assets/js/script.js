//Selectors

let starterEl = document.querySelector('#starter')
let startGame = document.querySelector('#start')
let runGame = document.querySelector('#questionSection')
let clock = document.querySelector('#clock')
let time = document.querySelector('#time')
let questionDisplay = document.querySelector('#question')
let optionsList = document.querySelector('#optionsList')
let optionsDisplay = [document.querySelector('#optionA'), document.querySelector('#optionB'), document.querySelector('#optionC'), document.querySelector('#optionD')]
let saveEl = document.querySelector('#saveScore')
let saveScoreBtn = document.querySelector('#saveScoreBtn')
let finalScore = document.querySelector('#finalScore')
let initialInput = document.querySelector('#initials')
let showHighScore = document.querySelector('#highScoreBtn')
let highscoreEl = document.querySelector('#highScores')
let scoreBoardReset = document.querySelector('#scoreBoardReset')
let scoreBoard = document.querySelector('#scoreBoard')
let tryAgainBtn = document.querySelector('#tryAgain')
let clearBtn = document.querySelector('#clear')

//Questions and Options

let questions = ['What selector can be use with the querySelector method?', 
'What parameter do we usually pass into the function of an eventListener?', 
'What attributes can be set with the setAttribute method?', 
'What method can I use to select HTML elements?', 
'What is the correct syntax for the append mnethod?',
'What function stops a timer before the time runs out?', 
'How many parameters does the eventListener function requires?', 
'If there is an eventListener on parent and child elements..?', 
'What are the types of keyBoard events?', 
'Local storage is?']

let options = [['IDs', 'Classes', 'Element names', 'all of the above'],
['Object', 'Event', 'Variable', 'Method'],
['Element attributes', 'Class attributes', 'CSS attributes', 'Js attributes'],
['quarrySelector', 'selectElement', 'getElementByID', 'all of them'],
['parentElement.append(childElement)', 'parentElement.append = childElement', 'parentElement.append: childElement', 'none of them'],
['stopInterval()', 'clearTimer()', 'clearInterval()', 'stopTimer()'],
['1', '2', '7', 'none'],
['triggering the child will trigger the parent', 'triggering the parent will trigger the child', 'both', 'nothing happens'],
['keyUp', 'keyDown', 'Both', 'neither'],
['Safe and protected', 'Could backed-up', 'Hard to access', 'Unsafe and unprotected']]

let correctAnswers = [3, 1, 0, 2, 0, 2, 1, 0, 2, 3 ]

//Game variables

let usedQuestions = []
let selector = 0
let score = 0
let answer = ''
let timeLeft = 0
let timeStop = false

//Main test functions

function pickQuestion(){

    //Function picks question
    
    selector = Math.floor(Math.random()*questions.length)
    while(usedQuestions.includes(selector)){
        selector = Math.floor(Math.random()*questions.length)
    }
    
    questionDisplay.textContent = questions[selector]
    
    for(let i = 0; i < optionsDisplay.length; i++){
        optionsDisplay[i].textContent = options[selector][i]
    }

    usedQuestions+= selector
}

function startTest(){

    //Function starts test

    usedQuestions = []
    selector = 0
    score = 0
    answer = ''
    timeStop = false
    timeLeft = 60

    starterEl.setAttribute('style', 'display: none')
    runGame.setAttribute('style', 'display: flex')
    clock.setAttribute('style', 'display: flex')
    highscoreEl.setAttribute('style', 'display: none')
    timeStop = false

    pickQuestion()
}

function selectAnswer(event){

    //Function allows selection of option, validates answer and runs points and time bonus

    answerSelected = event.target.getAttribute('id')

    let rightOrWrong = document.createElement('h2')
    let displayLeft = 1

    if (answerSelected === 'optionA'){
        answer = options[selector][0]
    } else if (answerSelected === 'optionB'){
        answer = options[selector][1]
    } else if (answerSelected === 'optionC'){
        answer = options[selector][2]
    }else{
        answer = options[selector][3]
    } 

    if(answer === options[selector][correctAnswers[selector]]){
        score+=10
        timeLeft+=10
        rightOrWrong.setAttribute('id', 'right')
        rightOrWrong.setAttribute('class', 'rightOrWrongBox')
        rightOrWrong.textContent = 'Correct'
        runGame.append(rightOrWrong)
        let displayInterval = setInterval(function() {
            displayLeft--;
            if(displayLeft >= 0){
                rightOrWrong.remove()
            }
          }, 1000);
    }else{
        timeLeft-=10
        rightOrWrong.setAttribute('id', 'wrong')
        rightOrWrong.setAttribute('class', 'rightOrWrongBox')
        rightOrWrong.textContent = 'Wrong'
        runGame.append(rightOrWrong)
        let displayInterval = setInterval(function() {
            displayLeft--;
            if(displayLeft >= 0){
                rightOrWrong.remove()
            }
          }, 1000);
    }

    if(usedQuestions.length === questions.length){
        timeStop = true
    }
    
    if(usedQuestions.length < questions.length){
        pickQuestion()
    }else{
        showSaveScore()
    }
}

//Save page functions

function showSaveScore (){

    //shows saving page

    finalScore.textContent = score + ' '

    runGame.setAttribute('style', 'display: none')
    saveEl.setAttribute('style', 'display: flex')
    clock.setAttribute('style', 'display: none')
}

function saveScore(event){

    //function saves score and appends to leaderboard

    let initials = initialInput.value
    let entryName = document.createElement('h3')
    let entryScore = document.createElement('h3')
    let entry = document.createElement('section')

    entryName.textContent = initials
    entryScore.textContent = score
    entry.append(entryName)
    entry.append(entryScore)

    entry.setAttribute('class', 'scoreEntry')
    scoreBoard.append(entry)

    showHighScoreEl()
}

//Leaderboard functions

function showHighScoreEl(event){

    //Shows scores

    starterEl.setAttribute('style', 'display: none')
    runGame.setAttribute('style', 'display: none')
    clock.setAttribute('style', 'display: none')
    saveEl.setAttribute('style', 'display: none')
    highscoreEl.setAttribute('style', 'display: flex')
    scoreBoardReset.setAttribute('style', 'display: flex')
    timeStop = true
}

function clearScores(event){

    //Clears leaderboard

    let savedScores = document.querySelectorAll('.scoreEntry')

    for(let i = 0; i < savedScores.length; i++){
        savedScores[i].remove()
    }

}

//Engine runs the apps

function engine(event) {
    startTest()

    var timerInterval = setInterval(function() {
      timeLeft--;
      time.textContent = timeLeft;
  
      if(timeLeft <= 0) {
        clearInterval(timerInterval)
        showSaveScore()
      }

      if(timeStop){
        clearInterval(timerInterval)
      }
  
    }, 1000);
}

//Event listeners

startGame.addEventListener('click', engine)
optionsList.addEventListener('click', selectAnswer)
showHighScore.addEventListener('click', showHighScoreEl)
saveScoreBtn.addEventListener('click', saveScore)
tryAgainBtn.addEventListener('click', engine)
clearBtn.addEventListener('click', clearScores)
