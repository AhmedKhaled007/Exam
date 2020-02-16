// get result from local storage #AK
var arrResult = JSON.parse(localStorage.results)

// get current user name #AK
var user = sessionStorage.getItem("user")

var result = arrResult[user]
var resultTag = document.getElementById('result')

// write result #AK
if (result > 50) {
    resultTag.innerHTML = "Congration you success you result = " + result + "%"
} else if (result < 50) {
    resultTag.innerHTML = "you Failed please try again when you ready or don't doesn't matter you are Loser , you result  = " + result + "%"

} else {
    resultTag.innerHTML = " go exam first !!!"
}