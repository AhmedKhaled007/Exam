// console.log(sessionStorage.user)
// console.log(localStorage.students)



var rndQA = [];

// open conntection with local file !! #AK
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var dataJ = this.responseText;
        var dataObject = JSON.parse(dataJ)
        rndQA = dataObject.results
        randomArray(rndQA)

    }
};
xhttp.open("GET", "JS/data.json", true);
xhttp.send();

//start exam function #AK
document.getElementById("start").onclick = function() {
    // check if user logged #AK
    if (!sessionStorage.getItem("user")) {
        alert("please login first")
        window.open("login.html", "_self")
        return false
    }
    // check if data loaded successfuly
    if (rndQA != "") {
        hideDesc();
        time();
        makeQuestion(rndQA)
        document.getElementById("submit-exam").onclick = function() {
            // check correct answer
            var result = checkAnswer(rndQA)
            saveResult(result)

        }
    } else {
        alert("error loading questions !!!")
    }
}




// Create Questions/Answer Form #AK
function makeQuestion(rndQA) {
    document.getElementById("exam").style.padding = "30x"
        // make loop to create each question and answers
    for (let i = 0; i < 10; i++) {
        // create div for question
        var qst = document.createElement("div");
        qst.className = "question";

        // insert question in praghaph
        var p = document.createElement("p");
        p.className = "qst-text";
        p.innerHTML = i + 1 + ".  " + rndQA[i].question;
        qst.appendChild(p);

        // create question points 
        var points = document.createElement("span");
        if (rndQA[i].difficulty == "easy") {
            points.innerHTML = "1 point"
        } else if (rndQA[i].difficulty == "medium") {
            points.innerHTML = " 2 point"
        } else if (rndQA[i].difficulty == "hard") {
            points.innerHTML = " 5 point"
        }
        qst.appendChild(points)

        // get answers and random order
        var rndAnswer = rndQA[i].incorrect_answers;
        rndAnswer.push(rndQA[i].correct_answer);
        randomArray(rndAnswer);

        // insert answers
        list = document.createElement("ul");
        rndAnswer.forEach(element => {
            list.innerHTML += "<li class='answ'><input type='radio' name='qst" + (i + 1) + "' value='" + element + "'>" + element + "</li>";
        });

        // append question and answer
        qst.appendChild(list);
        document.getElementById("exam").appendChild(qst);

    }

    // create submit buttion and clear button
    var btn = document.createElement("div")
    btn.innerHTML = "<button type='button' id='submit-exam'> Sumbit </button><button type='button' id='clr'> Clear </button>"
    btn.className = "btn"
    document.getElementById("exam").appendChild(btn)
    document.getElementById('clr').onclick = resetAnswer

}

// random array function #AK
function randomArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// check correct answers #AK
function checkAnswer(rndQA) {
    var score = 0
    var total = 0
    for (let i = 0; i < 10; i++) {
        // sum total points
        if (rndQA[i].difficulty == "easy") {
            total += 1
        } else if (rndQA[i].difficulty == "medium") {
            total += 2
        } else if (rndQA[i].difficulty == "hard") {
            total += 5
        }

        var val = ""
        var radio = document.querySelector("input[name='qst" + (i + 1) + "']:checked");
        if (radio) {
            val = radio.value
        }

        // collect score for correct answers
        if (val == rndQA[i].correct_answer) {
            if (rndQA[i].difficulty == "easy") {
                score += 1
            } else if (rndQA[i].difficulty == "medium") {
                score += 2
            } else if (rndQA[i].difficulty == "hard") {
                score += 5
            }
        }
    }

    var result = Math.round((score / total) * 100)
    return (result)
}

// start time function
function time() {
    var m = 04
    var s = 59
    document.getElementById('timer').innerHTML = m + ":" + s;
    startTimer(m, s);
}

// time function
function startTimer(m, s) {
    s -= 1;
    if (s < 0) {
        m -= 1;
        s = 59;
    }
    if (s < 10) {
        s = "0" + s
    }
    if (m >= 0) {
        document.getElementById('timer').innerHTML = m + " : " + s;
        setTimeout(function() { startTimer(m, s) }, 1000);
    } else {
        document.getElementById('exam').style.display = 'none';

        var result = checkAnswer(rndQA)
        saveResult(result)
        alert("Time Out !!!")
    }
}


// remove exam intro
function hideDesc() {
    var main = document.getElementsByClassName("main")[0]
    main.parentElement.removeChild(main)
}

// reset all answers
function resetAnswer() {
    for (var i = 0; i < 10; i++) {
        var ele = document.getElementsByName("qst" + (i + 1));
        for (var j = 0; j < 4; j++)
            ele[j].checked = false;
    }
}

// save exam result in local storage #AK
function saveResult(result) {
    if (localStorage.results) {
        // get old result object if exist
        var arrResult = JSON.parse(localStorage.results)
    } else {
        // create result object if non exist
        var arrResult = {}
    }
    // get logged user
    var user = sessionStorage.getItem("user")
        // assign result to user key/value pair in object
    arrResult[user] = result
    localStorage.results = JSON.stringify(arrResult);
    window.open("result.html", "_self")
}