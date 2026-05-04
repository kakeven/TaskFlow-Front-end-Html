const form = document.getElementById("formIDlogin")

form.addEventListener("submit",async (e) => {
    e.preventDefault();

    const data = new FormData(form)

    const email = data.get("email");
    const password = data.get("senha");

    const params = new URLSearchParams();
    params.append("username",email);
    params.append("password",password)

    const resposta = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params

    });


    const resultado = await resposta.json()

    console.log(resultado)

})