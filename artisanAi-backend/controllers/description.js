import OpenAI from "openai";

const OpenAI = new OpenAI({apiKey : process.env.OPENAI_API_KEY});

export const generateDescription = async (req,res) => {
    try {
        const {text} = req.body;

        // Step 1: Translate to English
        const translation = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant that translates text to English." },
                { role: "user", content: `Translate this to English: "${text}"` }
            ]
        });
        
        const translatedText = translation.choices[0].message.content;

        const descriptionResponse = await OpenAI.chat.completion.create({
            model:"gpt-4o-mini",
            message: [
                {role:"system",
                context: "You are are creative marketing assitant."},
                {role: "user",
                    content : `Make this artisan product description SEO-friendly : ${text}`
                }
            ],
                
        });

        const finalDescription = descriptionResponse.choices[0].message.content;
        res.json({ description: finalDescription });

    } catch (err) {
        console.error(err);
        res.status(500).json({error : "Failed to generate description."});
    }
};
