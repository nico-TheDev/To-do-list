const todoList = document.querySelector(".todo"),
    cover = document.querySelector(".note__cover"),
    strap = document.querySelector(".note__strap"),
    addBtn = document.querySelector(".add-chore"),
    clearBtn = document.querySelector(".clear"),
    inputField = document.querySelector(".chore");

let choreList;
// COVER INTERACTIONS
cover.addEventListener("click", function () {
    if (strap.className.includes("flipRight")) {
        cover.classList.toggle("flipLeft");
        document.querySelector(".note__coverTitle").classList.toggle("fade");
    } else {
        alert("Remove the strap first , you dummy!");
    }
});
strap.addEventListener("click", function () {
    strap.classList.toggle("flipRight");
});

// FUNCTIONS

function addToList(chore) {
    // get the input value from the input
    addToStorage(chore);

    if (chore === "") {
        const message = document.createElement("li");
        message.className = "warning";
        message.textContent = "Please fill the input field";
        todoList.insertAdjacentElement("beforebegin", message);
        setTimeout(() => {
            message.remove();
        }, 2000);
    } else {
        // add it to the list
        const markup = `
    <li class="item">
        <span class="theNote">${chore}</span>
        <div class="buttons">
            <button class="check"><i class="fas fa-check"></i></button>
            <button class="delete"><i class="fas fa-times"></i></button>
            <button class="edit"><i class="fas fa-pen"></i></button>
        </div>
    </li>
 `;

        todoList.insertAdjacentHTML("beforeend", markup);
        //clear the input
        inputField.value = "";
    }
}

function checkChore(chore) {
    chore.classList.toggle("finish");
    chore.parentNode.classList.toggle("goLast");
}

function removeChore(chore) {
    chore.remove();
    choreList.forEach((el,i) =>{
        if (el === chore.firstElementChild.textContent){
            choreList.splice(i,1);
            saveToStorage();
        }
    });
}

function editChore(chore) {
    chore.remove();
    inputField.value = chore.firstElementChild.textContent;
    choreList.forEach((el,i) =>{
        if (el === chore.firstElementChild.textContent){
            choreList.splice(i,1);
            saveToStorage();
        }
    });
}

function clearList() {
    todoList.innerHTML = "";
    localStorage.removeItem('choreList');
}

function restoreList() {
    console.log("Dom LOADED");
    if (localStorage.getItem("choreList")) {
        choreList = JSON.parse(localStorage.getItem("choreList"));
        choreList.forEach((chore) => {
            const markup = `
            <li class="item">
                <span class="theNote">${chore}</span>
                <div class="buttons">
                    <button class="check"><i class="fas fa-check"></i></button>
                    <button class="delete"><i class="fas fa-times"></i></button>
                    <button class="edit"><i class="fas fa-pen"></i></button>
                </div>
            </li>
         `;

            todoList.insertAdjacentHTML("beforeend", markup);
        });
    } else {
        choreList = [];
    }
}

function addToStorage(chore) {
    choreList.push(chore);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem("choreList", JSON.stringify(choreList));
}

// EVENT LISTENERS for the list

addBtn.addEventListener("click", ()=>{
    if(inputField.value !== '' ) addToList(inputField.value);
});
window.addEventListener("keypress", (e) => {
    if (e.key === 13 || e.which === 13) {
        addToList(inputField.value);
    }
});
clearBtn.addEventListener("click", clearList);

document.addEventListener("DOMContentLoaded", restoreList);

todoList.addEventListener("click", (e) => {
    if (e.target.closest(".check")) {
        const chore = e.target.parentNode.previousElementSibling;
        checkChore(chore);
    } else if (e.target.closest(".delete")) {
        const chore = e.target.parentNode.parentNode;
        removeChore(chore);
    } else if (e.target.closest(".edit")) {
        const chore = e.target.parentNode.parentNode;
        editChore(chore);
    }
});
