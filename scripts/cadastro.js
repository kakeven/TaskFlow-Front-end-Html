const form = document.getElementById("formIDcadastro")

form.addEventListener("submit",async (e) => {
    e.preventDefault();

    const data = new FormData(form)

    const name = data.get("nome")
    const email = data.get("email");
    const password = data.get("senha");

    const resposta = await fetch("http://localhost:8000/user/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
    name: name,
    email: email,
    password: password
    })
    });

    if (resposta.ok){
        window.location.href = "/index.html";
    }

    const resultado = await resposta.json()

    console.log(resultado)

})