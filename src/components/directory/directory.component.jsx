import React from 'react'

import {connect} from 'react-redux'

import MenuItem from '../menu-item/menu-item.component'

import {selectDirectorySections} from '../../redux/directory/directory.selectors'
import {createStructuredSelector} from 'reselect'


import '../directory/directory.styles.scss'

const Directory = ({sections}) => {
   


        return(
               <div className='directory-menu'>
                   {sections.map(section => {
                       const {title,id,imageUrl,size,linkUrl}= section
                       return(
                           <MenuItem title={title} size={size} imageUrl={imageUrl} key={id} linkUrl={linkUrl}/>
                       )
                   })}
               </div>
        )

}

const mapStateToProps = createStructuredSelector({
  sections:selectDirectorySections
})

export default connect(mapStateToProps)(Directory)
