// utils/deleteFile.js
import fs from 'fs';
import path from 'path';

export function deleteFile(filename) {
  const filePath = path.join('uploads', filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}
