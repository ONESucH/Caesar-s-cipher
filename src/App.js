import { createRef, useState } from 'react';
import './App.css';

const symbols = [{write:' ',shifr:'ф'},{write:',',shifr:'у'},{write:'.',shifr:'о'},{write:'!', shifr:'к'},{write:'?',shifr:'д'}];

const alphabetRu = [
  'а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'
];

function App() {
  const inp = createRef();
  let [ shifr, setShifr ] = useState('');
  let [ deshirf, setDeshirf ] = useState('');

  const getData = (target) => {
    let value = target.value.toLowerCase(),
        writeShifr = '';

    if (value === '') {
      setShifr('');
      return;
    } else if (!/[а-яА-Я]/.test(value)) {
      alert('Используйте только русские слова');
      inp.current.value = '';
      return;
    }

    for(let i = 0; i < value.length; i++) {
      let indexCounter = 0;

      alphabetRu.forEach((el, index) => {
        let cod = index - 5;

        if (cod < 0) {
          indexCounter = alphabetRu.length - Math.abs(cod);
        } else {
          indexCounter = cod;
        }

        if (value[i] === el) {
          writeShifr += alphabetRu[indexCounter];
        }
      });

      symbols.forEach(item => {
        if (item.write === value[i]) {
          writeShifr += item.shifr;
        }
      });


      setShifr(writeShifr);
    }

  };

  return (
    <div className="App">
      <h1>Шифр Цезаря</h1>
      <div className="wrapper">
        <div className="get-data">
          <input type="text" placeholder="Введите слово" ref={inp} onKeyUp={({ target }) => getData(target)} />
        </div>
        <p>Полученный шифр <span>{shifr}</span></p>
        <p>Дешифроватор <button>Начать</button>
          <span>{deshirf}</span></p>
      </div>
    </div>
  );
}

export default App;
