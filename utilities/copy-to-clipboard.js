export default function copyToClipboard(text) {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.value = text;
  input.focus();
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  Alert('Copied to clipboard');
}
