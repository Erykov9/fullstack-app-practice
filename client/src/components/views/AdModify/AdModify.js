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
import { useSelector, useDispatch } from 'react-redux';
import {  getAdsRequestInfo, getAdsRequest, deleteAd, deleteAdDB } from "../../../redux/adsRedux";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AdModify = ({action, handler, ...props}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const request = useSelector(getAdsRequestInfo);  
  const date = new Date().toLocaleDateString();
  
  useEffect(() => {
    dispatch(getAdsRequest()); 

  }, [dispatch]);
  const id = props.id
  const [title, setTitle] = useState(props.title || '');
  const [description, setDescription] = useState(props.description || '');
  const [price, setPrice] = useState(props.price || '');
  const [location, setLocation] = useState(props.location || '');
  const [image, setImage] = useState(props.image || '');
  const [publishDate, setDate] = useState(props.date || '');
  const [info, setInfo] = useState(props.info || '');

  const onDelete = (ad) => {
    dispatch(deleteAd(id));
    dispatch(deleteAdDB(id));
    navigate('/')
  };


  const subHandler = () => {
    handler({id, title, description, price, location, publicDate: date, info: 'Test', image: image  });
  };

  if(request.pending || !request.success) return <Spinner/>
  else {
  return  (
      <div className={styles.root}>
        <h1> Advertisement</h1>
        <h3>{props.info}</h3>
        <Form onSubmit={() => subHandler()}>
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
              onChange={e => setImage(e.target.files[0])}
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
            minLength={3}
            maxLength={25}
            value={location}
            onChange={e => setLocation(e.target.value)}
            />
          </FormGroup>
          <Button>{action}</Button>{action == 'Edit' ? <Button onClick={() => onDelete(props.ad)}>Delete</Button> : null}
        </Form>

      </div>
    )
  }
};

export default AdModify;