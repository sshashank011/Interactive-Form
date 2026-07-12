const form = document.getElementById("registrationForm");

const progressBar = document.getElementById("progressBar");

const password = document.getElementById("password");

const confirmPassword = document.getElementById("confirmPassword");

const strengthFill = document.getElementById("strengthFill");

const strengthText = document.getElementById("strengthText");

const previewImage = document.getElementById("previewImage");

const profilePic = document.getElementById("profilePic");

const submitBtn = document.getElementById("submitBtn");

const togglePassword = document.querySelector(".togglePassword");



// ----------------------------
// Image Preview
// ----------------------------

profilePic.addEventListener("change", function(){

    const file = this.files[0];

    if(file){

        previewImage.src = URL.createObjectURL(file);

    }

});



// ----------------------------
// Show / Hide Password
// ----------------------------

togglePassword.addEventListener("click", ()=>{

    if(password.type==="password"){

        password.type="text";

        togglePassword.innerHTML=
        '<i class="fa-solid fa-eye-slash"></i>';

    }

    else{

        password.type="password";

        togglePassword.innerHTML=
        '<i class="fa-solid fa-eye"></i>';

    }

});



// ----------------------------
// Password Strength
// ----------------------------

password.addEventListener("input", ()=>{

    let value=password.value;

    let strength=0;

    if(value.length>=8)
        strength++;

    if(/[A-Z]/.test(value))
        strength++;

    if(/[0-9]/.test(value))
        strength++;

    if(/[!@#$%^&*]/.test(value))
        strength++;

    switch(strength){

        case 0:

        case 1:

            strengthFill.style.width="25%";
            strengthFill.style.background="red";
            strengthText.innerHTML="Weak Password";

            break;

        case 2:

            strengthFill.style.width="50%";
            strengthFill.style.background="orange";
            strengthText.innerHTML="Medium Password";

            break;

        case 3:

            strengthFill.style.width="75%";
            strengthFill.style.background="#00bcd4";
            strengthText.innerHTML="Good Password";

            break;

        case 4:

            strengthFill.style.width="100%";
            strengthFill.style.background="limegreen";
            strengthText.innerHTML="Strong Password";

            break;

    }

});



// ----------------------------
// Progress Bar
// ----------------------------

const fields=document.querySelectorAll(

"input[type=text],input[type=email],input[type=tel],input[type=date],textarea,select,input[type=password]"

);

fields.forEach(field=>{

    field.addEventListener("input",updateProgress);

    field.addEventListener("change",updateProgress);

});

function updateProgress(){

    let filled=0;

    fields.forEach(field=>{

        if(field.value.trim()!=="")
            filled++;

    });

    const percent=(filled/fields.length)*100;

    progressBar.style.width=percent+"%";

}



// ----------------------------
// Validation
// ----------------------------

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    let valid=true;



    // First Name

    if(firstName.value.trim().length<2){

        valid=false;

        alert("Enter valid First Name");

    }



    // Last Name

    else if(lastName.value.trim().length<2){

        valid=false;

        alert("Enter valid Last Name");

    }



    // Phone

    else if(phone.value.length!=10){

        valid=false;

        alert("Phone must be 10 digits");

    }



    // Password Match

    else if(password.value!==confirmPassword.value){

        valid=false;

        alert("Passwords do not match");

    }



    

    else if(!terms.checked){

        valid=false;

        alert("Accept Terms & Conditions");

    }



    if(valid){

        submitBtn.classList.add("loading");



        setTimeout(()=>{

            submitBtn.classList.remove("loading");



            showPopup();



            form.reset();



            previewImage.src="https://cdn-icons-png.flaticon.com/512/149/149071.png";



            progressBar.style.width="0%";



            strengthFill.style.width="0%";



            strengthText.innerHTML="Password Strength";



        },2000);

    }

});


function showPopup(){

    const popup=document.createElement("div");

    popup.className="success-popup";

    popup.innerHTML="🎉 Account Created Successfully";



    document.body.appendChild(popup);



    setTimeout(()=>{

        popup.remove();

    },3000);

}

fields.forEach(field=>{

    field.addEventListener("input",()=>{

        localStorage.setItem(field.id,field.value);

    });

});



window.onload=()=>{

    fields.forEach(field=>{

        if(localStorage.getItem(field.id)){

            field.value=localStorage.getItem(field.id);

        }

    });



    updateProgress();

};