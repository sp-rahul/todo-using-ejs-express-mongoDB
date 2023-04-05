
function handleEditTitle(id){
const lis = document.getElementById('myUL').getElementsByTagName('span');
window.location.href = "/"+id;
    
    // Loop through the NodeList object. 
  //  for (let i = 0; i <= lis.length - 1; i++) {
    //	console.log (lis[i].innerText );
  //  }


handleUpdateTodo(id)

  
 }

function handleDeleteTodo(id) {
console.log("id:", id ) ;
 console.log("delete clicked")
 fetch(id, {
  method: "DELETE"
 })
 window.location.href = "/"
}








  
  function handleDelete(id){
  console.log("Called for id")
  
    // Call function when show dialog btn is clicked
    var overlayme = document.getElementById("dialog-container");
	
	overlayme.innerHTML  = `
	<div class="popup">
    <p>Are you sure want to delete the Todo?? </p>
    <div class="text-right">
      <button class="dialog-btn btn-primary" onclick=confirm('${id}')> ok </button>
      <button class="dialog-btn btn-cancel" onclick=cancel()> cancel </button>
    </div>
  </div>
	`
	
   document.getElementById("btn-show-dialog").onclick = show_dialog(id, overlayme);
  }
  
function show_dialog(id, overlayme) {
    overlayme.style.display = "block";
	
}

function confirm(id) {
    console.log("Called for delete func")
	console.log(id);
     handleDeleteTodo(id)
	var overlayme = document.getElementById("dialog-container");
    overlayme.style.display = "none";
}



function cancel() { 
var overlayme = document.getElementById("dialog-container");
    overlayme.style.display = "none";
}