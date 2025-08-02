export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { userQuestion } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`, // REPLACE THIS LINE
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a mystical oracle giving eerie, emotionally resonant, symbolic answers. Respond in poetic, haunting language.",
        },
        {
          role: "user",
          content: userQuestion,
        },
      ],
      temperature: 0.8,
    }),
  });

  const data = await response.json();

  const answer = data.choices?.[0]?.message?.content || "The veil remains silent.";

  res.status(200).json({ answer });
}
