import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './registration.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { baseURL, config } from '../../services/consts';
import axios from 'axios';

export const Registration = () => {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [image, setImage] = useState([]);
  const navigate = useNavigate()

  const setField = (field, value) => {
    setForm({ ...form, [field]: value })
    if (!!errors[field]) {
      setErrors({
        ...errors, [field]: null
      })
    }
  }

  const validateForm = () => {
    const { email, password, name, gender, birthday } = form
    const newErrors = {}
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email || !regex.test(email)) {
      newErrors.email = "Please enter correct email."
    }
    if (!password || password.length < 6) {
      newErrors.password = "Please enter password longer then 5 symbols "
    }
    if (!name || name === "") {
      newErrors.name = "Please enter you name"
    }
    if (!gender || gender === "choose your gender") {
      newErrors.gender = "Please choose your gender"
    }
    if (!birthday || birthday === '') {
      newErrors.birthday = "Please enter your birthday"
    }
    if (!image.length) {
      newErrors.image = "Please choose photo"
    }
    return newErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      const img = image;
      const avatar = img[0]
      axios.post(`${baseURL}/users/create`, {
        email: form.email,
        password: form.password,
        name: form.name,
        gender: form.gender,
        birthday: form.birthday,
        avatar
      }, config)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          alert(error.response.data)
        });
      navigate('/')
    }
  }

  const AddFile = (event) => {
    setImage([...URL.createObjectURL(event.target.files[0])]);
    setImage([event.target.files[0]]);
  };

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
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Enter your name</Form.Label>
          <Form.Control
            placeholder="Name"
            onChange={(event) => { setField('name', event.target.value) }}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group >
        <Form.Group className="mb-3" controlId="formBasicGender">
          <Form.Label>choose your gender</Form.Label>
          <Form.Select
            onChange={(event) => { setField('gender', event.target.value) }}
            isInvalid={!!errors.gender}
          >
            <option value="">choose your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.gender}
          </Form.Control.Feedback>
        </Form.Group >
        <Form.Group className="mb-3" controlId="formBasicBirthday">
          <Form.Label>Enter your birthday</Form.Label>
          <Form.Control
            type="date"
            onChange={(event) => { setField('birthday', event.target.value) }}
            isInvalid={!!errors.birthday}
          />
          <Form.Control.Feedback type="invalid">
            {errors.birthday}
          </Form.Control.Feedback>
        </Form.Group >
        <Form.Group className="mb-3 w-90" controlId="formBasicImage">
          <Form.Control
            name="avatar"
            type="file"
            label="Select your photo"
            onChange={(event) => AddFile(event)}
            isInvalid={!!errors.image}
          />
          <Form.Control.Feedback type="invalid">
            {errors.image}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button
            variant="primary"
            onClick={handleSubmit}
            type="reset">
            Registration
          </Button>
        </Form.Group>
      </Form>
      <hr />
    </div>
  );
}