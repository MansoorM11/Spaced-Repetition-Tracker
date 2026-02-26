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
  console.log(selectedUser);
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
}

window.onload = function () {
  populateDropDownList();
  //  document.querySelector("body").innerText = `There are ${users.length} users`;
};
