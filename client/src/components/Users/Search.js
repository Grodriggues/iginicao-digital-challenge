import React from 'react'

const Search = () => {
  return (
    <div id="search" className="container">
      <form>
          <input type="text" placeholder="Pesquise alguns de seus usuários"/>
          <button type="submit" className="button"><i className="fas fa-search"></i></button>
      </form>
    </div>
  )
}

export default Search