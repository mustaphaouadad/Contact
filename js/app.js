var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("nom"),
    userPrenom = document.getElementById("prenom"),
    email = document.getElementById("email"),
    genre = document.getElementsByName("genre"),
    ville = document.getElementById("ville"),
    telephone = document.getElementById("telephone"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser");

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];
let isEdit = false, editId

showInfo();

newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit';
    modalTitle.innerText = "formulair contact";
    isEdit = false;
    imgInput.src = "assets/images/Profile Icon.webp"
    form.reset();
});

file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("Ce fichier est trop volumineux !")
    }
}
function getSelectedGenre() {
    for (let i = 0; i < genre.length; i++) {
        if (genre[i].checked) {
            return genre[i].value;
        }
    }
    return null;
}
function showInfo() {
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove());
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.nom}</td>
            <td>${element.prenom}</td>
            <td>${element.email}</td>
            <td>${element.genre}</td>
            <td>${element.ville}</td>
            <td>${element.telephone}</td>
            <td>
                <button class="btn btn-primary" onclick="editInfo(${index},'${element.picture}', '${element.nom}', '${element.prenom}', '${element.email}', '${element.genre}', '${element.ville}', '${element.telephone}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;

        userInfo.innerHTML += createElement;
    });
}
showInfo()
function editInfo(index,pic, nom, prenom, emailVal, genreVal, villeVal, phoneVal) {
    isEdit = true;
    editId = index;
    imgInput.src = pic
    userName.value = nom;
    userPrenom.value = prenom;
    email.value = emailVal;
    ville.value = villeVal;
    telephone.value = phoneVal;

    genre.forEach(input => {
        input.checked = input.value === genreVal;
    }); 

    submitBtn.innerText = "Mise à jour";
    modalTitle.innerText = "Mettre à jour le formulaire";
}

function deleteInfo(index) {
    if (confirm("Etes-vous sûr de vouloir supprimer ?")) {
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedGenre = getSelectedGenre();
    if (!selectedGenre) {
        alert("Veuillez sélectionner un sexe.");
        return;
    }
    const information = {
        picture: imgInput.src == undefined ? "assets/images/Profile Icon.webp" : imgInput.src,
        nom: userName.value,
        prenom: userPrenom.value,
        email: email.value,
        genre: selectedGenre,
        ville: ville.value,
        telephone: telephone.value
    };
    if (!isEdit) {
        getData.push(information);
    } else {
        isEdit = false;
        getData[editId] = information;
    }

    localStorage.setItem('userProfile', JSON.stringify(getData));
    submitBtn.innerText = "Submit";
    modalTitle.innerHTML = "formulair contact";
    showInfo();
    form.reset();
    imgInput.src = "assets/images/Profile Icon.webp"
});



// ======================== validation des inputs ===================



function validation() {
let isValid = true;

// Recuperation des champ
const imgInput = document.getElementById("imgInput");
const userName = document.getElementById("nom");
const userPrenom = document.getElementById("prenom");
const email = document.getElementById("email");
const genre = document.getElementsByName("genre");
const ville = document.getElementById("ville");
const telephone = document.getElementById("telephone");

// Récuperation des messages d'erreur
const nomError = document.getElementById("nomError");
const prenomError = document.getElementById("prenomError");
const emailError = document.getElementById("emailError");
const genreError = document.getElementById("genreError");
const villeError = document.getElementById("villeError");
const telephoneError = document.getElementById("telephoneError");

// Reinitialisation des messages d'erreur
nomError.textContent = "";
prenomError.textContent = "";
emailError.textContent = "";
genreError.textContent = "";
villeError.textContent = "";
telephoneError.textContent = "";

// Validation du champ img
if (!imgInput.value) {
    alert("Veuillez sélectionner une image.");
    isValid = false;
}

// Validation du nom 
if (!userName.value.trim()) {
    nomError.textContent = "Le nom est obligatoire.";
    isValid = false;
}

// Validation du prénom 
if (!userPrenom.value.trim()) {
    prenomError.textContent = "Le prénom est obligatoire.";
    isValid = false;
}

// Validation de l'email 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!email.value.trim()) {
    emailError.textContent = "L'email est obligatoire.";
    isValid = false;
} else if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = "Le format de l'email est invalide.";
    isValid = false;
}

// Validation du genre 
let genreSelected = false;
for (let i = 0; i < genre.length; i++) {
    if (genre[i].checked) {
        genreSelected = true;
        break;
    }
}
if (!genreSelected) {
    genreError.textContent = "Veuillez sélectionner un genre.";
    isValid = false;
}

// Validation de la ville 
if (!ville.value) {
    villeError.textContent = "Veuillez sélectionner une ville.";
    isValid = false;
}

// Validation du téléphone 
const telephoneRegex = /^\d{10}$/; // Numero just 10 chiffres
if (!telephone.value.trim()) {
    telephoneError.textContent = "Le téléphone est obligatoire.";
    isValid = false;
} else if (!telephoneRegex.test(telephone.value.trim())) {
    telephoneError.textContent = "Le numéro de téléphone doit contenir 10 chiffres.";
    isValid = false;
}

return isValid;
}

