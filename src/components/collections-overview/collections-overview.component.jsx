import React from 'react'

import {createStructuredSelector} from 'reselect'
import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors'
import {connect} from 'react-redux'

import CollectionPreview from '../collection-preview/collection-preview.component'

import '../collections-overview/collections-overview.styles.scss'

const CollectionsOverview = ({collections}) => {
    return(
        <div className="collections-overview">
            {collections.map(({id,...otherCollectionProps}) => {
                   return (
                       <CollectionPreview key={id} {...otherCollectionProps}/>
                   )
               })}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections:selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)