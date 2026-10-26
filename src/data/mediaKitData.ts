/**
 * Evolux360 Presentation & Context Data
 * Textos refinados e alinhados com os nichos reais:
 * - Roupas: Sport Closet (case real de cliente)
 * - Gastronomia: Cardápio Digital próprio para delivery
 * - Madeireiras: Área de interesse em estudo (analisando ruídos operacionais de corte e cubagem)
 */

export interface EcosystemModule {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  status: 'Solução Ativa' | 'Em Validação / Fase Inicial';
  color: string;
  iconName: string;
  summary: string;
  description: string;
  roleInBusiness: string;
  howItWorks: string[];
}

export interface TargetMarket {
  id: string;
  title: string;
  subtitle: string;
  highlightTag: string;
  whyThisMarket: string;
  howWeEnter: string;
  relevance: string;
}

export const EVOLUX_BRAND = {
  name: 'Evolux360',
  tagline: 'O Ecossistema de Gestão Inteligente para PMEs',
  primaryColor: '#5932EA',
  colors: {
    primary: '#5932EA',
    primaryLight: '#7C5CFC',
    primaryDark: '#3E1DB8',
    darkNavy: '#0B0F19',
    cardDark: '#121829',
    surfaceSlate: '#1E293B',
  },
  typography: 'Inter, sans-serif',
};

export const EVOLUX_PROJECT = {
  name: 'Evolux360',
  tagline: 'Ecossistema de gestão pensado para pequenos e médios negócios',
  intro: 'Cada solução da Evolux360 cuida de uma etapa fundamental do comércio. O objetivo é tirar o lojista do sufoco do atendimento manual e das ferramentas caras ou complicadas, conectando vitrine, atendimento, gestão e inteligência.',
  catalogFocus: {
    title: 'Evolux Catálogo: O Meu Foco Principal Agora',
    subtitle: 'A porta de entrada e a vitrine do negócio — sem mensalidade, sem taxas, sem surpresas.',
    description: 'Hoje a maioria dos micro e pequenos negócios perde vendas no WhatsApp porque não tem como mostrar os produtos de forma organizada, ou porque não pode pagar R$ 150 a R$ 400 por mês em plataformas de e-commerce tradicionais. O Evolux Catálogo é a solução para isso.',
    howItWorksSummary: 'O cliente acessa pelo celular uma vitrine limpa e rápida, escolhe o que quer, monta a sacola e envia o pedido já estruturado direto para o WhatsApp do lojista, que apenas confirma e recebe.',
    benefits: [
      {
        title: 'Zero Mensalidade e Zero Taxas',
        desc: 'O comerciante não tem custo fixo nem porcentagem descontada de cada venda. O lucro fica 100% com ele.',
      },
      {
        title: 'Pedido Estruturado no WhatsApp',
        desc: 'Acaba com o vai-e-vem de "qual o preço?", "tem foto?", "tem tamanho M?". O pedido já chega com os itens e o valor total.',
      },
      {
        title: 'Fácil para o Cliente Final',
        desc: 'Não precisa baixar aplicativo, não precisa criar senha e carrega em menos de 1 segundo no celular.',
      },
      {
        title: 'Porta de Entrada (Land & Expand)',
        desc: 'É a ferramenta perfeita para atrair o cliente. Uma vez que ele usa e gosta, naturalmente passa a querer o atendimento automático (VendeAI) e o controle de estoque (Core).',
      },
    ],
  },
};

export const ECOSYSTEM_MODULES: EcosystemModule[] = [
  {
    id: 'catalogo',
    name: 'Evolux Catálogo',
    tagline: 'A Porta de Entrada / Vitrine do Negócio',
    badge: '⭐ Meu Foco Principal',
    status: 'Solução Ativa',
    color: '#5932EA',
    iconName: 'ShoppingBag',
    summary: 'Loja e vitrine virtual para micro e pequenos negócios sem mensalidade e sem taxas. O cliente pede e você recebe no WhatsApp.',
    description: 'A alternativa definitiva para o lojista ter presença digital sem custos surpresa. O cliente navega por fotos e categorias, seleciona as variações e finaliza o pedido direto no WhatsApp comercial.',
    roleInBusiness: 'É a vitrine externa: atrai o cliente e fecha o pedido de forma humanizada e rápida.',
    howItWorks: [
      'Sem mensalidade obrigatória e sem comissão por venda',
      'Catálogo organizado por categorias e fotos em alta resolução',
      'Envio do pedido pronto no WhatsApp com 1 clique',
      'Recebimento direto via Pix ou maquininha da loja',
    ],
  },
  {
    id: 'vendeai',
    name: 'VendeAI',
    tagline: 'O Primeiro Contato / Assistente de Atendimento',
    badge: 'Atendimento 24/7',
    status: 'Solução Ativa',
    color: '#3B82F6',
    iconName: 'Bot',
    summary: 'Assistente inteligente que faz o primeiro atendimento, tira dúvidas frequentes sobre produtos e organiza a conversa no WhatsApp.',
    description: 'Conectado ao catálogo de produtos, o VendeAI responde clientes dia e noite, sugere produtos complementares e encaminha a conversa no ponto certo para o lojista fechar.',
    roleInBusiness: 'Garante que nenhuma mensagem fique sem resposta e acelera o tempo de fechamento da venda.',
    howItWorks: [
      'Atendimento automático no WhatsApp em linguagem natural',
      'Consulta em tempo real de produtos e disponibilidade',
      'Reduz em até 80% o tempo gasto respondendo perguntas repetidas',
    ],
  },
  {
    id: 'core',
    name: 'Evolux Core',
    tagline: 'O Coração do Negócio',
    badge: 'Gestão Central',
    status: 'Solução Ativa',
    color: '#10B981',
    iconName: 'Database',
    summary: 'A central única onde ficam registrados todos os dados de CRM de clientes, vendas, controle de estoque e transações financeiras.',
    description: 'Substitui o caderninho, planilhas soltas e ERPs complicados. É onde o comerciante vê o dinheiro entrando, o estoque atualizado e quem são seus melhores clientes.',
    roleInBusiness: 'O centro nervoso que organiza a operação para o negócio não ter prejuízo nem descontrole.',
    howItWorks: [
      'Histórico completo de compras e dados de clientes (CRM)',
      'Controle unificado de estoque físico e pedidos digitais',
      'Fluxo de caixa claro e conciliação simplificada',
    ],
  },
  {
    id: 'evolux_ai',
    name: 'Evolux AI',
    tagline: 'Inteligência de Vendas e Ações de Marketing',
    badge: 'Recomendações IA',
    status: 'Solução Ativa',
    color: '#8B5CF6',
    iconName: 'Sparkles',
    summary: 'Inteligência Artificial que, baseada nos dados do CORE, recomenda ações práticas e campanhas de marketing para impulsionar as vendas.',
    description: 'Em vez de apenas mostrar gráficos que ninguém entende, a Evolux AI avisa: "O cliente X não compra há 30 dias, envie este cupom", ou "O produto Y vai faltar na próxima semana".',
    roleInBusiness: 'Atua como um consultor comercial que aponta onde está o dinheiro esquecido no negócio.',
    howItWorks: [
      'Avisa sobre clientes inativos para reativação rápida',
      'Sugere promoções baseadas no que tem mais ou menos giro',
      'Gera textos prontos para postar e mandar no WhatsApp',
    ],
  },
  {
    id: 'vision',
    name: 'Evolux Vision',
    tagline: 'Entrada Automática de Notas Fiscais em Segundos',
    badge: 'Visão Computacional',
    status: 'Solução Ativa',
    color: '#EC4899',
    iconName: 'ScanLine',
    summary: 'Lê fotos ou PDFs de Notas Fiscais (Danfe/NFe) para dar entrada no estoque e atualizar o financeiro automaticamente em segundos.',
    description: 'Elimina uma das maiores dores de cabeça do lojista: passar horas digitando códigos, preços de custo e parcelas de boleto de mercadorias que chegam dos fornecedores.',
    roleInBusiness: 'Devolve horas de vida ao comerciante e impede erros de cálculo de custo e estoque.',
    howItWorks: [
      'Basta tirar uma foto ou subir o PDF da nota fiscal',
      'Identifica produtos, quantidades, tributos e valores de custo',
      'Lança parcelas no contas a pagar automaticamente',
    ],
  },
  {
    id: 'finance',
    name: 'Evolux Finance',
    tagline: 'Análise de Crédito e Fidelização no Varejo',
    badge: 'Fase Inicial / Roadmap',
    status: 'Em Validação / Fase Inicial',
    color: '#F59E0B',
    iconName: 'CreditCard',
    summary: 'Solução de análise de dados de crédito para facilitar a fidelização de clientes e compras a prazo seguras no varejo.',
    description: 'Muitos comércios pequenos vendem no "fiado" de forma arriscada ou perdem vendas por não terem maquininha com juros baixos. O Finance estuda dados para viabilizar crediário e fidelização sustentável.',
    roleInBusiness: 'Futura alavanca de retenção e crédito consciente para o pequeno comerciante.',
    howItWorks: [
      'Histórico de pontualidade de pagamento dos clientes',
      'Régua amigável de lembretes antes do vencimento',
      'Fase inicial de modelagem e testes com parceiros',
    ],
  },
];

export const TARGET_MARKETS: TargetMarket[] = [
  {
    id: 'paraguai',
    title: '1. Mercado Latam / Paraguai',
    subtitle: 'O "Mar Azul" do comércio pelo WhatsApp',
    highlightTag: 'Alta Demanda • Pouca Concorrência',
    whyThisMarket: 'No Paraguai (em centros como Ciudad del Este, Pedro Juan Caballero e Assunção), praticamente todo mundo vende pelo WhatsApp. Porém, pouquíssimas lojas têm um catálogo digital organizado. Os vendedores perdem um tempo absurdo enviando foto por foto manualmente.',
    howWeEnter: 'Entrar com o Evolux Catálogo como a vitrine padrão de produtos com suporte a preços em Dólar (USD), Guaranis (PYG) e Reais (BRL). É um mar azul porque não há grandes concorrentes brasileiros consolidados por lá.',
    relevance: 'Potencial de adoção rápida e boca a boca entre lojistas e distribuidores de fronteira.',
  },
  {
    id: 'fecomercio',
    title: '2. Rio Grande do Sul & Fecomércio',
    subtitle: 'Acesso qualificado a milhares de negócios do estado',
    highlightTag: 'Vínculo Estratégico • Capilaridade',
    whyThisMarket: 'Tenho vínculo com o Fecomércio-RS, o que me dá canal aberto e credibilidade para conversar diretamente com os negócios filiados aos sindicatos do estado. Os comerciantes precisam de ferramentas acessíveis para vender sem custos fixos abusivos.',
    howWeEnter: 'Apresentar o Evolux Catálogo segmentado para as 4 grandes áreas atendidas pelo Fecomércio: Varejo (moda, alimentos, materiais de construção), Atacado (distribuidoras e insumos), Serviços e Turismo/Gastronomia.',
    relevance: 'Permite chegar com confiança e autoridade institucional em milhares de empresas gaúchas.',
  },
  {
    id: 'base-crm',
    title: '3. Reativação da Base de Clientes',
    subtitle: 'Reativando contatos frios com uma oferta sem risco',
    highlightTag: 'Ativo Existente • Sem Custo de Aquisição',
    whyThisMarket: 'Eu já possuo uma base com vários negócios de diferentes lugares do Brasil. Em vez de tentar empurrar um sistema complexo, a estratégia é entregar valor imediato.',
    howWeEnter: 'Reativar essa base oferecendo o Evolux Catálogo sem mensalidade: "Monte sua vitrine no WhatsApp em 10 minutos sem pagar nada". Quando o comerciante começar a receber pedidos, ele mesmo sentirá necessidade de plugar o VendeAI e o Core.',
    relevance: 'Transforma contatos parados em usuários ativos sem precisar gastar dinheiro com anúncios frios.',
  },
];

export const FECOMERCIO_SECTORS_SUMMARY = [
  {
    sector: 'Varejo (Comércio de Bens)',
    desc: 'Supermercados, hortifrútis, lojas de roupas, calçados, autopeças, motopeças, materiais de construção, farmácias, cosméticos e pet shops.',
    solution: 'O catálogo resolve o caos de mandar dezenas de fotos soltas para clientes que querem ver produtos e preços rápidos.',
  },
  {
    sector: 'Comércio Atacadista & Insumos',
    desc: 'Distribuidores de alimentos, bebidas, madeireiras, insumos químicos, ferragens, tecidos e descartáveis.',
    solution: 'Catálogo ágil B2B para pedidos recorrentes de clientes em grandes volumes sem erros de digitação.',
  },
  {
    sector: 'Setor de Serviços',
    desc: 'TI, serviços terceirizados, imobiliárias, contabilidades, consultorias e estética automotiva.',
    solution: 'Vitrine clara de pacotes de serviços e planos com agendamento facilitado direto no WhatsApp.',
  },
  {
    sector: 'Turismo e Hospitalidade',
    desc: 'Restaurantes, bares, cafeterias, pousadas, hotéis e lazer.',
    solution: 'Cardápio digital e canal de pedidos próprio sem precisar pagar comissões abusivas de até 27% para aplicativos terceiros.',
  },
];

export const DEMO_CATALOG_PRODUCTS = {
  sportCloset: [
    {
      id: 'sc1',
      name: 'Camisa Oficial Seleção Brasileira 2026',
      category: 'Camisas de Time',
      price: 139.90,
      image: 'https://images.unsplash.com/photo-1577212017184-80cc0da11082?w=500&auto=format&fit=crop&q=80',
      badge: 'Mais Vendida',
      sizes: ['P', 'M', 'G', 'GG'],
      description: 'Tecido tecnológico respirável AeroReady, escudo bordado em alta definição e caimento atlético perfeito.',
    },
    {
      id: 'sc2',
      name: 'Conjunto Corta-Vento Sport Pro Impermeável',
      category: 'Agasalhos & Corta-Vento',
      price: 199.90,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80',
      badge: 'Lançamento',
      sizes: ['M', 'G', 'GG'],
      description: 'Proteção contra vento e chuva leve, capuz ajustável e forro interno com respirabilidade térmica.',
    },
    {
      id: 'sc3',
      name: 'Bermuda Treino Dry Fit com Bolsos Zíper',
      category: 'Bermudas & Treino',
      price: 79.90,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=80',
      badge: 'Treino Diário',
      sizes: ['P', 'M', 'G'],
      description: 'Cós elástico com cordão, bolsos laterais reforçados com zíper invisível para celular e chaves.',
    },
  ],
  delivery: [
    {
      id: 'del1',
      name: 'Combo Smash Burger Duplo Cheddar Bacon',
      category: 'Burgers & Combos',
      price: 42.90,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
      badge: 'Combo Campeão',
      sizes: ['Combo c/ Fritas e Refri', 'Individual'],
      description: 'Dois smashs de 90g bovino angus, queijo cheddar inglês derretido, fatias crocantes de bacon e maionese artesanal.',
    },
    {
      id: 'del2',
      name: 'Pizza Artesanal 8 Fatias Meio a Meio',
      category: 'Pizzas',
      price: 64.90,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
      badge: 'Forno à Lenha',
      sizes: ['Grande 35cm'],
      description: 'Massa de fermentação lenta 48h. Escolha até 2 sabores (ex: Calabresa Especial e Quatro Queijos Selecionados).',
    },
    {
      id: 'del3',
      name: 'Copo da Felicidade Açaí Trufado 500ml',
      category: 'Sobremesas & Açaí',
      price: 26.00,
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&auto=format&fit=crop&q=80',
      badge: 'Favorito',
      sizes: ['500ml'],
      description: 'Açaí puro batido sem xarope excessivo, camadas de leite ninho em pó, morangos frescos e Nutella cremosa.',
    },
  ],
  madeireiras: [
    {
      id: 'mad1',
      name: 'Viga de Eucalipto Tratado em Autoclave (Metro)',
      category: 'Madeira Bruta & Estrutura',
      price: 46.50,
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=80',
      badge: 'Garantia 15 Anos',
      sizes: ['6x12cm (Metro Linear)', '6x16cm (Metro Linear)'],
      description: 'Tratamento CCA em autoclave contra cupins e umidade. Ideal para coberturas, pérgolas, galpões e decks.',
    },
    {
      id: 'mad2',
      name: 'Tábua de Pinus Aparelhada 2,5x30cm (3m)',
      category: 'Tábuas & Marcenaria',
      price: 38.00,
      image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=500&auto=format&fit=crop&q=80',
      badge: 'Seca em Estufa',
      sizes: ['Peça 3 Metros'],
      description: 'Madeira clara aparelhada nos 4 lados, sem empenos, pronta para móveis rústicos, prateleiras e formas.',
    },
    {
      id: 'mad3',
      name: 'Chapa de Compensado Naval 18mm (2,20x1,60m)',
      category: 'Chapas & Painéis',
      price: 185.00,
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=80',
      badge: 'Alta Densidade',
      sizes: ['Chapa 18mm Inteira'],
      description: 'Lâminas coladas com resina fenólica resistente à água. Excelente para marcenaria náutica e áreas molhadas.',
    },
  ],
};
