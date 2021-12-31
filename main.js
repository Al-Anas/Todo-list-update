// DOM 
var form=document.querySelector(".task-form");
var taskInput=document.querySelector("#new-task");
var taskList=document.querySelector("ul");
var clear=document.querySelector("#clear-task");
var filter=document.querySelector("#filter-task");


// EventListener 
form.addEventListener("submit",addTask);
taskList.addEventListener("click",removeTask);
clear.addEventListener("click",removeAll);
filter.addEventListener("keyup",filterTask);
document.addEventListener("DOMContentLoaded",getTasks)


// Functions 
// getTasks
function getTasks()
{
    var tasks;
    if(localStorage.getItem('tasks')===null)
     {
       tasks=[];
     }
    else
     {
       tasks=JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.forEach(function(item){
        var li=document.createElement("li");
        var link=document.createElement("a");
        link.setAttribute("href","#");
        link.innerHTML="x";
        li.appendChild(document.createTextNode(item +" "));
        li.appendChild(link);
        taskList.appendChild(li);

     })
}
// filterTask
function filterTask(e)
{
    var text=filter.value.toLowerCase();
    var lists=document.querySelectorAll("li");
 

    lists.forEach(task=>{
       var item=task.firstChild.textContent.toLocaleLowerCase();
       if(item.indexOf(text)>-1)
       {
           task.style.display="block";
       }
       else{
           task.style.display="none";
       }
    });

}

// addTask
function addTask(e)
 {
    e.preventDefault();
    if(taskInput.value==="")
     {
        alert("Add a task");
     }
    else
     {
       var li=document.createElement("li");
       var link=document.createElement("a");
       link.setAttribute("href","#");
       link.innerHTML="x";
       li.appendChild(document.createTextNode(taskInput.value +" "));
       li.appendChild(link);
       taskList.appendChild(li);
       storeTask(taskInput.value);
       taskInput.value="";
     }




 }
// storeTask
function storeTask(task)
{
    var tasks;
    if(localStorage.getItem('tasks')===null)
     {
       tasks=[];
     }
    else
     {
       tasks=JSON.parse(localStorage.getItem('tasks'));
     }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//  removeTask
 function removeTask(e)
 {
    if(e.target.hasAttribute("href"))
    {
        if(confirm("Are you sure"))
        {
            var el=e.target.parentElement;
            el.remove();
            removeFormLs(e.target.parentElement);
        }
    }
 }
//  removeFormLs
function removeFormLs(task)
{
    // var text=task.childNodes[0].textContent;
    var text=task.firstChild.textContent.trim();
    var tasks;
    if(localStorage.getItem('tasks')===null)
    {
      tasks=[];
    }
   else
    {
      tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(item,index){
        if(item==text)
        {
            tasks.splice(index,1);
        }
 
     });
    localStorage.setItem('tasks',JSON.stringify(tasks));
   
}

//remove
function removeAll(e){
     taskList.innerHTML="";
     localStorage.clear();
}

