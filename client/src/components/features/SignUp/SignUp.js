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
 
const SignUp = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [errorImage, setErrorImage] = useState(false)

  console.log(errorImage)

  return(
    <div className={styles.root}>
        <h1>Sign up</h1>
        <Form>
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
        
        onChange={e => e.target.files[0].size > 1000000 ? setErrorImage(true) : (setAvatar(e.target.files[0].size), setErrorImage(false))}
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