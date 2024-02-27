window.addEventListener('load', function () {
    let i = 0;
    let submitButton = document.getElementById('submitButton');
    let inputField = document.getElementById('inputfield');
    let taskList = document.getElementById('taskList');

    inputField.addEventListener('input', (event) => {
        task = event.target.value;
    });

    submitButton.addEventListener('click', addTask);

    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        // Get the task value and reset the input field
        let task = inputField.value;
        if (!task.trim()) {
            return; // Do not add empty tasks
        }
        inputField.value = '';

        // Create card and card body
        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('my-1');

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.classList.add('py-2');

        let taskBody = document.createElement('div');
        taskBody.classList.add('taskBody');

        let buttons = document.createElement('div');
        buttons.classList.add('buttons');

        let editButton = document.createElement('button');
        editButton.setAttribute('type', 'button');
        editButton.classList.add('btn');
        editButton.classList.add('btn-warning');
        editButton.classList.add('me-1');
        editButton.innerHTML = '<i class="fas fa-pen"></i>';

        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'button');
        deleteButton.classList.add('btn');
        deleteButton.classList.add('btn-danger');
        deleteButton.classList.add('ms-1');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

        // Increment i and set text content
        i = i + 1;
        taskBody.innerText = task;

        // Append cardBody to card and card to taskList
        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);
        taskBody.appendChild(buttons);
        cardBody.appendChild(taskBody);
        card.appendChild(cardBody);
        taskList.appendChild(card);

        // Edit button functionality
        editButton.addEventListener('click', () => {
            let editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = task;
            editInput.classList.add('edit-input');
            editInput.classList.add('form-control');
            editInput.classList.add('me-1');

            // Replace taskBody with input field for editing
            taskBody.innerHTML = '';
            taskBody.appendChild(editInput);

            // Create tick button for editing
            let tickButton = document.createElement('button');
            tickButton.setAttribute('type', 'button');
            tickButton.classList.add('btn');
            tickButton.classList.add('btn-success');
            tickButton.innerHTML = '<i class="fas fa-check"></i>';
            taskBody.appendChild(tickButton);

            // Add event listener to the tick button
            tickButton.addEventListener('click',  edit);
            editInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    edit();
                }
            });
            function edit(){
                task = editInput.value;
                taskBody.innerHTML = task;
                taskBody.appendChild(buttons); // Re-add the buttons after editing
            }

            buttons.innerHTML = ''; // Clear buttons before adding tick button
            buttons.appendChild(editButton);
            buttons.appendChild(deleteButton);
        });

        // Delete button functionality
        deleteButton.addEventListener('click', () => {
            card.remove();
        });
    }
});
