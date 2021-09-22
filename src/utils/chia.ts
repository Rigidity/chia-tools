import fs from 'fs';
import os from 'os';
import path from 'path';
import yaml from 'yaml';
import { Config } from '../types/chia/Config';

export const rootPath = path.resolve(
    os.homedir(),
    process.env.CHIA_ROOT ?? '.chia/mainnet'
);
export const configPath = path.resolve(rootPath, 'config', 'config.yaml');
export const config = yaml.parse(fs.readFileSync(configPath, 'utf8')) as Config;
