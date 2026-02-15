export type LogLevel = 'INFO' | 'ERROR' | 'WARN' | 'DEBUG';

const logs: string[] = [];

export default function log(
  message: string,
  level: LogLevel = 'INFO',
  err?: unknown,
): void {
  const timestamp = new Date().toISOString();
  const formatted = `[${timestamp}] [${level}] ${message}`;
  logs.push(formatted);
  console.log(formatted);

  if (err instanceof Error) {
    console.error(err.stack);
  } else if (err) {
    console.error(err);
  }
}
