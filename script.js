let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  const subject = document.getElementById("subject").value;
  const difficulty = parseInt(document.getElementById("difficulty").value);
  const deadline = document.getElementById("deadline").value;

  if (!subject || !deadline) {
    alert("Please fill all fields");
    return;
  }

  const task = {
    id: Date.now(),
    subject,
    difficulty,
    deadline,
    completed: false,
    studyTime: calculateStudyTime(difficulty)
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
}

function calculateStudyTime(difficulty) {
  // Adaptive logic
  let base = 1; // 1 hour
  return base * difficulty; // Hard = more time
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${task.subject}</strong><br>
      Difficulty: ${task.difficulty} | Study: ${task.studyTime} hrs <br>
      Deadline: ${task.deadline} <br>
      Status: ${task.completed ? "✅ Done" : "❌ Pending"} <br>
      <button onclick="markDone(${task.id})">Mark Done</button>
    `;

    list.appendChild(li);
  });
}

function markDone(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = true;

      // Adaptive improvement:
      // If completed, reduce future difficulty impact
      task.studyTime = Math.max(1, task.studyTime - 0.5);
    }
    return task;
  });

  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();