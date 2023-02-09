import React, { useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Button, { OutlineButton } from '../../components/button/Button';
import './ListEpisod.scss';
import Modal, { ModalContent } from '../../components/modal/Modal';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PopupLink from './PopupLink';
import apiConfig from '../../api/apiConfig';

const ListEpisod = props => {
  const link = '/' + 'film/details' + '/';
  const [item, setItem] = useState([]);
  const streamlink="";
  useEffect(() => {
        fetch(apiConfig.baseUrl+`film/subdetail/${props.id}`,{
          method:'GET',
          headers : {
            'Content-Type':'application/json',
          }
          
        }).then((res) => {
          if (res.ok) return res.json()
        }).then((res) => setItem(res)).catch((err) => console.log(err));
      }, [])

    
  return (
    <>
    {item.map((x,y)=>(
      <div className="section mb-3">
          <div className="section__header mb-3">
              <h2>{x.title}</h2>
              <div>
              <HeroSlideItem item={x} />
              </div>
          </div>
          <StreamModal key={y} item={x}/>
      </div>
    ))}
    </>
    
  )
} 
const HeroSlideItem = props => {
  const nameLink = ["GOOGLE DRIVE","ZIPPESHARE"];
  const item = props.item;
  const [visibility, setVisibility] = useState(false);
 
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };
  const setModalActive = async () => {
      const modal = document.querySelector(`#modal_${item.id}`);

      if (item.stream_link.length > 0) {
          const videSrc = 'https://dood.wf/e/' + item.stream_link;
          modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
      } else {
          modal.querySelector('.modal__content').innerHTML = 'No trailer';
      }

      modal.classList.toggle('active');
  }
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
    // window.location.assign(url);
  };

  return (
    <div className="btns">
      
      <Button className="btn" onClick={setModalActive}>
        Stream
      </Button>
      <Button className="btn1" onClick={(e) => setVisibility(!visibility)}>
        Download
      </Button>
      <PopupLink
        onClose={popupCloseHandler}
        show={visibility}
        title="Link Download"
      >
        
        <div className="section mb-3">
        <h3>360</h3>
        <div className="section__header mb-3">
        
        {
          item.link_360.map((lks, i) => (
            
            <span key={i} className="link_donwloads"><a onClick={() => openInNewTab(lks)}>{
              i===0 ? <h4>DoodStream</h4> : <h4>ZippyShare</h4>
          } </a> </span>
              
          ))
        }
        </div>
        </div>
        <div className="section mb-3">
        <h3>480</h3>
        <div className="section__header mb-3">
        {
          item.link_480.map((lks, i) => (
              <span key={i} ><a onClick={() => openInNewTab(lks)}>{
                i===0 ? <h4>DoodStream</h4> : <h4>ZippyShare</h4>
            } </a> </span>
          ))
        }
        </div>
        </div>
        <div className="section mb-3">
        <h3>720</h3>
        <div className="section__header mb-3">
        {
          item.link_720.map((lks, i) => (
              <span key={i} ><a onClick={() => openInNewTab(lks)}>{
                i===0 ? <h4>DoodStream</h4> : <h4>ZippyShare</h4>
            } </a> </span>
          ))
        }
        </div>
        </div>
        <div className="section mb-3">
        <h3>1080</h3>
        <div className="section__header mb-3">
        {
          item.link_1080.map((lks, i) => (
              <span key={i} ><a onClick={() => openInNewTab(lks)}>{
                i===0 ? <h4>DoodStream</h4> : <h4>ZippyShare</h4>
            } </a> </span>
          ))
        }
        </div>
        </div>
      </PopupLink>
                      
    </div>
      
  )
}

const StreamModal = props => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute('src', '');

  return (
      <Modal active={false} id={`modal_${item.id}`}>
          <ModalContent onClose={onClose}>
              <iframe ref={iframeRef} width="100%" height="500px" title="trailer" allowFullScreen="true"></iframe>
          </ModalContent>
      </Modal>
  )
}


export default ListEpisod