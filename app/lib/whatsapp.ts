export function whatsappUrl(number: string, message?: string): string {
  const clean = number.replace(/[^0-9]/g, '');
  return message
    ? `https://wa.me/${clean}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${clean}`;
}
