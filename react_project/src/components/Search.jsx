import React from 'react'

const search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
      <div>
        <img src='Search.svg' alt='search'/>
        <input 
        type='text'
        placeholder='Search through more vehicles'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}  // event handler (e)
        />
      </div>
    </div>
  )
}

export default search
