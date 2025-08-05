
document.addEventListener("DOMContentLoaded", function () {
document.addEventListener("DOMContentLoaded", function () {
  const openTodoBtn = document.getElementById("openTodo");
  const openShelfBtn = document.getElementById("openShelf");
  const homeSection = document.getElementById("home");
  const todoSection = document.getElementById("todo");
  const shelfSection = document.getElementById("shelf");

  openTodoBtn.addEventListener("click", function () {
    homeSection.style.display = "none";
    todoSection.style.display = "block";
    shelfSection.style.display = "none";
  });

  openShelfBtn.addEventListener("click", function () {
    homeSection.style.display = "none";
    shelfSection.style.display = "block";
    todoSection.style.display = "none";
  });
});
 const taskList = document.getElementById("taskList");
  const addTaskBtn = document.getElementById("addTask");
  const newTaskInput = document.getElementById("newTaskInput");
  const timeInput = document.getElementById("timeInput");

  // Load saved tasks
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    addTaskToDOM(task.text, task.time, task.done);
  });

  addTaskBtn.addEventListener("click", function () {
    const text = newTaskInput.value.trim();
    const time = timeInput.value;
    if (text !== "") {
      addTaskToDOM(text, time, false);
      saveTasks();
      newTaskInput.value = "";
      timeInput.value = "";
    }
  });

  function addTaskToDOM(text, time, done) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-check");
    checkbox.checked = done;

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = time ? ${text} at ${time} : text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.classList.add("edit");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete");

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        alert("slayyy");
        span.style.textDecoration = "line-through";
      } else {
        span.style.textDecoration = "none";
      }
      saveTasks();
    });

    editBtn.addEventListener("click", () => {
      let currentText = span.textContent;
      let newText = prompt("Edit your task:", currentText);
      if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
        saveTasks();
      }
    });

    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
      const text = li.querySelector(".task-text").textContent;
      const done = li.querySelector(".task-check").checked;
      let parts = text.split(" at ");
      tasks.push({
        text: parts[0],
        time: parts[1] || "",
        done
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

// -------------------- Book Section --------------------

const books = [
  { title: "Crime and Punishment", genre: "classic", file: "Crime-and-Punishment.txt" },
  { title: "The Idiot", genre: "classic", file: "the-idiot.txt" },
  { title: "Notes from Underground", genre: "classic", file: "notes-from-underground.txt" },
  { title: "Frankenstein", genre: "classic", file: "frankenstein.txt" },
  { title: "Pride and Prejudice", genre: "romance", file: "pride-and-prejudice.txt" },
  { title: "Meditations", genre: "self-help", file: "meditations.txt", language: "english" },
  { title: "The Brothers Karamazov", genre: "classic", file: "the-brothers-karamazov.txt" }
];

const categoryButtons = document.querySelectorAll(".category > button");
const genreContainers = document.querySelectorAll(".genres");
const bookDisplay = document.getElementById("bookDisplay");
const reader = document.getElementById("reader");
const backBtn = document.getElementById("backBtn");
let selectedGenre = null;

// Toggle genre sections
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const style = btn.dataset.style;
    genreContainers.forEach(div => {
      div.style.display = (div.dataset.genres === style) ? "block" : "none";
    });
    bookDisplay.innerHTML = "";
    reader.textContent = "Select a book to read its content here...";
  });
});
// Show books of selected genre
document.querySelectorAll(".genres button").forEach(genreBtn => {
  genreBtn.addEventListener("click", () => {
    selectedGenre = genreBtn.dataset.genre;
    renderBooks();
  });
});

function renderBooks() {
  bookDisplay.innerHTML = "";
  reader.textContent = "Select a book to read its content here...";

  if (!selectedGenre) {
    bookDisplay.textContent = "Please select a genre to see books.";
    return;
  }

  const filteredBooks = books.filter(book => book.genre === selectedGenre);
  if (filteredBooks.length === 0) {
    bookDisplay.textContent = "No books found in this genre.";
    return;
  }

  filteredBooks.forEach(book => {
    const li = document.createElement("li");
    const bookBtn = document.createElement("button");
    bookBtn.textContent = book.title;
    bookBtn.style.cursor = "pointer";

    bookBtn.addEventListener("click", () => {
      const content = Android.getBookContent(book.file); // Kotlin interface
      reader.textContent = content;

      // Optional fullscreen reader
      backBtn.style.display = 'block';
    });

    li.appendChild(bookBtn);
    bookDisplay.appendChild(li);
  });
}

// Go back from reader
backBtn.addEventListener('click', () => {
  document.querySelector('.category').style.display = 'flex';
  document.querySelectorAll('.genres').forEach(div => {
    div.style.display = 'flex';
  });
  bookDisplay.style.display = 'block';

  reader.style = '';
  reader.textContent = "Select a book to read its content here...";
  backBtn.style.display = 'none';
});
