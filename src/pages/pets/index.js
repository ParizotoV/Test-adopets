import React, { useState, useEffect } from 'react';
import { usePetsApi } from '../../api';
import { Redirect } from 'react-router-dom';

const Pets = () => {

  const { postData, postPets } = usePetsApi('pet/search')

  const [pets, setPets] = useState({
    search: {
      _fields: [
        "id",
        "uuid",
        "custom_code",
        "name",
        "specie_id",
        "breed_primary_id",
        "price",
        "created_date",
        "status_key",
        "branch_id",
        "payment_model_key",
        "sex_key",
        "size_key",
        "age_key"
      ],
      specie: {
        with: {
          _fields: [
            "id",
            "name"
          ]
        }
      },
      breed_primary: {
        with: {
          _fields: [
            "id",
            "name"
          ]
        }
      },
      branch: {
        with: {
          uuid: "ef71cadf-fa9b-4c8b-a1a8-0e31e784c3ff",
          _fields: [
            "id",
            "uuid"
          ]
        }
      }
    },
    "options": {
      "page": 1,
      "limit": 5,
      "sort": []
    }
  })

  const getPets = async() => {
    await postPets(pets);
  }

  if (localStorage.getItem('token') === null) {
    return <Redirect to='/login' />
  }

  return (
    <h1>Pets</h1>
  )

}

export default Pets;