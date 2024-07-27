import {GenerateContentRequest, GoogleGenerativeAI, Part } from "@google/generative-ai"
import { useState } from "react";

export default function Chat(){
    const [text , setText] = useState<string>("");
    const [value , setValue] = useState<string | GenerateContentRequest | (string | Part)[]>("")
    const [ loading , setLoading ] = useState<boolean>(false);

    const genAi = new GoogleGenerativeAI("AIzaSyADNAF0oP34P4SYzrdmkExicOmTPhKvzZo");

    const model = genAi.getGenerativeModel({model: "gemini-1.5-flash"})

     async function run(){
        setLoading(true);
        const result = await model.generateContent(value);
        const response = await result.response;
        const textAi = response.text();
        setText(textAi);
        setLoading(false);

      }

      const handle = ()=> {
        run();
      }

    return (
        <>
            <div>{loading ?"Loading" :  text }</div>
            <button onClick={handle}>Click here</button>
            <input onChange={(e) => setValue(e.target.value)}></input>
        </>
    )
}