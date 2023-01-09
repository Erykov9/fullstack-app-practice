import styles from './SignUp.module.scss';
import {
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button,
  Col,
  FormText
} from 'reactstrap';
import { useState } from 'react';
import { AUTH_URL } from '../../../config';
import { Alert,  Spinner } from 'reactstrap';
 
const SignUp = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [phone, setPhone] = useState('');
  const [errorImage, setErrorImage] = useState(false);
  const [status, setStatus] = useState(null); // null, loading, success, serverError, clientError, loginError

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('phoneNumber', phone);
    fd.append('avatar', avatar);

    const options = {
      method: 'POST',
      body: fd
    };

    setStatus('loading');

    fetch(`${AUTH_URL}/register`, options)
      .then(res => {
        if (res.status === 200) {
          setStatus('success');

        } else if (res.status === 400) {
          setStatus('clientError')

        } else if (res.status === 409) {
          setStatus('loginError')

        } else {
          setStatus('serverError')
        }
      })

  }

  return(
    <div className={styles.root}>
        <h1>Sign up</h1>

        { status === 'success' && <Alert>
          <h4>Register succesful!</h4>
          <p>You have been registered successfully! You can log in now.</p>
        </Alert>}

        { status === 'serverError' && <Alert color='danger'>
          <h4>Something went wrong</h4>
          <p>Unexpected error... Try again!</p>
        </Alert>}

        { status === 'clientError' && <Alert color='danger'>
          <h4>You've left empty fields!</h4>
          <p>You have to fill all the fields.</p>
        </Alert>}

        { status === 'loginError' && <Alert color='warning'>
          <h4>Login already in use</h4>
          <p>You have to use another login.</p>
        </Alert>}

        { status === 'loading' && <Spinner animation='border' role="status">
        </Spinner>}

        <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Label for="login"/>
            <Input
              id="login"
              name="login"
              placeholder="Login"
              type="text"
              required
              minLength={5}
              maxLength={20}
              onChange={e => setLogin(e.target.value)}
              
            />
          </FormGroup>
          <FormGroup>
            <Label for="password"/>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              required
              minLength={7}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone"/>
            <Input
              id="phone"
              name="phone"
              placeholder="Phone"
              type="tel"
              required
              minLength={7}
              onChange={e => setPhone(e.target.value)}
            />
          </FormGroup>
          <FormGroup row>
            <Label
              for="avatar"
              sm={2}
            >
              Avatar
            </Label>
            <Col sm={10}>
              <Input
                id="avatar"
                name="file"
                type="file"
                
                onChange={e => e.target.files[0].size > 1000000 ? setErrorImage(true) : (setAvatar(e.target.files[0]), setErrorImage(false))}
              />
              {errorImage ? <FormText><p>You cant upload files with greater size than 1MB!</p></FormText> : null}

              <FormText>
                Max upload size is 1MB.
              </FormText>
            </Col>
          </FormGroup>
          <Button>Sign up</Button>
        </Form>
      </div>
  )
};

export default SignUp;