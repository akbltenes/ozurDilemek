import React, { useState } from 'react';
import './App.css';

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [buttonExplode, setButtonExplode] = useState(false);

  const handleNoClick = () => {
    setClickCount(prev => prev + 1);
    
    // Hayır butonunu rastgele ama evet butonundan uzak konuma taşı
    const getRandomPosition = () => {
      // Evet butonu merkezi konumda olduğu için EXTREME güvenli alanları tanımlıyoruz
      const safePositions = [
        // Tam köşeler - hiç çakışmaz
        { top: '5%', left: '5%' },
        { top: '5%', right: '5%' },
        { bottom: '5%', left: '5%' },
        { bottom: '5%', right: '5%' },
        
        // Sol kenar - extreme
        { top: '20%', left: '3%' },
        { top: '40%', left: '3%' },
        { top: '60%', left: '3%' },
        { top: '80%', left: '3%' },
        
        // Sağ kenar - extreme
        { top: '20%', right: '3%' },
        { top: '40%', right: '3%' },
        { top: '60%', right: '3%' },
        { top: '80%', right: '3%' },
        
        // Üst kenar - extreme
        { top: '3%', left: '20%' },
        { top: '3%', left: '40%' },
        { top: '3%', right: '20%' },
        { top: '3%', right: '40%' },
        
        // Alt kenar - extreme
        { bottom: '3%', left: '20%' },
        { bottom: '3%', left: '40%' },
        { bottom: '3%', right: '20%' },
        { bottom: '3%', right: '40%' }
      ];
      return safePositions[Math.floor(Math.random() * safePositions.length)];
    };
    
    // Biraz bekle sonra konumu değiştir (animasyon için)
    setTimeout(() => {
      setNoButtonPosition(getRandomPosition());
    }, 100);
  };

  const handleYesClick = () => {
    // Buton patlatma efekti
    setButtonExplode(true);
    
    // Geçiş başlat
    setTimeout(() => {
      setIsTransitioning(true);
    }, 300);
    
    // Kutlama ekranını göster
    setTimeout(() => {
      setShowMessage(true);
    }, 1100);
  };

  // Hayır butonu boyutu - ilk tıkta yarı yarıya küçülür
  const getNoButtonScale = () => {
    if (clickCount === 0) return 1; // %100
    return 0.5; // 1. tıktan sonra hep %50 (yarı yarıya)
  };
  const noButtonScale = getNoButtonScale();
  
  // Hayır butonunun yazısı
  const getNoButtonText = () => {
    if (clickCount === 0) return "Hayır 😔";
    if (clickCount === 1) return "Lütfen bu butona basma barışmayı çok istiyorum 💕❤️";
    return "Artık istesen de bu butona tıklayamazsın";
  };

  if (showMessage) {
    return (
      <div className="min-h-screen rainbow-background flex items-center justify-center p-4 relative overflow-hidden">
        {/* Konfeti yağmuru */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={`confetti-${i}`} className="confetti"></div>
          ))}
        </div>

        {/* Düşen kalpler */}
        <div className="absolute inset-0">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={`heart-${i}`} className="falling-heart">💖</div>
          ))}
        </div>

        {/* Floating particles alttan */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`particle-${i}`} className="particle"></div>
          ))}
        </div>

        {/* Rotating stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="rotating-star"
              style={{
                left: `${10 + (i * 10)}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>

        {/* Ana kutlama içeriği */}
        <div className="text-center fade-in-scale z-10 pulse-border">
          <div className="text-8xl md:text-9xl mb-8 animate-bounce">❤️</div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-pulse glow-text">
            Yaşasın Barıştık! 🎉
          </h1>
          
          <p className="text-2xl md:text-4xl text-white mb-6 drop-shadow-md glow-text">
            Seni çok çok seviyorum! 💕
          </p>
          
          <p className="text-xl md:text-2xl text-white mb-8 font-semibold">
            Artık küsmeyeceğiz, tamam mı? 🥺💖
          </p>
          
          <div className="text-5xl md:text-7xl animate-pulse">
            🥰💖✨
          </div>
        </div>

        {/* Ekstra arka plan kalpler */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={`bg-heart-${i}`}
              className={`absolute text-3xl md:text-5xl animate-float-${i % 3} opacity-20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                color: ['#ff69b4', '#ff1493', '#ff6347', '#ffd700', '#00ffff'][i % 5],
              }}
            >
              💕
            </div>
          ))}
        </div>

        {/* Circular glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`glow-${i}`}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                background: `radial-gradient(circle, rgba(255, 105, 180, 0.3), transparent)`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4 relative overflow-hidden ${isTransitioning ? 'fade-out' : ''}`}>
      {/* Ana başlık - ekranın en üstünde */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Özür Dilerim 🥺
        </h1>
        <p className="text-2xl md:text-3xl text-white drop-shadow-md">
          Barışalım mı? 💕
        </p>
      </div>

                  {/* Evet butonu - merkezi sabit konumda */}
      <button
        onClick={handleYesClick}
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10
                   bg-green-500 text-white font-bold py-4 px-8 md:py-6 md:px-12 rounded-full
                   shadow-lg text-xl md:text-3xl ${buttonExplode ? 'button-explode' : ''}`}
      >
        Evet! 💖
      </button>

      {/* Hayır butonu */}
      {clickCount < 15 && (
        <button
          onClick={handleNoClick}
          style={{
            transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            position: 'fixed',
            ...(clickCount >= 2 && noButtonPosition ? {
              ...noButtonPosition,
              transform: `scale(${noButtonScale})`,
              zIndex: 30,
            } : {
              top: '70%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${noButtonScale})`,
              zIndex: 10,
            })
          }}
          className={`bg-red-500 text-white font-bold py-4 px-8 md:py-6 md:px-12 rounded-full
                     shadow-lg transition-all duration-300 no-mobile-transition
                     ${clickCount >= 2 ? 'text-xs md:text-sm' : 'text-xl md:text-3xl'}
                     active:scale-95`}
          onMouseEnter={() => {
            // 2. tıklamadan sonra mouse gelince kaçsın!
            if (clickCount >= 2) {
              const safePositions = [
                { top: '5%', left: '5%' },
                { top: '5%', right: '5%' },
                { bottom: '5%', left: '5%' },
                { bottom: '5%', right: '5%' },
                { top: '20%', left: '3%' },
                { top: '80%', right: '3%' },
                { top: '3%', left: '30%' },
                { bottom: '3%', right: '30%' }
              ];
              setNoButtonPosition(safePositions[Math.floor(Math.random() * safePositions.length)]);
            }
          }}
          onTouchStart={() => {
            // 2. tıklamadan sonra mobilde dokunma gelince kaçsın!
            if (clickCount >= 2) {
              const safePositions = [
                { top: '8%', left: '8%' },
                { top: '8%', right: '8%' },
                { bottom: '8%', left: '8%' },
                { bottom: '8%', right: '8%' },
                { top: '25%', left: '5%' },
                { top: '75%', right: '5%' },
                { top: '5%', left: '35%' },
                { bottom: '5%', right: '35%' }
              ];
              setNoButtonPosition(safePositions[Math.floor(Math.random() * safePositions.length)]);
            }
          }}
        >
          {getNoButtonText()}
        </button>
      )}

      

      {/* Kalp animasyonları */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`absolute text-2xl md:text-4xl animate-float-${i % 3}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            💕
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
