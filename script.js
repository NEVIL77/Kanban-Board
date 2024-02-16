const modalContainer = document.querySelector(".modal-cont") ;
const addBtn         = document.querySelector(".add-btn") ;
const colorModal     = document.querySelectorAll(".color_modal")
const textArea       = document.querySelector(".textarea-cont")


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
    }
})