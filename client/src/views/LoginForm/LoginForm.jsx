import React, { useState } from "react";
import { login } from "../../services/user.service";
import { useNavigate, Link } from "react-router-dom";
import { Box, Grid } from '@mui/material';
import Swal from "sweetalert2";
import "./style-login.css"

export default function LoginComponent(props){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const submitForm = (event) => {
        event.preventDefault();
        login(user, password)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                navigate("/user_list")
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.error,
                });
            })

    }

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box display="flex" justifyContent="flex-start">
                        <img className="img" src="https://images.pexels.com/photos/1181325/pexels-photo-1181325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="login" />
                    </Box>
                </Grid>
                <Grid item xs={8}>
                <div className="login">
                <br/>
                <div>
                    <img className='img-ban' src="/assets/Logo/Organized_office.png" alt="logo" width="250" height="100" onClick={() => navigate("/")}/>
                    <h1>INICIO DE SESION</h1>
                    <br/>
                    <h3>Hola👋</h3>
                    <p>Ingrese la información que ingresó al registrarse.</p>
                    <br/>
                    <form onSubmit={submitForm}>
                        <div>
                            <label htmlFor="email" className="email">Email</label><br/>
                            <input type="text" name="user" value={user} onChange={(e)=> {
                                setUser(e.target.value);
                            }} />
                        </div>
                        <br/>
                        <div>
                            <label htmlFor="password" className="passw">Password</label><br/>
                            <input type="password" name="password" value={password} onChange={(e)=> {
                                setPassword(e.target.value);
                            }}/>
                            <br/><br/><br/>
                            <Link to={"/register"}>Si no tienes una cuenta. Regístrate aquí👇</Link>
                        </div>
                        <br/><br/>
                        <input className="btn-sub" type="submit" value="INICIAR SESION" />
                    </form>
                </div>
            </div>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}