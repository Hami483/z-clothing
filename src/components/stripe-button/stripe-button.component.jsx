import React from 'react'

import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51I0QwZETI4NziUThL9TPoqUtRPsQT3M2ZL07j7E0BfsvBVryvLOdWY2kGfuzjAKUTk42bdnWII5AJzH3Wtk9XGDn00HguVneUr'


    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }

    return(
        <StripeCheckout
            label='Pay Now'
            name='Z-Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton