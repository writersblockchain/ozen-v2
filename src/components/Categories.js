// import { useRef, useEffect, useState } from 'react'
// import {ReactComponent as PlayIcon} from '../svgs/play.svg'
import Playlists from './Playlists'

const Categories = () => {

    const dataCategories = [
        {
          id: 1,
          name: 'DJ DAO',
          tagline: 'Music curated by DAOs',
        },
        {
          id: 2,
          name: 'Listen & Earn',
          tagline: 'Listen to promoted music',
        },
        {
          id: 3,
          name: 'Listen & Spend',
          tagline: 'Spend tokens to listen to exclusive content',
        },
      ]





return (
    <div>
      {dataCategories.map((category, id) => (
        <div className="cardsWrap" key={id}>
          <h2>{category.name}</h2>
          {/* <span className="seeAll">SEE ALL</span> */}
          <p className="subText">{category.tagline}</p>
          <Playlists category_id={category.id} />
        </div>
      ))}
    </div>
   



    
)
}
export default Categories;
