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
    modalTitle.innerText = "Fill the Form";
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
        alert("This file is too large!")
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

    submitBtn.innerText = "Update";
    modalTitle.innerText = "Update The Form";
}

function deleteInfo(index) {
    if (confirm("Are you sure want to delete?")) {
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedGenre = getSelectedGenre();
    if (!selectedGenre) {
        alert("Please select a gender.");
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
    modalTitle.innerHTML = "Fill The Form";
    showInfo();
    form.reset();
    imgInput.src = "assets/images/Profile Icon.webp"
});