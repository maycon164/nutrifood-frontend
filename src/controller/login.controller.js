const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const btnMakeLoginEl = document.getElementById("btn-make-login");

const btnSignUpEl = document.getElementById("btn-sign-up");
const btnShowLoginContainerEl = document.getElementById("btn-show-login-container");

const signUpContainerEl = document.getElementById("sign-up-container");
const loginContainerEl = document.getElementById("login-container");

const btnMakeRegisterEl = document.getElementById("btn-make-register");

btnMakeLoginEl.addEventListener("click", async () => {

    const email = emailEl.value;
    const password = passwordEl.value;

    if (email == '' || password == '') {
        alert('email ou senha estao vazios');
    } else {

        const objAccessToken = await makeLogin(
            {
                username: email,
                password: password
            });

        if (objAccessToken) {
            setTokenAccess(objAccessToken.access_token)
            setUsername(objAccessToken.username)
            setIsAdmin(objAccessToken.isAdmin)
            // preciso atualizar tudo orders, snacks
            window.location.reload();
        } else {
            showModal({
                title: "Login Failed",
                message: "check your email and your password",
                icon: "👁️👄👁️",
                fn: () => {
                    console.log("funcionou")
                }
            })
        }

    }
})

btnSignUpEl.addEventListener("click", () => {
    loginContainerEl.classList.add("hidden");
    signUpContainerEl.classList.remove("hidden");
})

btnShowLoginContainerEl.addEventListener("click", () => {
    signUpContainerEl.classList.add("hidden");
    loginContainerEl.classList.remove("hidden");
})

btnMakeRegisterEl.addEventListener("click", async () => {
    const name = document.getElementById("sign-name").value;
    const email = document.getElementById("sign-email").value;
    const password = document.getElementById("sign-password").value;
    const address = document.getElementById("sign-address").value;
    const num = document.getElementById("sign-num").value;

    const objRegister = {
        name, email, password, address, num
    }

    const result = await makeRegister(objRegister);

    if (result) {
        showModal({
            title: 'Make Register',
            message: '---*----',
            icon: result,
            fn: () => { }
        })
        btnShowLoginContainerEl.click();
    }
})