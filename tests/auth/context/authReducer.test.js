import { authReducer, types } from "../../../src/auth"

describe('Pruebas en authReducer', () => { 
  test('Debe de retornar el estado por defecto', () => {
    
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false })
  });

  test('Debe de (login) llamar el login autenticar y establecer el user', () => { 
    const action = {
      type: types.login, payload: {
        id: 123,
        name: 'Test'
      }
    }

    const state = authReducer({ logged: false }, action);

    expect(state).toEqual({ logged: true, user: action.payload })
  })
  
  test('Debe de (logout borrar el name del usuario y logged en false', () => { 
    
    const initState = { logged: true, user: { id: 123, name: 'Test' } }
    
    const action = {
      type: types.logout
    }

    const state = authReducer(initState, action);

    expect(state).toEqual({ logged: false, user: null })
   })
 })