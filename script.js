const modalContainer = document.querySelector(".modal-cont") ;
const addBtn         = document.querySelector(".add-btn") ;
const colorModal     = document.querySelectorAll(".color_modal")
const textArea       = document.querySelector(".textarea-cont")
const mainContainer  = document.querySelector(".main-cont")
const uid = new ShortUniqueId({ length: 4 });


// when you click on add bytn ticket modal should appeared for ticket creation 
addBtn.addEventListener("click" , function(){
    // console.log("clicked") ;
    modalContainer.style.display= "flex" ;
})

// 1 => remove yello strip from color_modal and apply at modal_cont   which is clicked
for(let i=0; i<colorModal.length; i++){
    const currentColor = colorModal[i];
    // console.log(currentColor)

    currentColor.addEventListener("click",function(e){
        for(let j=0; j< colorModal.length; j++){
            colorModal[j].classList.remove("selected");
        }
        // whole element selected
        const color=e.target; 
        // console.log(color)
        // from whole element i want to remove from classList
        color.classList.add("selected");

    })
}

textArea.addEventListener("keypress",function(e){
    
    if(e.key == "Enter"){
        modalContainer.style.display= "none" ;
        const task = textArea.value ;
        // console.log(text) ;
        
        const currentColor = modalContainer.querySelector(".selected") ;
        const taskColor    = currentColor.getAttribute("currColor") ;
        console.log(task,taskColor) ;
        if(task){
            createTicket( task, taskColor);
        } 
        textArea.value ="" ;
    }
})

function createTicket( task, taskColor ){
    const ticketContainer = document.createElement("div") ;
    ticketContainer.setAttribute("class","ticket-cont") ;
    ticketContainer.innerHTML = 
    `<div class="ticket-color ${taskColor} "></div>
    <div class="ticket-id">${uid.rnd()}</div>
    <div class="ticket-area">${task}</div>
    <i class="fa-solid fa-lock lock"></i>` ;
    mainContainer.appendChild(ticketContainer) ;
    
}