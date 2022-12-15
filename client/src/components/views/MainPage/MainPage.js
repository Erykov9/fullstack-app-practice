import Ads from "../Ads/Ads";
import SearchForm from "../../features/SearchForm/SearchForm";
import styles from './MainPage.module.scss';


const MainPage = () => {
  return (
    <div className={styles.root}>
      <SearchForm/>
      <Ads/>
    </div>
  )
};

export default MainPage;