import dotenv from 'dotenv';
import log from './src/utils/logger';
import { runLocal } from './src/runner/local.runner';
import { runBs } from './src/runner/bs.runner';

const mode = process.argv[2];
log(`starting run in ${mode} mode`);

dotenv.config();

if (mode === 'bs') {
  runBs();
} else {
  runLocal();
}
