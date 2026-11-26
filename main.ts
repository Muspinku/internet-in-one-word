// internet-in-one-word - make.fun entry for u-ronigrv-the-internet-in-one-word-e388f33b.
// Node 22, standard library only. Writes the single entry line to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// The entry is a fixed string: the program is deterministic and writes
// exactly this text, no trailing newline, so the gate sees 1-30
// characters of UTF-8 and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The entry: one word for an internet built on unpaid work.
// It has to land in one beat: funny by itself, true of the whole
// internet, and not the first obvious word anyone would reach for.
const ENTRY = "Unpaid";

// Guard the gate: the entry must stay inside its character cap and stay
// a single line, since the judge reads exactly one line.
if (ENTRY.length < 1 || ENTRY.length > 30 || !ENTRY.trim() || ENTRY.includes('\n')) {
  throw new Error(`entry is ${ENTRY.length} characters, cap is 30`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, ENTRY, 'utf8');

// Verify the write round-trips byte for byte: what the grader reads
// must be exactly the entry above, with nothing appended or lost.
if (readFileSync(target, 'utf8') !== ENTRY) {
  throw new Error('entry.txt does not match ENTRY after writing');
}
