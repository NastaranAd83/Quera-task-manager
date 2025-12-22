const taskForm = document.getElementById("form");
const adding_duty_btn = document.getElementById("add-duty-btn");
const div_duty_btn = document.getElementById("div-btn-add-duty");
const check_list_img = document.getElementById("check-list-img");
const checklist_texts_child1 = document.getElementById(
  "checklist-texts-child1"
);
const checklist_texts_child2 = document.getElementById(
  "checklist-texts-child2"
);
const close_btn = document.getElementById("close-btn");
const priority_form = document.getElementById("priority-form");
const tag_btn = document.getElementById("tag-btn");

const priorityButtons = document.querySelectorAll(".priority-btn");

const tag_img = tag_btn.querySelector("img");
const div_span = document.getElementById("div-span");
const tag_span = document.getElementById("tag-span");
const span1 = document.getElementById("span1");
const span2 = document.getElementById("span2");
const tag_img_down = document.getElementById("tag-img-down");
const adding_task_btn = document.getElementById("adding-task-btn");
const task_name = document.getElementById("task-name");
const task_description = document.getElementById("task-description");

const taskTemplate = document.getElementById("task-template");
const taskList = document.querySelector(".task-list");
const section4 = document.querySelector(".section4")
const section5 = document.querySelector(".section5")
const texts_second = document.getElementById("texts-second")
const tasks = [];
const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1,
};



let currentPriority = 0;
let counter = 0;

const dateElement = document.getElementById("date");

function updatePersianDate() {
  const today = new Date();

 const weekday = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
  }).format(today);

  const day = new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
  }).format(today);

  const month = new Intl.DateTimeFormat("fa-IR", {
    month: "long",
  }).format(today);

  const year = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
  }).format(today);

  dateElement.textContent = `امروز، ${weekday} ${day} ${month} ${year}`;
  
}

updatePersianDate();


function createTask({ title, description, priority }) {
  const clone = taskTemplate.content.cloneNode(true);

  const card = clone.querySelector(".task-card");
  const title_task = clone.querySelector(".title-task");
  const desc = clone.querySelector(".task-description");
  const priorityText = clone.querySelector(".priority-text");
  const line = clone.querySelector(".line");
  const priority_bg = clone.querySelector(".priority-bg");


  title_task.textContent = title;
  desc.textContent = description;
  priorityText.classList.remove(
  "text-[#FF5F37]",
  "text-[#FFAF37]",
  "text-[#11A483]",
  "dark:text-[#02E1A2]",
  "dark:text-[#FFAF37]",
  "dark:text-[#FF5F37]"
);

line.classList.remove(
  "bg-[#FF5F37]",
  "bg-[#FFAF37]",
  "bg-[#11A483]",
  "dark:bg-[#02E1A2]",
  "dark:bg-[#FFAF37]",
  "dark:bg-[#FF5F37]"
);

priority_bg.classList.remove(
  "bg-[#FFE2DB]",
  "bg-[#FFEFD6]",
  "bg-[#C3FFF1]",
  "dark:bg-[#233332]",
  "dark:bg-[#302F2D]",
  "dark:bg-[#3D2327]"
);

if (priority === "high") {
  priorityText.textContent = "بالا";
  priorityText.classList.add("text-[#FF5F37]", "dark:text-[#02E1A2]");
  line.classList.add("bg-[#FF5F37]", "dark:bg-[#02E1A2]");
  priority_bg.classList.add("bg-[#FFE2DB]", "dark:bg-[#233332]");
}

if (priority === "medium") {
  priorityText.textContent = "متوسط";
  priorityText.classList.add("text-[#FFAF37]", "dark:text-[#FFAF37]");
  line.classList.add("bg-[#FFAF37]", "dark:bg-[#FFAF37]");
  priority_bg.classList.add("bg-[#FFEFD6]", "dark:bg-[#302F2D]");
}
if (priority === "low") {
  priorityText.textContent = "پایین";
  priorityText.classList.add("text-[#11A483]", "dark:text-[#FF5F37]");
  line.classList.add("bg-[#11A483]", "dark:bg-[#FF5F37]");
  priority_bg.classList.add("bg-[#C3FFF1]", "dark:bg-[#3D2327]");
}


  return clone;
}

function renderTasks() {
  taskList.innerHTML = ""; 

  [...tasks].sort(
      (a, b) =>
        priorityOrder[b.priority] - priorityOrder[a.priority]
    )
    .forEach((task) => {

      const taskNode = createTask(task);
      taskList.appendChild(taskNode);
    });
}




adding_duty_btn.addEventListener("click", () => {
  section5.classList.remove("hidden")
  taskForm.classList.toggle("hidden");
  div_duty_btn.classList.toggle("hidden");
  section4.classList.add("hidden")
  
});

close_btn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden");
  div_duty_btn.classList.toggle("hidden");
  check_list_img.classList.toggle("hidden");
  checklist_texts_child2.classList.toggle("hidden");
  checklist_texts_child1.classList.toggle("hidden");
  if (!priority_form.classList.contains("hidden")) {
    priority_form.classList.add("hidden");
    taskForm.style.height = "208px";
    tag_img_down.classList.add("hidden");
    tag_img.classList.remove("hidden");
  }

  tag_span.classList.remove("hidden");
  tag_span.textContent = "تگ ها";
  tag_img.classList.remove("hidden");
  div_span.classList.add("hidden");
  tag_btn.style.backgroundColor = "#FFFFFF";
  tag_btn.style.color = "#AFAEB2";
  span1.textContent = "";
  currentPriority = 0;
  counter = 0;
  task_name.value = "";
});

tag_btn.addEventListener("click", () => {
  if (priority_form.classList.contains("hidden") && currentPriority === 0) {
    tag_img_down.classList.remove("hidden");
    tag_img.classList.add("hidden");
    priority_form.classList.remove("hidden");

    taskForm.style.height = taskForm.scrollHeight + "px";
  } else if (currentPriority === 1) {
    tag_span.classList.remove("hidden");
    tag_span.textContent = "تگ ها";
    tag_img.classList.remove("hidden");
    div_span.classList.add("hidden");
    tag_btn.style.backgroundColor = "#FFFFFF";
    tag_btn.style.color = "#AFAEB2";
    span1.textContent = "";
    currentPriority = 0;
    adding_task_btn.style.opacity = 0.4;
  }
});

priorityButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.priority;
    currentPriority = 1;

    let label = type === "low" ? "پایین" : type === "medium" ? "متوسط" : "بالا";

    if (type === "low") {
      tag_btn.style.backgroundColor = "#C3FFF1";
      tag_btn.style.color = "#11A483";
    } else if (type === "medium") {
      tag_btn.style.backgroundColor = "#FFEFD6";
      tag_btn.style.color = "#FFAF37";
    } else if (type === "high") {
      tag_btn.style.backgroundColor = "#FFE2DB";
      tag_btn.style.color = "#FF5F37";
    }

    tag_span.classList.add("hidden");
    tag_img.classList.add("hidden");
    tag_img_down.classList.add("hidden");
    span1.textContent = label;
    counter = 1;
    div_span.classList.remove("hidden");
    priority_form.classList.add("hidden");
    taskForm.style.height = "200px";
    if (adding_task_btn.classList.contains("opacity-40")) {
      if (span1.textContent && task_name.value) {
        adding_task_btn.style.opacity = 1;
      }
    }
  });
});
task_name.addEventListener("input", () => {
  if (span1.textContent && task_name.value) {
    if (adding_task_btn.classList.contains("opacity-40")) {
      adding_task_btn.style.opacity = 1;
    } else {
      adding_task_btn.style.opacity = 1;
    }
  } else {
    adding_task_btn.style.opacity = 0.4;
  }
});


const list = [];
adding_task_btn.addEventListener("click", () => {
  if (task_name.value && span1.textContent) {
    taskForm.classList.add("hidden");
    div_duty_btn.classList.remove("hidden");
    div_span.classList.add("hidden");
    let label =
      span1.textContent === "پایین"
        ? "low"
        : span1.textContent === "متوسط"
        ? "medium"
        : "high";

        tasks.push({
      title: task_name.value,
      description: task_description.value,
      priority: label,
    });

    renderTasks();
    
    taskList.classList.remove("hidden");
    task_name.value = "";

    if (tasks.length >0){
     section4.classList.add("hidden")
     section5.classList.add("hidden")
     texts_second.textContent =`${tasks.length} تسک باید انجام دهید.`
    }
  else if (tasks.length==0)
  {
          texts_second.textConten = " تسکی برای امروز نداری!"
  }
       
    task_description.value = "";
    tag_span.classList.remove("hidden");
    tag_img_down.classList.add("hidden");
    tag_img.classList.remove("hidden");
    tag_span.classList.remove("hidden");

    tag_img.classList.remove("hidden");
    div_span.classList.add("hidden");
    tag_btn.style.backgroundColor = "#FFFFFF";
    tag_btn.style.color = "#AFAEB2";
    span1.textContent = "";
    currentPriority = 0;
    adding_task_btn.style.opacity = 0.4;
  }
});
