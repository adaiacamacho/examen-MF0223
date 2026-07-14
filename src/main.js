const lista=document.querySelector(".lista-cards");
const url="http://localhost:3000/servidores/";
await cargarLista();
const form=document.forms[0];

form.addEventListener('submit',async e=>{
    e.preventDefault();
    const almbtn = document.querySelector('input[name="alm"]:checked')?.value;
    const serv={nombre: form.nombre.value, cpu: form.cpu.value, ram: form.ram.value, almacenamiento: almbtn};  
    
    const options={
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(serv)
    };
    
    try {
        const res = await fetch(url, options);
        const newServ = await res.json();
        
        form.reset();
        
        await cargarLista();
    } catch (error) {
        console.error(error);
    }
})

async function cargarLista() {
    const res= await fetch(url);
    const servidores = await res.json();
    
    lista.innerHTML='';
    for(const servidor of servidores){
        const card = document.createElement('div');
        card.className = `card mb-3`;
        const html=`<div class="card-body">
                <h5 class="card-title">${servidor.nombre}</h5>
                <ul class="list-group list-group-flush">
                        <li class="list-group-item">CPU: ${servidor.cpu}</li>
                        <li class="list-group-item">RAM: ${servidor.ram} GB</li>
                        <li class="list-group-item">Almacenamiento: ${servidor.almacenamiento}</li>
                    </ul>
            </div>
            <button onclick="javascript:borrar('${servidor.id}')" class="btn btn-danger m-sm-1 borrar"><i class="bi bi-trash-fill"></i></button>`
        
        card.innerHTML=html;
        lista.appendChild(card);
    }
}

window.borrar=async function (id) {
    try {
        const res=await fetch(url+id, {method: 'DELETE'});
        await cargarLista();
    } catch (error) {
        console.error(error);
    }
}