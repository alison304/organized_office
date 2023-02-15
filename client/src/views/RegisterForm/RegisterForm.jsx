import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { register } from "../../services/user.service";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid } from '@mui/material';
import { DatePicker, Space } from 'antd';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { getOneUser } from "../../services/user.service";
import Swal from "sweetalert2";
import "./register.css"

export default function RegisterComponent(props){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [value, setValue] = React.useState(null);
    const dateFormat = 'YYYY/MM/DD';


    const submitForm = (event) => {
        event.preventDefault();
        let newUser = {
            name: name,
            lastName: lastName,
            age: Number(age),
            phone: phone,
            address: address,
            country: country,
            email: email,
            password: password
        }
        if (password !== password2)
            console.log("Las passwords no son iguales")
        else {
            console.log(newUser);            
            register(newUser)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    const { id } = useParams();
    const navigate = useNavigate();
    const RegisterForm = () => {
        const { id } = useParams();
        const [register, setRegister] = useState({
            name: '',
            lastName: '',
            age: '',
            phone: '',
            email: '',
            password: '',
            password2: '',
        });
        const [errorsResponse, setErrorsResponse] = useState();
        
        const getOneUserFromService = async () => {
            try {
                const data = await getOneUser(id);
                setUser(data.data.user);
    
            } catch(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.error,
                });
            };
        };
        useEffect(() => {
            id && getOneUserFromService();
        }, [id]);
        const userSchema = Yup.object().shape({
            name: Yup.string()
                .min(3, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required name'),
            lastName: Yup.string()
                .min(3, 'Too Short!')
                .required("Required type"),
            age: Yup.string()
                .min(3, 'Too Short!')        
                .required("Required description"),            
            phone: Yup.string()
                .min(8, 'Too Short!')        
                .required("Required description"),
            address: Yup.string()
                .optional(),
            country: Yup.string()
                .min(3, 'Too Short!')        
                .required("Required description"),
            password: Yup.string()
                .min(3, 'Too Short!')        
                .required("Required description"),
            password2: Yup.string()
                .min(3, 'Too Short!')        
                .required("Required description"),
        });
    }

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Box display="flex" justifyContent="flex-start">
                        <img className='img' src="https://images.pexels.com/photos/4144832/pexels-photo-4144832.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="imagen" />
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <form onSubmit={submitForm}>                    
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <div className='registro'>
                                <img className='img-reg' src="/assets/Logo/Organized_office.png" alt="logo" width="250" height="100" onClick={() => navigate("/")}/>
                                <h1>REGISTRO</h1>
                                <br/>
                                <p>📋Vamos a preparar todo para que pueda verificar su cuenta personal y comenzar a configurar su perfil</p>
                                <h3>Datos personales</h3>
                                <br/>
                                <div>                
                                    <label htmlFor="nombres">Nombres</label>
                                    <input type="text" name="name" value={name} onChange={(e)=> {
                                        setName(e.target.value);
                                    }} />
                                </div>
                                <br/>
                                <div>
                                    <label htmlFor="apellidos">Apellidos</label>
                                    <input type="text" name="lastname" value={lastName} onChange={(e)=> {
                                        setLastName(e.target.value);
                                    }} />
                                </div>
                                <br/>
                                <div>
                                    <label htmlFor="edad">Edad</label>
                                    <input min="18" max="90" type="number" name="age" value={age} onChange={(e)=> {
                                        setAge(e.target.value);
                                    }} />
                                </div>
                                <br/>

                                <div>
                                        <label htmlFor="">Celular</label><br/>
                                        <input type="text" name="phone" value={phone} onChange={(e)=> {
                                            setPhone(e.target.value);
                                        }} />
                                    </div>
                                    <br/>
                                    <div>
                                        <label htmlFor="">Dirección </label><br/>
                                        <input type="text" name="address" value={address} onChange={(e)=> {
                                            setAddress(e.target.value);
                                        }} />
                                    </div>
                                    <br/>
                                    <div>
                                        <label htmlFor="">País </label><br/>
                                        <input type="text" name="country" value={country} onChange={(e)=> {
                                            setCountry(e.target.value);
                                        }} />
                                    </div>
                                    <br/>
                                    <div>
                                        <label htmlFor="">Género</label>
                                        <label><input type="radio" name="genero" value="M" />Femenino</label>
                                        <label><input type="radio" name="genero" value="M" />Masculino</label>
                                    </div>
                                    <br/>

                                
                                <div>
                                    <label htmlFor="fecha">Fecha de nacimiento</label>
                                    <Space direction="vertical" size={12}>
                                        <DatePicker format={dateFormat} />
                                    </Space>
                                </div>
                            </div>
                            <div className='users'>
                                <h3>Datos de usuario</h3>
                                <br/>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name="email" value={email} onChange={(e)=> {
                                        setEmail(e.target.value);
                                    }} />
                                </div>
                                <br/>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" value={password} onChange={(e)=> {
                                        setPassword(e.target.value);
                                    }}/>
                                </div>
                                <br/>
                                <div>
                                    <label htmlFor="confirm-password">Confirmar Password</label>
                                    <input type="password" name="password2" value={password2} onChange={(e)=> {
                                        setPassword2(e.target.value);
                                    }}/>
                                </div>
                                <br/>
                                <input className='submit' type="submit" value="Registrar" /><br/><br/>
                                <button className='cancel' onClick={() => navigate("/")}>Cancel</button>
                        </div>
                        </Grid>
                        <Grid item xs={6}>
                        </Grid>
                    </Grid>                   
                    </form>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}