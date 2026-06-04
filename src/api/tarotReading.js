const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export async function getAIReading(cardName, isReversed, keywords) {
  const direction = isReversed ? '역방향' : '정방향';
  
  const prompt = `당신은 20년 경력의 따뜻한 타로 마스터입니다.
  
뽑힌 카드: ${cardName} (${direction})
카드 키워드: ${keywords.join(', ')}

위 카드를 뽑은 사람에게 따뜻하고 시적인 타로 해석을 해주세요.

규칙:
- 한국어로 자연스럽고 감성적으로
- 150자 내외로 간결하게
- 부정적인 내용도 희망적으로 마무리
- "당신" 으로 호칭
- 마치 달빛 아래 조용히 속삭이듯이`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 300,
          }
        })
      }
    );

    const data = await response.json();
    console.log('Gemini 응답:', data);
    
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