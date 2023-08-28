import fs from 'fs';
import path from 'path'
import url from 'url';
import { Account } from './account';


const currentFilePath = url.fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const filePath = path.join(currentDir, '../db/data.json');
export const saveDB = (data: Account[]) => {
    fs.writeFileSync(filePath, JSON.stringify(data));
}

export const readDB = () => {
    if (fs.existsSync(filePath) && fs.readFileSync(filePath, { encoding: 'utf-8' }).length > 0) {
        const info = fs.readFileSync(filePath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        return data;
    }
    return null;
}