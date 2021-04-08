import './App.css';
import React from 'react';
import WomanLongAnim from './long.mp4'
import WomanHalfAnim from './half.mp4'
import SunAnim from './sun.mp4'
import CloudsAnim from './clouds.mp4'
import RainAnim from './rain.mp4'
import axios from 'axios';// axiosで通信を行う
import { useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import Button from '@material-ui/core/Button';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import CloseIcon from '@material-ui/icons/Close';

function App() {
  // apiの情報をstate管理
  const [statusName, setName] = React.useState('');
  const [statusWeather, setWeather] = React.useState('');
  const [city, setCity] = React.useState('Tokyo');
  const [temperature, setTemp] = React.useState();
  const [maxTemperature, setMaxTemp] = React.useState();
  const [minTemperature, setMinTemp] = React.useState();
  const [closeNav, setCloseNav] = React.useState(false);
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
    }).catch(err => {
      console.log('err:', err);
    });
  // 第二引数に[]を入れるとaxiosの繰り返し処理がなくなる
  });

  // サイドバーボタンの処理
  const navClick = () => {
    setCloseNav(!closeNav);
  }
  const navState = closeNav?'closeNav': 'openNav';

  // レスポンシブ
  React.useEffect(() => {
    const windowSize = document.body.clientWidth;
    if(windowSize <= 500){
      setCloseNav(true);
    }
  }, []);

  return (
    <>
      {/* woman animation */}
      <div className="App">
        <h1 className={'cityName'}>{statusName}</h1>
        {/* womanAnimation */}
        <ReactPlayer
        className="womanAnim"
        url={(maxTemperature >= 25)?WomanHalfAnim:WomanLongAnim}
        controls={false}
        loop
        muted
        playsinline
        config={{ file: { attributes: {
          autoPlay: true,
        }}}}
      />

        {/* clear effects */}
        <div className={(statusWeather == 'Clear')?'fadeInEffect':' '}>
          <ReactPlayer
          className={'EffectAnim Clear'}
          url={SunAnim}
          controls={false}
          loop
          muted
          playsinline
          config={{ file: { attributes: {
            autoPlay: true,
            muted: true
          }}}}
          />
        </div>

        {/* clouds effects */}
        <div className={(statusWeather == 'Clouds')?'fadeInEffect':' '}>       
          <ReactPlayer
          className={'EffectAnim Clouds'}
          url={CloudsAnim}
          controls={false}
          loop
          muted
          playsinline
          config={{ file: { attributes: {
            autoPlay: true,
            muted: true
          }}}}
          />
        </div>

        {/* rain effects */}
        <div className={(statusWeather == 'Rain')?'fadeInEffect':' '}>
          <ReactPlayer
          className={'EffectAnim Rain'}
          url={RainAnim}
          controls={false}
          loop
          muted
          playsinline
          config={{ file: { attributes: {
            autoPlay: true,
            muted: true
          }}}}
          />
        </div>

        {/* サイドバー */}
        <div className={"weatherNav" + ' ' + navState}>
          <br></br>
          <br></br>
          <Button className={'btnStyle'} onClick={navClick}>
            <MenuOpenIcon className={(navState=='openNav')? 'noneBtn': ' '}/>
            <CloseIcon className={(navState=='closeNav')? 'noneBtn': ' '} />
          </Button>
            <p>日本の都市を検索できます。
            <br></br>アルファベットでご入力ください。
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* include validation with required or other standard HTML validation rules */}
              <input className="inputTxt" placeholder="例)Tokyo, Osaka etc.." {...register("exampleRequired", { required: true })} />
              {/* errors will return when field validation fails  */}
              <input className="btn-radius-solid" type="submit" />
              {errors.exampleRequired && <p>フォームに入力されていません</p>}
            </form>

            <h1 className={statusName}>場所:{statusName}</h1>
            <h1>天気:{statusWeather}</h1>
            <h1>現在の気温:{temperature}℃</h1>
            <h1>最高気温:{maxTemperature}℃</h1>
            <h1>最低気温:{minTemperature}℃</h1>
        </div>
      </div>
    </>
  );
}

export default App;