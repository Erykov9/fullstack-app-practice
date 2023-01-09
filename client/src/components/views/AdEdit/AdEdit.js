import AdModify from "../AdModify/AdModify";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdById,  getAdsRequest, editAdDB } from "../../../redux/adsRedux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();  
  const ad = useSelector((state) =>  {
    return getAdById(state, id);
  });
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getAdsRequest()); 
  }, [dispatch]);

  const submitHandler = (ad) => {
    dispatch(editAdDB(ad));
    navigate('/')
  }

  if(ad) {
    return  (
      <AdModify 
      action={'Edit'}
      handler={submitHandler}
      title={ad.title}
      description={ad.description}
      price={ad.price}
      file={''}
      location={ad.location}
      image={ad.image}
      id={ad._id}
      />
    )
  } else {
    return <div>No data</div>
  }


};

export default AdEdit;