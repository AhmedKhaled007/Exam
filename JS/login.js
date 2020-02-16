// console.log(localStorage.students)


// save logging buttons #AK
var pageLogin = document.getElementById('log')
var footerLogin = document.getElementById('btn')
var navLogin = document.getElementById('more')

// check login id/pw #AK
function checkLogin(loginBtn) {
    var flag = false
    var user = loginBtn.previousElementSibling.previousElementSibling.value
    var pass = loginBtn.previousElementSibling.value

    //  get register users
    if (localStorage.students) {
        var arrStudent = JSON.parse(localStorage.students)
    } else {
        alert("register first")
        return flag
    }

    // check user if user exist
    for (var i = 0; i < arrStudent.length; i++) {
        if ((arrStudent[i].username == user) && (arrStudent[i].password == pass)) {
            flag = true;
            sessionStorage.setItem("user", arrStudent[i].username)
            return flag
        }
    }
    if (flag == false) {
        alert("wrong user or password")
        return flag
    }
}

// hide login form when logging success #AK

function logged() {
    // hide login form
    if (navLogin) {
        document.getElementById('loginform').innerHTML = '';
        document.getElementById('more').value = 'login';
        document.getElementById('login').style.display = 'none'
    }
    if (footerLogin) {
        document.getElementById('form').style.display = 'none'
    }

    // write welcome user
    var out = document.getElementById('out')
    out.innerHTML = "<span>welcome, " + sessionStorage.getItem("user") + " </span>";

    // create result key
    var btnResult = document.createElement('button')
    btnResult.innerHTML = "Result"
    btnResult.setAttribute("id", "btnResult");

    // create logout button
    var btnLogout = document.createElement('button')
    btnLogout.innerHTML = "logout"
    btnLogout.setAttribute("id", "logoutBtn")

    // append buttons
    out.appendChild(btnResult)
    out.appendChild(btnLogout)

    // add events function on buttonss
    document.getElementById('logoutBtn').addEventListener("click", logout)
    document.getElementById('btnResult').addEventListener("click", function() { window.open("result.html", "_self") })

}


// logout button function #AK
function logout() {
    // remove user from session storage
    sessionStorage.removeItem("user")
        // show login form
    if (footerLogin) {
        document.getElementById('form').style.display = 'block'
    }
    if (navLogin) {
        document.getElementById('login').style.display = 'block'
    }
    document.getElementById('out').innerHTML = "<a href='signup.html'>RIGISTER</a>"
    window.open("home.html", "_self")
}


// add login function to login button in login page #AK
if (pageLogin) {
    pageLogin.onclick = function() {
        if (checkLogin(this)) {
            window.open("exam.html", "_self")
        }
    }
}


// add login function to footer login #AK
if (footerLogin) {
    footerLogin.onclick = function() {
        if (checkLogin(this)) {
            logged()
        }
    }
}

// add login function to navbar login #AK
if (navLogin) {
    navLogin.addEventListener("click", function() {
        var barLogin = document.getElementById('barLogin')
        barLogin.onclick = function() {
            if (checkLogin(this)) {
                logged()
            }
        }
    })
}


// check if user loggin when load #AK
(function() {
    if (sessionStorage.getItem("user")) {
        logged()
    }
})();