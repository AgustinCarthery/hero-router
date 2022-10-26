import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../src/auth/context/AuthContext"
import { Navbar } from "../../../src/ui/components"


const mockedUseNavigate = jest.fn();

//mockeo solo lo necesario y uso spread en el general 
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en Navbar', () => {

  const contextValue = {
    logged: true,
    user: {
      id: 123,
      name: 'Test'
    },
    logout: jest.fn()
  }

  beforeEach(() => jest.clearAllMocks())

  test('Debe mostrar el nombre del usuario logeado', () => {

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Test')).toBeTruthy()
  })

  test('Debe de llamar el logout y navigate cuando se hace click en el boton', () => {

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const logoutBtn = screen.getByRole('button')
    fireEvent.click(logoutBtn)

    expect(contextValue.logout).toHaveBeenCalled()
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { 'replace': true })
  })
})