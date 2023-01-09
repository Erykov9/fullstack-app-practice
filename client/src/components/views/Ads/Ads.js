import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAdsRequest, getAds, getAdsRequestInfo, } from "../../../redux/adsRedux";
import { useEffect } from "react";
import { 
  Card, 
  CardBody, 
  CardTitle, 
  CardSubtitle, 
  CardText, 
  Button, 
  CardGroup,
  Row,
  Col,
  Container,
  Spinner
} from 'reactstrap';

import { useNavigate } from "react-router-dom";

import styles from './Ads.module.scss';
import { getLogin } from "../../../redux/userRedux";

const Ads = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ads = useSelector(getAds);
  const request = useSelector(getAdsRequestInfo);
  const user = useSelector(getLogin);

  useEffect(() => {
    dispatch(getAdsRequest()); 
  }, [dispatch]);

  const clickHandler = (e) => {
    e.preventDefault();
    const attribute = e.target.href.split('/')[4];
    navigate('/ad/' + attribute)
  }

  if(request.pending || !request.success || !ads) return <Spinner/>
  return (
    <div className={styles.root}>
      <h1>Ads</h1>
      <Container>
        <Row>
          <CardGroup>
            {ads.map((a) => 
            <Col  key={a._id} className={`justify-center ${styles.col}`}>
              <Card style={{width: '18rem'}} className={`${styles.card} mb-4`}>
                <img alt="Sample" src={"http://localhost:8000/uploads/" + a.image}/>
                <CardBody >
                  <CardTitle tag="h5">
                    {a.title}
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Added: {new Date(a.publicDate).toLocaleDateString()}
                  </CardSubtitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Location: {a.location}
                  </CardSubtitle>
                  <CardText>
                    {a.description.slice(0,30)}...
                  </CardText>
                  <Button color="primary" href={'/ad/' + a._id} onClick={clickHandler}>
                    Check offert
                  </Button>
                </CardBody>
              </Card>
            </Col>)}
          </CardGroup>
        </Row>
      </Container>
    </div>
  );
};

export default Ads;