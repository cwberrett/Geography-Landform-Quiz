//global variables
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
    names: ["Umm al-Maa', 'Siwa Oasis', 'Timia Oasis', 'Abraham\'s Oasis"],
    countries: ['Niger', 'Egypt', 'Syria', 'Libya'],
    answer: [1, 1]
 }];
var score = 0;
var index = 0;

//function declarations

//updates the questions and radio buttons
function addQuestion(num) {
    $('#quizNum').text('Question number: ' + (num + 1));
    $('#question').text(questions[num].question);
    for (var i = 0; i < questions[num].names.length; i++) {
        $('#landformOps').append('<input type="radio" name="landform" value="' + i + '"> <span id="l' + i + '">' + questions[num].names[i] + '</span><br>');
    }
    for (var j = 0; j < questions[num].countries.length; j++) {
        $("#countryOps").append('<input type="radio" name="country" value="' + j + '"> <span id="c' + j + '">' + questions[num].countries[j] + '</span><br>');
    }
}
//tells whether correct or not, gives the correct answer and updates the total
function checkAns(correct, land, place) {
    for (var i = 0; i < questions[index].names.length; i++) {
        if (i == land) {
            $('#l' + i).addClass('correct');
        } else {
            $('#l' + i).addClass('wrong');
        }
    }
    for (var j = 0; j < questions[index].countries.length; j++) {
        if (j == place) {
            $('#c' + j).addClass('correct');
        } else {
            $('#c' + j).addClass('wrong');
        }
    }
    if (correct){
        $('#question').text("Correct!");
        score++;
        $('#score').text(score + ' out of 10 correct');
    }
    else {
        $('#question').text("Incorrect!");
    }
    $("#submit").hide();
    $("#next").show();
}





$(document).ready(function() {
    $(".quiz").hide();
    $(".results").hide();
    $("#start").click(function() {
        $(".instructions").hide();
        $(".quiz").show();
        $("#next").hide();

        addQuestion(index);
    });
    $("#submit").click(function() {
        if ($("input[name=landform]:checked").val() === undefined || $("input[name=country]:checked").val() === undefined) {
            alert("Please select an option from each set of answers");
        } else {
            if ($("input[name=landform]:checked").val() == questions[index].answer[0] && $("input[name=country]:checked").val() == questions[index].answer[1]) {
                checkAns(true, questions[index].answer[0], questions[index].answer[1]);
            } else {
                checkAns(false, questions[index].answer[0], questions[index].answer[1]);
            }
            index++;
            //addQuestion();
        }
    });
    $("#next").click(function(){
        $("#next").hide();
        $("#submit").show();
        $("#landformOps").empty();
        $("#countryOps").empty();
        if (index<questions.length){
            addQuestion(index);
        }
        else{
            $(".quiz").hide();
            $(".results").show();
            $(".results h2").text("You Scored: "+score);
        }
    });
    $("#replay").click(function(){
        location.reload();
    });
});