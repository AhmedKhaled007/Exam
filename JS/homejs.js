// console.log(localStorage.students)
var slidecontent = document.getElementById('slider');
var bodyslider = document.getElementById('mybody');
var imgsarr = ['1', '2', '3', '4'];
var count = imgsarr.length;
var textbox1 = document.createElement('input');
textbox1.className = "textarea"
textbox1.setAttribute('type', "text")

var textbox2 = document.createElement('input');
textbox2.className = "textarea"
textbox2.setAttribute('type', "password")

var loginbtn = document.createElement('button');
loginbtn.setAttribute("id", "barLogin")
var passwordicrepted = [];

function nextimgs() {
    if (count < imgsarr.length) {
        count += 1;
    } else {
        count = 1;
    }
    slidecontent.style.backgroundImage = 'url(slider-imgs/' + imgsarr[count - 1] + '.jpg)';
    bodyslider.style.backgroundImage = 'url(slider-imgs/' + imgsarr[count - 1] + '.jpg)';
};

function previmgs() {
    if (count < imgsarr.length + 1 && count > 1) {
        count -= 1;
    } else {
        count = imgsarr.length;
    }
    slidecontent.style.backgroundImage = 'url(slider-imgs/' + imgsarr[count - 1] + '.jpg)';
    bodyslider.style.backgroundImage = 'url(slider-imgs/' + imgsarr[count - 1] + '.jpg)';
};

function login() {
    var mytype = document.getElementById('more').value;
    if (mytype == 'login') {
        var myelement = document.getElementById('loginform');
        textbox1.setAttribute('placeholder', 'User Name');
        textbox2.setAttribute('placeholder', 'Password');
        myelement.appendChild(textbox1.cloneNode(true));
        myelement.appendChild(textbox2.cloneNode(true));
        loginbtn.innerText = 'sign in';
        loginbtn.className = 'login'
        myelement.appendChild(loginbtn.cloneNode(true));
        myelement.style.backgroundColor = '#181b31';
        myelement.style.borderRadius = '20px'
        myelement.style.marginTop = '200px';
        myelement.style.position = 'fixed';
        myelement.style.maxWidth = '250px';
        myelement.style.marginLeft = '70px';
        myelement.style.maxHeight = '300px';
        document.getElementById('more').value = '-';
    } else {
        document.getElementById('loginform').innerHTML = '';
        document.getElementById('more').value = 'login';
    };
};

/*function passwordincrepted() {
    var passworarea = document.getElementById('loginform').children[1];
    for (i = 0; i < passworarea.length + 1; i++) {
        passwordicrepted[i] = 0
    };

};*/
/*window.onscroll = function() {
    var nodelist = document.body.childNodes.length;
    if (nodelist >= 2) {
        document.getElementsByClassName('header')[0].style.backgroundColor = '#181b31';
    } else {
        document.getElementsByClassName('header')[0].style.backgroundColor = 'transparent';
    };
};*/

setInterval(nextimgs, 3000)
document.getElementById('next').onclick = nextimgs;
document.getElementById('prev').onclick = previmgs;
document.getElementById('more').onclick = login;