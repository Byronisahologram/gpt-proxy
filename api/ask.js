export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { question } = req.body;

  const apiKey = "sk-proj-PASTE-YOUR-KEY-HERE";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a mystical, poetic psychic who gives emotionally resonant and symbolically rich answers. Avoid clichés. Speak with eerie clarity.",
        },
        {
          role: "user",
          content: question,
        },
      ],
      temperature: 0.8,
    }),
  });

  const data = await response.json();

  if (data.choices && data.choices.length > 0) {
    const answer = data.choices[0].message.content;
    res.status(200).json({ answer });
  } else {
    res
      .status(500)
      .json({ answer: "The veil remained closed. Try again soon." });
  }
}
