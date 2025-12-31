import { updatePersianDate } from "./utils/updating_persian_calender.js";
import {
  taskForm,
  adding_duty_btn,
  div_duty_btn,
  check_list_img,
  close_btn,
  priority_form,
  tag_btn,
  checklist_texts_child1,
  checklist_texts_child2,
  div_span,
  tag_span,
  span1,
  tag_img_down,
  adding_task_btn,
  task_name,
  task_description,
  taskTemplate,
  priorityButtons,
  tag_img,
  taskList,
  section4,
  section5,
  texts_second,
  // footer
  completedTaskList,
  completedTasksText,
  // side bar
  // body,
  sidebar,
  menuBtn,
  closeSidebar,
  darkBtn,
  lightBtn,
  navLinks,
  html,
} from "./ui/elements.js";

import { renderTasks } from "../create_task/ui/render_tasks.js";
import {
  saveTasksToStorage,
  loadTasksFromStorage,
  saveCompletedTasksToStorage,
  loadCompletedTasksFromStorage,
} from "../create_task/ui/storing_task.js";

import { applyCompletedUI } from "../create_task/ui/apply_complete_format.js";
let storing_task = [];
let id_container = 0;
let edit_counter = 0;
const completedTasks = [];
const tasks = [];
const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1,
};

let currentPriority = 0;

updatePersianDate();
// Load tasks from LocalStorage on startup
const storedTasks = loadTasksFromStorage();
const stordCompletedTask = loadCompletedTasksFromStorage();

storing_task.push(...storedTasks);
tasks.push(...storedTasks);
completedTasks.push(...stordCompletedTask);

completedTasks.forEach((task) => {
  const clone = createTask(task);
  const card = clone.querySelector(".task-card");

  card.dataset.completed = "true";
  applyCompletedUI(card);

  insertTaskSorted(completedTaskList, card, task.priority);
});

updateCompletedCount();

if (tasks.length > 0) {
  renderTasks({
    tasks,
    taskList,
    priorityOrder,
    createTask,
  });

  section4.classList.add("hidden");
  texts_second.textContent = `${tasks.length} تسک باید انجام دهید.`;
}

//footer
export function insertTaskSorted(container, card, priority) {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  const existingCards = Array.from(container.children);

  let inserted = false;
  for (let i = 0; i < existingCards.length; i++) {
    const existingPriority = existingCards[i].dataset.priority;

    if (priorityOrder[priority] > priorityOrder[existingPriority]) {
      container.insertBefore(card, existingCards[i]);
      inserted = true;
      break;
    }
  }

  if (!inserted) {
    container.appendChild(card);
  }
}
//footer
function updateCompletedCount() {
  const count = completedTaskList.children.length;
  completedTasksText.textContent = `${count} تسک را انجام داده‌اید.`;

}

export function createTask({ id, title, description, priority }) {
  const clone = taskTemplate.content.cloneNode(true);
  const card = clone.querySelector(".task-card");
  //footer
  card.dataset.taskId = id;
  card.dataset.priority = priority;

  const title_task = clone.querySelector(".title-task");
  const desc = clone.querySelector(".task-description");
  const priorityText = clone.querySelector(".priority-text");
  const line = clone.querySelector(".line");
  const priority_bg = clone.querySelector(".priority-bg");
  const three_dots = clone.querySelector(".three-dots");
  const trash_edit = clone.querySelector(".trash-edit");
  const edit = clone.querySelector(".edit");

  //footer
  const completeBox = clone.querySelector(".complete-box");

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
    priorityText.classList.add("text-[#FF5F37]", "dark:text-[#FF5F37]");
    line.classList.add("bg-[#FF5F37]", "dark:bg-[#FF5F37]");
    priority_bg.classList.add("bg-[#FFE2DB]", "dark:bg-[#3D2327]");
  }

  if (priority === "medium") {
    priorityText.textContent = "متوسط";
    priorityText.classList.add("text-[#FFAF37]", "dark:text-[#FFAF37]");
    line.classList.add("bg-[#FFAF37]", "dark:bg-[#FFAF37]");
    priority_bg.classList.add("bg-[#FFEFD6]", "dark:bg-[#302F2D]");
  }
  if (priority === "low") {
    priorityText.textContent = "پایین";
    priorityText.classList.add("text-[#11A483]", "dark:text-[#02E1A2]");
    line.classList.add("bg-[#11A483]", "dark:bg-[#02E1A2]");
    priority_bg.classList.add("bg-[#C3FFF1]", "dark:bg-[#233332]");
  }

  three_dots.addEventListener("click", () => {
    trash_edit.classList.toggle("hidden");
  });
  edit.addEventListener("click", () => {
    tag_btn.classList.remove("border");
    const realIndex = tasks.findIndex((t) => t.id === id);
    id_container = id;
    tasks.splice(realIndex, 1);
    saveTasksToStorage(tasks);
    card.remove();
    edit_counter = 1;
    task_name.value = title;
    task_description.value = description;
    adding_task_btn.style.opacity = 1;
    section5.classList.remove("hidden");
    taskForm.classList.remove("hidden");

    if (priority === "low") {
      priority = "پایین";
      if (!html.classList.contains("dark")) {
        tag_btn.style.backgroundColor = "#C3FFF1";
        tag_btn.style.color = "#11A483";
      } else {
        tag_btn.style.backgroundColor = "#233332";
        tag_btn.style.color = "#02E1A2";
      }
    } else if (priority === "medium") {
      priority = "متوسط";
      if (!html.classList.contains("dark")) {
        tag_btn.style.backgroundColor = "#FFEFD6";
        tag_btn.style.color = "#FFAF37";
      } else {
        tag_btn.style.backgroundColor = "#302F2D";
        tag_btn.style.color = "#FFAF37";
      }
    } else if (priority === "high") {
      priority = "بالا";
      if (!html.classList.contains("dark")) {
        tag_btn.style.backgroundColor = "#FFE2DB";
        tag_btn.style.color = "#FF5F37";
      } else {
        tag_btn.style.backgroundColor = "#3D2327";
        tag_btn.style.color = "#FF5F37";
      }
    }
    tag_span.classList.add("hidden");
    tag_img.classList.add("hidden");
    tag_img_down.classList.add("hidden");
    span1.textContent = priority;
    currentPriority = 1;
    div_span.classList.remove("hidden");
  });

  // footer
  if (completeBox) {
    completeBox.addEventListener("click", () => {
      const isCompleted = card.dataset.completed === "true";

      if (isCompleted) {
        card.dataset.completed = "false";
        const completedIndex = completedTasks.findIndex((t) => t.id === id);
        if (completedIndex !== -1) {
          completedTasks.splice(completedIndex, 1);
          saveCompletedTasksToStorage(completedTasks);
        }
        tasks.push({ id, title, description, priority });
        saveTasksToStorage(tasks);
        card.remove();
        console.log;
        updateCompletedCount();

        renderTasks({
          tasks,
          taskList,
          priorityOrder,
          createTask,
        });
        if (tasks.length > 0) {
          section4.classList.add("hidden");
          section5.classList.add("hidden");
          texts_second.textContent = `${tasks.length} تسک باید انجام دهید.`;
        } else if (tasks.length == 0) {
          texts_second.textConten = " تسکی برای امروز نداری!";
        }
        return;
      }

      card.dataset.completed = "true";

      const index = tasks.findIndex((t) => t.id === id);

      if (index !== -1) {
        completedTasks.push(tasks[index]);
        tasks.splice(index, 1);
      }
      saveTasksToStorage(tasks);
      saveCompletedTasksToStorage(completedTasks);

      title_task.classList.add("line-through", "text-gray-500");
      if (desc) desc.classList.add("hidden");
      if (priorityText) priorityText.classList.add("hidden");
      if (priority_bg) priority_bg.classList.add("bg-transparent");

      completeBox.innerHTML =
        '<img src="../assets/icons/tick-square.svg" class="w-5 h-5" />';

      insertTaskSorted(completedTaskList, card, priority);
      if (tasks.length >= 0) {
        console.log("hello");
        if (tasks.length === 0) {
          section4.classList.remove("hidden");
          section5.classList.remove("hidden");
          texts_second.textContent = " تسکی برای امروز نداری!";
        } else {
          section4.classList.add("hidden");
          section5.classList.add("hidden");
          texts_second.textContent = `${tasks.length} تسک باید انجام دهید.`;
        }
      }
      updateCompletedCount();
    });
  }
  if (card.dataset.completed === "true" && priority_bg) {
    priority_bg.classList.add("hidden");
  }

  return clone;
}

adding_duty_btn.addEventListener("click", () => {
  tag_btn.classList.add("border");
  edit_counter = 0;
  adding_task_btn.style.opacity = 0.4;
  section5.classList.remove("hidden");
  taskForm.classList.remove("hidden");
  div_duty_btn.classList.toggle("hidden");
  section4.classList.add("hidden");
});

close_btn.addEventListener("click", () => {
  tag_btn.classList.add("border");
  if (edit_counter === 1) {
    let index = storing_task.findIndex((t) => t.id === id_container);

    tasks.push({
      id: crypto.randomUUID(),
      title: storing_task[index].title,
      description: storing_task[index].description,
      priority: storing_task[index].priority,
    });
    saveTasksToStorage(tasks);
    renderTasks({
      tasks,
      taskList,
      priorityOrder,
      createTask,
    });
  }

  taskForm.classList.toggle("hidden");
  div_duty_btn.classList.remove("hidden");
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
  if (html.classList.contains("dark")) {
    tag_btn.style.backgroundColor = "#091120";
    tag_btn.style.color = "#FFFFFF";
  } else {
    tag_btn.style.backgroundColor = "#FFFFFF";
    tag_btn.style.color = "#AFAEB2";
  }

  
  span1.textContent = "";
  currentPriority = 0;
  if (tasks.length === 0) {
    section4.classList.remove("hidden");
    check_list_img.classList.remove("hidden");
    checklist_texts_child2.classList.remove("hidden");
    checklist_texts_child1.classList.remove("hidden");
  }
  task_name.value = "";
  task_description.value = "";
  edit_counter = 0;
});

tag_btn.addEventListener("click", () => {
  tag_btn.classList.add("border");
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
    if (html.classList.contains("dark")) {
      tag_btn.style.backgroundColor = "#091120";
      tag_btn.style.color = "#FFFFFF";
    } else {
      tag_btn.style.backgroundColor = "#FFFFFF";
      tag_btn.style.color = "#AFAEB2";
    }
  
    
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
    tag_btn.classList.remove("border");
    if (type === "low") {
      if (!html.classList.contains("dark")) {
        tag_btn.style.backgroundColor = "#C3FFF1";
        tag_btn.style.color = "#11A483";
      } else {
        tag_btn.style.backgroundColor = "#233332";
        tag_btn.style.color = "#02E1A2";
      }
    } else if (type === "medium") {
      if (!html.classList.contains("dark")) {
        tag_btn.style.backgroundColor = "#FFEFD6";
        tag_btn.style.color = "#FFAF37";
      } else {
        tag_btn.style.backgroundColor = "#302F2D";
        tag_btn.style.color = "#FFAF37";
      }
    } else if (type === "high") {
      if (!html.classList.contains("dark")) {
        tag_btn.style.backgroundColor = "#FFE2DB";
        tag_btn.style.color = "#FF5F37";
      } else {
        tag_btn.style.backgroundColor = "#3D2327";
        tag_btn.style.color = "#FF5F37";
      }
    }

    tag_span.classList.add("hidden");
    tag_img.classList.add("hidden");
    tag_img_down.classList.add("hidden");
    span1.textContent = label;

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

    const task = {
      id: crypto.randomUUID(),
      title: task_name.value,
      description: task_description.value,
      priority: label,
    };
    storing_task.push(task);
    tasks.push(task);

    saveTasksToStorage(tasks);

    renderTasks({
      tasks,
      taskList,
      priorityOrder,
      createTask,
    });

    taskList.classList.remove("hidden");
    task_name.value = "";

    if (tasks.length > 0) {
      section4.classList.add("hidden");
      section5.classList.add("hidden");
      texts_second.textContent = `${tasks.length} تسک باید انجام دهید.`;
    } else if (tasks.length == 0) {
      texts_second.textConten = " تسکی برای امروز نداری!";
    }

    task_description.value = "";
    tag_span.classList.remove("hidden");
    tag_img_down.classList.add("hidden");
    tag_img.classList.remove("hidden");
    tag_span.classList.remove("hidden");

    tag_img.classList.remove("hidden");
    div_span.classList.add("hidden");
    if (html.classList.contains("dark")) {
      tag_btn.style.backgroundColor = "#091120";
      tag_btn.style.color = "#FFFFFF";
    } else {
      tag_btn.style.backgroundColor = "#FFFFFF";
      tag_btn.style.color = "#AFAEB2";
    }


    span1.textContent = "";
    currentPriority = 0;
    adding_task_btn.style.opacity = 0.4;
  }
  edit_counter = 0;
});

//footer
// Helper: find the task object and remove it from the `tasks` array
function removeTaskFromArray(taskId) {
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

// Helper: update the header text that shows how many tasks are left
function updatePendingTasksCount() {
  texts_second.textContent =
    tasks.length > 0
      ? `${tasks.length} تسک باید انجام دهید.`
      : "تسکی برای امروز نداری!";
}

// Main deletion logic – event delegation on both containers
function setupDeleteListeners() {
  // Listen on the uncompleted tasks container
  taskList.addEventListener("click", handleDeleteClick);

  // Listen on the completed tasks container
  completedTaskList.addEventListener("click", handleDeleteClick);
}

function handleDeleteClick(e) {
  // We click on the img inside the trash button
  if (e.target.closest(".trash")) {
    const trashButton = e.target.closest(".trash");
    const card = trashButton.closest(".task-card");

    if (!card) return;

    // Get the task id – we will store it in a data attribute when creating the card
    const taskId = card.dataset.taskId;

    // Remove the card from DOM
    card.remove();
    if (e.currentTarget === completedTaskList && taskId) {
      const index = completedTasks.findIndex((t) => t.id === taskId);
      if (index !== -1) {
        completedTasks.splice(index, 1);
        saveCompletedTasksToStorage(completedTasks);
        updateCompletedCount();
      }
    }
    // If it was in completed list → update the footer counter
    if (e.currentTarget === completedTaskList) {
      updateCompletedCount();
    }

    // If it was in the uncompleted list → remove from tasks array and update count
    // if (taskId) {
    //   removeTaskFromArray(taskId);
    //   updatePendingTasksCount();
    //   saveTasksToStorage(tasks);
    // }
    if (e.currentTarget === taskList && taskId) {
      removeTaskFromArray(taskId);
      updatePendingTasksCount();
      saveTasksToStorage(tasks);
    }

    // If there are no more uncompleted tasks, show the empty state
    if (tasks.length === 0) {
      section4.classList.remove("hidden");
    }
  }
}

// Call this once after your app is initialized
setupDeleteListeners();

// side bar

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("translate-x-full");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.add("translate-x-full");
});

darkBtn.addEventListener("click", () => {
  html.classList.add("dark");
  localStorage.setItem("theme", "dark");
  if (html.classList.contains("dark")) {
    tag_btn.style.backgroundColor = "#091120";
  } else {
    tag_btn.style.backgroundColor = "#FFFFFF";
  }
});

lightBtn.addEventListener("click", () => {
  html.classList.remove("dark");
  localStorage.setItem("theme", "light");
  if (html.classList.contains("dark")) {
    tag_btn.style.backgroundColor = "#091120";
  } else {
    tag_btn.style.backgroundColor = "#FFFFFF";
  }
});

if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
}
