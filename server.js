// server.js
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import axios from "axios"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// ✅ CORS setup for Netlify
app.use(cors({
    origin: "https://chef-claude-kitchen.netlify.app" // your deployed frontend URL
}))

app.use(express.json())

app.post("/api/recipe", async (req, res) => {
    const { ingredients } = req.body

    try {
        const response = await axios.post(
            "https://api.anthropic.com/v1/messages",
            {
                model: "claude-3-haiku-20240307",
                max_tokens: 1024,
                temperature: 0.7,
                system: `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown.
                `,
                messages: [
                    {
                        role: "user",
                        content: `I have: ${ingredients.join(", ")}. What should I cook?`
                    }
                ]
            },
            {
                headers: {
                    "x-api-key": process.env.CLAUDE_API_KEY,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json"
                }
            }
        )

        res.json({ recipe: response.data.content[0].text })
    } catch (err) {
        console.error("Claude API error:", err.message)
        res.status(500).json({ error: "Failed to get recipe" })
    }
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
