document.getElementById('submit').addEventListener('click', render);
document.getElementById('clearData').addEventListener('click',clearData);

function render(event) {
    event.preventDefault();

    let fn = document.getElementById('fname').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let dob = document.getElementById('dob').value;
    let gender = document.getElementById('gender').value;
    let phone = document.getElementById('phone').value;
    let chronicDiseases = document.getElementById('chronicDiseases').value;
    let imageUrl = document.getElementById('imageUrl').value;

    const usernameRegex = /^[^\s]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^07\d{8}$/;

    const fnameError = document.getElementById('fnameError');
    const passwordError = document.getElementById('passwordError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');

    let isValid = true;

    if (!usernameRegex.test(fn)) {
        fnameError.textContent = 'Full Name must not contain spaces.';
        isValid = false;
    } else {
        fnameError.textContent = '';
    }

    if (!passwordRegex.test(password)) {
        passwordError.textContent = 'Password must be more than 8 characters long and contain at least one number, one uppercase letter, and one special character.';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    if (!phoneRegex.test(phone)) {
        phoneError.textContent = 'Phone number must be 10 digits long and start with "07".';
        isValid = false;
    } else {
        phoneError.textContent = '';
    }

    if (!isValid) return;

    function Patient(name,password,email, dob, gender, phone, chronicDiseases, imageUrl) {
        this.name = name;
        this.password=password;
        this.email=email;
        this.dob = dob;
        this.gender = gender;
        this.phone = phone;
        this.chronicDiseases = chronicDiseases;
        this.imageUrl = imageUrl;
    }

    let patient = new Patient(fn,password,email, dob, gender, phone, chronicDiseases, imageUrl);

    // Retrieve existing patients from local storage or initialize empty array
    let patients = JSON.parse(localStorage.getItem('patients')) || [];
    
    patients.push(patient);
    
    localStorage.setItem('patients', JSON.stringify(patients));
    
    document.getElementById('patientForm').reset();
    
    renderPatients();
}

function renderPatients() {
    const patientsList = document.getElementById('patientsList');
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    console.log(patients);
    patientsList.innerHTML = '';

    patients.forEach(patient => {
        const card = document.createElement('div');
        card.className = 'patient-card';

        const img = document.createElement('img');
        img.src = patient.imageUrl;
        img.style.width = "300px";
        img.style.height="200px";
        img.alt = patient.name+patient.lastname + "s picture";

        const info = document.createElement('div');

        const name = document.createElement('h3');
        name.textContent = patient.name;

        const email = document.createElement('p');
        email.textContent = "Email: " + patient.email;

        const dob = document.createElement('p');
        dob.textContent = "Date of Birth:"+patient.dob;

        const gender = document.createElement('p');
        gender.textContent = "Gender:" + patient.gender;

        const phone = document.createElement('p');
        phone.textContent = "Phone: "+patient.phone;

        const chronicDiseases = document.createElement('p');
        chronicDiseases.textContent = "Chronic Diseases:" +patient.chronicDiseases;

        info.appendChild(name);
        info.appendChild(email);
        info.appendChild(dob);
        info.appendChild(gender);
        info.appendChild(phone);
        info.appendChild(chronicDiseases);

        card.appendChild(img);
        card.appendChild(info);

        patientsList.appendChild(card);
    });
}
function clearData() {
    localStorage.removeItem('patients');
    renderPatients();
}
renderPatients();