import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from 'react-bootstrap'
import Pokemon from '../components/Pokemon'
import Loader from "../components/Loader";

const Homepage = () => {

  const[pokemon, setPokemon] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [loading, setLoading] = useState(true)


  const getPokemonList = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoading(false);
    setLoadMore(data.next)

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setPokemon( currentList => [...currentList, data])
        
      })
    }
    createPokemonObject(data.results)
    console.log(data)
  }

 useEffect(() => {
  getPokemonList()
 }, [])


    return(
        <>
          {loading ? (
            <Loader/>
          ): (
            <Row>
              {pokemon.map( (pokemonStats, index) => (
                <Col key={pokemonStats.name} xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Pokemon
                    key={index}
                    id={pokemonStats.id}
                    image={pokemonStats.sprites.other.dream_world.front_default}
                    name={pokemonStats.name}
                    type={pokemonStats.types[0].type.name}
                  />
              </Col>
              ))}
            </Row>
          )
          }
          <button className='load-more' onClick={() => getPokemonList()}>Load more</button>
        </>
    )
}
export default Homepage