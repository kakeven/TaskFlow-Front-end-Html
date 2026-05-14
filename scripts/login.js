const form = document.getElementById("formIDlogin")

form.addEventListener("submit",async (e) => {
    e.preventDefault();

    const data = new FormData(form)

    const email = data.get("email");
    const password = data.get("senha");

    const params = new URLSearchParams();
    params.append("username",email);
    params.append("password",password)

    const resposta = await fetch("http://127.0.0.1:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
    });

    const info = await resposta.json()
    if (resposta.ok){
      localStorage.setItem("token",info.access_token)
      window.location.href = "/dashboard.html";
    }
    else{
      console.log(info)
    }

})