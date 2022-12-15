import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAdsRequest, getAdById, getAdsRequestInfo } from "../../../redux/adsRedux";
import { useEffect } from "react";
import { 
  Spinner,
  Container,
  Button
} from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './Ad.module.scss';


const Ad = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const ad = useSelector(state => getAdById(state, id));
  const request = useSelector(getAdsRequestInfo);

  useEffect(() => {
    dispatch(getAdsRequest()); 
  }, [dispatch]);

  const clickHandler = () => {
    navigate(`/ad/editad/${ad._id}`)
  }


  if(request.pending || !request.success) return <Spinner/>
  else {
    return (
      <Container>
      <div className={styles.root}>
        <div className={styles.root__header}>
          <h1>{ad.title}</h1>
        </div>
        <div className={styles.root__image}>
          <img src={`http://localhost:8000/uploads/${ad.image}`}></img>
        </div>
        <div className={styles.root__description}>
          <h3>Details:</h3>
          <ul>
            <li>User: <b>{ad.info}</b></li>
            <li>Public date: <b>{ad.publicDate}</b></li>
            <li>Price: <b>{ad.price},-</b></li>
            <li>Location: <b>{ad.location}</b></li>
          </ul>
          <h2>Description:</h2>
          <p>{ad.description}</p>
          <div>
            <Button color="primary" onClick={clickHandler}>Edit</Button><Button color="danger">Delete</Button>
          </div>
        </div>
      </div>
      </Container>
    );
  }
};

export default Ad;