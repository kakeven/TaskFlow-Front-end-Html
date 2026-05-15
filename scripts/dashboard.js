import { API_BASE_URL } from "./config.js";

const token = localStorage.getItem("token")

if (!token){
    window.location.replace("/index.html")
}

async function atualizar_card_cima() {
    const res = await fetch(`${API_BASE_URL}/task/`,{
            method : 'GET',
            headers : {
                'Authorization': `Bearer ${token}`
            }})
    if(res.status === 401 || res.status === 400){
        localStorage.removeItem("token")
        window.location.replace("/index.html")
        return;
    }
    
    let tasks = await res.json()
    
    

    const total = tasks.length;
    const emAndamento = tasks.filter(t => t.status === 'in_progress').length;
    const concluidas = tasks.filter(t => t.status === 'done').length;

    document.getElementById("total").textContent = total
    document.getElementById("em_andamento").textContent = emAndamento
    document.getElementById("concluidas").textContent = concluidas
    
}

async function criar_secao(titulo,task){
    if(task.length==0){return;}

    const container = document.getElementById('card-de-baixo');
    const h5 = document.createElement('h5');
    h5.textContent = titulo
    container.appendChild(h5)

    task.forEach(task => {
        const card = document.createElement("div")
        card.className = 'card-unico'
        let status_task = "";

        if (task.status == "pending"){
            status_task = "Pendente";
        }
        else if (task.status == "in_progress"){
            status_task = "Em andamento";
        }
        else if (task.status== "done"){
            status_task = "Concluída"
        }

        if (task.status=='done'){
            card.innerHTML = `
            <div class="card-nome-tarefa d-flex align-items-center">
                <label for="check-${task.id}">${task.title}</label>
            </div>
            <div class="card-status">${status_task}</div>`
        }
        else{
            card.innerHTML = `
            <div class="card-nome-tarefa d-flex align-items-center">
                <input class="form-check-input" style="margin-right: 10px;" type="checkbox" id="check-${task.id}">
                <label for="check-${task.id}">${task.title}</label>
            </div>
            <div class="card-status">${status_task}</div>`
        }
       
        container.appendChild(card)
        
        const checkbox = document.getElementById(`check-${task.id}`)

        if(checkbox){
            checkbox.addEventListener("change",async function(event){
            
            if (task.status == "pending"){
                task.status = "in_progress";
            }
            
            else if (task.status == "in_progress"){
                task.status = "done";
            }
            
            const res = await fetch(`${API_BASE_URL}/task/${task.id}`,{
                method: "PATCH",
                headers : {
                'Content-type':'application/json',
                'Authorization': `Bearer ${token}`
                },
            body: JSON.stringify({status :task.status})
            })


            if(res.status === 401 || res.status === 400){
                localStorage.removeItem("token")
                window.location.replace("/index.html")
                return;
            }
            if(res.ok){
                atualizar_card_cima()
                renderizar_task()
            }
        
        })

        }
        


    });

}


async function renderizar_task() {
     const res = await fetch(`${API_BASE_URL}/task/`,{
            method : 'GET',
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })
    if(res.status === 401 || res.status === 400){
        localStorage.removeItem("token")
        window.location.replace("/index.html")
        return;
    }

    let tasks = await res.json();

    const pendentes = tasks.filter(t=>t.status === 'pending');
    const emAndamento = tasks.filter(t => t.status === 'in_progress');
    
    let qtd = -3;
    const concluidas = tasks.filter(t => t.status === 'done');
    const concluidas_qtd = concluidas.slice(qtd).reverse()


    const container = document.getElementById('card-de-baixo')
    container.innerHTML=""

    criar_secao('Em andamento', emAndamento)
    criar_secao('A fazer', pendentes)
    criar_secao('Concluídas', concluidas_qtd)

}



const form = document.getElementById("formModal")

form.addEventListener("submit",async function(event){
    event.preventDefault();

    const formData = new FormData(form)
    const dados = Object.fromEntries(formData)
    dados.due_date = dados.due_date || null;

    try{
        const response = await fetch(`${API_BASE_URL}/task/`,{
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
            renderizar_task();
        }
    }

    catch (erro){
        console.log("erro na requisicao:", erro)
    }
})



atualizar_card_cima();
renderizar_task()