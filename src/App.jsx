import React, { useState, useEffect } from 'react'
import { store } from "./firebaseconfig";



function App() {

  const [nombre, setNombre] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState([])

  useEffect(() => {
    const getUser= async ()=>{
      const{docs}= await store.collection('agenda').get()
      const nuevoArray=docs.map(item=>({id:item.id, ...item.data()}))
      setUser(nuevoArray)
    }
    getUser()
    
  }, [])

  const setUsuarios = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('El campo nombre esta vacío')
    }
    else if (!phone.trim()) {
      setError('El campo Phone esta vacío')
    }
    const usuario = {
      nombre: nombre,
      telefono: phone
    }
    try {
      const data = await store.collection('agenda').add(usuario)
      const{docs}= await store.collection('agenda').get()
      const nuevoArray=docs.map(item=>({id:item.id, ...item.data()}))
      setUser(nuevoArray)
      // alert('Tarea Añadida')

    } catch (err) {
      console.log(err);
    }
    setNombre('')
    setPhone('')

  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Registro de Contactos</h2>
          <form onSubmit={setUsuarios} className='form-group'>

            <input
              value={nombre}
              onChange={(e) => { setNombre(e.target.value) }}
              className='form-control'
              type="text"
              placeholder='Introduce el  nombre'
            />

            <input
              value={phone}
              onChange={(e) => { setPhone(e.target.value) }}
              className='form-control mt-3'
              type="text"
              placeholder='Introduce el  numero'
            />

            <input
              type="submit"
              value="Registrar Usuario"
              className='btn btn-dark btn-block mt-3'
            />
          </form>
          {
            error ?
              (<div>
                <p>{error}</p>
              </div>
              )
              :
              (
                <span></span>
              )
          }
        </div>
        <div className="col">
          <h2>Lista de Contactos</h2>
          {
            user.length !==0 ?
            user.map(item =>(
              <li key={item.id}>{item.nombre}---{item.telefono}</li>
            ))
            :
            (
              <span>Opps, Aún no tienes usuaios</span>
            )

          }
        </div>
      </div>
    </div>
  );
}

export default App;
