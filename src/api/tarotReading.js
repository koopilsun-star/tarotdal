const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export async function getAIReading(cardName, isReversed, keywords) {
  const direction = isReversed ? '역방향' : '정방향';
  
  const prompt = `당신은 20년 경력의 따뜻하고 통찰력 있는 타로 마스터입니다.

뽑힌 카드: ${cardName} (${direction})
카드 키워드: ${keywords.join(', ')}

아래 형식으로 타로 해석을 작성해주세요:

[현재 상황 읽기]
지금 당신의 상황과 에너지를 2~3문장으로 따뜻하게 읽어주세요.

[카드가 전하는 메시지]
이 카드가 당신에게 전하고 싶은 핵심 메시지를 2~3문장으로 시적이고 감성적으로 써주세요.

[앞으로의 방향]
구체적인 행동 조언이나 마음가짐을 2문장으로 희망적으로 마무리해주세요.

규칙:
- 한국어로 자연스럽고 감성적으로
- 전체 300자 내외
- "당신"으로 호칭
- 절대 카드 이름을 그대로 반복하지 말 것
- 점술이 아닌 따뜻한 인생 조언처럼`;

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
            maxOutputTokens: 600,
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