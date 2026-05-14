const form = document.getElementById("formIDcadastro")

form.addEventListener("submit",async (e) => {
    e.preventDefault();

    const data = new FormData(form)

    const name = data.get("nome")
    const email = data.get("email");
    const password = data.get("senha");

    const resposta = await fetch("http://127.0.0.1:8000/user/", {
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

    const resultado = await resposta.json()
    if (resposta.ok){
        window.location.replace("/index.html");
    }
    else{
        console.log(resultado)
    }
    

    

})