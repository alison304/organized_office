import React, { useEffect, useState } from "react";
import { createUser, getOneUser, updateUser } from "../../services/user.service";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Button } from '@mui/material';
import DatePicker from "react-datepicker";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import "./register.css"

const RegisterComponent = () => {
    const dateFormat = 'yyyy-MM-dd';
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        lastName: '',
        age: '',
        phone: '',
        address: '',
        country: '',
        birthdate: new Date(),
        email: '',
        password: '',
        password2: '',
    });
    const [errorsResponse, setErrorsResponse] = useState();

    const getOneUserFromService = async () => {
        try {
            const data = await getOneUser(id);
            data.data.user.birthdate = new Date(data.data.user.birthdate);
            data.data.user.password2 = data.data.user.password;
            setUser(data.data.user);
        } catch (error) {
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
            .required("Required lastname"),
        age: Yup.string()
            .min(1, 'Too Short!')
            .required("Required age"),
        phone: Yup.string()
            .min(8, 'Too Short!')
            .required("Required phone"),
        address: Yup.string()
            .optional(),
        country: Yup.string()
            .min(3, 'Too Short!')
            .required("Required country"),
        email: Yup.string()
            .min(3, 'Too Short!')
            .required("Required email"),
        password: Yup.string()
            .min(3, 'Too Short!')
            .required("Required password"),
        password2: Yup.string()
            .min(3, 'Too Short!')
            .required("Required confirm password"),
    });

    const sendNewUser = async (user) => {
        try {
            console.log("sendNewUser", user);
            if (user.password !== user.password2) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Las passwords no son iguales"
                });
            }
            else {
                id ? await updateUser(id, user)
                    .then((response) => {
                        Swal.fire({
                            icon: 'success',
                            title: response.data.message,
                            text: "",
                        }).then((result) => {
                            navigate("/user/list");
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    :
                    await createUser(user)
                        .then((response) => {
                            Swal.fire({
                                icon: 'success',
                                title: response.data.message,
                                text: "",
                            }).then((result) => {
                                navigate("/login");
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
            }
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.error,
            });
            setErrorsResponse(error.response.data.error.errors);
        }
    };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Box display="flex" justifyContent="flex-start">
                        <img className='img-regist' src="https://images.pexels.com/photos/4144832/pexels-photo-4144832.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="imagen" />
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Formik
                        enableReinitialize={true}
                        initialValues={user}
                        validationSchema={userSchema}
                        onSubmit={sendNewUser}
                    >
                        {({ values, errors, touched, setFieldValue }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <div className='registro'>
                                            <img className='img-reg' src="/assets/Logo/Organized_office.png" alt="logo" width="250" height="100" onClick={() => navigate("/")} />
                                            {id ? (
                                                <h3>Actualizar {user.name}</h3>
                                            ) : (
                                                <h3>Registrar</h3>
                                            )}
                                            <br />
                                            <p>📋Vamos a preparar todo para que pueda verificar su cuenta personal y comenzar a configurar su perfil</p>
                                            <h3>Datos personales</h3>
                                            <br />
                                            <div>
                                                <label htmlFor="name">Nombres</label>
                                                <Field name="name" />
                                                {errors.name && touched.name ? (
                                                    <div>{errors.name}</div>
                                                ) : null}
                                                {errorsResponse?.name && (
                                                    <div>{errorsResponse.name.message}</div>
                                                )}
                                            </div>
                                            <br />
                                            <div>
                                                <label htmlFor="lastName">Apellidos</label>
                                                <Field name="lastName" />
                                                {errors.lastName && touched.lastName ? (
                                                    <div>{errors.lastName}</div>
                                                ) : null}
                                                {errorsResponse?.lastName && (
                                                    <div>{errorsResponse.lastName.message}</div>
                                                )}
                                            </div>
                                            <br />
                                            <div>
                                                <label htmlFor="age">Edad</label>
                                                <Field name="age" />
                                                {errors.age && touched.age ? (
                                                    <div>{errors.age}</div>
                                                ) : null}
                                                {errorsResponse?.age && (
                                                    <div>{errorsResponse.age.message}</div>
                                                )}
                                            </div>
                                            <br />
                                            <div>
                                                <label htmlFor="">Celular</label><br />
                                                <Field name="phone" />
                                                {errors.phone && touched.phone ? (
                                                    <div>{errors.phone}</div>
                                                ) : null}
                                                {errorsResponse?.phone && (
                                                    <div>{errorsResponse.phone.message}</div>
                                                )}
                                            </div>
                                            <br />
                                            <div>
                                                <label htmlFor="address">Dirección </label><br />
                                                <Field name="address" />
                                                {errors.address && touched.address ? (
                                                    <div>{errors.address}</div>
                                                ) : null}
                                                {errorsResponse?.address && (
                                                    <div>{errorsResponse.address.message}</div>
                                                )}
                                            </div>
                                            <br />
                                            <div>
                                                <label htmlFor="country">País </label><br />
                                                <Field name="country" />
                                                {errors.country && touched.country ? (
                                                    <div>{errors.country}</div>
                                                ) : null}
                                                {errorsResponse?.country && (
                                                    <div>{errorsResponse.country.message}</div>
                                                )}
                                            </div>
                                            <br />
                                            <div>
                                                <label htmlFor="fecha">Fecha de nacimiento</label>
                                                <DatePicker
                                                    selected={values.birthdate}
                                                    name="birthdate"
                                                    dateFormat={dateFormat}
                                                    onChange={(date) => setFieldValue("birthdate", date)}
                                                />
                                            </div>
                                        </div>
                                        <div className='users'>
                                            <h3>Datos de usuario</h3>
                                            <br />
                                            <div>
                                                <label htmlFor="email">Email</label>
                                                <Field name="email" />
                                                {errors.email && touched.email ? (
                                                    <div>{errors.email}</div>
                                                ) : null}
                                                {errorsResponse?.email && (
                                                    <div>{errorsResponse.email.message}</div>
                                                )}
                                            </div>
                                            <br />
                                            <div>
                                                <label htmlFor="password">Password</label>
                                                <Field name="password" />
                                                {errors.password && touched.password ? (
                                                    <div>{errors.password}</div>
                                                ) : null}
                                                {errorsResponse?.password && (
                                                    <div>{errorsResponse.password.message}</div>
                                                )}
                                            </div>
                                            <br />
                                            <div>
                                                <label htmlFor="password2">Confirmar Password</label>
                                                <Field name="password2" />
                                                {errors.password2 && touched.password2 ? (
                                                    <div>{errors.password2}</div>
                                                ) : null}
                                                {errorsResponse?.password2 && (
                                                    <div>{errorsResponse.password2.message}</div>
                                                )}
                                            </div>
                                            <br />
                                            <br />
                                            {id ? (
                                                <Button variant="contained" sx={{ backgroundColor: '#9575cd', display: 'inline', fontSize: 14 }} className='btn-c' type="submit">Actualizar</Button>

                                            ) : (
                                                <Button variant="contained" sx={{ backgroundColor: '#9575cd', display: 'inline', fontSize: 14 }} className='btn-c' type="submit">Registrar</Button>
                                            )}

                                            <br /><br />
                                            {id ? (
                                                <Button variant="contained" sx={{ backgroundColor: '#9575cd', display: 'inline', fontSize: 14 }} className='btn-c' onClick={() => navigate("/user/list")}>Cancel</Button>

                                            ) : (
                                                <Button variant="contained" sx={{ backgroundColor: '#9575cd', display: 'inline', fontSize: 14 }} className='btn-c' onClick={() => navigate("/")}>Cancel</Button>
                                            )}

                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default RegisterComponent;