import React, { useState } from 'react';

const CARD_COUNT = 22;

function Drawing({ onCardSelected }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const cards = Array.from({ length: CARD_COUNT }, (_, i) => i);

  const handleCardClick = (id) => {
    if (selectedCard !== null) return;
    setSelectedCard(id);
    setTimeout(() => setFlipped(true), 300);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0D0D2B',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '60px 20px',
      fontFamily: "'Paperlogy', Georgia, serif",
    }}>

      <p style={{
        color: '#AAAAAA',
        fontSize: '16px',
        letterSpacing: '0.15em',
        marginBottom: '48px',
        fontFamily: "'Paperlogy', Georgia, serif",
      }}>
        마음을 집중하고 카드를 선택하세요
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        width: '100%',
        maxWidth: '400px',
        marginBottom: '48px',
      }}>
        {cards.map((id) => (
          <div
            key={id}
            onClick={() => handleCardClick(id)}
            style={{
              width: '100%',
              aspectRatio: '2/3',
              borderRadius: '12px',
              backgroundColor: selectedCard === id ? '#C9A96E' : '#333340',
              border: `2px solid ${selectedCard === id ? '#FFD700' : '#C9A96E'}`,
              boxShadow: selectedCard === id
                ? '0 0 30px rgba(255,215,0,0.7)'
                : '0 0 10px rgba(201,169,110,0.2)',
              transform: selectedCard === id ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              backgroundImage: selectedCard === id ? 'none' :
                'repeating-linear-gradient(45deg, rgba(201,169,110,0.07) 0px, rgba(201,169,110,0.07) 1px, transparent 1px, transparent 8px)',
            }}
          />
        ))}
      </div>

      {flipped && (
        <button
          onClick={() => onCardSelected && onCardSelected(selectedCard)}
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
          }}
        >
          ✨ 카드 해석 보기
        </button>
      )}
    </div>
  );
}

export default Drawing;