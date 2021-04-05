import './App.css';
import GifAnim from './woman_anim.gif';
import React from 'react';
import EffectAnim from './rain.mp4'
// axiosで通信を行う
import axios from 'axios';
import { useForm } from "react-hook-form";
import ReactPlayer from "react-player";


// API通信Getのやり方（axiosを使用）
function App() {

  // apiの情報をstate管理
  const [statusName, setName] = React.useState('loading');
  const [statusWeather, setWeather] = React.useState('loading');
  const [city, setCity] = React.useState('Tokyo');
  const [temperature, setTemp] = React.useState();
  const [maxTemperature, setMaxTemp] = React.useState();
  const [minTemperature, setMinTemp] = React.useState();
  const topUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const bottomUrl = ',jp&appid=ab772c4cd38076eff2acf4701e560be6';

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    setCity(data.exampleRequired);
  }


  // React.useEffect(() => { ... }, []);を入れることでaxiosの繰り返し処理を止めることができる
  React.useEffect(() => {
      // axios.get(URL)でapiからgetしてjsonを取得
      axios.get(topUrl + city + bottomUrl)
      // thenで成功した場合の処理をかける
      .then(response => {
        const temp = parseInt((response.data.main.temp - 273.15) * 10, 10) / 10;
        const maxTemp = parseInt((response.data.main.temp_max - 273.15) * 10, 10) / 10;
        const minTemp = parseInt((response.data.main.temp_min - 273.15) * 10, 10) / 10;
        console.log(response.data.name);
        setName(response.data.name);
        setWeather(response.data.weather[0].main);
        setTemp(temp);
        setMaxTemp(maxTemp);
        setMinTemp(minTemp);
    
        // catchでエラー時の挙動を定義する
      }).catch(err => {
        console.log('err:', err);
      });
    // 第二引数に[]を入れるとaxiosの繰り返し処理がなくなる
  });

  return (
    <>
    <div className="App">
      <img className="humanGif" src={GifAnim}></img>
      <ReactPlayer
      className="effectAnim"
      url={EffectAnim}
      controls={false}
      loop
      config={{ file: { attributes: {
        autoPlay: true,
        muted: true
      }}}}
      />


      <div className="weatherNav">
        <br></br>
        <br></br>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* include validation with required or other standard HTML validation rules */}
          <input className="inputTxt" placeholder="例)Tokyo, Osaka etc.." {...register("exampleRequired", { required: true })} />
          {/* errors will return when field validation fails  */}
          <input className="btn-radius-solid" type="submit" />
          {errors.exampleRequired && <p>フォームに入力されていません</p>}
        </form>

        <h1>City:{statusName}</h1>
        <h1>Weather:{statusWeather}</h1>
        <h1>temp:{temperature}</h1>
        <h1>MaxTemp:{maxTemperature}</h1>
        <h1>MinTemp:{minTemperature}</h1>
      </div>

      </div>
    </>
  );
}

export default App;