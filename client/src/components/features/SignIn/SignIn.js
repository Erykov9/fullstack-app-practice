import {
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button,
} from 'reactstrap';
import  styles from './SignIn.module.scss';
import { useState, useSelector } from 'react';
import { AUTH_URL } from '../../../config';
import { Alert, Spinner } from 'reactstrap';
import { useDispatch } from 'react-redux'
import { logIn } from '../../../redux/userRedux';
import { useNavigate } from 'react-router-dom'


const SignIn = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // null, loading, success, serverError, clientError

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include',
      body: JSON.stringify({login, password})
    };

    setStatus('loading')

    fetch(`${AUTH_URL}/login`, options)
      .then(res => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(logIn({login}));
          
          setTimeout(() => {
            navigate('/')
          }, 2000)
        } else if (res.status === 400 || res.status === 204) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      });
  }

  return(
    <div className={styles.root}>
      <h1>Log in</h1>
      { status === 'success' && <Alert>
          <h4>Login succesful!</h4>
          <p>You have been logged in successfully!</p>
        </Alert>}

        { status === 'serverError' && <Alert color='danger'>
          <h4>Something went wrong</h4>
        </Alert>}

        { status === 'clientError' && <Alert color='danger'>
          <h4>Incorrect login or password</h4>
        </Alert>}

        { status === 'loading' && <Spinner animation='border' role="status">
        </Spinner>}

      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Label
            for="login"
            hidden
          >
            Login
          </Label>
          <Input
            id="login"
            name="login"
            placeholder="Login"
            type="login"
            onChange={e => setLogin(e.target.value)}
          />
        </FormGroup>
        {' '}
        <FormGroup>
          <Label
            for="password"
            hidden
          >
            Password
          </Label>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        {' '}
        <Button>
          Submit
        </Button>
      </Form>
    </div>
  )
};

export default SignIn;