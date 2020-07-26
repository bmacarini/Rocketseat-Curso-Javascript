var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

//Para buscar os valores no local storage e preencher a lista
//JSON.parse = transforma as strings de volta em um array
// || [] = alternativa caso não haja itens para renderizar no localstorage. Retorna um array vazio.
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {

    //Para renderizar apenas o novo item e não os anteriores
    listElement.innerHTML = '';

    for (todo of todos) {
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        //Link para excluir todo
        var linkElement = document.createElement('a');

        linkElement.setAttribute('href', '#');

        //Para saber qual é a posição do todo
        var pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');

        var linkText = document.createTextNode(' Excluir');

        linkElement.appendChild(linkText);

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);

        listElement.appendChild(todoElement);
    }
}

renderTodos();

function addTodo() {
    //Pegando o valor do input
    var todoText = inputElement.value;

    //Adicionar o item no array de elementos
    todos.push(todoText);
    
    //Para apagar o texto atual do input
    inputElement.value = '';

    //Para renderizar a lista de elementos novamente
    renderTodos();
    saveToStorage();
}

buttonElement.onclick = addTodo;

function deleteTodo(pos) {
    //Para remover um array de uma determinada posição
    todos.splice(0, 1);
    renderTodos();
    saveToStorage();
}

//Função para salvar os todos no local storage
function saveToStorage() {
    //setItem = nome do arquivo dentro do local storage
    //JSON.stringfy = converte um vetor em uma string

    localStorage.setItem('list_todos', JSON.stringify(todos));
}