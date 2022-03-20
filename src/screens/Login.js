import './Login.css';
import burger from '../assets/images/burger.svg'
import breakfast from '../assets/images/breakfast.svg'
import { googleSignIn } from '../cloud/firebase';

function Login(props) {

    
   
    //
    return (
        <div className='login-mainDiv   '>
            <nav class="navbar login-navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    
      <img src={breakfast} width='112px' />
     
    
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      
    

      <a class="navbar-item">
        Documentation
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a target="_blank" href='https://devpost.com/software/recipe-match' class="navbar-item">
            Devpost
          </a>
          
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons ">
          <a onClick={()=>{
googleSignIn((user, pantry)=>{
    props.logIn(user, pantry)
})

          }} class="button login-button">
            <strong className='is-primary login-strong'>Login</strong>
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>



       <div className='container login-container1'>
<figure class="image animate__animated animate__jackInTheBox is-square login-logo" >
  <img src={burger} color='red'/>
</figure>
<h1 class="title is-1 has-text-centered">Welcome to Recipe Match</h1>
<h4 class="subtitle is-4 has-text-centered login-italic">"Creating meals straight from your pantry"</h4>
       </div>
       </div>
    );
  }
  
  export default Login;
  