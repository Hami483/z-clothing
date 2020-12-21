import React from 'react'

import {Link} from 'react-router-dom'

import {createStructuredSelector} from 'reselect'

import {ReactComponent as Logo} from '../../assets/crown.svg'

import {auth} from '../../firebase/firebase.utils'

import {connect} from 'react-redux'

import '../header/header.styles.scss'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import {selectCartHidden} from '../../redux/cart/cart.selectors'

import {selectCurrentUser} from '../../redux/user/user.selectors'


const Header = ({currentUser,hidden}) => {
    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo/>
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'> Shop </Link>
                <Link  className='option' to='contact'> Contact </Link>
                {currentUser ? <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> : <Link className='option' to='/signin'>SIGN IN</Link>}
                        <CartIcon/>
            </div>
            {hidden?null:<CartDropdown/>}

    
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
currentUser:selectCurrentUser,
hidden:selectCartHidden
})

export default connect(mapStateToProps)(Header)