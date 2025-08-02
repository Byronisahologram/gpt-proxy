export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "No question provided" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a psychic named EchoVeil. Speak cryptically, poetically, and eerily. Always answer as if you're piercing through the Veil."
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.8,
        max_tokens: 200
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      return res.status(500).json({ error: "The veil fractured. Wait and try again." });
    }

    return res.status(200).json({ answer: data.choices[0].message.content.trim() });
  } catch (err) {
    return res.status(500).json({ error: "The veil fractured. Wait and try again." });
  }
}
