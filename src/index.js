import fs from 'fs';
import path from 'path';
import { _ } from 'cute-con';

export default function fURL(filePath)
{
    const isWebURL = (url) =>
    {
        return url.startsWith('http://') || url.startsWith('https://');
    };

    const softWrite = async (content = '') =>
    {
        if (isWebURL(filePath)) {
            console.warn('Soft write operation is not supported for web URLs.');
            return;
        }

        const directory = path.dirname(filePath);
        fs.mkdirSync(directory, {recursive: true});
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content);
        }
    };

    const hardOverwrite = async (content = '') =>
    {
        if (isWebURL(filePath)) {
            return await fetch(filePath, {
                method: 'PUT',
                body: content,
            });
        }

        const directory = path.dirname(filePath);
        fs.mkdirSync(directory, {recursive: true});
        fs.writeFileSync(filePath, content);
    };

    return {
        soft: {
            write: softWrite,
        },
        hard: {
            overwrite: hardOverwrite,
        },
        PUT: _("not implemented"),
    };
}