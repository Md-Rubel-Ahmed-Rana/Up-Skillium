import { v4 as uuidv4 } from "uuid";

/**
 * UUID Service
 * -------------
 * Provides various utility methods to generate UUIDs
 * (Universally Unique Identifiers) in different formats.
 */
class Service {
  /**
   * Generates a standard UUID v4.
   *
   * @example
   * ```ts
   * UUIDService.generateFull();
   * // "e7c51a77-95c0-4d61-9b09-65ac1a09f4f1"
   * ```
   *
   * @returns {string} A full UUID (e.g., "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
   */
  public generateFull(): string {
    return uuidv4();
  }

  /**
   * Generates and returns the first segment of a UUID.
   *
   * Useful for short unique identifiers such as temporary tokens or reference codes.
   *
   * @example
   * ```ts
   * UUIDService.generateFirstPart();
   * // "e7c51a77"
   * ```
   *
   * @returns {string} The first segment (before the first dash) of a UUID.
   */
  public generateFirstPart(): string {
    return uuidv4().split("-")[0];
  }

  /**
   * Generates and returns the last segment of a UUID.
   *
   * Useful for short but less predictable unique IDs.
   *
   * @example
   * ```ts
   * UUIDService.generateLastPart();
   * // "65ac1a09f4f1"
   * ```
   *
   * @returns {string} The last segment (after the last dash) of a UUID.
   */
  public generateLastPart(): string {
    const parts = uuidv4().split("-");
    return parts[parts.length - 1];
  }

  /**
   * Generates a UUID without any dashes.
   *
   * Useful for compact identifiers that still maintain UUID randomness.
   *
   * @example
   * ```ts
   * UUIDService.generateWithoutDash();
   * // "e7c51a7795c04d619b0965ac1a09f4f1"
   * ```
   *
   * @returns {string} A UUID string with all dashes removed.
   */
  public generateWithoutDash(): string {
    return uuidv4().replace(/-/g, "");
  }

  /**
   * Generates a custom-length UUID substring (without dashes).
   *
   * Useful for generating fixed-length unique codes like:
   * - Order IDs
   * - Reference numbers
   * - API keys
   *
   * @param {number} [length=8] - The desired length of the generated string.
   *
   * @example
   * ```ts
   * UUIDService.generateCustom();      // Default 8 characters
   * // "e7c51a77"
   *
   * UUIDService.generateCustom(12);    // Custom length
   * // "e7c51a7795c0"
   * ```
   *
   * @returns {string} A substring of the UUID (without dashes) of the given length.
   */
  public generateCustom(length: number = 8): string {
    return this.generateWithoutDash().slice(0, length);
  }
}

/**
 * Exported singleton instance of the UUID service.
 * Provides various utility methods to generate UUIDs
 * (Universally Unique Identifiers) in different formats.
 */
export const UUIDService = new Service();
