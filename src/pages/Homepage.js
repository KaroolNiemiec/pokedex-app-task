import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap'
import Pokemon from '../components/Pokemon'
import Loader from "../components/Loader";
import Header from "../components/Header";

const Homepage = () => {
  const [pokemons, setPokemons] = useState([])
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("")

  const searchChange = (e) => {
    setFilter(e.target.value)
  }

  const getPokemonList = async () => {
    const res = await fetch(nextUrl)
    const data = await res.json()

    setLoading(false);
    setNextUrl(data.next)

    data.results.forEach(async pokemon => {
      const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      const pokemonData = await pokemonRes.json()
      setPokemons(currentList => [...currentList, pokemonData])
    })
  }

  useEffect(() => {
    getPokemonList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <form class="d-flex" onChange={searchChange} >
        <input class="form-control me-2" type="search" placeholder="Search Pokemon" aria-label="Search" />
      </form>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {pokemons.map(({ name, id, sprites, types }, index) => (
            name.includes(filter) &&
            <Col key={name} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Pokemon
                key={index}
                id={id}
                image={sprites.other.dream_world.front_default}
                name={name}
                type={types[0].type.name}
              />
            </Col>
          ))}
        </Row>
      )}
      <button className='load-more' onClick={() => getPokemonList()}>Load more</button>
    </>
  )
}
export default Homepage