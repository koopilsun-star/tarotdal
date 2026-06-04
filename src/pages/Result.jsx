import React, { useState, useEffect } from 'react';
import tarotCards from '../data/tarotCards.json';
import { getAIReading } from '../api/tarotReading';

function Result({ cardId, onBack }) {
  const card = tarotCards[cardId] || tarotCards[0];
  const [isReversed] = useState(Math.random() > 0.5);
  const [aiReading, setAiReading] = useState('');
  const [loading, setLoading] = useState(true);
  const imageIndex = String(cardId).padStart(2, '0');

  useEffect(() => {
    async function fetchReading() {
      setLoading(true);
      const result = await getAIReading(card.nameKo, isReversed, card.keywords);
      if (result) {
        setAiReading(result);
      } else {
        setAiReading(isReversed ? card.reversedMeaning : card.uprightMeaning);
      }
      setLoading(false);
    }
    fetchReading();
  }, [card, isReversed]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0D0D2B',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 24px',
      fontFamily: "'Paperlogy', Georgia, serif",
    }}>

      <button onClick={onBack} style={{
        width: '100%',
        maxWidth: '360px',
        padding: '14px 0',
        borderRadius: '50px',
        backgroundColor: 'transparent',
        color: '#C9A96E',
        fontSize: '16px',
        fontWeight: 'bold',
        border: '2px solid #C9A96E',
        cursor: 'pointer',
        marginBottom: '48px',
        fontFamily: "'Paperlogy', Georgia, serif",
        letterSpacing: '0.05em',
      }}>
        ← 다시 뽑기
      </button>

      <div style={{
        width: '160px',
        height: '240px',
        borderRadius: '14px',
        border: '2px solid #C9A96E',
        overflow: 'hidden',
        boxShadow: '0 0 50px rgba(201,169,110,0.4)',
        transform: isReversed ? 'rotate(180deg)' : 'rotate(0deg)',
        marginBottom: '36px',
      }}>
        <img
          src={`/cards/card_${imageIndex}.png`}
          alt={card.nameKo}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <h2 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#C9A96E',
        textAlign: 'center',
        textShadow: '0 0 20px rgba(201,169,110,0.5)',
        marginBottom: '10px',
        fontFamily: "'Paperlogy', Georgia, serif",
      }}>
        {card.nameKo}
      </h2>

      <p style={{
        color: '#AAAAAA',
        fontSize: '14px',
        textAlign: 'center',
        marginBottom: '24px',
        letterSpacing: '0.05em',
      }}>
        {card.name} · {isReversed ? '역방향 🔄' : '정방향 ⬆️'}
      </p>

      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '36px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {card.keywords.map((kw, i) => (
          <span key={i} style={{
            padding: '8px 18px',
            borderRadius: '50px',
            backgroundColor: '#333340',
            color: '#C9A96E',
            border: '1px solid #C9A96E',
            fontSize: '14px',
            fontFamily: "'Paperlogy', Georgia, serif",
          }}>
            {kw}
          </span>
        ))}
      </div>

      <div style={{
        width: '100%',
        maxWidth: '360px',
        borderRadius: '20px',
        padding: '28px 24px',
        backgroundColor: '#252530',
        border: '1px solid rgba(201,169,110,0.3)',
        marginBottom: '28px',
        minHeight: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {loading ? (
          <p style={{
            color: '#C9A96E',
            fontSize: '14px',
            textAlign: 'center',
            opacity: 0.7,
            fontFamily: "'Paperlogy', Georgia, serif",
          }}>
            🌙 달빛이 카드를 읽고 있습니다...
          </p>
        ) : (
          <p style={{
            color: '#E0E0E0',
            fontSize: '16px',
            lineHeight: '1.9',
            textAlign: 'center',
            fontFamily: "'Paperlogy', Georgia, serif",
          }}>
            {aiReading}
          </p>
        )}
      </div>

      <p style={{
        color: '#888888',
        fontSize: '13px',
        textAlign: 'center',
        maxWidth: '320px',
        lineHeight: '1.8',
        paddingBottom: '40px',
        fontFamily: "'Paperlogy', Georgia, serif",
      }}>
        {card.description}
      </p>

    </div>
  );
}

export default Result;