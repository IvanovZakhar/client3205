import React, { useState } from 'react';
import './App.css'


function App() {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNumberChange = (e) => {
    // Применяем маску номера
    const formattedNumber = e.target.value
      .replace(/\D/g, '') // Удаляем все, кроме цифр
      .replace(/(\d{2})(?=\d)/g, '$1-'); // Добавляем дефисы каждые два знака
    setNumber(formattedNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Очищаем результаты и ошибки перед новым запросом
    setSearchResults([]);
    setError('');
    setLoading(true);
    console.log(email)
    // Отправляем запрос на бэкенд
    fetch('https://f9fd09879062.vps.myjino.ru:49207/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, number }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setSearchResults(data);
        console.log(data)
      })
      .catch((error) => {
        setLoading(false);
        setError('Произошла ошибка при выполнении запроса.');
        console.error(error);
      });
  };

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Number:</label>
          <input type="text" value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <h2>Search Results:</h2>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            <p>Email: {result.email}</p>
            <p>Number: {result.number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
