const openAI = require("openai");
const openai = new openAI.OpenAI({
    apiKey:"XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX"
});

module.exports.findInformationUsingOpenAI = async function(req, res){
        let searchMessage = req.params.message;
         console.log(searchMessage);
        const response = await openai.chat.completions.create({
            model:"gpt-3.5-turbo",
            messages:[{"role":"user","content":searchMessage}],
            max_tokens:200
        })
        let result = response.choices[0].message;
        res.send(result.content);
}

