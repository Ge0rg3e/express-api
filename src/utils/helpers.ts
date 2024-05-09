import os from 'os';

/**
 * Logs messages to the console with appropriate colors and tags based on the log level.
 *
 * @param level The log level ('info', 'warn', or 'error').
 * @param content The content to be logged.
 */
export const logger = (level: 'info' | 'warn' | 'error', ...content: any[]) => {
	// Define colors for different log levels
	const colors = {
		reset: '\x1b[0m',
		gray: '\x1b[90m',
		black: '\x1b[30m',
		red: '\x1b[31m',
		green: '\x1b[32m',
		yellow: '\x1b[33m',
		blue: '\x1b[34m',
		magenta: '\x1b[35m',
		cyan: '\x1b[36m',
		white: '\x1b[37m',
		underline: '\x1b[4m'
	} as Record<string, string>;

	// Define prefix and color for each log level
	let prefix = '';
	if (level === 'error') prefix = '{red}ERROR{reset} ->';
	if (level === 'warn') prefix = '{yellow}WARN{reset} ->';
	if (level === 'info') prefix = '{green}INFO{reset} ->';

	// Replace color placeholders with actual ANSI escape codes
	const replaceColors = (text: string) => {
		return text.replace(/\{(.*?)\}/g, (_, color) => {
			return colors[color] || '';
		});
	};

	// Format and log the content
	const formattedContent = [prefix, ...content, '{reset}'].map((item: any) => {
		if (typeof item === 'string') {
			return replaceColors(item);
		}
		return item;
	});

	console.log(...formattedContent);
};

/**
 * Retrieves the IPv4 address of the system.
 *
 * @returns The IPv4 address of the system or '127.0.0.1' if not found.
 */
export const getSystemIPv4 = () =>
	Object.values(os.networkInterfaces())
		.flat()
		.find(({ family, internal }: any) => family === 'IPv4' && !internal)?.address || '127.0.0.1';
