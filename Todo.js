function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(TaskArray));
}

window.onload = function () {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    TaskArray.push(...JSON.parse(storedTasks));
    safai();
  }

  document
    .getElementById("TaskBox")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        HandleClick();
      }
    });

  document.getElementById("TaskBox").focus();
};

const TaskArray = [];
let currentEditIndex = null;

function HandleClick() {
  let input = document.getElementById("TaskBox").value.trim();
  if (input === "") {
    alert("Enter Some Task Burh..!");
    return;
  }

  if (currentEditIndex === null) {
    const isDuplicate = TaskArray.some(
      (task) => task.toLowerCase().trim() === input.toLowerCase().trim()
    );
    if (isDuplicate) {
      alert("Task already exists!");
      return;
    }
  }

  if (currentEditIndex !== null) {
    TaskArray[currentEditIndex] = input;
    currentEditIndex = null;
    document.getElementById("Mybutton").innerText = "Add";
  } else {
    TaskArray.push(input);
    fireCrackers();
  }

  updateLocalStorage();
  safai();
  document.getElementById("TaskBox").value = "";
  console.log(TaskArray);
}

function safai() {
  let ol = document.getElementById("order-of-lists");
  ol.innerHTML = "";

  TaskArray.map((elem, index) => {
    let li = document.createElement("li");
    let textSpan = document.createElement("span");
    let Action = document.createElement("span");

    Action.classList.add("functionality");
    Action.innerHTML = `
        <i class="edit fa-solid fa-pen"></i>
        <i class="delete fa-solid fa-trash"></i>`;

    textSpan.textContent = elem;
    ol.appendChild(li);
    li.appendChild(textSpan);
    li.appendChild(Action);
    ol.insertBefore(li, ol.firstChild);

    const deleteTask = Action.querySelector(".delete");
    deleteTask.addEventListener("click", function () {
      TaskArray.splice(index, 1);
      console.log(TaskArray);
      updateLocalStorage();
      safai();
    });

    const updateTask = Action.querySelector(".edit");
    updateTask.addEventListener("click", () => {
      document.getElementById("TaskBox").value = elem;
      document.getElementById("Mybutton").innerText = "Save";
      document.getElementById("TaskBox").focus();
      currentEditIndex = index;
    });
  });

  document.getElementById("TaskBox").value = "";
  document.getElementById("TaskBox").focus();
}

////////////////////////////////////////////////////
function fireCrackers() {
  var count = 200;
  var defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  const lettersContainer = document.getElementById("letters-container");
  const word = "SENTI";

  word.split("").forEach((letter, index) => {
    const letterElement = document.createElement("p");
    letterElement.textContent = letter;
    letterElement.setAttribute("data-aos", "fade-up");
    letterElement.setAttribute("data-aos-delay", 700 + index * 100);
    letterElement.setAttribute("data-aos-anchor-placement", "top-bottom");
    lettersContainer.appendChild(letterElement);
  });
});
