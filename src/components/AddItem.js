import React, {useState} from 'react';
import './AddItem.css';
import './FoodItem.css';
function AddItem(props){

const [description, setDescription] = useState("")

function updateDescription(element){
   
setDescription(element.target.value)

}

function sendData(){
props.addFoodItem(description)
props.setCreatingItem(false)
}

return(
<div class="box">
  <article>
    
    
  <div class= "level">
  <input value={description} onChange={updateDescription} name="title" className="createInput input" type="text" placeholder="Add your food item/ingredient" />
<div class="level-left">
<i onClick={sendData} class="confirm level-item fa-3x fas fa-check-square"></i>



<i onClick={()=>{props.setCreatingItem(false)}} class="trash level-item fa-3x fas fa-trash-alt"></i>

</div>
  </div>
  
  </article>
</div>

)


}


export default AddItem