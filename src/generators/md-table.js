export default function createTable(header, records) {
  const hd = header.filter(key => records.some(rec => toStr(rec[key])));
  const widths = maxWidths(hd, records);
  const lines = [
    row(hd, widths, pad),
    row(hd, widths, (key, width) => repeat('-', width + 2)),
  ];
  records.forEach(rec => {
    lines.push(row(hd, widths, (key, width) => pad(toStr(rec[key]), width)));
  });
  return lines.join('\n');
}

function row(hd, widths, fn) {
  return `|${hd.map((key, i) => fn(key, widths[i])).join('|')}|`;
}

function maxWidths(hd, records) {
  return hd.map(key => records.map(rec => toStr(rec[key]).length).reduce(max, key.length));
}

function max(a, b) {
  return a > b ? a : b;
}

function pad(str, len) {
  return ` ${str} ${repeat(' ', len - str.length)}`;
}

function repeat(chr, len) {
  return new Array(len + 1).join(chr);
}

function toStr(val) {
  return val === undefined || val === null ? '' : String(val);
}
