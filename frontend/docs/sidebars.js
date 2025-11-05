/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Componentes',
      items: [
        'components/Button',
        'components/ButtonMenu',
        'components/ButtonOptions',
        'components/CardVector',
        'components/Comment',
        'components/Header',
        'components/Icons',
        'components/MiniCard',
        'components/SidebarMenu',
        'components/Wave',
      
      
      ],
    },
    {
      type: 'category',
      label: 'Páginas',
      items: [
        'pages/overview',
      ],
    },
    {
      type: 'category',
      label: 'Guia de Estilos',
      items: [
        'styles/guide',
      ],
    },
  ],
};

module.exports = sidebars;

