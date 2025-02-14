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

  firebase.auth().onAuthStateChanged(user => {
    if (user) { 
      console.log("Logged IN");
      console.log(user);
    } 
    else {
      console.log("No user logged in");
      console.log("Loading Modal");      
      $('#myModal')
        .modal('setting', 'closable', false)
        .modal('show')
    }
  })

  var logout = document.querySelector('#logoutButton');

  logout.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      console.log("Logged out");
      location.reload();
    })
  })

  function sendData() {
    var email = document.getElementById("emailAdd").value;
    var password = document.getElementById("pass").value;


    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
        $('#myModal').modal('hide');

      }).catch(function(err){
          if(err.code == "auth/wrong-password"){
              alert("Wrong Email / Password");
          } else {
              alert(err.message);
          }
      })
  }

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

    var button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-outline-light");
    button.classList.add("btn-lg");
    button.classList.add("deleteButton");
  
    var text1 = data.schoolName;
    var text2 = data.yearStarted;
    var text3 = data.yearEnded;
    var text4 = data.courseTaken;

    column.setAttribute('data-id', doc.id);

    button.setAttribute("onClick", "deleteEduc('" + doc.id + "')");
  
    var schoolName = document.createElement("h2");
    var years = document.createElement("span");
    var courseTaken = document.createElement("p");
  
    schoolName.innerHTML = text1;
    years.innerHTML = text2 + " - " + text3;
    courseTaken.innerHTML = text4;
    button.innerHTML = "Delete";

    column.appendChild(icon);
    column.appendChild(schoolName);
    column.appendChild(years);
    column.appendChild(courseTaken);
    column.appendChild(button);
  
    parent.appendChild(column);
  }
  
  function renderHobbies(doc) {
    var parent = document.getElementById("hobbies");
    var data = doc.data();
  
    var divList = document.createElement("div");
    divList.classList.add("ui");
    divList.classList.add("list");

    divList.setAttribute('data-id', doc.id);
  
    var itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    var button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-outline-light");
    button.classList.add("btn-lg");
    button.classList.add("deleteHobbies");

    button.setAttribute("onClick", "deleteHobby('" + doc.id + "')");
  
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
    button.innerHTML = "Delete";
  
    contentDiv.appendChild(hobby);
  
    itemDiv.appendChild(icon);
    itemDiv.appendChild(contentDiv);
    itemDiv.appendChild(button);
  
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

    var button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-outline-light");
    button.classList.add("btn-lg");
    button.classList.add("deleteButton");

    column.setAttribute('data-id', doc.id);
    button.setAttribute("onClick", "deleteOrg('" + doc.id + "')");
  
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
    button.innerHTML = "Delete";
  
    column.appendChild(icon);
    column.appendChild(orgName);
    column.appendChild(academicYear);
    column.appendChild(position);
    column.appendChild(button);
  
    parent.appendChild(column);
  }
  
  function renderProjects(doc) {
    var parent = document.getElementById("projDB");
    var data = doc.data();
  
    var column = document.createElement("div");
    column.classList.add("col-md-6");
    column.classList.add("text-center");

    var button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-outline-light");
    button.classList.add("btn-lg");
    button.classList.add("deleteButton");

    column.setAttribute('data-id', doc.id);
    button.setAttribute("onClick", "deleteProject('" + doc.id + "')");
  
    var text1 = data.projTitle;
    var text2 = data.projText;
  
    var projTitle = document.createElement("h4");
    var projText = document.createElement("p");
  
    projTitle.innerHTML = text1;
    projText.innerHTML = text2;
    button.innerHTML = "Delete";
  
    column.appendChild(projTitle);
    column.appendChild(projText);
    column.appendChild(button);
  
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
  });
  
  db.collection("projects").get().then(function(snapshot) {
    snapshot.forEach(function(doc) {
        renderProjects(doc);
    })
  });

  function deleteEduc(docID) {
    db.collection("education").doc(docID).delete().then(function(){
      console.log("Item deleted");
      location.reload();
    });

  }

  function deleteHobby(docID) {
    db.collection("hobbies").doc(docID).delete().then(function(){
      console.log("Item deleted");
      location.reload();
    });

  }

  function deleteOrg(docID) {
    db.collection("organizations").doc(docID).delete().then(function(){
      console.log("Item deleted");
      location.reload();
    });

  }

  function deleteProject(docID) {
    db.collection("projects").doc(docID).delete().then(function(){
      console.log("Item deleted");
      location.reload();
    });

  }
  
  
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

function readInfo() {
  var introduction = document.getElementById("introduction").value;
  var fbLink = document.getElementById("fbLink").value;
  var gitLink = document.getElementById("gitLink").value;
  var linkedLink = document.getElementById("linkedLink").value;

  if(introduction.length != 0) {
    db.collection("others").doc("intro").update({
      "desc1": introduction
    })

    .then(function() {
      location.reload();
    })
  }

  if(fbLink.length != 0) {
    db.collection("others").doc("links").update({
      "facebook": fbLink
    })

    .then(function() {
      location.reload();
    })
  }

  if(gitLink.length != 0) {
    db.collection("others").doc("links").update({
      "github": gitLink
    })

    .then(function() {
      location.reload();
    })
  }

  if(linkedLink.length != 0) {
    db.collection("others").doc("links").update({
      "linkedin": linkedLink
    })

    .then(function() {
      location.reload();
    })
  }
}

function addEducation() {
  var schoolName1 = document.getElementById("schoolName").value;
  var yearStarted1 = document.getElementById("yearStarted").value;
  var yearEnded1 = document.getElementById("yearEnded").value;
  var courseTaken1 = document.getElementById("courseTaken").value;

  var newObject = {
    courseTaken: courseTaken1,
    schoolName: schoolName1,
    yearStarted: yearStarted1,
    yearEnded: yearEnded1
  }

  db.collection("education").add(newObject).then(function(doc) {
    console.log("Item added");
    location.reload();
  });
}

function addHobby() {
  var hobby1 = document.getElementById("hobby").value;

  var newObject = {
    hobby: hobby1
  }

  db.collection("hobbies").add(newObject).then(function(doc) {
    console.log("Item added");
    location.reload();
  });

}

function addOrganization() {
  var orgName1 = document.getElementById("orgName").value;
  var yearStarted1 = document.getElementById("yearStarted1").value;
  var yearEnded1 = document.getElementById("yearEnded1").value;
  var position1 = document.getElementById("position").value;

  var newObject = {
    position: position1,
    orgName: orgName1,
    yearStarted: yearStarted1,
    yearEnded: yearEnded1
  }

  db.collection("organizations").add(newObject).then(function(doc) {
    console.log("Item added");
    location.reload();
  });

}

function addProject() {
  var projTitle1 = document.getElementById("projTitle").value;
  var projText1 = document.getElementById("projText").value;


  var newObject = {
    projTitle: projTitle1,
    projText: projText1
  }

  db.collection("projects").add(newObject).then(function(doc) {
    console.log("Item added");
    location.reload();
  });
}