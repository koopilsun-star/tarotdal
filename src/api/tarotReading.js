const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export async function getAIReading(cardName, isReversed, keywords) {
  const direction = isReversed ? '역방향' : '정방향';
  
  const prompt = `당신은 한국어로만 답변하는 타로 마스터입니다. 반드시 한국어로만 작성하세요. 영어 사용 금지.

오늘 뽑힌 카드: ${cardName} (${direction})
키워드: ${keywords.join(', ')}

아래 세 단락을 한국어로 작성하세요. 제목 없이 본문만 작성하세요.

첫 번째 단락: 지금 이 순간 당신의 에너지와 상황을 2문장으로 따뜻하게 표현하세요.

두 번째 단락: 이 카드가 당신에게 전하는 핵심 메시지를 2문장으로 시적으로 쓰세요.

세 번째 단락: 앞으로 나아갈 방향과 희망적인 조언을 2문장으로 쓰세요.

주의: 영어 절대 금지. 카드 이름 반복 금지. 한국어로만 작성.`;

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
            maxOutputTokens: 500,
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