import fs from 'fs';
import path from 'path';
import axios from 'axios';
class UrlHandler
{
    constructor()
    {
        this._isHard = false;
    }

    get soft()
    {
        this._isHard = false;
        return this;
    }

    get hard()
    {
        this._isHard = true;
        return this;
    }

    url(inputPath)
    {
        this.basePath = inputPath.startsWith('/') ? path.resolve(inputPath) : inputPath;
        return this;
    }

    async write(content)
    {
        const ensureDir = (dirPath) =>
        {
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, {recursive: true});
            }
        };

        if (this.basePath.includes('://')) {
            throw new Error('Writing to a web URL is not supported.');
        }
        else {
            const fullPath = path.resolve(this.basePath);
            if (fullPath.endsWith('/')) {
                ensureDir(fullPath);
            }
            else {
                ensureDir(path.dirname(fullPath));
                if (this.isHard || !fs.existsSync(fullPath)) {
                    fs.writeFileSync(fullPath, content);
                }
            }
        }

        return this;
    }

    async overwrite(content)
    {
        this.isHard = true; // Force hard behavior for overwrite
        return this.write(content);
    }

    async read()
    {
        const readDirOrFile = (dirOrFilePath) =>
        {
            if (fs.existsSync(dirOrFilePath)) {
                if (fs.lstatSync(dirOrFilePath).isDirectory()) {
                    return fs.readdirSync(dirOrFilePath);
                }
                else {
                    return fs.readFileSync(dirOrFilePath, 'utf-8');
                }
            }
            else if (this.isHard) {
                if (dirOrFilePath.endsWith('/')) {
                    fs.mkdirSync(dirOrFilePath, {recursive: true});
                }
                else {
                    const dirPath = path.dirname(dirOrFilePath);
                    fs.mkdirSync(dirPath, {recursive: true});
                    fs.writeFileSync(dirOrFilePath, '');
                }
                return '';
            }
            throw new Error('Path does not exist.');
        };

        if (this.basePath.includes('://')) {
            // Handle web URL
            try {
                const response = await axios.get(this.basePath);
                return response.data;
            }
            catch (error) {
                if (this.isHard) {
                    // In hard mode, attempt to create resources or return an empty structure
                    return '';
                }
                throw error;
            }
        }
        else {
            return readDirOrFile(path.resolve(this.basePath));
        }
    }
}

// Exposing a function directly to align with the specification
export function url(inputPath)
{
    const handler = new UrlHandler();
    return handler.url(inputPath);
}