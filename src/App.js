import './App.css';
import {useState} from 'react';
import Dropdown from './Dropdown';
import {
  getFirestore,
  collection,
  getDocs,
  query,
} from 'firebase/firestore';
let ps3 = require('./ps3.jpg');

function App() {
  // let q = query(collection(getFirestore(), 'messages'), orderBy('timestamp', 'desc'), limit(12));
  // console.log(q);

  const [posX, setPosX] = useState(-1);
  const [posY, setPosY] = useState(-1);
  const [chars, setChars] = useState(['Kratos', 'Cole', 'Drake']);


  const handleImgClick = (event) => {
    if (posX != -1) {
      setPosX(-1);
      setPosY(-1);
      return;
    }
    // console.log(event.pageX); 
    // console.log(event.pageY);
    setPosX(event.pageX);
    setPosY(event.pageY);
  }

  const handleCharClick = async (event) => {
    let name = event.target.textContent;
    let q = query(collection(getFirestore(), 'charPositions'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.id ===name) {
          // console.log(doc.id, " => ", doc.data());
          let startX = doc.data().startPos[0];
          let endX = doc.data().endPos[0];
          let startY = doc.data().startPos[1];
          let endY = doc.data().endPos[1];

          if (posX >= startX && posX <= endX && posY >= startY && posY <= endY) {
            console.log("MATCH");
            let newChars = [...chars];
            newChars.splice(newChars.indexOf(name), 1);
            setChars(newChars);
          }
        }
    });
  };

  return (
    <div className="App">

      Spot the characters:
      <img onClick={handleImgClick} id="ps3" alt='ps3 and some of its well known titles' src={ps3}/>
      
      <Dropdown posX={posX} posY={posY} clickFunc={handleCharClick} chars={chars}/>
      
    </div>
  );
}

export default App;
