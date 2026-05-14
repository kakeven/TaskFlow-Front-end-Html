const token = localStorage.getItem("token")



async function atualizar_card_cima() {
    const res = await fetch("http://127.0.0.1:8000/task/",{
            method : 'GET',
            headers : {
                'Authorization': `Bearer ${token}`
            }})
    tasks = await res.json()
    
    const total = tasks.length;
    const emAndamento = tasks.filter(t => t.status === 'in_progress').length;
    const concluidas = tasks.filter(t => t.status === 'done').length;

    document.getElementById("total").textContent = total
    document.getElementById("em_andamento").textContent = emAndamento
    document.getElementById("concluidas").textContent = concluidas

}

atualizar_card_cima();

const form = document.getElementById("formModal")

form.addEventListener("submit",async function(event){
    event.preventDefault();

    const formData = new FormData(form)
    const dados = Object.fromEntries(formData)
    dados.due_date = dados.due_date || null;

    try{
        const response = await fetch("http://127.0.0.1:8000/task/",{
            method : 'POST',
            headers : {
                'Content-type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        
            
        })
        const resultado = await response.json()
        
        if(response.ok){
            atualizar_card_cima();
        }
    }

    catch (erro){
        console.log("erro na requisicao:", erro)
    }
})