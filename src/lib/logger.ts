export type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  context?: Record<string, unknown>
  timestamp?: string
}

export function logger(level: LogLevel, message: string, context?: Record<string, unknown>) {
  const entry: LogEntry = {
    level,
    message,
    context,
    timestamp: new Date().toISOString()
  }
  
  console.log(JSON.stringify(entry))
}

export const log = {
  info: (msg: string, ctx?: Record<string, unknown>) => logger('info', msg, ctx),
  warn: (msg: string, ctx?: Record<string, unknown>) => logger('warn', msg, ctx),
  error: (msg: string, ctx?: Record<string, unknown>) => logger('error', msg, ctx),
  debug: (msg: string, ctx?: Record<string, unknown>) => logger('debug', msg, ctx),
}
