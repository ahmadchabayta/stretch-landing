export default function cn(...inputs) {
  const classes = [];
  for (const input of inputs) {
    if (typeof input === "string") {
      classes.push(input);
    } else if (typeof input === "object" && input !== null) {
      for (const key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(" ");
}
