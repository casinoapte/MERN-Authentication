import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import './styles.css'

export default function Header() {

    const { userData, setUserData } = useContext(UserContext)

    const history = useHistory()

    const home = () => {
        history.push("/")
    }

    const login = () => {
        history.push("/login")
    }

    const register = () => {
        history.push("/register")

    }

    return (

        <div className="header">

            {/* Conditional Rendering Based on JWT TOKEN - REMEMBER THIS  */}

            <nav className="row">
                {
                    userData.user ?
                        (
                            <div className="col-4 offset-10">

                                <button onClick={home}>Home</button>
                                <button>Log out</button>
                            </div>

                        ) : (
                            <>


                                <div className="col-4 offset-10">

                                    <button onClick={home}>Home</button>

                                    <button onClick={login}>Login</button>
                                    <button onClick={register}>Register</button>

                                </div>

                            </>
                        )}
            </nav>

        </div >
    )
}
