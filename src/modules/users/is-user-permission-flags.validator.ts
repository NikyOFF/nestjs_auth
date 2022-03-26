export function isUserPermissionFlags(value: unknown): boolean {
  return typeof value === 'number' && value >= 0 && value <= 1;
}
