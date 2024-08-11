import md5 from "md5";

export function getGravatarUrl(email, size = 64) {
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=${size}`;
}