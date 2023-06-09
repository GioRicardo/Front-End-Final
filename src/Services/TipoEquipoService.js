import { axiosConfig } from "../Configuration/AxiosConfig";

// obtener los tipos de equipos
const getTipoEquipos = (estado) => {
    return axiosConfig.get('tipoequipos?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


// crear tipo equipo
const createTipoEquipo = (data = {}) => {
    return axiosConfig.post('tipoequipos', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const editarTipoEquipo = (tipoId, data) => {
  return axiosConfig.put(`tipoequipos?id=${tipoId}`, data, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}

// opcional
const borrarTipoEquipo = (tipoId) => {
  return axiosConfig.delete(`tipoequipos/${tipoId}`, {}, {
   headers: {
      'Content-type': 'application/json'
   }
  });
}


export {
    getTipoEquipos,
    createTipoEquipo,
    editarTipoEquipo,
    borrarTipoEquipo
}