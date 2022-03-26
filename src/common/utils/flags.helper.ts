export class FlagsHelper {
  public static has(initialFlags: number, flags: number): boolean {
    return !!(initialFlags & flags);
  }

  public static enable(initialFlags: number, flags: number): number {
    return initialFlags | flags;
  }

  public static disable(initialFlags: number, flags: number): number {
    return initialFlags ^ flags;
  }
}
