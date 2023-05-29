import Button from 'react-bootstrap/Button';
import { PersonCard } from "../people/card"
import styles from "./accaunt.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchPerson } from '../../services/store/reducers/person/actionCreators';
import { baseURL } from '../../services/consts';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Loader } from '../loader/loader';

export const Accaunt = () => {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [image, setImage] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(fetchPerson(baseURL))
  }, []);

  const { person, isLoading, error } = useSelector((state) => state.personReducer);

  const setField = (field, value) => {
    setForm({ ...form, [field]: value })
    if (!!errors[field]) {
      setErrors({
        ...errors, [field]: null
      })
    }
  }

  const validateForm = () => {
    const { password, name } = form
    const newErrors = {}
    if (!password || password.length < 6) {
      newErrors.password = "Please enter password longer then 5 symbols "
    }
    if (!name || name === "") {
      newErrors.name = "Please enter you name"
    }
    if (image.length === 0) {
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
      axios.put(`${baseURL}/users/update`, {
        password: form.password,
        name: form.name,
        avatar
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "multipart/form-data",
          Authorization: 'Bearer ' + token
        }
      })
        .catch(function (error) {
          alert(error.response.data)
        });
      navigate("/people")
    }
  }

  const AddFile = (event) => {
    setImage([...URL.createObjectURL(event.target.files[0])]);
    setImage([event.target.files[0]]);
  };

  const handleDelete = () => {
    const shouldRemove = window.confirm("Are you shure to delete profile?");
    if (shouldRemove) {
      axios.post(`${baseURL}/users/delete`, {}, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          alert(error.response.data)
        });
      localStorage.clear();
      navigate("/")
    }
  }

  if (isLoading) return <Loader />
  if (person) return (
    <div className={styles.container}>
      <PersonCard person={person} />
      <Form className="ms-3 mb-3 h-30 w-50">
        <h3>Edit your accaunt</h3>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter your password</Form.Label>
          <Form.Control
            type="password"
            placeholder="new password"
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
            placeholder="new name"
            onChange={(event) => { setField('name', event.target.value) }}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
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
        <Button variant="primary" className="mt-1 me-1 w-50" onClick={handleSubmit}>Edit Accaunt</Button>
        <Button variant="danger" className="mt-1 w-50" onClick={handleDelete}>Delete Accaunt</Button>
      </Form>
    </div>
  )
  return <h1>{error}</h1>
}