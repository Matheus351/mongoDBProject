axios('http://localhost:3000/phones')
.then(resp => loadContent(resp.data))


function loadContent(arquivoJson){

 const table = document.querySelector('table')

 for (const smartphone of arquivoJson){
  const td1 = document.createElement('td')
  const td2 = document.createElement('td')
  const td3 = document.createElement('td')
  const td4 = document.createElement('td')
  const td5 = document.createElement('td')
  td5.setAttribute('class', "options")
  const tr = document.createElement('tr')

  const idSmartphone = smartphone._id
  tr.setAttribute('id',idSmartphone)

  const buttonEdit = document.createElement('button')
  buttonEdit.innerText='Editar'
  const buttonDelete = document.createElement('button')
  buttonDelete.innerText='Deletar'


  buttonEdit.setAttribute('onclick', `handleEdit('${idSmartphone}','${smartphone.nome}');`);
  buttonDelete.setAttribute('onclick', `handleDelete('${idSmartphone}');`);

  td1.innerHTML = smartphone.nome
  td2.innerHTML = smartphone.preco
  td3.innerHTML = smartphone.ram
  td4.innerHTML = smartphone.processador

  td5.appendChild(buttonEdit)
  td5.appendChild(buttonDelete)

  table.appendChild(tr)
  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  tr.appendChild(td4)
  tr.appendChild(td5)
}
}
      
function handleEdit(idPhone, nome){

 const formEdit = `
  <form class="formularioEdit" method="put" action="http://localhost:3000/phones/${idPhone}">

  <div class="field">
      <label for="nome">Nome do aparelho:</label>
      <input type="text" id="nome" name="nome" value="${nome}" required>
  </div> 

  <div class="field">
      <label for="telefone">Preço</label>
      <input type="number" id="preco" name="preco" placeholder="Informe o preço">
  </div>

  <div class="field">
      <label for="ram">Memória RAM</label>
      <input type="text" id="ram" name="ram" placeholder="Especifique a memória RAM*" required>
  </div>

  <div class="field">
      <label for="processador">Processador</label>
      <input type="text" id="processador" name="processador" placeholder="Especifique o processador*" required>
  </div>

  <input type="submit" value="Salvar">
</form>   
`
const tdOptions = document.querySelector('.options')
tdOptions.innerHTML=formEdit

}


function handleDelete(idPhone){
    
    axios.delete(`http://localhost:3000/phones/${idPhone}`)
.then(resp => window.location.href="http://localhost:3000")
.catch(err=>{
    console.log(err)
})
}
   

