//will get the value from the input
//if add -> will add a list item to the ul with all the properties 
// clone the firstElement with all the elements inside it 
//display the first element inside it as none as a reference
//if clear . the text content of the list will be an empty string

// check, if checked the text decoration will be strike through
//delete , remove the current item
//edit, remove the current item , 
//get the value of that item 
//set the value of the input to that value


// GET THE ELEMENTS FROM THE DOCUMENT OBJECT

let todoList,item,itemContent,addItem,clearAll,crossItem,deleteItem,editItem,inputContent,clonedItem;

let cover,strap;

todoList = document.querySelector('.todo');
item = document.querySelector('.item');
itemContent = document.querySelector('.theNote');
inputContent = document.querySelector('.chore');

addItem = document.querySelector('.add-chore');
clearAll = document.querySelector('.clear');
// update every time
crossItem =  document.getElementsByClassName('check');
deleteItem = document.getElementsByClassName('delete');
editItem = document.getElementsByClassName('edit');

cover = document.querySelector('.note__cover');
strap = document.querySelector('.note__strap')

// RESETS
alert('click the book');
todoList.firstElementChild.style.display = 'none';
update();

// FUNCTIONS

function addListItem(){

    if(inputContent.value === ''){
        alert('Empty Input');
    }
    else{
        update();
        clonedItem = item.cloneNode(true);
        clonedItem.firstElementChild.textContent = inputContent.value;
        clonedItem.style.display = 'grid';
        todoList.appendChild(clonedItem);
        console.log(clonedItem);
        console.log(inputContent.value);
    
        inputContent.value = '';
        crossItem =  document.getElementsByClassName('check');
        update();
    }
   
}


function clearAllItem(){
    todoList.innerHTML = '';
}


// BUTTON EVENTS

addItem.addEventListener('click',addListItem);
clearAll.addEventListener('click',clearAllItem);

function update(){

    for(let i = 0; i < crossItem.length;i++){
        crossItem[i].addEventListener('click',function(){
            console.log(crossItem[i].parentElement.parentElement);
            crossItem[i].parentElement.parentElement.classList.toggle('goLast');
            crossItem[i].parentElement.previousElementSibling.classList.toggle('finish');
        });
        
            
    };


    for(let i = 0; i < deleteItem.length; i++){
        deleteItem[i].addEventListener('click',function(){
            deleteItem[i].parentElement.parentElement.style.display = 'none';
        });
    }

    for(let i = 0; i < editItem.length; i++){
        editItem[i].addEventListener('click',function(){
            inputContent.value = editItem[i].parentElement.previousElementSibling.textContent;
            editItem[i].parentElement.parentElement.style.display = 'none';
        });
    }

}


cover.addEventListener('click',function(){

    if (strap.className.includes('flipRight')){
        cover.classList.toggle('flipLeft');
        document.querySelector('.note__coverTitle').classList.toggle('fade');
    }
    else{
        alert('Remove the strap first , you dummy!');
    }

});
strap.addEventListener('click',function(){
    strap.classList.toggle('flipRight');
});