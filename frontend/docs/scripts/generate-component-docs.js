const fs = require('fs');
const path = require('path');

/**
 * Extrai informações dos componentes React dos arquivos JSDoc
 */
function extractComponentInfo(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const componentName = path.basename(filePath, '.jsx');
  
  // Extrai o comentário JSDoc
  const jsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsdocMatch) {
    return null;
  }
  
  const jsdoc = jsdocMatch[1];
  
  // Extrai a descrição do componente
  const descriptionMatch = jsdoc.match(/^\s*\*\s*(.+?)(?:\n|$)/);
  const description = descriptionMatch ? descriptionMatch[1].trim() : '';
  
  // Extrai todas as propriedades
  const props = [];
  const propRegex = /@param\s+{Object}\s+props\s+@param\s+{([^}]+)}\s+props\.(\w+)\s+-\s+(.+?)(?=\n\s*\*\s*@param|\n\s*\*\/|$)/gs;
  let propMatch;
  
  // Extrai propriedades individuais
  const propLines = jsdoc.match(/@param\s+{([^}]+)}\s+props\.(\w+)\s+-\s+(.+?)(?=\n|$)/g);
  if (propLines) {
    propLines.forEach(line => {
      const match = line.match(/@param\s+{([^}]+)}\s+props\.(\w+)\s+-\s+(.+)/);
      if (match) {
        const [, type, name, description] = match;
        props.push({
          name: name.trim(),
          type: type.trim(),
          description: description.trim()
        });
      }
    });
  }
  
  return {
    name: componentName,
    description,
    props
  };
}

/**
 * Gera o conteúdo MD do componente
 */
function generateMarkdown(componentInfo) {
  if (!componentInfo) {
    return null;
  }
  
  let md = `# ${componentInfo.name}\n\n`;
  
  if (componentInfo.description) {
    md += `${componentInfo.description}\n\n`;
  }
  
  if (componentInfo.props.length > 0) {
    md += `## Propriedades\n\n`;
    md += `| Propriedade | Tipo | Descrição |\n`;
    md += `|------------|------|-----------|\n`;
    
    componentInfo.props.forEach(prop => {
      // Limpa o tipo removendo caracteres especiais
      const cleanType = prop.type
        .replace(/\|/g, ' \\| ')
        .replace(/"/g, '`')
        .replace(/\s+/g, ' ');
      
      md += `| \`${prop.name}\` | ${cleanType} | ${prop.description} |\n`;
    });
    
    md += `\n`;
  }
  
  md += `## Exemplo\n\n`;
  md += `\`\`\`jsx\n`;
  md += `<${componentInfo.name}\n`;
  md += `  // Adicione as propriedades aqui\n`;
  md += `/>\n`;
  md += `\`\`\`\n`;
  
  return md;
}

/**
 * Processa todos os componentes e gera/atualiza a documentação
 */
function generateComponentDocs() {
  const componentsDir = path.join(__dirname, '../../src/components');
  const docsDir = path.join(__dirname, '../docs/components');
  
  // Garante que o diretório existe
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  // Lista todos os arquivos .jsx no diretório de componentes
  const files = fs.readdirSync(componentsDir)
    .filter(file => file.endsWith('.jsx') && !file.startsWith('_'));
  
  console.log(`Encontrados ${files.length} componentes para documentar:\n`);
  
  files.forEach(file => {
    const componentPath = path.join(componentsDir, file);
    const componentInfo = extractComponentInfo(componentPath);
    
    if (!componentInfo) {
      console.log(`⚠️  ${file}: Não foi possível extrair informações (sem JSDoc)`);
      return;
    }
    
    const mdContent = generateMarkdown(componentInfo);
    const mdPath = path.join(docsDir, `${componentInfo.name}.md`);
    
    // Verifica se o arquivo já existe e tem conteúdo customizado
    let shouldUpdate = true;
    if (fs.existsSync(mdPath)) {
      const existingContent = fs.readFileSync(mdPath, 'utf-8');
      // Se o arquivo tem conteúdo além do básico, não sobrescreve
      if (existingContent.includes('## Exemplo') && existingContent.length > 200) {
        console.log(`✓ ${file}: Documentação já existe e será mantida`);
        shouldUpdate = false;
      }
    }
    
    if (shouldUpdate) {
      fs.writeFileSync(mdPath, mdContent, 'utf-8');
      console.log(`✓ ${file}: Documentação gerada/atualizada`);
    }
  });
  
  // Atualiza o sidebars.js
  updateSidebar(files.map(f => path.basename(f, '.jsx')));
  
  console.log(`\n✅ Documentação gerada com sucesso!`);
}

/**
 * Atualiza o arquivo sidebars.js com os componentes
 */
function updateSidebar(components) {
  const sidebarsPath = path.join(__dirname, '../sidebars.js');
  const sidebarsContent = fs.readFileSync(sidebarsPath, 'utf-8');
  
  // Ordena os componentes alfabeticamente
  const sortedComponents = components.sort();
  
  // Cria a seção de componentes formatada
  const componentSection = sortedComponents
    .map(comp => `        'components/${comp}',`)
    .join('\n');
  
  // Substitui a seção de componentes mantendo a estrutura
  const newSidebars = sidebarsContent.replace(
    /(type: 'category',\s+label: 'Componentes',\s+items: \[)([\s\S]*?)(\s+\],)/,
    `$1\n${componentSection}\n      $3`
  );
  
  fs.writeFileSync(sidebarsPath, newSidebars, 'utf-8');
  console.log(`\n✓ sidebars.js atualizado com ${sortedComponents.length} componentes`);
}

// Executa o script
if (require.main === module) {
  generateComponentDocs();
}

module.exports = { generateComponentDocs, extractComponentInfo };

