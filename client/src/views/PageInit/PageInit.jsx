import { Button, Box, Grid } from '@mui/material';
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import "./style.css"

const PageInit = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="banner">
                <img className='img-ban' src="/assets/Logo/Organized_office.png" alt="logo" width="250" height="100" />
                <h2 className="title">Bienvenido a</h2>
                <h2 className="title">Organized Office💻</h2>
                <br/>
                <h5 className="text">Gestor de usuarios interactiva</h5>
            </div>
            <br/>
            <div className="md">
                <p className='opcion'>Por favor seleccione una opción</p>
                <br/>
                <Box display="flex" justifyContent="center">
                    <Button 
                    style={{
                        borderRadius: 8,
                        border: "1px solid #9575cd",
                        backgroundColor: "#9575cd",
                        color: "#FFFFFF",
                        boxShadow: "5px 6px 7px black",
                        padding: "5px 55px",
                        fontSize: "16px",
                        marginRight: "30px"
                    }} 
                    onClick={() => navigate(`/register`)}>Regístrate</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button 
                    style={{
                        borderRadius: 8,
                        border: "1px solid #9575cd",
                        backgroundColor: "#9575cd",
                        color: "#FFFFFF",
                        boxShadow: "5px 6px 7px black",
                        padding: "5px 55px",
                        fontSize: "16px",
                        marginRight: "30px"
                    }} 
                    onClick={() => navigate(`/login`)}>Inicio de sesión</Button>
                </Box>
            </div>
            <div className='footer'>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        bgcolor: "#eeeeee",
                    }}
                >
                <Grid container>
                    <Grid item md={6} xs={12}>
                        <div className="logo-container">
                            <img
                            src="/assets/Logo/Organized_office.png"
                            alt="Foto Logo"
                            width="170"
                            height="100"
                            />
                        </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                            <div className="social-container">
                            <br/>
                            <h3 className='text-1'>Contacta con nosotros</h3>

                            <a href="https://www.youtube.com/" className="social">
                                <FontAwesomeIcon icon={faYoutube} size="2x" />
                            </a>
                            <a href="https://www.facebook.com/" className="social">
                                <FontAwesomeIcon icon={faFacebook} size="2x" />
                            </a>
                            <a href="https://www.twitter.com/" className="social">
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </a>
                            <a href="https://www.instagram.com/" className="social">
                                <FontAwesomeIcon icon={faInstagram} size="2x" />
                            </a>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    </div>
    )
}

export default PageInit