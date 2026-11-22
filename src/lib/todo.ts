/**
 * Placeholders live in src/config as `TODO(user): …` / `TODO(confirm): …` strings so
 * they are obvious to whoever fills them in. Nothing marked this way is ever rendered.
 */
export function isTodo(value: string | undefined | null): boolean {
  return !value || /^TODO\((user|confirm)\)/i.test(value.trim());
}

/** The value if it is real, otherwise undefined. */
export function real(value: string | undefined | null): string | undefined {
  return isTodo(value) ? undefined : (value ?? undefined);
}
