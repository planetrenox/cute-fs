import fs from 'fs';
import path from 'path';
export default function URL(filePath)
{
    const softWrite = (content) =>
    {
        const directory = path.dirname(filePath);
        fs.mkdirSync(directory, {recursive: true});
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content);
        }
    };

    const hardOverwrite = (content) =>
    {
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
    };
}