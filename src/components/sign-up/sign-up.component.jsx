import React from 'react'

import FormInput from '../form-input/form-input'
import CustomButton from '../custom-button/custom-button.component'

import {auth,createUserProfileDocument} from '../../firebase/firebase.utils'

import '../sign-up/sign-up.styles.scss'

class SignUp extends React.Component{
    constructor(){
        super()

        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handleSubmit = async event => {
        event.preventDefault()

           const {displayName,email,password,confirmPassword} = this.state

           if(password !== confirmPassword){
               alert('password dont match')
               return;
           }

           try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password)

            await createUserProfileDocument(user,{displayName})

            this.setState({
                 displayName:'',
            email:'',
            password:'',
            confirmPassword:''
            })
           }catch(error){
               console.log(error)

           }
    }

    handleChange = e => {
        const{name,value} = e.target
        this.setState({[name] : value})
    }
     render(){
         const {displayName,email,password,confirmPassword} = this.state
        return(
            <div className='sign-up'>
                <h1 className="title">I don't have an account </h1>
                <span>Sign Up With Your Email and Password</span>

                <form onSubmit={this.handleSubmit} className='sign-up-form'>
                    <FormInput type='text' name='displayName' value={displayName} label='Display Name' onChange={this.handleChange}/>
                    <FormInput type='email' name='email' value={email} label='Email' onChange={this.handleChange}/>
                    <FormInput type='password' name='password' value={password} label='Password' onChange={this.handleChange}/>
                    <FormInput type='password' name='confirmPassword' value={confirmPassword} label='Confirm Password' onChange={this.handleChange}/>

                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>

            </div>
        )
    }
}

export default SignUp