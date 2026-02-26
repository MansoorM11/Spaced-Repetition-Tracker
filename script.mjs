// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./common.mjs";
import { getData, addData, clearData } from "./storage.mjs";

const selectUser = document.getElementById("select-user");
const topicForm = document.getElementById("topic-form");
const topicInput = document.getElementById("topic-name");
const dateInput = document.getElementById("start-date");
const message = document.getElementById("message");
const agendaList = document.getElementById("agenda-list");

function populateDropDownList() {
  const users = getUserIds();
  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = userId;
    selectUser.appendChild(option);
  });
}

selectUser.addEventListener("change", changeUserSelection);

function changeUserSelection() {
  const selectedUser = selectUser.value;
  agendaList.innerHTML = "";
  message.textContent = "";

  if (!selectedUser) {
    message.textContent = "Please select a user";
    return;
  }
  renderAgenda(selectedUser);
}

topicForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const selectedUser = selectUser.value;
  const topicName = topicInput.value.trim();
  const startDate = dateInput.value;

  message.textContent = "";
  agendaList.innerHTML = "";

  if (!selectedUser) {
    message.textContent = "Please select a user before adding a topic.";
    return;
  }

  if (!topicName || !startDate) {
    message.textContent = "Please fill in all fields.";
    return;
  }

  const revisionDates = calculateRevisionDates(startDate);
  const revisionObject = revisionDates.map((date) => ({
    topic: topicName,
    date: date,
  }));

  addData(selectedUser, revisionObject);
  renderAgenda(selectedUser);
}

export function calculateRevisionDates(startDateString) {
  const baseDate = new Date(startDateString + "T00:00:00Z");
  const revisionDates = [];

  function addDays(days) {
    const date = new Date(baseDate);
    date.setUTCDate(date.getUTCDate() + days);
    return date;
  }

  function addMonths(months) {
    const date = new Date(baseDate);
    date.setUTCMonth(date.getUTCMonth() + months);
    return date;
  }

  revisionDates.push(addDays(7));
  revisionDates.push(addMonths(1));
  revisionDates.push(addMonths(3));
  revisionDates.push(addMonths(6));
  revisionDates.push(addMonths(12));

  return revisionDates.map((date) => date.toISOString().split("T")[0]);
}

function sortByDate(dateObject) {
  return dateObject.slice().sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });
}

function renderAgenda(userId) {
  agendaList.innerHTML = "";
  message.textContent = "";

  const storedDate = getData(userId) || [];

  if (storedDate.length === 0) {
    message.textContent = `No agenda for user ${userId}`;
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  const futureRevision = storedDate.filter((item) => {
    return item.date >= today;
  });

  if (futureRevision.length === 0) {
    message.textContent = "No upcoming revision.";
    return;
  }
  const sortedRevision = sortByDate(futureRevision);

  sortedRevision.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.topic}, ${item.date}`;
    agendaList.appendChild(li);
  });
}

window.onload = function () {
  populateDropDownList();
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;
  //  document.querySelector("body").innerText = `There are ${users.length} users`;
};
