var tasks = [];

var drawTasks = function() {
	$('task-container').empty();

	if (tasks.length == 0) {
		$('task-container').append("<li>No hay tareas pendientes</li>");
	} else {
		var contentToAdd = '';
		for (var i = 0; i < tasks.length; i++) {
			contentToAdd += '<li class="task-item">' + tasks[i].name + '<button class="deleteTask" data-task-id="' + tasks[i].id + '">Delete</button></li>'
		}
		$('task-container').append(contentToAdd);
	}
}

var getTasks = function () {
    var XHR = new XMLHttpRequest();
    XHR.open("GET", "http://localhost:8000/api/tasks", true);
    XHR.setRequestHeader("Content-Type", "application/json");

    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4) {
            tasks = JSON.parse(XHR.responseText);
            drawTasks();
        } else if (XHR.readyState === 4 && XHR.status === 404) {
            console.log("Página no encontrada");
        }
    }

    XHR.send();
}

getTasks();

var createTask = function (name) {
    var XHR = new XMLHttpRequest();
    XHR.open("POST", "http://localhost:8000/api/tasks", true);
    XHR.setRequestHeader("Content-Type", "application/json");

    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4) {
            tasks.push(JSON.parse(XHR.responseText));
            drawTasks();
        } else if (XHR.readyState === 4 && XHR.status === 404) {
            console.log("Página no encontrada");
        }
    }

    XHR.send(JSON.stringify({"name": name}));
}

var deleteTask = function (id) {
    var XHR = new XMLHttpRequest();
    XHR.open("DELETE", "http://localhost:8000/api/tasks/" + id, true);
    XHR.setRequestHeader("Content-Type", "application/json");

    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4) {
            console.log("tasks deleted");
            getTasks();
        } else if (XHR.readyState === 4 && XHR.status === 404) {
            console.log("Página no encontrada");
        }
    }

    XHR.send();
}

document.getElementById("send-new-task").addEventListener("click", function (event) {
    event.preventDefault();
    createTask(document.getElementById("new-task-name").value);
})


getTasks();

$(document).on('click', '.deleteTask', function(){
	var id = $(this).data('taskId');
	deleteTask(id);
});

