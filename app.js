document.getElementById('patientForm').addEventListener('submit', function(event) {
  event.preventDefault();
  if (validateForm()) {
      render();
  }
});

document.getElementById('clearBtn').addEventListener('click', function() {
  localStorage.removeItem('patients');
  displayPatients();
});

function validateForm() {
  let isValid = true;

  const fullname = document.getElementById("fullname").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const fullnameError = document.getElementById("fullnameError");
  const passwordError = document.getElementById("passwordError");
  const dobError = document.getElementById("dobError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");

  // Fullname validation: no spaces
  if (/\s/.test(fullname)) {
      fullnameError.textContent = "Full name should not contain spaces.";
      fullnameError.style.display = "block";
      isValid = false;
  } else {
      fullnameError.style.display = "none";
  }

  // Password validation
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
      passwordError.textContent = "Password must be at least 8 characters, include a number, an uppercase letter, and a special character.";
      passwordError.style.display = "block";
      isValid = false;
  } else {
      passwordError.style.display = "none";
  }

  // Date of birth validation: format YYYY-MM-DD
  const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dobRegex.test(dob)) {
      dobError.textContent = "Date of birth must be in the format YYYY-MM-DD.";
      dobError.style.display = "block";
      isValid = false;
  } else {
      dobError.style.display = "none";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      emailError.style.display = "block";
      isValid = false;
  } else {
      emailError.style.display = "none";
  }

  // Phone validation: 10 digits starting with 07
  const phoneRegex = /^07\d{8}$/;
  if (!phoneRegex.test(phone)) {
      phoneError.textContent = "Phone number must be 10 digits starting with 07.";
      phoneError.style.display = "block";
      isValid = false;
  } else {
      phoneError.style.display = "none";
  }

  return isValid;
}

function render() {
  const fullname = document.getElementById("fullname").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  const gender = document.getElementById("gender").value;
  const phone = document.getElementById("phone").value;
  const diseases = document.getElementById("diseases").value;

  const patients = JSON.parse(localStorage.getItem('patients')) || [];

  const existingPatient = patients.find(patient => patient.email === email);

  if (existingPatient) {
      alert("A patient with this email already exists.");
      return;
  }

  const newPatient = {
      fullname,
      password,
      dob,
      email,
      gender,
      phone,
      diseases
  };

  patients.push(newPatient);
  localStorage.setItem('patients', JSON.stringify(patients));

  displayPatients();
}

function displayPatients() {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const patientsList = document.getElementById('patientsList');
  patientsList.innerHTML = '';

  patients.forEach(patient => {
      const patientCard = document.createElement('div');
      patientCard.className = 'patient-card';

      patientCard.innerHTML = `
          <h3>${patient.fullname}</h3>
          <p><strong>Date of Birth:</strong> ${patient.dob}</p>
          <p><strong>Gender:</strong> ${patient.gender}</p>
          <p><strong>Phone Number:</strong> ${patient.phone}</p>
          <p><strong>Chronic Diseases:</strong> ${patient.diseases}</p>
      `;

      patientsList.appendChild(patientCard);
  });
}

document.addEventListener('DOMContentLoaded', displayPatients);



//     const clearBtn = document.getElementById('clear-btn');
//     clearBtn.addEventListener("click",cleare);

//     document.getElementById('form').addEventListener('submit', function(event) {
//         event.preventDefault();
//         render();
//     });
// function render(){
//   let fullname=document.getElementById("fullname").value;
//   let password=document.getElementById("password").value;
//   let datee=document.getElementById("datee").value;
//   let gender=document.getElementById("gender").value;
//   let phone=document.getElementById("phone").value;
//   let diseases=document.getElementById("diseases").value;


//   function Patients (fullname,password,datee,gender,phone,diseases){
//     this.fullname=fullname;
//     this.password=password;
//     this.datee=datee;
//     this.gender=gender;
//     this.phone=phone;
//     this.diseases=diseases;
//   }

//   let newPatient = new Patients(fullname, password, datee, gender, phone, diseases);

//   let Patient = JSON.parse(localStorage.getItem("Patient")) || [];
//   Patient.push(newPatient);
//   localStorage.setItem("pationt",JSON.stringify(Patient));
//    cards ();
//     // let arr=[fullname,password,datee,gender,phone,diseases];
//     // localStorage.setItem("user data", JSON.stringify(arr));
//   }
  
//   function cards (){
//     let patient = JSON.parse(localStorage.getItem('patient')) || [];
//     let patientsList = document.getElementById('patientsList');
//     patientsList.innerHTML = '';

//     patient.forEach(patien => {
//         let patientCard = document.createElement('div');
//         patientCard.className = 'patient-card';

//         patientCard.innerHTML = `
//             <h3>${patien.fullname}</h3>
//             <p><strong>Date of Birth:</strong> ${patien.datee}</p>
//             <p><strong>Gender:</strong> ${patien.gender}</p>
//             <p><strong>Phone Number:</strong> ${patien.phone}</p>
//             <p><strong>Chronic Diseases:</strong> ${patien.diseases}</p>
//         `;

//         patientsList.appendChild(patientCard);
//     });
//   }
  
  
//   function cleare(arr){
//   localStorage.clear();
// }

