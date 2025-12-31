export function applyCompletedUI(card) {
  const title = card.querySelector(".title-task");
  const desc = card.querySelector(".task-description");
  const priorityText = card.querySelector(".priority-text");
  const priorityBg = card.querySelector(".priority-bg");
  const completeBox = card.querySelector(".complete-box");

  title.classList.add("line-through", "text-gray-500");
  if (desc) desc.classList.add("hidden");
  if (priorityText) priorityText.classList.add("hidden");
  if (priorityBg) priorityBg.classList.add("bg-transparent");

  completeBox.innerHTML =
    '<img src="/src/assets/icons/tick-square.svg" class="w-5 h-5" />';
}