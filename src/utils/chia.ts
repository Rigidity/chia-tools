import fs from 'fs';
import os from 'os';
import path from 'path';
import yaml from 'yaml';
import { Config } from '../types/chia/Config';

export function getRootPath(name: string = 'chia'): string {
    return (
        process.env.CHIA_ROOT ??
        path.resolve(os.homedir(), `.${name}`, 'mainnet')
    );
}

export function getConfigPath(rootPath: string): string {
    return path.resolve(rootPath, 'config', 'config.yaml');
}

export function getConfig(configPath: string): Config {
    return yaml.parse(fs.readFileSync(configPath, 'utf8'));
}
