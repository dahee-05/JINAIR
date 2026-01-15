import React from 'react';
import emailjs from "@emailjs/browser";
import { useRef } from "react";

export default function SendEmail() {
    const form = useRef();
    const YOUR_SERVICE_ID = 'service_017dgfp';
    const YOUR_TEMPLATE_ID ='template_fc4sbhb';
    const YOUR_PUBLIC_KEY = 'EnIoNRO6eo5uhtOnt';
    const onSendForm = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, {
                publicKey: YOUR_PUBLIC_KEY,
            })
            .then(
                () => {
                    console.log('성공!');
                },
                (error) => {
                    console.log('실패...', error.text);
                },
            );

    }
const name = '하온';
const date = '2020.12.01';
const order_number = '5249449-45448';
const email = 'deodo@naver.com';
    return (
        <div className="App" style={{ padding: "5em" }}>
            <form ref={form} onSubmit={onSendForm}>
                <input name="name" value={name} /> <br /><br />
                <input name="date" value={date} /> <br /><br />
                <input name="order_number" value={order_number} /> <br /><br />
                <input name="email" value={email} /> <br /><br />
                <button type="submit">이메일 보내기</button>
            </form>
        </div>
    );
}

