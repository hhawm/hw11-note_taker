const todolistUl = $("#todolist");
const newTodoList =  
const newTodoButton =
    $.get("/api/todos").then(data => {
        console.log(data);
        renderTodos(data);
        data.forEach(todo =>
            todolistUl.append(`<li>${todo.text})</li>`)
        )
    })

newTodoButton.click(e => {
    e.preventDefault();
    const userText = newTodoInput.val();
    console.log(userText);
    const newTodo = {
        text: userText,
        done: false
    };
    $.post("/api/todos", newTodo).then(() => {
        renderTodos(data);
    }

    )
});