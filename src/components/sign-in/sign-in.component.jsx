import React from 'react'

import '../sign-in/sign-in.styles.scss'

import FormInput from '../form-input/form-input'

import CustomButton from '../custom-button/custom-button.component'

import {auth,signInWithGoogle} from '../../firebase/firebase.utils'


class SignIn extends React.Component{
    constructor(){
        super()

        this.state={
            email:'',
            password:''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const {email,password} = this.state

        try{
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({
                email:'',
                password:''
            })
        }catch(error){
            console.log(error)
        }


        this.setState({email:'',password:''})

    }

    handleChange = e => {
        const {value,name} = e.target

        this.setState({[name]:value})
    }

    render(){
        return(
            <div className='sign-in'>
                <h1>I have already have an account</h1>
                <span>Sign in with your Email and Password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name='email' value={this.state.email} handleChange={this.handleChange} label='email' />
                    
                    <FormInput type="password" name='password' value={this.state.password} handleChange={this.handleChange} label='password' />
                  
                  <div className="buttons">
                         <CustomButton type="submit">
                        Sign In
                    </CustomButton>
                  
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                        Sign In With Google
                    </CustomButton>
                  </div>
                   
                </form>
            </div>
        )
    }
}

export default SignIn