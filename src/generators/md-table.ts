export type Record = { [key: string]: any };

export default function createTable(header: Array<string>, records: Array<Record>): string {
  const hd = header.filter(key => records.some(rec => !!toStr(rec[key])));
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

function row(hd: Array<string>, widths: Array<number>, fn: (key: string, width: number) => string): string {
  return `|${hd.map((key, i) => fn(key, widths[i])).join('|')}|`;
}

function maxWidths(hd: Array<string>, records: Array<Record>): Array<number> {
  return hd.map(key => records.map(rec => toStr(rec[key]).length).reduce(max, key.length));
}

function max(a: number, b: number): number {
  return a > b ? a : b;
}

function pad(str: string, len: number): string {
  return ` ${str} ${repeat(' ', len - str.length)}`;
}

function repeat(chr: string, len: number): string {
  return new Array(len + 1).join(chr);
}

function toStr(val: any): string {
  return val === undefined || val === null ? '' : String(val);
}
