import React, {useState} from 'react';
import './FoodItem.css';


function FoodItem(props){
const[style, setStyle] = useState({textDecoration: "line-through"})
const [checked, setCheck] = useState(false)

function selfDestruct(){

  props.delete(props.name)

}

function addLine(){
  props.addChosenFood(props.name, !checked)
setCheck((prevState)=>!prevState)

}




return(
<div class="box">
  <article>
    
    
  <div class= "level is-mobile">
    <div class="level-right">
  <label class="checkbox level-item">
  <input checked={checked} onChange={addLine} type="checkbox" className="check is-large"/>
  <p  class="tag is-rounded description subtitle is-4">{props.name}</p>
</label>
</div>
<div class="level-left">
<a onClick={selfDestruct} class="delete is-large level-item"></a>
</div>
  </div>
  
  </article>
</div>


)


}


export default FoodItem