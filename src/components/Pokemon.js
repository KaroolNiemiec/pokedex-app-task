import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Pokemon = ({ id, image, name, type }) => {
    return(
      <>
        <Card className='my-3 p-3 rounded text-center shadow mb-5 bg-white'>
          <Link to={`/pokemon/${id}`}>
              <Card.Img  style={{ width: '8rem'}} src={image} variant='top' />
          </Link>
          <Card.Body className={`${type} rounded text-white mt-2` }>
            <Link to={`/pokemon/${id}`} className='link-name'>
              <Card.Title as='div'>
                <strong>
                  #{id} {name.charAt(0).toUpperCase() + name.slice(1)}
                </strong>
              </Card.Title>
            </Link>
          </Card.Body>
          <small>Type: {type}</small>
        </Card>
      </>
    )
}
export default Pokemon