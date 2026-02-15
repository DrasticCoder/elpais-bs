export type LogLevel = 'INFO' | 'ERROR' | 'WARN' | 'DEBUG';

const logs: string[] = [];

export default function log(message: string, level: LogLevel = 'INFO', err?: unknown) {
  const timestamp = new Date().toISOString();
  const log = `[${timestamp}] [${level}] ${message}`;
  logs.push(log);
  console.log(log);
  if(err){
    console.error(err)
  }
}
