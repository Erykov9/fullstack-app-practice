import {
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button,
  FormText,
  Spinner
} from 'reactstrap';
import  styles from './AdModify.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdById, getAdsRequestInfo, getAdsRequest } from "../../../redux/adsRedux";
import { useState, useEffect } from "react";


const AdModify = ({edit}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAdsRequest()); 
  }, [dispatch]);

  const ad = useSelector(state => getAdById(state, id));
  const request = useSelector(getAdsRequestInfo);
  console.log(ad, request)


  const [title, setTitle] = useState('' || ad.title);
  const [description, setDescription] = useState('' || ad.description);
  const [price, setPrice] = useState('' || ad.price);
  const [location, setLocation] = useState('' || ad.location);

  const date = new Date().toLocaleDateString();
  
  if(request.pending || !request.success) return <Spinner/>
  else {
  return  (
      <div className={styles.root}>
        <h1>{edit} Advertisement</h1>
        <h3>{ad.info}</h3>
        <Form>
          <FormGroup>
            <Label 
            for="title"
            />
            <Input 
              placeholder='Title'
              id="title"
              type="text"
              value={title}
              required
              minLength={10}
              maxLength={50}
              onChange={e => setTitle(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label
              for="description"
            />
            <Input
              placeholder='Description'
              type='textarea'
              id='description'
              value={description}
              required
              minLength={20}
              maxLength={1000}
              onChange={e => setDescription(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label
            for='file'
            />
            Image file
            <Input
              type='file'
              id='file'
            />
            <FormText>Max upload size is 1MB</FormText>
          </FormGroup>
          <FormGroup>
            <Label
            for='price'
            />
            <Input
              id='price'
              type='number'
              required
              placeholder='Price in PLN'
              value={price}
              max={999999}
              min={1}
              onChange={e => setPrice(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label
            for='location'
            />
            <Input
            id='location'
            type='text'
            required
            placeholder='Location'
            value={location}
            minLength={3}
            maxLength={25}
            onChange={e => setLocation(e.target.value)}
            />
          </FormGroup>
          <Button>{edit == 'Edit' ? 'Post' : 'Add'}</Button>
        </Form>

      </div>
    )
  }
};

export default AdModify;