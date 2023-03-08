import React, { Component, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import FairyTail from './music/FairyTail.mp3';
import Weathering from './music/WaetheringWithYou.mp3';
import loveSong from './music/T96-Love.mp3';
import FlowerDance from './music/FlowerDance.mp3';
import Moral from './music/Moral.mp3';
import Lovesick from './music/LovesickGirls.mp3';
import NeverComingBack from './music/NeverComingBack.mp3';
import AlwaysWithYou from './music/AlwaysWithYou.mp3';

import imageFairy from './images/imageFairy.jpg';
import imageWeather from './images/imageWeather.jpg';
import imageLove from './images/imageLove.png';
import imageFlower from './images/imageFlower.jpg';
import imageMoral from './images/imageMoral.jpg';
import imageLovesick from './images/imageLovesick.jpg';
import imageNever from './images/imageNever.jpg';
import imageAlways from './images/imageAlways.jpg';

import imageFairyMobile from './images/imageFairy_mobile.jpg';
import imageWeatherMobile from './images/imageWeather_mobile.jpg';
import imageLoveMobile from './images/imageLove_mobile.png';
import imageFlowerMobile from './images/imageFlower_mobile.jpg';
import imageMoralMobile from './images/imageMoral_mobile.jpg';
import imageLovesickMobile from './images/imageLovesick_mobile.jpg';
import imageNeverMobile from './images/imageNever_mobile.jpg';
import imageAlwaysMobile from './images/imageAlways_mobile.jpg';

import './audio.css'

import {MdSkipPrevious} from 'react-icons/md';
import {MdSkipNext} from 'react-icons/md';
import {FaPlay} from 'react-icons/fa';
import {GiPauseButton} from 'react-icons/gi';
import {BsRepeat} from 'react-icons/bs';
import {BsRepeat1} from 'react-icons/bs';
import {FaRandom} from 'react-icons/fa';
import {BiArrowToRight} from 'react-icons/bi';

import $ from 'jquery';



export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.valueRange = this.valueRange.bind(this);
    this.setValue = this.valueRange.bind(this);
  }
  state = {
    arr : new Array(),
    isPlaying : false,
    backgroundSrc : new Array(),
    audioBox : document.getElementById('audioBox'),
    idSong : -1 , 
    repeat : false,
    randomSong : false,
    originID : 100 , 
    eventID : 100, 
    windowWidth : 1500 ,
    durationAudio : 0 ,
    valueRange : 0
  }
  clickButton = () => {
    var audio = document.getElementById('audioBox');
    document.getElementById('text').innerHTML = audio.currentTime;
  }
  componentDidMount() {
    this.setState({arr : [FairyTail , Weathering , loveSong , FlowerDance , Moral , Lovesick , NeverComingBack , AlwaysWithYou]});
    this.setState({backgroundSrc : [imageFairy , imageWeather , imageLove , imageFlower , imageMoral, imageLovesick , imageNever , imageAlways]});
    this.setState({backgroundSrcMobile : [imageFairyMobile , imageWeatherMobile , imageLoveMobile , imageFlowerMobile , imageMoralMobile, imageLovesickMobile , imageNeverMobile , imageAlwaysMobile]});

    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#list .boxSong").filter(function() {
        $(this).toggle($(this).find('.inforBox .title').text().toLowerCase().indexOf(value) > -1)
      });
    });
    var windowWidth = window.innerWidth;
    this.setState({windowWidth : windowWidth});

    setInterval(this.duration , 1000);

    // setInterval(() => {
    //   var audio = document.getElementById('audioBox');
    //   document.getElementById('inputRange').value = audio.currentTime;
    // } , 2000);
    document.getElementById('inputRange').value = 0;
    var audio = document.getElementById('audioBox');
    setInterval(() => {
      document.getElementById('inputRange').value = audio.currentTime;
    }, 2000);
    
  }

  changeBackground = (id , originID) => {
    var id = parseInt(id);
    var origin = originID;
    var boxSongs = document.querySelectorAll('.boxSong');
    boxSongs[id].classList.add('active');
    if (origin != 100)
    {
      boxSongs[origin].classList.remove('active');
    }
  }
  autoPlaying = () => {
    var id = parseInt(this.state.idSong);
    var originID = id;
    var audio = document.getElementById('audioBox');
    var background = document.getElementById('imageBox');
    var repeat = this.state.repeat;
    var randomSong = this.state.randomSong;

    if(id < this.state.arr.length - 1 && repeat == false)
    {
      id = id + 1;
    }
    else if(id == this.state.arr.length - 1 && repeat == false)
    {
      id = 0;
    }

    if(randomSong == true && repeat == false)
        {
          var idRandom = Math.floor(Math.random() * 7);
          while(idRandom == originID)
          {
            idRandom = Math.floor(Math.random() * 7);
          }
          id = idRandom;
        }
    
    var windowWidth = this.state.windowWidth;
    if(parseInt(windowWidth) < 590)
      background.style.backgroundImage = 'url(' + this.state.backgroundSrcMobile[id] + ')';
    else
      background.style.backgroundImage = 'url(' + this.state.backgroundSrc[id] + ')';

    audio.src = this.state.arr[id];
    audio.volume = 0.6;
    this.setState({audioBox : audio});
    console.log(audio.duration);
    audio.play();

    

    if(id == originID)
        originID = 100;

    this.changeBackground(id, originID);

    this.setState({idSong : id});
    this.setState({originID : id});
    this.setState({isPlaying : true});

    var windowWidth2 = window.innerWidth;
    this.setState({windowWidth : windowWidth2});

  }
  actionAudio = (event) => {
    let idButton = event.target.id;
    this.setState({idSong : idButton});

    document.getElementById('inputRange').value = 0;
    
    var audio = document.getElementById('audioBox');

    var background = document.getElementById('imageBox');
    var windowWidth = window.innerWidth;
    if(parseInt(windowWidth) < 590)
      background.style.backgroundImage = 'url(' + this.state.backgroundSrcMobile[idButton] + ')';
    else
      background.style.backgroundImage = 'url(' + this.state.backgroundSrc[idButton] + ')';

    audio.src = this.state.arr[idButton];
    audio.volume = 0.6;

    audio.play();

    this.changeBackground(idButton, this.state.originID);

    this.setState({originID : idButton});
    this.setState({isPlaying : true});

    var windowWidth2 = window.innerWidth;
    this.setState({windowWidth : windowWidth2});
    
  }
  audioEvent = () => {
    var audio = document.getElementById('audioBox');

    let isPlaying = this.state.isPlaying;
    audio.volume = 0.6;
    isPlaying == true ? audio.pause() : audio.play() ;

    this.setState({isPlaying : !isPlaying});

    var windowWidth = window.innerWidth;
    this.setState({windowWidth : windowWidth});
  }
  previousSong = () => {
    var id = this.state.idSong;
    id = id - 1;
    
    var audio = document.getElementById('audioBox');
    var background = document.getElementById('imageBox');

    if(id < 0)
      id = this.state.arr.length - 1;

    var windowWidth = window.innerWidth;
    if(parseInt(windowWidth) < 590)
      background.style.backgroundImage = 'url(' + this.state.backgroundSrcMobile[id] + ')';
    else
      background.style.backgroundImage = 'url(' + this.state.backgroundSrc[id] + ')';

    audio.src = this.state.arr[id];
    audio.volume = 0.6;
    audio.play();

    this.changeBackground(id, this.state.idSong);
    
    this.setState({isPlaying : true});
    this.setState({idSong : id});
    this.setState({originID : id});

    var windowWidth2 = window.innerWidth;
    this.setState({windowWidth : windowWidth2});
  }
  repeatSong = () => {
    var repeat = this.state.repeat;
    this.setState({repeat : !repeat});
  }
  randomSong = () => {
    var randomSong = this.state.randomSong;
    this.setState({randomSong : !randomSong});
  }
  duration = () => {
    var audio = document.getElementById('audioBox');
    document.getElementById('inputRange').max = audio.duration;
  }
  valueRange = () => {
    var audio = document.getElementById('audioBox');
    var setValue = setInterval(() => {
      document.getElementById('inputRange').value = audio.currentTime;
      console.log(document.getElementById('inputRange').value);
    }, 1000);
    clearInterval(setValue);
    var valueR = document.getElementById('inputRange');
    
    audio.currentTime = valueR.value;
    audio.play();

    document.getElementById('inputRange').value = audio.currentTime;
    // console.log(document.getElementById('inputRange').value);

    this.setState({isPlaying : true});
  }
    
  
  
  render() {
    return(
      <>
      <div className='mainContainer'>
        <div id='imageBox'></div>
        <input id="myInput" type="text" placeholder="   Search.."></input>
        <input id='inputRange' type='range' min={0} max={100} onChange={this.valueRange}></input>
        <div id='mainBox'>
          <div id='randomSong' onClick={this.randomSong}>{this.state.randomSong ? <FaRandom size={20} style={{color: 'orange'}}/> : <BiArrowToRight size={20} style={{color: 'white'}}/>}</div>
          <div id='buttonPrevious' onClick={this.previousSong}><MdSkipPrevious size={40} /></div>
          <div id='buttonPause' onClick={this.audioEvent}>{this.state.isPlaying? <GiPauseButton size={35} style={{color: 'orange'}}/> : <FaPlay size={35} style={{color: 'white'}}/>}</div>
          <div id='buttonNext' onClick={this.autoPlaying}><MdSkipNext size={40}/></div>
          <div id='repeat' onClick={this.repeatSong}>{this.state.repeat? <BsRepeat1 size={20} style={{color: 'orange'}}/> : <BsRepeat size={20} style={{color: 'white'}}/>}</div>
        </div>
        <div id='listBox'>
          <div id='list'>
            <audio id='audioBox' src='' controls onEnded={this.autoPlaying}></audio>
            <div className='boxSong image1' id={'0'} onClick={this.actionAudio}>
              <div className='image' id={'0'} onClick={this.actionAudio}></div>
              <div className='inforBox' id={'0'} onClick={this.actionAudio}>
                <div className='title' id={'0'} onClick={this.actionAudio}>Fairy Tail Theme</div> 
                <div className='singer' id={'0'} onClick={this.actionAudio}>Unknown</div>
              </div>
            </div>
            <div className='boxSong image2' id={'1'} onClick={this.actionAudio}>
              <div className='image' id={'1'} onClick={this.actionAudio}></div>
                <div className='inforBox' id={'1'} onClick={this.actionAudio}>
                  <div className='title' id={'1'} onClick={this.actionAudio}>Weathering With You</div> 
                  <div className='singer' id={'1'} onClick={this.actionAudio}>Anime Japan</div>
                </div>
            </div>
            <div className='boxSong image3' id={'2'} onClick={this.actionAudio}>
              <div className='image' id={'2'} onClick={this.actionAudio}></div>
              <div className='inforBox' id={'2'} onClick={this.actionAudio}>
                <div className='title' id={'2'} onClick={this.actionAudio}>LOVE</div> 
                <div className='singer' id={'2'} onClick={this.actionAudio}>T96</div>
              </div>
            </div>
            <div className='boxSong image4' id={'3'} onClick={this.actionAudio}>
              <div className='image' id={'3'} onClick={this.actionAudio}></div>
              <div className='inforBox' id={'3'} onClick={this.actionAudio}>
                <div className='title' id={'3'} onClick={this.actionAudio}>Flower Dance</div> 
                <div className='singer' id={'3'} onClick={this.actionAudio}>DJ Okawari</div>
              </div>
            </div>
            <div className='boxSong image5' id={'4'} onClick={this.actionAudio}>
              <div className='image' id={'4'} onClick={this.actionAudio}></div>
              <div className='inforBox' id={'4'} onClick={this.actionAudio}>
                <div className='title' id={'4'} onClick={this.actionAudio}>Moral</div> 
                <div className='singer' id={'4'} onClick={this.actionAudio}>Ashe</div>
              </div>
            </div>
            <div className='boxSong image6' id={'5'} onClick={this.actionAudio}>
              <div className='image' id={'5'} onClick={this.actionAudio}></div>
              <div className='inforBox' id={'5'} onClick={this.actionAudio}>
                <div className='title' id={'5'} onClick={this.actionAudio}>Lovesick Girls</div> 
                <div className='singer' id={'5'} onClick={this.actionAudio}>BLACKPINK</div>
              </div>
            </div>
            <div className='boxSong image7' id={'6'} onClick={this.actionAudio}>
              <div className='image' id={'6'} onClick={this.actionAudio}></div>
              <div className='inforBox' id={'6'} onClick={this.actionAudio}>
                <div className='title' id={'6'} onClick={this.actionAudio}>Never Coming Back</div> 
                <div className='singer' id={'6'} onClick={this.actionAudio}>Violet Evergarden</div>
              </div>
            </div>
            <div className='boxSong image8' id={'7'} onClick={this.actionAudio}>
              <div className='image' id={'7'} onClick={this.actionAudio}></div>
              <div className='inforBox' id={'7'} onClick={this.actionAudio}>
                <div className='title' id={'7'} onClick={this.actionAudio}>Always With Me</div> 
                <div className='singer' id={'7'} onClick={this.actionAudio}>Spirited Way</div>
              </div>
            </div>

          </div>

        </div>
        
      </div>
      
      </>
    );
  }
}
