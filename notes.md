## Problem Statement
We have to create frontend only digital Kanban Board


## Functionalities
* Tickets:
    * create new task
    * Update a new task
    * Delete task
    * Filter on the basis of color
* Ticket Creation
    * type out the task
    * select an inital color
    * auto generate id for Task
    * hide that popup
* make ticket servive the Reload and browser/tab closure 
    * Local Strorage   



task and its solution

1=task : when i click on plus btn modal appeasred and desappeared
solution : display non and display block

2=task : when i click on the plus bydefault color should be red 
solution :add selected class to red and remove and add class to class 

3=task:- how to remove yellow border from color and plasce it on where i clicked
solution - 
1.event listener to container
2.loop on color modal which loop and how we remove the yellow class selected from class
3.how we get which one is clicked and how we add selected class  

4=task how can i toggle the lock and unlock and how do i know this clicked on which ticket
Solution 
    - how do i know -> we apply addEvnetListener to lock of every tickert     created when we create a ticket 
    - how can i toggle -> remove classname and add class name
5
task = how to make tickcet editable when i click on the lock to unllock
solu = textArea.setAttribute("contentEditable",true) ;

main task

1 => remove yello strip from color_modal and apply at modal_cont   which is clicked 