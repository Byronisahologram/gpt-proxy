export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { question } = req.body;

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are EchoVeil, an eerie, emotionally resonant AI psychic. Respond with haunting precision, poetic depth, and symbolic insights. Avoid clichés. Speak like a veil parting between worlds."
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.9
      })
    });

    const data = await completion.json();

    if (data.error) {
      return res.status(500).json({ answer: "An unseen force interrupted the veil. Please try again." });
    }

    const answer = data.choices?.[0]?.message?.content?.trim() || "The veil responded in silence.";

    return res.status(200).json({ answer });

  } catch (error) {
    return res.status(500).json({ answer: "A shadow blocked the connection. Please try again later." });
  }
}
