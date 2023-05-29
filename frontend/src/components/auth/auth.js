import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './auth.module.css'
import { useNavigate } from 'react-router-dom';
import { baseURL, config } from '../../services/consts';
import axios from 'axios';
import { SetUserIsLoggedIn } from '../../services/store/reducers/auth/actionCreator';
import { useDispatch } from 'react-redux';


export const Auth = () => {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const setField = (field, value) => {
    setForm({ ...form, [field]: value })
    if (!!errors[field]) {
      setErrors({
        ...errors, [field]: null
      })
    }
  }

  const validateForm = () => {
    const { email } = form
    const newErrors = {}
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email || !regex.test(email)) {
      newErrors.email = "Please enter correct email."
    }
    return newErrors
  }

  const handleSumbit = (event) => {
    event.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      axios.post(`${baseURL}/users/auth`, {
        email: form.email,
        password: form.password,
      }, config)
        .then(function (response) {
          localStorage.setItem("token", response.data.token)
          dispatch(SetUserIsLoggedIn())
          navigate("/people")
        })
        .catch(function (error) {
          console.log(error);
          alert(error.response.data)
        });
    }
  }

  const registration = () => {
    navigate("/registration")
  }

  return (
    <div className={styles.container}>
      <Form className="mb-3 w-50">
        <Form.Group className="mb-3w-50" controlId="formBasicEmail">
          <Form.Label>Enter your email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={((event) => { setField("email", event.target.value) })}
            isInvalid={!!errors.email} />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter your password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={((event) => { setField("password", event.target.value) })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group >
        <Form.Group className="d-flex justify-content-between">
          <Button variant="primary" onClick={handleSumbit} >
            LogIn
          </Button>
          <Button variant="" onClick={registration}>
            Registration
          </Button>
        </Form.Group>
      </Form>
      <hr />
    </div>
  );
}
