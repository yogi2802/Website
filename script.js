// Tambahkan event listener
document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const dayInput = document.getElementById('dayInput');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');
    
    const taskText = taskInput.value.trim();
    const dayText = dayInput.value;
    const dateText = dateInput.value;
    const timeText = timeInput.value;
    
    if (taskText !== '' && dayText !== '' && dateText !== '' && timeText !== '') {
        addTask(taskText, dayText, dateText, timeText);
        taskInput.value = '';
        dayInput.value = '';
        dateInput.value = '';
        timeInput.value = '';
        showNotification("Task added successfully!");
    } else {
        alert("Please fill in all fields.");
    }
});

// Tambahkan event listener untuk window.onload untuk memuat tugas dari penyimpanan lokal saat halaman dimuat
window.onload = function() {
    // Periksa apakah ada tugas yang tersimpan di localStorage
    if(localStorage.getItem('tasks')) {
        // Ambil data dari localStorage
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        
        // Tambahkan tugas yang tersimpan ke dalam list
        savedTasks.forEach(task => {
            addTask(task.taskText, task.dayText, task.dateText, task.timeText);
        });
    }
};

function addTask(taskText, dayText, dateText, timeText) {
    const taskList = document.getElementById('taskList');
    
    // Hapus baris placeholder jika ada
    if (taskList.children[0] && taskList.children[0].children[0].colSpan === 5) {
        taskList.innerHTML = '';
    }

    const taskRow = document.createElement('tr');

    const taskCell = document.createElement('td');
    taskCell.textContent = taskText;

    const dayCell = document.createElement('td');
    dayCell.textContent = dayText;

    const dateCell = document.createElement('td');
    dateCell.textContent = dateText;

    const timeCell = document.createElement('td');
    timeCell.textContent = timeText;

    const actionCell = document.createElement('td');
    actionCell.className = 'actions';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
    editButton.addEventListener('click', function() {
        const newTaskText = prompt('Edit task:', taskCell.textContent);
        const newDayText = prompt('Edit day:', dayCell.textContent);
        const newDateText = prompt('Edit date:', dateCell.textContent);
        const newTimeText = prompt('Edit time:', timeCell.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '' &&
            newDayText !== null && newDayText.trim() !== '' &&
            newDateText !== null && newDateText.trim() !== '' &&
            newTimeText !== null && newTimeText.trim() !== '') {
            taskCell.textContent = newTaskText.trim();
            dayCell.textContent = newDayText.trim();
            dateCell.textContent = newDateText.trim();
            timeCell.textContent = newTimeText.trim();
            showNotification("Task edited successfully!");

            // Simpan kembali ke localStorage setelah diedit
            saveTasks();
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskRow);
        showNotification("Task deleted successfully!");
        
        // Simpan kembali ke localStorage setelah dihapus
        saveTasks();
        
        // Tambahkan baris placeholder jika tidak ada tugas lagi
        if (taskList.children.length === 0) {
            const placeholderRow = document.createElement('tr');
            const placeholderCell = document.createElement('td');
            placeholderCell.colSpan = 5;
            placeholderCell.textContent = 'No tasks added yet.';
            placeholderRow.appendChild(placeholderCell);
            taskList.appendChild(placeholderRow);
        }
    });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
    taskRow.appendChild(taskCell);
    taskRow.appendChild(dayCell);
    taskRow.appendChild(dateCell);
    taskRow.appendChild(timeCell);
    taskRow.appendChild(actionCell);
    taskList.appendChild(taskRow);

    // Simpan tugas ke penyimpanan lokal setiap kali ditambahkan
    saveTasks();
}

function saveTasks() {
    const taskRows = document.querySelectorAll('#taskList tr');
    const tasks = [];

    taskRows.forEach(row => {
        const taskText = row.children[0].textContent;
        const dayText = row.children[1].textContent;
        const dateText = row.children[2].textContent;
        const timeText = row.children[3].textContent;

        tasks.push({
            taskText,
            dayText,
            dateText,
            timeText
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.textContent = '';
    }, 3000);
}