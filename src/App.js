import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [elementOutput, setElementOutput] = useState(
    'https://api.memegen.link/images/ants.png',
  );
  const [textTop, setTextTop] = useState('');
  const [textBottom, setTextBottom] = useState('');

  useEffect(() => {
    axios.get('https://api.memegen.link/templates').then((result) => {
      setData(result.data);
      console.log(result.data);
    });
  }, []);

  let options = [];
  for (let i = 0; i <= data.length - 1; i++) {
    options.push({
      value: data[i].name,
      label: data[i].name,
      icon: data[i].blank,
    });
  }

  const generateClick = () => {
    const newElementOutput =
      selectedOption.icon.slice(0, selectedOption.icon.indexOf('.', 32)) +
      '/' +
      textTop +
      '/' +
      textBottom +
      '.png';
    setElementOutput(newElementOutput);
    console.log(elementOutput);
  };

  const downloadUrl = () => {
    const url = elementOutput;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function (e) {
      if (this.status === 200) {
        const blob = this.response;
        const a = document.createElement('a');
        document.body.appendChild(a);
        const blobUrl = window.URL.createObjectURL(blob);
        a.href = blobUrl;
        a.download = 'imageDownload.jpg';
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(blobUrl);
          document.body.removeChild(a);
        }, 0);
      }
    };
    xhr.send();
  };

  const { Option } = components;
  const IconOption = (props) => (
    <Option {...props}>
      <img
        // src={require('./' + props.data.icon)}
        src={props.data.icon}
        style={{ width: 36 }}
        alt={props.data.label}
      />
      {props.data.label}
    </Option>
  );
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="Whole" >
      <div className="Location" >
        <h1> ¡Genera tu propio meme! </h1>
        <br />
        <a className="box3" href={elementOutput} download>
          <img src={elementOutput} alt="Meme" width="500" height="400" />
        </a>
        <br />
        <div className="select">
          <Select
            defaultValue={options[0]}
            options={options}
            components={{ Option: IconOption }}
            onChange={setSelectedOption}
          />
        </div>
        <br />
        <input
          type="text"
          id="top"
          placeholder="Enter Top Text"
          // className="topText"
          onChange={(event) => setTextTop(event.currentTarget.value)}
        />
        <br />
        <input
          type="text"
          id="bottom"
          placeholder="Enter Bottom Text"
          // className="bottomText"
          onChange={(event) => setTextBottom(event.currentTarget.value)}
        />
        <br />
        <button onClick={generateClick} className="generateButton">
          Create Meme
        </button>
        <br />
        <button onClick={downloadUrl} className="downloadButton">
          Download
        </button>
        <br />
      </div>
    </div>
  );
}

export default App;
