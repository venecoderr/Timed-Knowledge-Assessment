let starterSection = document.querySelector('#starter')
let startGame = document.querySelector('#start')
let runGame = document.querySelector('#questionSection')
let clock = document.querySelector('#clock')
let time = document.querySelector('#time')
let questionDisplay = document.querySelector('#question')
let optionsList = document.querySelector('#optionsList')
let optionsDisplay = [document.querySelector('#optionA'), document.querySelector('#optionB'), document.querySelector('#optionC'), document.querySelector('#optionD')]
let savePage = document.querySelector('#saveScore')
let saveScoreBtn = document.querySelector('#saveScoreBtn')
let finalScore = document.querySelector('#finalScore')
let initialInput = document.querySelector('#initials')
let showHighScore = document.querySelector('#highScoreBtn')
let highscorePage = document.querySelector('#highScores')
let scoreBoardReset = document.querySelector('#scoreBoardReset')
let scoreBoard = document.querySelector('#scoreBoard')
let tryAgainBtn = document.querySelector('#tryAgain')
let clearBtn = document.querySelector('#clear')
let questions = ['Test Q1', 
'Test Q2', 
'Test Q3', 
'Test Q4', 
'Test Q5',
'Test Q6', 
'Test Q7', 
'Test Q8', 
'Test Q9', 
'Test Q10']

let options = [['Option A Q 1', 'Option B Q 1', 'Option C Q 1', 'Option D Q 1'],
['Option A Q 2', 'Option B Q 2', 'Option C Q 2', 'Option D Q 2'],
['Option A Q 3', 'Option B Q 3', 'Option C Q 3', 'Option D Q 3'],
['Option A Q 4', 'Option B Q 4', 'Option C Q 4', 'Option D Q 4'],
['Option A Q 5', 'Option B Q 5', 'Option C Q 5', 'Option D Q 5'],
['Option A Q 6', 'Option B Q 6', 'Option C Q 6', 'Option D Q 6'],
['Option A Q 7', 'Option B Q 7', 'Option C Q 7', 'Option D Q 7'],
['Option A Q 8', 'Option B Q 8', 'Option C Q 8', 'Option D Q 8'],
['Option A Q 9', 'Option B Q 9', 'Option C Q 9', 'Option D Q 9'],
['Option A Q 10', 'Option B Q 10', 'Option C Q 10', 'Option D Q 10']]

let correctAnswers = [0, 1, 2, 3, 2, 3, 1, 0, 3, 1 ]

let usedQuestions = []
let selector = 0
let score = 0
let answer = ''
let timeLeft = 0
let timeStop = false

function pickQuestion(){
    
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

function startGameFunction(){

    usedQuestions = []
    selector = 0
    score = 0
    answer = ''
    timeStop = false
    timeLeft = 60

    starterSection.setAttribute('style', 'display: none')
    runGame.setAttribute('style', 'display: flex')
    clock.setAttribute('style', 'display: flex')
    highscorePage.setAttribute('style', 'display: none')
    timeStop = false

    pickQuestion()
}

function selectAnswer(event){
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

function showSaveScore (){
    finalScore.textContent = score + ' '

    runGame.setAttribute('style', 'display: none')
    savePage.setAttribute('style', 'display: flex')
    clock.setAttribute('style', 'display: none')
}

function saveScore(event){
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

    showHighScorePage()
}

function showHighScorePage(event){
    starterSection.setAttribute('style', 'display: none')
    runGame.setAttribute('style', 'display: none')
    clock.setAttribute('style', 'display: none')
    savePage.setAttribute('style', 'display: none')
    highscorePage.setAttribute('style', 'display: flex')
    scoreBoardReset.setAttribute('style', 'display: flex')
    timeStop = true
}

function clearScores(event){
    let savedScores = document.querySelectorAll('.scoreEntry')

    for(let i = 0; i < savedScores.length; i++){
        savedScores[i].remove()
    }

}

function engine(event) {
    startGameFunction()

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



startGame.addEventListener('click', engine)
optionsList.addEventListener('click', selectAnswer)
showHighScore.addEventListener('click', showHighScorePage)
saveScoreBtn.addEventListener('click', saveScore)
tryAgainBtn.addEventListener('click', engine)
clearBtn.addEventListener('click', clearScores)
