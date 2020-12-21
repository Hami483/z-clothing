import React,{Component} from 'react'
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from "./pages/shoppage/shoppage.component";
import CheckoutPage from './pages/checkout/checkout.component'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {createStructuredSelector} from 'reselect'

import {auth,createUserProfileDocument} from './firebase/firebase.utils'

import Header from './components/header/header.component'

import  SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { setCurrentUser } from './redux/user/user.actions';

import {selectCurrentUser} from './redux/user/user.selectors'



class App extends Component {
 
  unsubscribeFromAuth=null;

  componentDidMount(){

    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          // console.log(snapShot.data())
          setCurrentUser({
            currentUser:{
              id:snapShot.id,
              ...snapShot.data()
            }
          })

          // console.log(this.state)
        })
      }

      else{
      setCurrentUser(userAuth)
      }



      // this.setState({currentUser:user})

      // createUserProfileDocument(user)

      // console.log(user)
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route exact path='/checkout' component={CheckoutPage}/>
        <Route exact path='/signin' render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUp/>}/>
      </Switch>
      
    </div>
  );
}
}

const mapStateToProps =  createStructuredSelector({

    currentUser:selectCurrentUser
  
})

const mapDispatchToProps = (dispatch) => {

    return  {
      setCurrentUser: user => dispatch(setCurrentUser(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);