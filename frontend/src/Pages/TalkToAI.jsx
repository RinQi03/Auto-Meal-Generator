import React, {useState} from "react";

function TalkToAI (){

    const [prompt, setPrompt] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const listenURL = "http://"+import.meta.env.VITE_BACKEND_DOMAIN+":"+import.meta.env.VITE_BACKEND_PORT+"/api/connect"

    function handleForm (event){
        event.preventDefault();
        let input = {
            JSONPrompt : prompt
        }
        fetch((listenURL+"/talktoai").toString(),{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body:JSON.stringify (input)
        }).then(response => response.json())
        .then(data=>{
            var res = data["aiRes"];
            console.log("res:",res);
            setTextareaValue(res);
        })
        console.log(prompt);
    }









    return (
        <>
            <h2>Proof of connecting to Express and using GEMINI API</h2>
            <br></br>
            <form onSubmit={handleForm}>
                <p className="border-solid border">Enter your message of talking to GEMINI in the following box:</p>
                <input type = "text" name = "prompt" onChange = {e => setPrompt(e.target.value)}/>
                <br></br>
                <input type = "submit" value = "submit" />
                <br></br>
                <br></br>
                <textarea name="formText" placeholder = "Response" readOnly rows = {4} cols = {40} value = {textareaValue}></textarea>
            </form>
            <br></br>
            
            
                

        </>
    )
}

export default TalkToAI;