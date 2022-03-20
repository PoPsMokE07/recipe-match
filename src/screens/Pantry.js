import React, { useState, useReducer, useEffect } from "react";
import "./Pantry.css";
import FoodItem from "../components/FoodItem";
import AddItem from "../components/AddItem";
import { updatePantry } from "../cloud/firebase";
import cooking from "../assets/images/cooking.svg";
function Pantry(props) {
  const [foodItems, setFoodItems] = useState(props.pantry);
  const [chosenFoods, setChosenFoods] = useState([]);
  const [creatingItem, setCreatingItem] = useState(false);
  const [user, setUser] = useState(props.user);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [modalActive, setModalActive] = useState('modal')

  const [url, setURL] = useState()
  const [imageURL, setImageURL] = useState()
  const [label, setLabel] = useState()
 
  
  console.log(foodItems);
  useEffect(() => {
    updatePantry(props.user, foodItems);
  }, [foodItems]);

  useEffect(() => {
    console.log(chosenFoods);
  }, [chosenFoods]);

  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }

  function deleteFoodItem(name) {
    var tempArray = arrayRemove(foodItems, name);
    setFoodItems(tempArray);
  }
  function addFoodItem(name) {
    var tempArray = foodItems;

    tempArray.push(name);
    updatePantry(props.user, tempArray);
    setFoodItems(tempArray);
    console.log(name);
  }

  function addChosenFood(name, decision) {
    if (decision) {
      var tempArray = chosenFoods;
      tempArray.push(name);
      setChosenFoods(tempArray);
      console.log(tempArray);
    } else {
      var tempArray = arrayRemove(chosenFoods, name);
      setChosenFoods(tempArray);
      console.log(tempArray);
    }
  }
  useEffect(()=>{

  },[label])
  function generateRecipe(){
      var query = chosenFoods.toString()
      const apiRequest = 'https://api.edamam.com/api/recipes/v2?type=public&q=' + query +'&app_id=4d8debb1&app_key=071fd6b71d301bf4bad91df48232d202&ingr=3-5&cuisineType=American&imageSize=SMALL&random=false&field=uri&field=label&field=image&field=url'
       console.log(apiRequest)
       const recipeInfo = fetch(apiRequest).then((response)=>{
          console.log(response)
           return response.json()
          
       }).then((recipe)=>{

setURL(recipe.hits[0].recipe.url)
setImageURL(recipe.hits[0].recipe.image)
setLabel(recipe.hits[0].recipe.label)
setModalActive('modal is-active')
console.log(recipe.hits[0].recipe.label)




       })
console.log(query)

  }

  const foodItemList = foodItems.map((item, index) => {
    console.log(item);

    return (
      <FoodItem
        addChosenFood={addChosenFood}
        index={index}
        delete={deleteFoodItem}
        key={index}
        name={item}
      />
    );
  });

  return (
    <div className="main container">
      <div className="pantry-level level">
        <div className="level-item has-text-centered">
          <div class="pantry-column column">
            <figure class="pantry-image image">
              <img src={cooking} />
            </figure>
            <h2 class="title is-2">{user.displayName}'s Pantry</h2>

            {/* <button name="createButton" className="buttonDiv pantry-addItem-button button is-success is-rounded is-medium">Add an Item</button> */}

            {foodItemList}
            {creatingItem ? (
              <AddItem
                addFoodItem={addFoodItem}
                setCreatingItem={setCreatingItem}
              />
            ) : (
                <div>
              <div className="pantry-add">
                <a
                  onClick={() => {
                    setCreatingItem(true);
                  }}
                  class="button login-button"
                >
                  <strong className="is-primary login-strong">
                    Add an item
                  </strong>
                </a>
              </div>


               <div className="pantry-generate">
               <a
                 onClick={() => {
                   generateRecipe();
                 }}
                 class="button pantry-button"
               >
                 <strong className="is-primary pantry-strong">
                   Generate Recipe!
                 </strong>
               </a>
             </div>
             </div>
            )}
            
          </div>
        </div>
      </div>



      <div class={modalActive}>
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{label}</p>
      <button onClick={()=>{
          setModalActive('modal')
      }} class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <img className='pantry-imgRecipe' src={imageURL}/>
      
    </section>
    <footer class="modal-card-foot">
        <a className='pantry-viewRecipe'target="_blank" href={url}>
      <button onClick={url} className="button pantry-buttonRecipe">View Recipe</button>
      </a>
      <button onClick={()=>{
          setModalActive('modal')
      }} class="button">Cancel</button>
    </footer>
  </div>
</div>




























    </div>
  );
}

export default Pantry;
