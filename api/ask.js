export default async function handler(req, res) {
  const { question } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a psychic oracle. Respond with eerie, emotionally charged answers, full of symbolism and poetic resonance.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    }),
  });

  const data = await response.json();
  res.status(200).json({ answer: data.choices?.[0]?.message?.content });
}
