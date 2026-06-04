import React, { useState, useEffect } from 'react';

function Home({ onStart }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const s = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 3 + 2,
    }));
    setStars(s);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0D0D2B',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 20px',
      fontFamily: "'Paperlogy', Georgia, serif",
    }}>

      {/* 별 */}
      {stars.map(star => (
        <div key={star.id} style={{
          position: 'absolute',
          top: `${star.top}%`,
          left: `${star.left}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          borderRadius: '50%',
          backgroundColor: '#E8E4FF',
          animation: `twinkle ${star.duration}s ease-in-out infinite alternate`,
        }} />
      ))}

      {/* 달 */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '60px',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        backgroundColor: '#C9A96E',
        boxShadow: '0 0 60px 20px rgba(201,169,110,0.35)',
      }} />

      {/* 컨텐츠 */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        width: '100%',
        maxWidth: '420px',
      }}>

        <h1 style={{
          fontSize: '64px',
          fontWeight: 'bold',
          color: '#C9A96E',
          fontFamily: "'Paperlogy', Georgia, serif",
          textShadow: '0 0 30px rgba(201,169,110,0.6)',
          marginBottom: '12px',
          letterSpacing: '0.05em',
        }}>타로달</h1>

        <p style={{
          color: '#AAAAAA',
          letterSpacing: '0.25em',
          fontSize: '14px',
          marginBottom: '60px',
          fontFamily: "'Paperlogy', Georgia, serif",
        }}>오늘 밤, 달빛 아래 내 이야기</p>

        {/* 카드 3장 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '60px',
        }}>
          {[-12, 0, 12].map((rotate, i) => (
            <div key={i} style={{
              width: '72px',
              height: '110px',
              borderRadius: '10px',
              backgroundColor: '#333340',
              border: '2px solid #C9A96E',
              transform: `rotate(${rotate}deg)`,
              boxShadow: '0 0 20px rgba(201,169,110,0.25)',
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(201,169,110,0.06) 0px, rgba(201,169,110,0.06) 1px, transparent 1px, transparent 8px)',
            }} />
          ))}
        </div>

        {/* 버튼 */}
        <button
          onClick={() => onStart && onStart()}
          style={{
            width: '100%',
            maxWidth: '320px',
            padding: '18px 0',
            borderRadius: '50px',
            backgroundColor: '#C9A96E',
            color: '#0D0D2B',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 40px rgba(201,169,110,0.5)',
            fontFamily: "'Paperlogy', Georgia, serif",
            letterSpacing: '0.05em',
          }}
        >✨ 오늘의 카드 뽑기</button>

        <p style={{
          color: '#888888',
          fontSize: '12px',
          marginTop: '20px',
          fontFamily: "'Paperlogy', Georgia, serif",
        }}>
          하루 3회 무료 · 마음을 집중하고 카드를 선택하세요
        </p>
      </div>

      <style>{`
        @keyframes twinkle {
          from { opacity: 0.15; transform: scale(1); }
          to { opacity: 0.9; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}

export default Home;