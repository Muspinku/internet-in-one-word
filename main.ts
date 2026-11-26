// internet-in-one-word - make.fun entry for u-ronigrv-the-internet-in-one-word-e388f33b.
// Node 22, standard library only. Writes the single entry line to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// The entry is a fixed string: the program is deterministic and writes
// exactly this text, no trailing newline, so the gate sees 1-30
// characters of UTF-8 and nothing else.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY = "Unpaid";

// Guard the gate: the entry must stay inside its character cap.
if (ENTRY.length < 1 || ENTRY.length > 30 || !ENTRY.trim()) {
  throw new Error(`entry is ${ENTRY.length} characters, cap is 30`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');
