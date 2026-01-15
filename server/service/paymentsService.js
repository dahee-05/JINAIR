const secretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6';

export async function confirmPayment(paymentInfo = {}) {
    const { paymentKey, orderId, amount } = paymentInfo;

    const encryptedSecretKey = 'Basic ' + Buffer.from(secretKey + ':').toString('base64');

    const response = await fetch('http://localhost:3000/booking/success', {
        method: 'POST',
        headers: {
            Authorization: encryptedSecretKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId, amount, paymentKey })
    });

    const data = await response.json();
    console.log(data);

    return data;
}
