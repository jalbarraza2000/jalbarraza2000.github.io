var firebaseConfig = {
  apiKey: "AIzaSyDKpHF5-gDx2Tf7jJrCJ3Os888ep8HW9wo",
  authDomain: "website-resume1.firebaseapp.com",
  databaseURL: "https://website-resume1.firebaseio.com",
  projectId: "website-resume1",
  storageBucket: "website-resume1.appspot.com",
  messagingSenderId: "790207277348",
  appId: "1:790207277348:web:ce2856dfbcb55319102bb1",
  measurementId: "G-NZKKWSN4J0"
};

var websiteDatabase = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var facebook;
var github;
var linkedin;


/* Firebase Loading Functions */
function renderInformation(doc) {
  var parent1 = document.getElementById("aboutMeName");
  var parent2 = document.getElementById("aboutMeShortDesc");
  var parent3 = document.getElementById("aboutMeDesc");

  var data = doc.data(); 
  var text1 = data.name;
  var text2 = data. shortdesc;
  var text3 = data.desc1;

  var par1 = document.createElement("h2");
  var par2 = document.createElement("h4");
  var par3 = document.createElement("p");
    
  par1.innerHTML = text1;
  par2.innerHTML = text2;
  par3.innerHTML = text3;

  parent1.appendChild(par1);
  parent2.appendChild(par2);
  parent3.appendChild(par3);
}

function renderSocialMedia(doc) {
  var data = doc.data();
  var text1 = data.facebook;
  var text2 = data.linkedin;
  var text3 = data.github;

  facebook = text1;
  linkedin = text2;
  github = text3;
}

function renderEducation(doc) {
  var parent = document.getElementById("educationBack");
  var data = doc.data();

  var column = document.createElement("div");
  column.classList.add("col-md-6");
  column.classList.add("text-center");

  var icon = document.createElement("i");
  icon.classList.add("huge");
  icon.classList.add("university");
  icon.classList.add("icon");

  var text1 = data.schoolName;
  var text2 = data.yearStarted;
  var text3 = data.yearEnded;
  var text4 = data.courseTaken;

  var schoolName = document.createElement("h2");
  var years = document.createElement("span");
  var courseTaken = document.createElement("p");

  schoolName.innerHTML = text1;
  years.innerHTML = text2 + " - " + text3;
  courseTaken.innerHTML = text4;

  column.appendChild(icon);
  column.appendChild(schoolName);
  column.appendChild(years);
  column.appendChild(courseTaken);

  parent.appendChild(column);
}

function renderHobbies(doc) {
  var parent = document.getElementById("hobbies");
  var data = doc.data();

  var divList = document.createElement("div");
  divList.classList.add("ui");
  divList.classList.add("list");

  var itemDiv = document.createElement("div");
  itemDiv.classList.add("item");

  var icon = document.createElement("i");
  icon.classList.add("large");
  icon.classList.add("hand");
  icon.classList.add("point");
  icon.classList.add("right");
  icon.classList.add("outline");
  icon.classList.add("icon");

  var contentDiv = document.createElement("div");
  contentDiv.classList.add("content");

  var text1 = data.hobby;

  var hobby = document.createElement("h5");

  hobby.innerHTML = text1;

  contentDiv.appendChild(hobby);

  itemDiv.appendChild(icon);
  itemDiv.appendChild(contentDiv);

  divList.appendChild(itemDiv);

  parent.appendChild(divList);
}

function renderOrganizations(doc) {
  var parent = document.getElementById("organizations");
  var data = doc.data();

  var column = document.createElement("div");
  column.classList.add("col-md-6");
  column.classList.add("text-center");

  var icon = document.createElement("i");
  icon.classList.add("huge");
  icon.classList.add("briefcase");
  icon.classList.add("icon");

  var text1 = data.orgName;
  var text2 = data.yearStarted;
  var text3 = data.yearEnded;
  var text4 = data.position;

  var orgName = document.createElement("h2");
  var academicYear = document.createElement("span");
  var position = document.createElement("p");

  orgName.innerHTML = text1;
  academicYear.innerHTML = "AY " + text2 + " - " + text3;
  position.innerHTML = text4;

  column.appendChild(icon);
  column.appendChild(orgName);
  column.appendChild(academicYear);
  column.appendChild(position);

  parent.appendChild(column);
}

function renderProjects(doc) {
  var parent = document.getElementById("projDB");
  var data = doc.data();

  var column = document.createElement("div");
  column.classList.add("col-md-6");
  column.classList.add("text-center");

  var text1 = data.projTitle;
  var text2 = data.projText;

  var projTitle = document.createElement("h4");
  var projText = document.createElement("p");

  projTitle.innerHTML = text1;
  projText.innerHTML = text2;

  column.appendChild(projTitle);
  column.appendChild(projText);

  parent.appendChild(column);
}

/* Loading Data from Firebase */
db.collection("others").doc("intro").get().then(function (doc) 
{
    renderInformation(doc);
});

db.collection("others").doc("links").get().then(function (doc) 
{
    renderSocialMedia(doc);
});

db.collection("education").get().then(function(snapshot) {
  snapshot.forEach(function(doc) {
      renderEducation(doc);
  })
});

db.collection("hobbies").get().then(function(snapshot) {
  snapshot.forEach(function(doc) {
      renderHobbies(doc);
  })
});

db.collection("organizations").get().then(function(snapshot) {
  snapshot.forEach(function(doc) {
      renderOrganizations(doc);
  })
})

db.collection("projects").get().then(function(snapshot) {
  snapshot.forEach(function(doc) {
      renderProjects(doc);
  })
})


/* JavaScript for Social Media Buttons */
document.getElementById("fbButton").onclick = function () {
    location.href = facebook;
};

document.getElementById("linkedButton").onclick = function () {
    location.href = linkedin;
};

document.getElementById("gitButton").onclick = function () {
    location.href = github;
};

document.getElementById("gitBar").onclick = function () {
    location.href = github;
};

/* Configuration for Skills Rating */
$('.ui.rating.CLang')
  .rating({
    initialRating: 4,
    maxRating: 5
  })
;

$('.ui.rating.JavaLang')
  .rating({
    initialRating: 3,
    maxRating: 5
  })
;

$('.ui.rating.PyLang')
  .rating({
    initialRating: 2,
    maxRating: 5
  })
;

$('.ui.rating.UIUX')
  .rating({
    initialRating: 2,
    maxRating: 5
  })
;

$('.ui.rating.SRAQA')
  .rating({
    initialRating: 2,
    maxRating: 5
  })
;

$('.ui.rating')
  .rating('disable')
;

var login = document.querySelector('#loginButton');

login.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href="edit.html";
})
