import {
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button,
} from 'reactstrap';
import  styles from './SignIn.module.scss';
import { useState } from 'react';

const SignIn = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  console.log(login);
  console.log(password)

  const submitHandler = () => {
    
  }

  return(
    <div className={styles.root}>
      <h1>Log in</h1>
      <Form>
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