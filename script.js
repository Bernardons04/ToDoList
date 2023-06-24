const localStorageKey = 'toDoListBernardo'
let input = document.getElementById('input-adicionar-task')
const ul = document.querySelector('ul')
const buttonAddTask = document.getElementById("adicionar-task");


input.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        adicionarNovaTask()
    }
})

function validarNovaTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let existe;
    for (let c = 0; c <= values.length; c++) {
        if (values[c] == input.value) {
            existe = true
            break;
        } else {
            existe = false
        }
    }
    return existe
}

function adicionarNovaTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")

    if (!input.value) {
        alert('Digite algo para inserir em sua lista!')
    } else if (validarNovaTask()) {
        alert('A task que você digitou ja está na lista, não é possível adicionar itens repetidos!')
    } 
    else {
        let li = document.createElement('li');
        li.innerHTML = input.value;
        ul.appendChild(li);
        let button = document.createElement('button');
        button.innerHTML = "✔";
        li.appendChild(button);
        button.classList.add("excluiTask");
        button.addEventListener("click", excluirTask);

        values.push(input.value)
        localStorage.setItem(localStorageKey, JSON.stringify(values))        
    }
    input.value = "";
}

function mostrarValores() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    for(let c = 0; c < values.length; c++) {
        let li = document.createElement('li');
        li.innerHTML = values[c]
        ul.appendChild(li);
        let button = document.createElement('button');
        button.innerHTML = "✔";
        li.appendChild(button);
        button.classList.add("excluiTask");
        button.addEventListener("click", excluirTask);
    }
}

function excluirTask(target) {
    const targetElement = target.target;
    const parentElement = targetElement.closest('li');
    let strgPrntElmnt = parentElement.textContent
    strgPrntElmnt = strgPrntElmnt.substring(0, strgPrntElmnt.length - 1)
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")

    for(let c = 0; c < values.length; c++) {
        if (values[c] === strgPrntElmnt) {
            values.splice(values.indexOf(values[c]), 1);
        }
    }

    localStorage.clear()
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    parentElement.remove();
}