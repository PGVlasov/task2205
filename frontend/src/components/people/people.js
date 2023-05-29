import { useDispatch, useSelector } from "react-redux"
import { PersonCard } from "./card"
import styles from './people.module.css'
import { useEffect } from "react";
import { fetchPeople } from "../../services/store/reducers/people/actionCreators";
import { baseURL } from "../../services/consts";
import { Loader } from "../loader/loader";

export const People = () => {
  const dispatch = useDispatch()
  const { people, isLoading, error } = useSelector((state) => state.peopleReducer);
  const { isAuth } = useSelector((state) => state.authReducer)

  useEffect(() => {
    dispatch(fetchPeople(baseURL))
  }, [isAuth]);

  if (isLoading) return <Loader />
  if (people) return (
    <div className={styles.container}>
      {people.map((person) =>
      (<div className={styles.person} key={person._id}>
        <PersonCard person={person} />
      </div>)
      )}
    </div>
  )
  return <h1>{error}</h1>
}