const contracts = [

    {
        name: 'Compumundo',
        type: 'A',
        info: 'Lorem ipsum dolor sit amet.',
        id: 1
    
    },
    {
        name: 'Hiper',
        type: 'B',
        info: 'Lorem, ipsum dolor.',
        id: 2
    
    },
    {
        name: 'Mega',
        type: 'C',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, repellat.',
        id: 3
    
    },
    {
        name: 'Red',
        type: 'D',
        info: 'Lorem ipsum dolor sit amet consectetur.',
        id: 4
    
    }

];

let idCount = 4;

class Contract {
    constructor (name, type, info, id) {
        this.name = name;
        this.type = type;
        this.info = info;
        this.id = id;
    }
}

const addContractBtn = document.getElementById('addContract')
const inputName = document.getElementById('inputName')
const inputType = document.getElementById('inputType')
const inputInfo = document.getElementById('inputInfo')

function renderContracts(arrayRender){

    $("#contracts").html('')

    arrayRender.forEach(contract=>{
        let listItem = document.createElement('li');
        listItem.innerHTML = 
        `
        <div class="contract" id="contract-${contract.id}">
                    <div class="contract-main">
                        <div class="info">
                            <h3>${contract.id}</h3>
                            <h2>${contract.name}</h2>
                            <i id="type-${contract.id}">${contract.type}</i>
                            <p>${contract.info}</p>
                        </div>
                        <div class="checkbox" id="checkbox-${contract.id}">
                            <input type="checkbox">
                        </div>
                    </div>
                    
                    <div class="contract-edit">
                        <div class="info">
                            <input type="text" id="inputName-${contract.id}" value="${contract.name}" placeholder="${contract.name}"></input>
                            <select id="inputType-${contract.id}" name="types">
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                            <input type="text" id="inputInfo-${contract.id}" value="${contract.info}"></input>
                            <div id="ok-${contract.id}-cont"></div>
                        </div>
                    </div>
                </div>
        `


        let editItem = document.createElement('span');
        editItem.classList.add('material-icons', 'editIcon')
        editItem.id = `edit${contract.id}`
        editItem.innerText = `edit`
        editItem.addEventListener('click', ()=>{
            editContract(contract.id, contract.type)
        })

        let deleteItem = document.createElement('span');
        deleteItem.classList.add('material-icons', 'deleteIcon')
        deleteItem.id = `delete${contract.id}`
        deleteItem.innerText = `delete`
        deleteItem.addEventListener('click', ()=>{
            deleteContract(contract.id)
        })

        let okItem = document.createElement('button');
        okItem.classList.add('ok')
        okItem.id = `ok-${contract.id}`
        okItem.innerText = `Ok`

        okItem.addEventListener('click', ()=>{
            acceptEditContract(contract.id)
        })


        $("#contracts").append(listItem)
        $(`#checkbox-${contract.id}`).append(deleteItem)
        $(`#checkbox-${contract.id}`).append(editItem)
        $(`#ok-${contract.id}-cont`).append(okItem)
        
    })
}
addContractBtn.addEventListener('click', ()=>{

        addContract()
        clearInputs();
        renderContracts()
})


function addContract(){
    idCount +=1;
    contracts.push(new Contract (inputName.value, inputType.value, inputInfo.value, idCount));
}
function clearInputs(){
    inputName.value = '';
    inputType.value = '';
    inputInfo.value = '';
}

function editContract(e, type){
    $(`#inputType-${e}`).val(type)

    $(`.contract`).removeClass('flip')
    $(`#contract-${e}`).addClass('flip')
}
 
function acceptEditContract(e){
    let contractToEdit = contracts.find(contract=> contract.id === e);
    contractToEdit.name =  $(`#inputName-${e}`).val()
    contractToEdit.type =  $(`#inputType-${e}`).val()
    contractToEdit.info =  $(`#inputInfo-${e}`).val()
    setTimeout(()=>{
        clearFiltersFn()
        renderContracts(contracts)
    },200)
    $(`#contract-${e}`).removeClass('flip')
}
 

function deleteContract(e){
    let contractToDelete = contracts.find(contract=> contract.id === e);
    let indexContract = contracts.indexOf(contractToDelete);

    $(`#contract-${e}`).addClass('deleted')
    setTimeout(()=>{
        clearFiltersFn()
        renderContracts(contracts)
    },200)
    contracts.splice(indexContract, 1)
    
}

// Filter

const filterTypes = document.getElementById("types")

filterTypes.addEventListener('change', ()=>{
    filterContracts(filterTypes.value)
})

function filterContracts(e){
    let contractsFiltered = contracts.filter(contract=> contract.type === e)
    addTag(e);
    renderContracts(contractsFiltered);
}
const filterTags = document.getElementById("filterTags");

function addTag(e){
    filterTags.innerHTML = ''

    let tag = document.createElement('li')
    let clearFilters = document.createElement('h3')


    clearFilters.addEventListener('click',()=>{
        clearFiltersFn();
    })

    tag.innerText = e;
    clearFilters.innerText = 'clear filters'

    filterTags.appendChild(tag)
    filterTags.appendChild(clearFilters)
}

function clearFiltersFn(){
    filterTags.innerHTML = '' 
    renderContracts(contracts)
    filterTypes.value = 'Filtrar'
}

renderContracts(contracts)
