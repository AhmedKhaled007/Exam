function validnames(x) {
    document.forms[0].elements[x].removeAttribute("style");
    if (document.forms[0].elements[x].value.length < 5) {
        document.forms[0].elements[x].style.border = 'red 1px solid';
        return false
    } else {
        for (i in document.forms[0].elements[x].value) {
            if (!isNaN(document.forms[0].elements[x].value[i])) {
                document.forms[0].elements[x].style.border = 'red 1px solid';
                return false

            }
        }
    }
    return true
};

function validuser(x) {
    document.forms[0].elements[x].removeAttribute("style");
    if (document.forms[0].elements[x].value.length < 5) {
        document.forms[0].elements[x].style.border = 'red 1px solid';
        return false

    } else {
        if (!isNaN(document.forms[0].elements[x].value[0])) {
            document.forms[0].elements[x].style.border = 'red 1px solid';
            return false

        }
    }
    return true

};

function validpass(x) {
    document.forms[0].elements[x].removeAttribute("style");
    if (document.forms[0].elements[x].value.length < 6) {
        document.forms[0].elements[x].style.border = 'red 1px solid';
        return false

    }
    return true

};

function vaildrepass() {
    document.forms[0].elements[4].removeAttribute("style");
    if (document.forms[0].elements[4].value.length != document.forms[0].elements[3].value.length) {
        document.forms[0].elements[4].style.border = 'red 1px solid';
        return false

    } else {
        for (i in document.forms[0].elements[4].value) {
            if (document.forms[0].elements[4].value[i] != document.forms[0].elements[3].value[i]) {
                document.forms[0].elements[4].style.border = 'red 1px solid';
                return false

            }
        }
    }
    return true

}
document.getElementById('fname').onblur = function() {
    validnames(0);
};
document.getElementById('lname').onblur = function() {
    validnames(1);
};
document.getElementById('username').onblur = function() {
    validuser(2);
}
document.getElementById('password').onblur = function() {
    validpass(3)
}
document.getElementById('RePassword').onblur = vaildrepass;



// ############################  AK

// valid city
function validCity() {
    if (city.value == 'city') {
        city.style.border = 'red 2px solid';
        return false
    } else {
        city.removeAttribute("style")
        return true
    }
}

//valid address
function validAddress() {
    if (address.value == "") {
        address.style.border = 'red 2px solid'
        return false
    }
    address.removeAttribute("style")
    return true
}


// get inputs 
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var username = document.getElementById("username");
var password = document.getElementById("password");
var city = document.getElementById('dropdownlist');
var address = document.getElementById('address')

// add validtion on sumbit
document.getElementById("register").addEventListener("click", function() {
    if (validnames(0) && validnames(1) && validuser(2) && validpass(3) && vaildrepass() && validCity() && validAddress()) {
        saveReg();
    }
})



// create constructor object #AK
function students(fname, lname, password, username, city, address) {
    this.fname = fname
    this.lname = lname
    this.password = password
    this.username = username
    this.city = city
    this.address = address
}

// save register in local storage   #AK
function saveReg() {
    // check if there is already localstorage
    if (localStorage.students) {
        var arrStudent = JSON.parse(localStorage.students)
    } else {
        var arrStudent = []
    }
    var count = arrStudent.length;

    //check if user name already exist
    for (var i = 0; i < count; i++) {

        if (arrStudent[i].username == username.value) {
            alert("user name already exists")
            return false
        }
    }

    //add student to array of student #AK
    var student = new students(fname.value, lname.value, password.value, username.value, city.value, address.value)
    arrStudent[count] = student
    localStorage.students = JSON.stringify(arrStudent);
    window.open("home.html", "_self")

}