const NUMBER_OF_QUESTIONS = 10;
const URL = `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}`;

let questionWrapper = document.getElementById("questionWrapper")
let questionElements = []

fetch(URL).then(response => response.json()).then(questions => {
    questions.results.forEach((question, index) => {
        questionElements.push(generateQuestions(question, index + 1))
    });

    loadQuestions(0)
})

function loadQuestions(idx) {
    questionWrapper.innerHTML = ""
    questionWrapper.appendChild(questionElements[idx])
}

function generateQuestions(questions, currentQuestionIndex){

    let state = document.createElement('div')
    state.classList.add("state")
    state.innerHTML = `<strong>${currentQuestionIndex}</strong>/${NUMBER_OF_QUESTIONS}`

    let questionElement = document.createElement("div")
    questionElement.classList.add("question-holder")
    questionElement.innerHTML = questions.question

    let answers = [questions.correct_answer, ...questions.incorrect_answers]

    answers.sort(() => Math.random()*2 - 1)

    let answersElement = document.createElement("div")
    answersElement.classList.add("answers")

    answers.forEach(answer => {
        let answerElement = document.createElement("div")
        answerElement.classList.add("answer")
        answerElement.innerHTML = answer
        
        answerElement.addEventListener("click", () => {
            answerElement.classList.toggle("clicked")

            if(answer === questions.correct_answer){
                console.log("asd true")
                answerElement.classList.add("correct")
            } else {
                console.log("asd false")
                answerElement.classList.add("uncorrect")
            }
            setTimeout(() => {
                loadQuestions(currentQuestionIndex)
            }, 1000)
        })


        answersElement.appendChild(answerElement)
    })

    let questionHolder = document.createElement("div")


    questionHolder.appendChild(state)
    questionHolder.appendChild(questionElement)
    questionHolder.appendChild(answersElement)

    return questionHolder

}