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
} from "./ui/elements.js";

import { renderTasks } from "../create_task/ui/render_tasks.js";

let storing_task = [];
let id_container = 0;
let edit_counter = 0;
const tasks = [];
const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1,
};

let currentPriority = 0;

updatePersianDate();

export function createTask({ id, title, description, priority }) {
  const clone = taskTemplate.content.cloneNode(true);
  const card = clone.querySelector(".task-card");
  const title_task = clone.querySelector(".title-task");
  const desc = clone.querySelector(".task-description");
  const priorityText = clone.querySelector(".priority-text");
  const line = clone.querySelector(".line");
  const priority_bg = clone.querySelector(".priority-bg");
  const three_dots = clone.querySelector(".three-dots");
  const trash_edit = clone.querySelector(".trash-edit");
  const edit = clone.querySelector(".edit");

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

  three_dots.addEventListener("click", () => {
    trash_edit.classList.toggle("hidden");
  });
  edit.addEventListener("click", () => {
    const realIndex = tasks.findIndex((t) => t.id === id);
    id_container = id;
    tasks.splice(realIndex, 1);

    card.remove();
    edit_counter = 1;
    task_name.value = title;
    task_description.value = description;
    adding_task_btn.style.opacity = 1;
    section5.classList.remove("hidden");
    taskForm.classList.remove("hidden");

    if (priority === "low") {
      priority = "پایین";
      tag_btn.style.backgroundColor = "#C3FFF1";
      tag_btn.style.color = "#11A483";
    } else if (priority === "medium") {
      priority = "متوسط";
      tag_btn.style.backgroundColor = "#FFEFD6";
      tag_btn.style.color = "#FFAF37";
    } else if (priority === "high") {
      priority = "بالا";
      tag_btn.style.backgroundColor = "#FFE2DB";
      tag_btn.style.color = "#FF5F37";
    }
    tag_span.classList.add("hidden");
    tag_img.classList.add("hidden");
    tag_img_down.classList.add("hidden");
    span1.textContent = priority;
    currentPriority = 1;
    div_span.classList.remove("hidden");
  });

  return clone;
}

adding_duty_btn.addEventListener("click", () => {
  edit_counter = 0;
  adding_task_btn.style.opacity = 0.4;
  section5.classList.remove("hidden");
  taskForm.classList.remove("hidden");
  div_duty_btn.classList.toggle("hidden");
  section4.classList.add("hidden");
});

close_btn.addEventListener("click", () => {
  if (edit_counter === 1) {
    let index = storing_task.findIndex((t) => t.id === id_container);

    tasks.push({
      id: crypto.randomUUID(),
      title: storing_task[index].title,
      description: storing_task[index].description,
      priority: storing_task[index].priority,
    });

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
  tag_btn.style.backgroundColor = "#FFFFFF";
  tag_btn.style.color = "#AFAEB2";
  span1.textContent = "";
  currentPriority = 0;
  if (tasks.length===0)
  {
    section4.classList.remove("hidden")
    check_list_img.classList.remove("hidden");
  checklist_texts_child2.classList.remove("hidden");
  checklist_texts_child1.classList.remove("hidden");
  }
  task_name.value = "";
  task_description.value = "";
  edit_counter = 0;
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
    tag_btn.style.backgroundColor = "#FFFFFF";
    tag_btn.style.color = "#AFAEB2";
    span1.textContent = "";
    currentPriority = 0;
    adding_task_btn.style.opacity = 0.4;
  }
  edit_counter = 0;
});
