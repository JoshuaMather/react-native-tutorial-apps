import * as MailComposer from 'expo-mail-composer';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

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

        const fileName =
            FileSystem.documentDirectory + `test_form_${Date.now()}.json`;
        await FileSystem.writeAsStringAsync(
            fileName,
            JSON.stringify(content)
        ).catch(() => {
            Alert.alert(
                'Error writing data to file.',
                'Unable to create write form data to file.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
            return;
        });

        console.log(fileName);
        attachments.push(fileName);
        // return;

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
            body: 'Test form data included as attachments.',
            recipients: ['jom@gloversure.co.uk'],
            subject: 'Test Form Submitted',
            attachments: attachments,
        });
    };

    return { createEmail };
};
