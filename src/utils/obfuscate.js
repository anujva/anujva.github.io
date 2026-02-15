/**
 * Anti-scraper obfuscation for contact info.
 *
 * Values are stored as base64( reverse(text) ).  This breaks every common
 * scraper pattern (regex for emails / phone numbers, simple string search,
 * static HTML inspection) while remaining trivial to decode at runtime.
 *
 * encode() is a build-time / one-shot helper.  Only decode() ships in the
 * client bundle in practice.
 */

export function encode(text) {
  return btoa(text.split("").reverse().join(""));
}

export function decode(blob) {
  return atob(blob).split("").reverse().join("");
}
