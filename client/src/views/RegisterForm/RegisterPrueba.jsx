import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { createUser, updateUser } from "../../services/user.service";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid } from '@mui/material';
import { DatePicker, Space } from 'antd';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { getOneUser } from "../../services/user.service";
import Swal from "sweetalert2";
import "./register.css"

const RegisterComponent = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        lastName: '',
        age: '',
        phone: '',
        address: '',
        country: '',
        picked: '',
        email: '',
        password: '',
        password2: '',
    });
    const [errorsResponse, setErrorsResponse] = useState();
    const dateFormat = 'YYYY/MM/DD';

    // const [password, setPassword] = useState("");
    // const [password2, setPassword2] = useState("");
    // const [name, setName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [age, setAge] = useState("");
    // const [phone, setPhone] = useState("");
    // const [address, setAddress] = useState("");
    // const [country, setCountry] = useState("");
    // const [gender, setGender] = useState("");
    // const [email, setEmail] = useState("");
    // const [value, setValue] = React.useState(null);

    const getOneUserFromService = async () => {
        try {
            const data = await getOneUser(id);
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
            .min(3, 'Too Short!')
            .required("Required age"),
        phone: Yup.string()
            .min(8, 'Too Short!')
            .required("Required phone"),
        address: Yup.string()
            .optional(),
        country: Yup.string()
            .min(3, 'Too Short!')
            .required("Required country"),
        picked: Yup.string()
            .optional(),
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
                            navigate("/login");
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    :
                    await createUser(user);
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



    // const submitForm = (event) => {
    //     event.preventDefault();
    //     let newUser = {
    //         name: name,
    //         lastName: lastName,
    //         age: Number(age),
    //         phone: phone,
    //         address: address,
    //         country: country,
    //         email: email,
    //         password: password
    //     }
    //     if (password !== password2)
    //         console.log("Las passwords no son iguales")
    //     else {
    //         console.log(newUser);            
    //         register(newUser)
    //             .then((response) => {
    //                 console.log(response.data);
    //                 Swal.fire({
    //                     icon: 'success',
    //                     title: response.data.message,
    //                     text: "",
    //                 }).then((result) => {
    //                     navigate("/login");
    //                   });
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //     }
    // }



    // const RegisterForm = () => {
    //     const { id } = useParams();
    //     const [register, setRegister] = useState({
    //         name: '',
    //         lastName: '',
    //         age: '',
    //         phone: '',
    //         email: '',
    //         password: '',
    //         password2: '',
    //     });
    //     const [errorsResponse, setErrorsResponse] = useState();



    return (
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="flex-start">
              <img className='img' src="https://images.pexels.com/photos/4144832/pexels-photo-4144832.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="imagen" />
          </Box>
        </Grid>
        <Formik
          enableReinitialize
          initialValues={user}
          validationSchema={userSchema}
          onSubmit={sendNewUser} >
          {({
             values,
             errors,
             touched,
             handleChange,
             handleBlur,
             handleSubmit,
             isSubmitting,
           }) => (
          <Form>
            <Grid item xs={5}>
              <div className='registro'>
                  <img className='img-reg' src="/assets/Logo/Organized_office.png" alt="logo" width="250" height="100" onClick={() => navigate("/")} />
                  <h1>REGISTRO</h1>
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
                    <input className='submit' type="submit" value="Registrar" /><br /><br />
                    <button className='cancel' onClick={() => navigate("/")}>Cancel</button>
                </div>
              </div>
            </Grid>
              <div className="part-2">
                  <div>
                      <label id="my-radio-group">Genero</label>
                      <div role="group" aria-labelledby="my-radio-group">
                          <label>
                              <Field type="radio" name="picked" value="Fem" />
                              Femenino
                          </label>
                          <label>
                              <Field type="radio" name="picked" value="Masc" />
                              Masculino
                          </label>
                      </div>
                  </div>
                  <div>
                      <label htmlFor="fecha">Fecha de nacimiento</label>
                      <Space direction="vertical" size={12}>
                          <DatePicker format={dateFormat} />
                      </Space>
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
              </div>
            <Grid item xs={5}>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    )
}

export default RegisterComponent;


<DatePicker format={dateFormat} value={state.date} onChange={(date, dateString) => {console.log(date, dateString) }} />

