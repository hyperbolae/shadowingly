const { parsers: typescriptParsers } = require("prettier/parser-typescript")

const ts = require("typescript")

const snakeToCamel = (str) => {
  // Preserve single or double underscores at the start
  const prefix = str.match(/^_+/)?.[0] || ""
  const rest = str.slice(prefix.length)
  return prefix + rest.replace(/_([a-z])/g, (g) => g[1].toUpperCase())
}

function transformIdentifiers(sourceFile) {
  const changes = []

  const visitor = (node) => {
    if (ts.isIdentifier(node) && !ts.isJsxAttribute(node.parent)) {
      const newName = snakeToCamel(node.text)
      if (newName !== node.text) {
        changes.push({ pos: node.getStart(), end: node.getEnd(), newName })
      }
    }
    ts.forEachChild(node, visitor)
  }

  visitor(sourceFile)
  return changes
}

function applyChanges(text, changes) {
  changes.sort((a, b) => b.pos - a.pos) // Sort changes in reverse order
  let result = text
  for (const change of changes) {
    result = result.slice(0, change.pos) + change.newName + result.slice(change.end)
  }
  return result
}

function external_interface(filename) {
  return filename.endsWith("tatoeba.ts")
}

module.exports = {
  parsers: {
    typescript: {
      ...typescriptParsers.typescript,
      preprocess: (text, options) => {
        const isTSX = options.filepath && options.filepath.endsWith(".tsx")
        const sourceFile = ts.createSourceFile(
          options.filepath || "temp.ts",
          text,
          ts.ScriptTarget.Latest,
          true,
          isTSX ? ts.ScriptKind.TSX : ts.ScriptKind.TS
        )
        let changes = []
        /* Certain files define TypeScript interfaces which should not be
	     altered. We could get around this by extracting these definitions
	     into a separate package.
	   */
        if (!external_interface(options.filepath)) {
          changes = transformIdentifiers(sourceFile)
        }
        return applyChanges(text, changes)
      }
    }
  }
}
