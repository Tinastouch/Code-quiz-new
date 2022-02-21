// getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer_sec");
const timeLine = quiz_box.querySelector(".time_line");
const timeOff = quiz_box.querySelector(".time_text");
const option_list = document.querySelector(".option_list");

// If Start Quiz Button Clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //show the info box
}

// If Exit Button Clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide the info box
}

// If Continue Button Clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); //show the quiz  box
    showQuestions(0);
    queCounter(1);
    startTimer(timeValue)
    startTimerLine(counterLineValue);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let counterLineValue = 0;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit")

restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    que_count = 0;
    que_numb = 1;
    timeValue = 15;
    widthValue = 0;
    userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    console.log('clearing in restart')
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = 'none';
    timeOff.textContent = "Time Left";

}

quit_quiz.onclick = () => {
    window.location.reload
}

// If next button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        console.log('clearing in next IF')
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = 'none';
        timeOff.textContent = "Time Left";
        timeValue = 16;
        counterLineValue = 0;
    } else {
        console.log('clearning in next ELSE')
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions completed");
        showResultBox();
    }
}
// getting questions and options from an array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>' + questions[index].numb + "." + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        console.log('in event for loop')
        option[i].addEventListener("click", function () { optionSelected(option[i]) });
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div> ';

function optionSelected(answer) {
    console.log('clearing in optionSelected')
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        counterLineValue = 0;
        answer.classList.add("incorrect");
        console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        // If answer is incorrect then automatically select the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContnet == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }

        }
    }
    // once user selected disabled all options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = 'block';
}
function showResultBox() {
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.remove("activeQuiz"); //hide the quiz  box
    result_box.classList.add("activeResult"); //show the result box
    const scoreTextEl = result_box.querySelector(".score_text");
    if (userScore > 3) {
        let scoreText = '<span>and congrats! you got <p>' + userScore + '</p>out of<p>' + questions.length + '</p></span>';
        scoreTextEl.innerHTML = scoreText;
    }
    else if (userScore > 1) {
        let scoreText = '<span>and nice, you got <p>' + userScore + '</p>out of<p>' + questions.length + '</p></span>';
        scoreTextEl.innerHTML = scoreText;
    }
    else {
        let scoreText = '<span>and sorry, you got only <p>' + userScore + '</p>out of<p>' + questions.length + '</p></span>';
        scoreTextEl.innerHTML = scoreText;
    }
}

function startTimer(time) {
    console.log('start Time is being called');
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        console.log('time before --', timeValue);
        timeValue--;
        timeCount.textContent = timeValue;
        console.log('time AFTER --', timeValue);
        if (timeValue < 10) {
            console.log('less than 10')
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (timeValue < 0) {
            console.log('less than 0')
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }

            } for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = 'block';
        }
    }
}


function startTimerLine() {
    counterLine = setInterval(timer, 1000);
    function timer() {
        counterLineValue++;
        timeLine.style.width = (100 / 14 * counterLineValue) + "%";
        if (counterLineValue > 13) {
            clearInterval(counterLine);
        }
    }
}


function queCounter(index) {

    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>Of<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}