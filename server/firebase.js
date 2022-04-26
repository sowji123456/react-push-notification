import { getMessaging } from 'firebase-admin/messaging';

export async function sendFCMMessage(fcmToken){
    try {
        const res = await getMessaging().send({
            webpush: {
                notification: {
                    title: 'Message from node',
                    body: 'hey there',
                    icon: 'https://your-website.com/favicon.png',
                },
            },
            token: fcmToken,
        });
        return res;
    } catch (e) {
        console.error('sendFCMMessage error', e);
    }
}