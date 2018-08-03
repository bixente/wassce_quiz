//original code from http://www.flashbynight.com/tutes/mcqquiz/example/
//from https://css-tricks.com/snippets/javascript/shuffle-array/		 
$(document).ready(function() {
    var questionNumber = 0;
    var questionBank = new Array();
    var stage = "#game1";
    var stage2 = new Object();
    var questionLock = false;
    var numberOfQuestions;
    var score = 0;
    function Shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], 
        o[j] = x) ;
        return o;
    }
    $.getJSON("activity.json", function(data) {
        Shuffle(data.quizlist);
        $(function() {
            for (var i = 0; i < data.quizlist.length; i++) {
                $("#dump").append(data.quizlist[i]);
            }
        });
        for (i = 0; i < 5; i++) {
            questionBank[i] = new Array();
            questionBank[i][0] = data.quizlist[i].question;
            questionBank[i][1] = data.quizlist[i].option1;
            questionBank[i][2] = data.quizlist[i].option2;
            questionBank[i][3] = data.quizlist[i].option3;
            questionBank[i][4] = data.quizlist[i].option4;
        }
        numberOfQuestions = questionBank.length;
        displayQuestion();
    });
    function displayQuestion() {
        var rnd = Math.random() * 4;
        rnd = Math.ceil(rnd);
        var q1;
        var q2;
        var q3;
        var q4;
        if (rnd == 1) {
            q1 = questionBank[questionNumber][1];
            q2 = questionBank[questionNumber][2];
            q3 = questionBank[questionNumber][3];
            q4 = questionBank[questionNumber][4];
        }
        if (rnd == 2) {
            q2 = questionBank[questionNumber][1];
            q3 = questionBank[questionNumber][2];
            q1 = questionBank[questionNumber][3];
            q4 = questionBank[questionNumber][4];
        }
        if (rnd == 3) {
            q3 = questionBank[questionNumber][1];
            q4 = questionBank[questionNumber][2];
            q2 = questionBank[questionNumber][3];
            q1 = questionBank[questionNumber][4];
        }
        if (rnd == 4) {
            q4 = questionBank[questionNumber][1];
            q1 = questionBank[questionNumber][2];
            q2 = questionBank[questionNumber][3];
            q3 = questionBank[questionNumber][4];
        }
        $(stage).append('<div class="questionText">' + questionBank[questionNumber][0] + '</div><div id="1" class="option">' + q1 + '</div><div id="2" class="option">' + q2 + '</div><div id="3" class="option">' + q3 + '</div><div id="4" class="option">' + q4 + "</div>");
        $(".option").click(function() {
            if (questionLock == false) {
                questionLock = true;
                if (this.id == rnd) {
                    $(stage).append('<div class="feedback1">CORRECT</div>');
                    score++;
                }
                if (this.id != rnd) {
                    $(stage).append('<div class="feedback2">WRONG: The correct answer was "' + questionBank[questionNumber][1] + '"</div>');
                }
                setTimeout(function() {
                    changeQuestion();
                }, 1e3);
            }
        });
    }
    function changeQuestion() {
        questionNumber++;
        if (stage == "#game1") {
            stage2 = "#game1";
            stage = "#game2";
        } else {
            stage2 = "#game2";
            stage = "#game1";
        }
        if (questionNumber < numberOfQuestions) {
            displayQuestion();
        } else {
            displayFinalSlide();
        }
        $(stage2).animate({
            right: "+100%"
        }, "slow", function() {
            $(stage2).css("right", "-100%");
            $(stage2).empty();
        });
        $(stage).animate({
            right: "+=100%"
        }, "slow", function() {
            questionLock = false;
        });
    }
    function displayFinalSlide() {
        $(stage).append('<div class="questionText">You have finished the quiz!<br><br>Total questions: ' + numberOfQuestions + "<br>Correct answers: " + score + "</div>");
        $(stage).append('<div class="questionText"><button type="button" class="re-start" style="border-color: rgb(255, 255, 255)" onclick=window.location.reload();>Restart</button></div>');
        $(stage).append('<div class="questionText" style="margin-top: 15px">If you want to revise, visit <a href="https://wasscehistorytextbook.com/">our website</a>.</div>');
    }
});