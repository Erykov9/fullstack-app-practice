import AdModify from "../AdModify/AdModify";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAdDB, addAd } from "../../../redux/adsRedux";

const AdAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addHandler = (ad) => {
    dispatch(addAdDB(ad));
    navigate('/');
  }

  return (
    <AdModify 
    action={'Add'}
    handler={addHandler}
    />
  )
};

export default AdAdd;