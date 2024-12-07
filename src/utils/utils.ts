import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function calculateRelativeTime(isoDate: string): string {
  const timestamp = new Date(isoDate).getTime();
  const now = Date.now();
  let difference = Math.floor((now - timestamp) / 1000);

  const formatter = new Intl.RelativeTimeFormat(`en`, { style: `narrow` });

  const units: { unit: Intl.RelativeTimeFormatUnit; limit: number }[] = [
    { unit: "second", limit: 60 },
    { unit: "minute", limit: 60 },
    { unit: "hour", limit: 24 },
    { unit: "day", limit: 30 },
    { unit: "month", limit: 12 },
    { unit: "year", limit: 60 },
  ];

  for (let i = 0; i < units.length; i++) {
    if (difference < units[i].limit || i === units.length - 1) {
      return formatter.format(-difference, units[i].unit);
    }
    difference = Math.floor(difference / units[i].limit);
  }

  return "";
}
