var nameInput = document.getElementById("siteName");
var urlInput = document.getElementById("siteUrl");
var clearX = document.getElementById("xMark");
var myRow = document.getElementById("tableContent");
var myAlert = document.getElementById("alert");

// Data Storage
var siteList;
if (localStorage.getItem("k-site") == null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem("k-site"));
  display(siteList);
}

// Validation
function validateInputs(element) {
  var regex = {
    siteName: /^\w{3,}$/,
    siteUrl:
      /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/gi,
  };

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

// Add Site
function addSite() {
  if (
    nameInput.classList.contains("is-valid") &&
    urlInput.classList.contains("is-valid")
  ) {
    var site = {
      siteName: nameInput.value,
      url: urlInput.value,
    };
    siteList.push(site);
    localStorage.setItem("k-site", JSON.stringify(siteList));
    display(siteList);
    clearForm();
  } else {
    myAlert.classList.add("d-block");
    myAlert.classList.remove("d-none");
  }
}

// Clear Alert
clearX.addEventListener("click", function () {
  myAlert.classList.remove("d-block");
  myAlert.classList.add("d-none");
});

// Clear Form
function clearForm() {
  nameInput.value = null;
  urlInput.value = null;
  nameInput.classList.remove("is-valid");
  urlInput.classList.remove("is-valid");
}

// Display Sites
function display(arr) {
  var cartona = "";
  for (var i = 0; i < arr.length; i++) {
    var index = i + 1;
    cartona += `<tr>
            <td>${index}</td>
            <td>${arr[i].siteName}</td>
            <td>
              <a class="btn btn-success" target="_blank" href="${arr[i].url}">
                <i class="fa-solid fa-eye me-2"></i>Visit
              </a>
            </td>
            <td>
              <button onclick="deleteSite(${i})" class="btn btn-danger">
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </button>
            </td>
          </tr>`;
  }
  myRow.innerHTML = cartona;
}

// Delete Site
function deleteSite(deletedIndex) {
  siteList.splice(deletedIndex, 1);
  localStorage.setItem("k-site", JSON.stringify(siteList));
  display(siteList);
}
