//object to contain all the variables and functions
var quiz = {
    index: -1,
    score: 0
};

//contstructor to create the model to hold appropriate properties and methods
quiz.Model = function(questions) {
    this.questions = questions;
};

quiz.View = function(elementId) {


};

//Hide all but the intro section
quiz.View.prototype.initiate = function() {
    $(".quiz").hide();
    $(".results").hide();
};
//Figure out why view.addquestion is not getting called after clicking next

quiz.View.prototype.addQuestion = function(model) {
    var questions;
    if (model.questions === undefined) {
        questions = this.questions;
    } else { questions = model.questions; }

    quiz.index += 1;
    var num = quiz.index;
    $(".instructions").hide();
    $(".quiz").show();
    $("#next").hide();
    $('#quizNum').text('Question number: ' + (num + 1));
    $('#question').text(questions[num].question);
    for (var i = 0; i < questions[num].names.length; i++) {
        $('#landformOps').append('<input type="radio" name="landform" value="' + i + '"> <span id="l' + i + '">' + questions[num].names[i] + '</span><br>');
    }
    for (var j = 0; j < questions[num].countries.length; j++) {
        $("#countryOps").append('<input type="radio" name="country" value="' + j + '"> <span id="c' + j + '">' + questions[num].countries[j] + '</span><br>');
    }
};

quiz.View.prototype.checkAns = function(correct, model, land, place) {
    var index = quiz.index;
    questions = model.questions;
    for (var i = 0; i < questions[quiz.index].names.length; i++) {
        if (i == land) {
            $('#l' + i).addClass('correct');
        } else {
            $('#l' + i).addClass('wrong');
        }
    }
    for (var j = 0; j < questions[quiz.index].countries.length; j++) {
        if (j == place) {
            $('#c' + j).addClass('correct');
        } else {
            $('#c' + j).addClass('wrong');
        }
    }
    if (correct) {
        $('#question').text("Correct!");
        quiz.score++;
        $('#score').text(quiz.score + ' out of 10 correct');
    } else {
        $('#question').text("Incorrect!");
    }
    $("#submit").hide();
    $("#next").show();
};
//tells whether co
quiz.Controller = function(startId, submitId, nextID, replayId, model, view) {
    this.model = model;
    this.view = view;
    this.start = document.getElementById(startId);
    this.start.addEventListener('click', view.addQuestion.bind(model));
    this.submit = document.getElementById(submitId);
    this.submit.addEventListener('click', function() {
        if ($("input[name=landform]:checked").val() === undefined || $("input[name=country]:checked").val() === undefined) {
            alert("Please select an option from each set of answers");
        } else {
            if ($("input[name=landform]:checked").val() == questions[quiz.index].answer[0] && $("input[name=country]:checked").val() == questions[quiz.index].answer[1]) {
                view.checkAns(true, model, model.questions[quiz.index].answer[0], model.questions[quiz.index].answer[1]);
            } else {
                view.checkAns(false, model, model.questions[quiz.index].answer[0], model.questions[quiz.index].answer[1]);
            }
        }
    });
    this.next = document.getElementById(nextID);
    this.next.addEventListener('click', function() {
        $("#next").hide();
        $("#submit").show();
        $("#landformOps").empty();
        $("#countryOps").empty();
        if (quiz.index < model.questions.length - 1) {
            view.addQuestion(model);
        } else {
            $(".quiz").hide();
            $(".results").show();
            $(".results h2").text("You Scored: " + quiz.score);
        }
    });
    this.replay = document.getElementById(replayId);
    this.replay.addEventListener('click', function () {
        location.reload();
    });
};


var questions = [{
    question: "This desert lies in the rain shadow of the Himalayan Mountains and is home to many cities alonf the silk road.",
    names: ['Atacama Desert', 'Sahara Desert', 'Gobi Desert', 'Sonoran Desert'],
    countries: ['China', 'Chile', "Mexico", "Algeria"],
    answer: [2, 0]
}, {
    question: "This canyon is the deepest canyon/gorge in the world.",
    names: ['Grand Canyon', 'Todra Gorge', 'Cotahuasi Canyon', 'Kings Canyon'],
    countries: ['Peru', 'United States', 'Morocco', 'Austailia'],
    answer: [2, 0]
}, {
    question: "This mountain range is the longest range in the world.",
    names: ['Rocky Mountains', 'Andes Mountains', 'Himalayas', 'Sierra Nevadas'],
    countries: ['China', 'Canada', "United States", "Chile"],
    answer: [1, 3]
}, {
    question: "These cliffs are famous for their bright white color.",
    names: ['Cliffs of Moher', 'Cliffs of Dover', 'Al Hajjara', 'Preikestolen Cliff'],
    countries: ['United Kingdom', 'Yemen', 'Ireland', 'Norway'],
    answer: [1, 0]
}, {
    question: "This Oasis is famous for being the site where Alexander the Great visited the Oracle of Amun",
    names: ['Umm al-Maa', 'Siwa Oasis', 'Timia Oasis', 'Abraham\'s Oasis'],
    countries: ['Niger', 'Egypt', 'Syria', 'Libya'],
    answer: [1, 1]
}];




$(document).ready(function() {
    var model = new quiz.Model(questions);
    var view = new quiz.View();
    var controller = new quiz.Controller('start', 'submit', 'next', 'replay', model, view);
    view.initiate();
});