import { Button } from 'reactstrap';
import { useState } from 'react';

const SearchForm = () => {
  const [inputValue, setInputValue] = useState('');

  const inputHandler = (e) => {
    setInputValue(e.target.value)
  }
  return (
    <div>
      <form>
        <input placeholder='Search...' onChange={e => inputHandler(e)}/>
        <Button>Search</Button>
      </form>
    </div>
  )
};

export default SearchForm;