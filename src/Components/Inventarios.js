import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { createInventario, getInventarios, editarInventario } from '../Services/InventarioService'
import Modal from './ui/ModalInventarios'
import ModalEdit from './ui/ModalEditInventarios'

const camposVacios = {
  _id: '',
  serial: '',
  modelo: '',
  descripcion: '',
  foto: '',
  color: '',
  fechaCompra: '',
  precio: '',
  usuario: '',
  marca: '',
  estadoEquipo: '',
  tipoEquipo: ''
}
export default function Inventarios() {
const title= 'Inventario'
const [inventarios, setInventarios] = useState([])
const [query, setQuery] = useState(true)
const [loading, setLoading] = useState(true)
const [error, setError]= useState(false)
const [inventario, setInventario] = useState(
  camposVacios
)
const [loadingSave, setLoadingSave] = useState(false)

const [id, setId] = useState('')

const listInventarios = async () => {
  try{
    setError(false)
    setLoading(true)
    const { data } = await getInventarios(query)
    console.log(data)
    setInventarios(data)
    
    setTimeout(() => {
      setLoading(false)
    }, 500)
    
  }catch(e){
    console.log(e)
    setError(true)
    setLoading(false)
  }
}

useEffect(() => {
  listInventarios()
}, [query])

const changeSwitch = () => {
  setQuery(!query)
}

const handleChange = (e) => {
  setInventario({
    ...inventario,
    [e.target.name]: e.target.value
  })
}

const saveInventario = async () => {
  try{
    const inventarioActualizado = { 
      serial: inventario.serial,
      modelo: inventario.modelo,
      descripcion: inventario.descripcion,
      foto: inventario.foto,
      color: inventario.color,
      fechaCompra: inventario.fechaCompra,
      precio: inventario.precio,
      usuario: {_id:inventario.usuario},
      marca: {_id:inventario.marca},
      estadoEquipo: {_id:inventario.estadoEquipo},
      tipoEquipo: {_id:inventario.tipoEquipo}
    }
    console.log(inventarioActualizado)

    setError(false)
    setLoadingSave(true)
    const response = await createInventario(inventarioActualizado)
    console.log(response)
    setInventario(camposVacios)
    alert("Inventario creado correctamente")
    listInventarios()
    setTimeout(() => {
      setLoadingSave(false)
    }, 500)
  }catch(e){
    alert (e.response.data.msg)
    console.log(e)
    setError(true)
    setLoadingSave(false)
  }
}

const closeModal = () => {
  setInventario(camposVacios)
  if(id)setId('')
}

const selectInventario = (evt) => {
  evt.preventDefault()
  setId(evt.target.id)
  const tEq = inventarios.filter(inventario => inventario._id === evt.target.id)
  setInventario({...tEq[0]})
}

const editInventario = async () => {
  try{

    const inventarioActualizado = { 
      _id: inventario._id,
      serial: inventario.serial,
      modelo: inventario.modelo,
      descripcion: inventario.descripcion,
      foto: inventario.foto,
      color: inventario.color,
      fechaCompra: inventario.fechaCompra,
      precio: inventario.precio,
      usuario: {_id:inventario.usuario},
      marca: {_id:inventario.marca},
      estadoEquipo: {_id:inventario.estadoEquipo},
      tipoEquipo: {_id:inventario.tipoEquipo}
    }

    console.log(inventarioActualizado)
    console.log(id)

    setError(false)
    setLoadingSave(true)
    const response = await editarInventario(id, inventarioActualizado)
    console.log(response)
    setInventario(camposVacios)
    listInventarios()
    setTimeout(() => {
      setLoadingSave(false)
    }, 500)
  }catch(e){
    console.log(e)
    setError(true)
    setLoadingSave(false)
  }
}

  return (
    <>
        <ModalEdit 
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          inventario={inventario}
          loadingSave={loadingSave}
          editInventario={editInventario}
        />
        <Modal 
          title={title}
          closeModal={closeModal}
          handleChange={handleChange}
          inventario={inventario}
          loadingSave={loadingSave}
          saveInventario={saveInventario}
        />
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              role="switch" 
              id="flexSwitchCheckChecked"
              checked={query}
              onChange={changeSwitch}
            />
            <label 
              className="form-check-label" 
              htmlFor="flexSwitchCheckChecked"
            >
              Activos
            </label>
          </div>
          <button 
            type="button" 
            className="btn btn-outline-primary"
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal" 
            data-bs-whatever="@mdo"
          >
            Agregar
          </button>
          {
            error && 
            (
              <div className="alert alert-danger" role="alert">
                Ha ocurrido un error
              </div>
            )
          }
        
        <div className='table-responsive'>
          {
            loading 
            ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )
            :
            (
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Serial</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Color</th>
                  <th scope="col">Fecha Compra</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Estado Equipo</th>
                  <th scope="col">Tipo Equipo</th>
                  {/* <th scope="col">Fecha Creacion</th>
                  <th scope="col">Fecha Actualizacion</th> */}
                </tr>
              </thead>
              <tbody>
                {
                  Object.values (inventarios).map((inventario, index) => {
                    return (
                      <tr key={inventario._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{inventario.serial}</td>
                        <td>{inventario.modelo}</td>
                        <td>{inventario.descripcion}</td>
                        <td>{inventario.foto}</td>
                        <td>{inventario.color}</td>
                        <td>{inventario.fechaCompra}</td>
                        <td>{inventario.precio}</td>
                        <td>{inventario.usuario}</td>
                        <td>{inventario.marca}</td>
                        <td>{inventario.estadoEquipo}</td>
                        {/* <td>{inventario.estado ? 'Activo' : 'Inactivo'}</td> */}
                        <td>{inventario.tipoEquipo}</td>
                        {/* <td>{dayjs(inventario.fechaCreacion).format('YYYY-MM-DD')}</td>
                        <td>{dayjs(inventario.fechaActualizacion).format('YYYY-MM-DD')}</td> */}
                        <td>
                          <button 
                            onClick={selectInventario}
                            type="button" 
                            className="btn btn-success"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModalEdit" 
                            id={inventario._id}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
              </table>
            )
          }
        </div>
    </>
  )
}