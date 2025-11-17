export default async function handler(req, res) {
    try {
        const { question } = req.body;

        // الاتصال بنموذج ذكاء اصطناعي مجاني بدون API Key
        const aiRes = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    { role: "user", content: question }
                ]
            })
        });

        const data = await aiRes.json();

        return res.status(200).json({ 
            answer: data.choices?.[0]?.message?.content || "لم يتم العثور على إجابة." 
        });

    } catch (error) {
        return res.status(500).json({ answer: "حدث خطأ في الخادم." });
    }
}
