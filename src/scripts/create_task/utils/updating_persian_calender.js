
const dateElement = document.getElementById("date");
const dateElement1 = document.getElementById("date1");

export function updatePersianDate() {
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
  dateElement1.textContent = `امروز، ${weekday} ${day} ${month} ${year}`;
}

