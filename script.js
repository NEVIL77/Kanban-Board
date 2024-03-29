const modalContainer = document.querySelector(".modal-cont") ;
const addBtn         = document.querySelector(".add-btn") ;
const colorModal     = document.querySelectorAll(".color_modal") ;
const textArea       = document.querySelector(".textarea-cont") ;
const mainContainer  = document.querySelector(".main-cont") ;
const headerColor    = document.querySelectorAll(".toolbox-priority-cont .color") ;
const uid = new ShortUniqueId({ length: 4 }); 


const colorArray = ["red","blue","green","purple"];

let ticketArr =  [] ;

if( localStorage.getItem("ticketArr") !== null ){
    let strticketArr = localStorage.getItem("ticketArr") ;
    ticketArr = JSON.parse(strticketArr);

    for(let i=0; i<ticketArr.length; i++){
        let currTicket = ticketArr[i] ;
        let id = currTicket.id ;
        let taskColor = currTicket.color ;
        let task = currTicket.task ;
        
        createTicket( task, taskColor, id, true )
    }
}

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
        
        const currentColor = modalContainer.querySelector(".selected") ;
        const taskColor    = currentColor.getAttribute("currColor") ;
        if(task){
            createTicket( task, taskColor);
        } 
        textArea.value ="" ;
    }
})

const deleteBtn = document.querySelector(".remove-btn") ;
let isDelete = false ;

deleteBtn.addEventListener( "click", function(){
    console.log("delete btn clicked")

    // false -> true flase on black  
    if(isDelete){ 
        isDelete = !isDelete
        deleteBtn.style.background="" ;
    }
    else{
        isDelete = !isDelete
        deleteBtn.style.background="red" ;
    }
})
    // filterColor Selection

for(let i=0; i<headerColor.length; i++){
    let currHeadColor= headerColor[i] ;

    currHeadColor.addEventListener("click",function(e){
        console.log("single clicked")
        for(let j=0; j<headerColor.length; j++){
            headerColor[j].classList.remove("selected")
        }
        
        currHeadColor.classList.add("selected")

        const currentCol= colorArray[i]
        // console.log(currentCol)

        filterTickets(currentCol) ;
    })
    
}

    // filter tickets

function filterTickets(currentCol){
    // console.log("calledddd")
    const ticketArr = mainContainer.querySelectorAll(".ticket-cont") ;
    // console.log(ticketArr)


    for(let i=0; i< ticketArr.length; i++){
        let cTicket = ticketArr[i] ;
        console.log(cTicket)
        
        let isPresent = cTicket.querySelector(`.${currentCol}`) ;
        console.log(isPresent)


        if(isPresent == null) {
            cTicket.style.display="none" ;
        }
        else{
            cTicket.style.display="block" ;
        }
    }
}

    // Remove Ticket Filter
    
for (let i = 0; i < headerColor.length; i++) {
    let c = headerColor[i];

    c.addEventListener("dblclick", function () {
        console.log("Double-clicked on header color element");
    });
}

    // ticket creation

function createTicket( task, taskColor , Lid, flag ){

    let id ;
    if(flag){
        id = Lid ;
    }
    else{
        id =uid.rnd() ;
    }
    const ticketContainer = document.createElement("div") ;
    ticketContainer.setAttribute("class","ticket-cont") ;
    ticketContainer.innerHTML = 
    `<div class="ticket-color ${taskColor} "></div>
    <div class="ticket-id">${id}</div>
    <div class="ticket-area">${task}</div>
    <i class="fa-solid fa-lock lock"></i>` ;
    mainContainer.appendChild(ticketContainer) ;

    const lockButton = ticketContainer.querySelector(".lock")
    const textArea   = ticketContainer.querySelector(".ticket-area") 
    const ticketColor= ticketContainer.querySelector(".ticket-color")
    const ticketCont = ticketContainer.querySelector(".ticket-cont")
    
    handleLock(lockButton,textArea,id) ;
    handleColorChange(ticketColor,id);
    handleDelete(ticketContainer,id) ;

    if(flag == undefined){
        let ticketObj = {
            id : id,
            color : taskColor,
            task : task,
        }
        ticketArr.push(ticketObj) ;
        setLocalStorage() ;
    }   
}

// handle lock

function handleLock(lockButton, textArea, id){
    lockButton.addEventListener("click",function(){
        const isLock = lockButton.classList.contains("fa-lock") ;
        
        if(isLock){
            lockButton.classList.remove("fa-lock") ;
            lockButton.classList.add("fa-lock-open") ;
            textArea.setAttribute("contentEditable",true) ;
        }
        else{
            lockButton.classList.remove("fa-lock-open") ;
            lockButton.classList.add("fa-lock") ;
            textArea.setAttribute("contentEditable",false) ;
        }
        const newTask = textArea.innerText ;
        console.log(newTask) ;
            
        for(let i=0; i<ticketArr.length; i++){
            let currObj =ticketArr[i] ;
            console.log(currObj) ;  
                
            if(currObj.id == id ){
                ticketArr[i].task = newTask ;
                setLocalStorage();
            }
        }
    })
}

    // modalcolor change
    
function handleColorChange(ticketColor,id){
    
    ticketColor.addEventListener("click",function(){
        
        const cColor= ticketColor.classList[1];
        const currentIndex = colorArray.indexOf(cColor);
        const nextIndex = ( currentIndex+1 ) % colorArray.length ; 
        const nextColor = colorArray[nextIndex] ;

        ticketColor.classList.remove(cColor) ;
        ticketColor.classList.add(nextColor) ;

        for(let i=0; i<ticketArr.length; i++){
            let currObj = ticketArr[i] ;
            
            if(currObj.id == id ){
                let index= i ;
                ticketArr[i].color = nextColor ;
                setLocalStorage() ;
            }
        }
        
    })
}

    // delete 

function handleDelete(ticketContainer, id){
    
    ticketContainer.addEventListener("click",function(){
        if(isDelete){
            const ask =confirm("Do you want to delete") ;
            if(ask){
                ticketContainer.remove() ;
            }
            let allTicket = localStorage.getItem("ticketArr") ;
            // console.log( typeof(allTicket) ) 
            allTicket = JSON.parse(allTicket)
            // console.log(typeof(allTicket)) 

            for(let i =0; i< allTicket.length; i++){
                let cObj = allTicket[i] ;
                if(cObj.id == id){
                    let index = i ;
                    allTicket.splice(index,1);
                    // console.log(allTicket);
                    ticketArr = allTicket ;
                    setLocalStorage() ;
                }
            }
        }
    })
}

    // setLocalStorage Function

function setLocalStorage(){

    let strticketArr = JSON.stringify(ticketArr) ; 
    localStorage.setItem("ticketArr" , strticketArr) ;
}







// isDelete && ticketContainer.addEventListener( "click" , function(){
    //     console.log("ticket is clieddddddd")
            //     mainContainer.removeChild(ticketContainer) ;
            // })
            
            // deleteBtn.addEventListener("click",function(){
            //     deleteBtn.style.background="red" ;
                
            //     isDelete && ticketContainer.addEventListener("click",function(){
            //         mainContainer.removeChild(ticketContainer) ;
            //         deleteBtn.style.background="" ;
                    
            //     })
            // })