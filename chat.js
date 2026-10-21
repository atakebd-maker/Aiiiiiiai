export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 🇧🇩 বাংলাদেশ: Qubixa AI-এর DeepSeek API Key সেট করার একমাত্র জায়গা।
  // নিরাপত্তার জন্য Key এই কোডে লিখবেন না; Vercel → Settings → Environment Variables-এ
  // Name: DEEPSEEK_API_KEY | Value: আপনার DeepSeek API Key
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "DeepSeek API key is not configured. Add DEEPSEEK_API_KEY in Vercel Environment Variables."
    });
  }

  try {
    const { messages, mode } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Please send a message." });
    }

    const model = mode === "think" ? "deepseek-reasoner" : "deepseek-chat";
    const safeMessages = messages
      .filter(m => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string")
      .slice(-30)
      .map(m => ({ role: m.role, content: m.content.slice(0, 20000) }));

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "You are Qubixa AI, a helpful assistant created by TS technology limited. Answer clearly and accurately. Respond in the user's language, including Bengali when appropriate. Do not claim you can generate images or browse the live web unless a connected tool actually provides that capability."
          },
          ...safeMessages
        ],
        stream: false
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "DeepSeek API request failed. Check your API key, account balance, and model access."
      });
    }

    const answer = data?.choices?.[0]?.message?.content;
    if (!answer) {
      return res.status(502).json({ error: "The AI returned an empty response. Please try again." });
    }

    return res.status(200).json({
      answer,
      model,
      usage: data.usage || null
    });
  } catch (error) {
    return res.status(500).json({ error: "Could not connect to DeepSeek. Please try again later." });
  }
}
