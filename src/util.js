import path from 'path';
import homedir from 'homedir';

export const erised_directory = '.erised';
export const erised_path = path.join(homedir(), erised_directory);

export const archive_directory = 'archive';
export const archive_path = path.join(erised_path, archive_directory);
