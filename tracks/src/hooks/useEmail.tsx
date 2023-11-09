import * as MailComposer from 'expo-mail-composer';
import { Alert } from 'react-native';

export default () => {
    const createEmail = async (content) => {
        const available = await MailComposer.isAvailableAsync();
        if (!available) {
            Alert.alert(
                'Error Creating Email',
                'Unable to create email for form data.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
            return;
        }

        let attachments = [];
        if (content.imageUrl) {
            attachments.push(content.imageUrl);
        }
        if (Object.keys(content.document).length != 0) {
            console.log('doc', content.document);
            attachments.push(content.document.assets[0].uri);
        }
        if (attachments.length === 0) {
            attachments = null;
        }

        console.log(attachments);

        await MailComposer.composeAsync({
            body: JSON.stringify(content),
            recipients: ['jom@gloversure.co.uk'],
            subject: 'Test Form Submitted',
            attachments: attachments,
        });
    };

    return { createEmail };
};
