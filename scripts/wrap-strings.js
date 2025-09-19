// scripts/wrap-strings.js
import { basename } from 'path';

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirty = false;

  const componentName = basename(file.path, '.jsx');
  if (componentName[0] !== componentName[0].toUpperCase()) {
    return null;
  }

  root.find(j.JSXText).forEach(path => {
    const text = path.node.value.trim();
    if (text && /[a-zA-Z]/.test(text)) {
      const expression = j.jsxExpressionContainer(
        j.callExpression(j.identifier('t'), [j.stringLiteral(text)])
      );
      j(path).replaceWith(expression);
      dirty = true;
    }
  });

  if (dirty) {
    addI18nImports(j, root);
  }

  return root.toSource({ quote: 'single', trailingComma: true });
}

function addI18nImports(j, root) {
  const importDeclaration = root.find(j.ImportDeclaration, {
    source: { value: 'react-i18next' },
  });

  if (importDeclaration.length === 0) {
    const reactImport = root.find(j.ImportDeclaration, {
        source: { value: 'react' },
    });
    if (reactImport.length > 0) {
        reactImport.at(0).insertAfter(
            j.importDeclaration(
                [j.importSpecifier(j.identifier('useTranslation'))],
                j.stringLiteral('react-i18next')
            )
        );
    }
  } else {
    const hasImport = importDeclaration.find(j.ImportSpecifier, {
      imported: { name: 'useTranslation' }
    }).length > 0;
    if (!hasImport) {
        importDeclaration.get(0).node.specifiers.push(
            j.importSpecifier(j.identifier('useTranslation'))
        );
    }
  }

  const components = root.find(j.FunctionDeclaration)
    .paths() // Dapatkan path dari hasil find pertama
    .concat(
      root.find(j.ArrowFunctionExpression)
        .filter(p => p.parent.node.type === 'VariableDeclarator')
        .paths() // Dapatkan path dari hasil find kedua
    );
    
  components.forEach(path => {
    const alreadyHasHook = j(path).find(j.VariableDeclarator, {
        id: { name: 't' }
    }).length > 0;

    if (alreadyHasHook) return;

    const body = j(path).get('body');
    
    const hook = j.variableDeclaration('const', [
        j.variableDeclarator(
            j.objectPattern([
            j.property('init', j.identifier('t'), j.identifier('t'))
            ]),
            j.callExpression(j.identifier('useTranslation'), [])
        )
    ]);
    hook.declarations[0].id.properties[0].shorthand = true;

    if (body.node.type === 'BlockStatement') {
        body.get('body').insertAt(0, hook);
    } 
    else {
        const newBody = j.blockStatement([
            hook,
            j.returnStatement(body.node)
        ]);
        j(body).replaceWith(newBody);
    }
  });
}