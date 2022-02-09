import { createRef, useState } from 'react';
import './App.css';

const symbols = [{write:' ',shifr:'!'},{write:',',shifr:'%'},{write:'.',shifr:'('},{write:'!', shifr:')'},{write:'?',shifr:'@'}];

const alphabetRu = [
  'а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'
];

function App() {
  const inp = createRef();
  let [ shifr, setShifr ] = useState('');
  let [ deshirf, setDeshirf ] = useState('');

  const runShifr = (target) => {
    let value = target.value.toLowerCase(),
        writeShifr = '';

    if (value === '') {
      setShifr('');
      return;
    }

    if (/[^\sа-яА-ЯёЁ]/g.test(value)) {
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
        } else indexCounter = cod;

        if (value[i] === el) writeShifr += alphabetRu[indexCounter];

      });

      symbols.forEach(item => value[i] === item.write ? writeShifr += item.shifr : null);

      setShifr(writeShifr);
    }

  };

  const runDeshifr = () => {
    let writeDeshirf = '';

    for(let i = 0; i < shifr.length; i++) {
      let indexCounter = 0;

      alphabetRu.forEach((el, index) => {
        let cod = index + 5;

        if (cod < 0) {
          indexCounter = alphabetRu.length - Math.abs(cod);
        } else indexCounter = cod;

        if (cod >= alphabetRu.length) indexCounter = cod - alphabetRu.length;

        if (shifr[i] === el) writeDeshirf += alphabetRu[indexCounter];

      });

      symbols.forEach(item => shifr[i] === item.shifr ? writeDeshirf += item.write : null);

      setDeshirf(writeDeshirf);
    }
  };

  return (
    <div className="App">
      <h1>Шифр Цезаря</h1>
      <div className="wrapper">
        <div className="get-data">
          <input type="text" placeholder="Введите слово" ref={inp} onKeyUp={({ target }) => runShifr(target)} />
        </div>
        <div>Полученный шифр <p>{shifr}</p></div>
        <div>Дешифроватор <button className="btn-def" onClick={() => runDeshifr()}>Начать</button> <p>{deshirf}</p></div>
      </div>
    </div>
  );
}

export default App;
