let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li><a href= "${leads[i]}" target="_blank">  ${leads[i]}</a></li>`;
    // console.log(listItems);
  }

  ulEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    render(myLeads);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
  });
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  render(myLeads);
  inputEl.value = "";

  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  // console.log(localStorage.getItem("myLeads"));
});

deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLeads = [];
  ulEl.innerHTML = "";
});
