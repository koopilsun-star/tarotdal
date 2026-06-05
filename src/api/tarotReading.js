const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export async function getAIReading(cardName, isReversed, keywords) {
  const direction = isReversed ? '역방향' : '정방향';
  
  const prompt = `한국어 타로 해석을 작성해주세요.

카드: ${cardName} (${direction}), 키워드: ${keywords.join(', ')}

완전한 문장으로 3~4문장을 작성하세요. 반드시 마침표로 끝나야 합니다. 영어 사용 금지.

지금 당신의 상황, 카드의 메시지, 앞으로의 방향을 담아 따뜻하게 써주세요.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 400,
          }
        })
      }
    );

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]) {
      console.error('Gemini 응답 오류:', data);
      return null;
    }
    
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('AI 해석 오류:', error);
    return null;
  }
}