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

  function sendData() {
      var email = document.getElementById("emailAdd").value;
      var password = document.getElementById("pass").value;

      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
        window.location.href="editMP1.html";
      }).catch(function(err){
          if(err.code == "auth/wrong-password"){
              alert("Wrong Email / Password");
          }else {
              alert(err.message);
          }
      })
  }

  