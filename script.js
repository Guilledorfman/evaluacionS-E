const contracts = [

    {
        name: 'Compumundo',
        type: 'A',
        info: 'Lorem ipsum dolor sit amet.',
        id: 1,
        created: '02-10-2021 at 14:05',
        edited: ''
    
    },
    {
        name: 'Hiper',
        type: 'B',
        info: 'Lorem, ipsum dolor.',
        id: 2,
        created: '02-10-2021 at 14:05',
        edited: ''
    
    },
    {
        name: 'Mega',
        type: 'C',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, repellat.',
        id: 3,
        created: '02-10-2021 at 14:05',
        edited: ''
    
    },
    {
        name: 'Red',
        type: 'D',
        info: 'Lorem ipsum dolor sit amet consectetur.',
        id: 4,
        created: '02-10-2021 at 14:05',
        edited: ''
    
    }

];

let idCount = 4;

class Contract {
    constructor (name, type, info, id, created, edited) {
        this.name = name;
        this.type = type;
        this.info = info;
        this.id = id;
        this.created = created;
        this.edited = edited;
    }
}

let contractNumber = 0;

function renderContracts(arrayRender){
    contractNumber = 0;
    $("#contracts").html('')
    
    arrayRender.forEach(contract=>{
        contractNumber +=1;
        let listItem = document.createElement('li');
        listItem.innerHTML = 
        `
        <div className="contract-cont">
            <h3 class="contract-number" >${contractNumber}</h3>
            <div class="contract" id="contract-${contract.id}">
                    <div class="contract-main">
                        <div class="info">
                                <h2>${contract.name}</h2>
                                <h4 id="type-${contract.id}">${contract.type}</h4>
                                <p>${contract.info}</p>
                                <div class="fecha">
                                    <div class="created">
                                        <i>created: ${contract.created}</i>
                                    </div>
                                    <div id="lastEdited-${contract.id}"></div>

                                </div>
                            </div>
                            <div class="checkbox" id="checkbox-${contract.id}">
                                <input type="checkbox">
                            </div>
                        </div>
                        
                        <div class="contract-edit">
                            <div class="info">
                                edit name:
                                <input type="text" id="inputName-${contract.id}" value="${contract.name}" placeholder="${contract.name}"></input>
                                edit type:
                                <select id="inputType-${contract.id}" name="types">
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                                edit info:
                                <input type="text" class="editInfo" id="inputInfo-${contract.id}" value="${contract.info}"></input>
                                </div>
                            <div class="ok-cont" id="ok-${contract.id}-cont">
                                
                            </div>
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
        okItem.classList.add('ok', 'btn', 'btn-success')
        okItem.id = `ok-${contract.id}`
        okItem.innerText = `Ok`

        okItem.addEventListener('click', ()=>{
            acceptEditContract(contract.id)
        })

        let cancelItem = document.createElement('button');
        cancelItem.classList.add('cancel','btn','btn-dark')
        cancelItem.id = `cancel-${contract.id}`
        cancelItem.innerText = `cancel`

        cancelItem.addEventListener('click', ()=>{
            cancelEditContract(contract.id)
        })

        $("#contracts").append(listItem)
        
        switch (contract.type){
            case 'A':
            $(`#type-${contract.id}`).addClass('tagA')
            break;
            case 'B':
            $(`#type-${contract.id}`).addClass('tagB')
            break;
            case 'C':
            $(`#type-${contract.id}`).addClass('tagC')
            break;
            case 'D':
            $(`#type-${contract.id}`).addClass('tagD')
            break;
        }
        
        
        let lastEdited = document.createElement('i');
        lastEdited.innerText = `last edited: ${contract.edited}`
        if(contract.edited){
            $(`#lastEdited-${contract.id}`).append(lastEdited)

        }

        

        $(`#checkbox-${contract.id}`).append(deleteItem)
        $(`#checkbox-${contract.id}`).append(editItem)
        $(`#ok-${contract.id}-cont`).append(okItem)
        $(`#ok-${contract.id}-cont`).append(cancelItem)
        
    })
}

const addContractBtn = document.getElementById('addContract')
const inputName = document.getElementById('inputName')
const inputType = document.getElementById('inputType')
const inputInfo = document.getElementById('inputInfo')

addContractBtn.addEventListener('click', ()=>{

        addContract(inputName, inputType, inputInfo)

        renderContracts(contracts)
})


function addContract(name, type, info){
    idCount +=1;
    if( !name.value.trim() == '' && !type.value.trim() == '' && !info.value.trim() == ''){
        contracts.push(new Contract (name.value, type.value, info.value, idCount, getDate()));
        clearInputs();
        $(`#contracts-add`).slideUp()
        $(`#addContractBtn`).removeClass('rotate')
    }else{
        $(`.alert`).fadeIn();
        setTimeout(()=>{
            $(`.alert`).fadeOut();
        },2000)
    }

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
  

    if(!$(`#inputName-${e}`).val().trim() == '' && !$(`#inputType-${e}`).val().trim() == '' && !$(`#inputInfo-${e}`).val().trim() == ''){
        
    if (
        $(`#inputName-${e}`).val() == contractToEdit.name && 
        $(`#inputType-${e}`).val() == contractToEdit.type &&
        $(`#inputInfo-${e}`).val() == contractToEdit.info
    ){
        $(`#contract-${e}`).removeClass('flip')

    }else{
        contractToEdit.name =  $(`#inputName-${e}`).val();
        contractToEdit.type =  $(`#inputType-${e}`).val();
        contractToEdit.info =  $(`#inputInfo-${e}`).val();
        contractToEdit.edited = getDate();
        setTimeout(()=>{
            clearFiltersFn()
            renderContracts(contracts)
        },200);
        $(`#contract-${e}`).removeClass('flip');
    }
    }else{
        $(`.alert`).fadeIn();
        setTimeout(()=>{
            $(`.alert`).fadeOut();
        },2000)
    } 

 


    
        

}

function cancelEditContract(e){
    $(`#contract-${e}`).removeClass('flip');
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
    switch (e){
        case 'A':
        tag.classList.add('tagA')
        break;
        case 'B':
        tag.classList.add('tagB')
        break;
        case 'C':
        tag.classList.add('tagC')
        break;
        case 'D':
        tag.classList.add('tagD')
        break;
    }
    let clearFilters = document.createElement('h3')
    clearFilters.classList.add('clearFilters')


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
function getDate(){
    let currentDate = new Date()

    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()

    let minutes = currentDate.getMinutes()
    let hour = currentDate.getHours();

    return(`${day}-${month}-${year} at ${hour}:${minutes}`);
}
renderContracts(contracts)

let addingContract = false;

$(`#addContractBtn`).click(()=>{
    if(addingContract){
        $(`#contracts-add`).slideUp()
        $(`#addContractBtn`).removeClass('rotate')
        setTimeout(()=>{
            addingContract = false;

        },300)
    }else{
        addingContract = true;
        $(`#addContractBtn`).addClass('rotate')
        $(`#contracts-add`).slideDown()

    }
})

setTimeout(()=>{

},1000)
