import React, { useState } from 'react';
import { DEMO_CATALOG_PRODUCTS } from '../data/mediaKitData';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Check, 
  Send, 
  Sparkles, 
  Smartphone, 
  Copy,
  ExternalLink,
  Shirt,
  UtensilsCrossed,
  Trees,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image: string;
}

export const InteractiveCatalogDemo: React.FC = () => {
  const [selectedNiche, setSelectedNiche] = useState<'sportCloset' | 'delivery' | 'madeireiras'>('sportCloset');
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'sc1',
      name: 'Camisa Oficial Seleção Brasileira 2026',
      price: 139.90,
      quantity: 1,
      size: 'G',
      image: DEMO_CATALOG_PRODUCTS.sportCloset[0].image,
    },
  ]);
  const [customerName, setCustomerName] = useState('Cliente Exemplo');
  const [customerAddress, setCustomerAddress] = useState('Rua Coronel Bordini, 450 - Porto Alegre/RS');
  const [paymentMethod, setPaymentMethod] = useState('Pix à vista');
  const [orderNotes, setOrderNotes] = useState('Pode entregar no período da tarde!');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentProducts = DEMO_CATALOG_PRODUCTS[selectedNiche];

  const addToCart = (product: (typeof currentProducts)[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          size: product.sizes[0],
          image: product.image,
        },
      ];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const generateWhatsAppMessage = () => {
    let msg = `🛍️ *NOVO PEDIDO - EVOLUX CATÁLOGO*\n`;
    msg += `--------------------------------------\n`;
    msg += `👤 *Cliente:* ${customerName}\n`;
    msg += `📍 *Endereço/Cidade:* ${customerAddress}\n`;
    msg += `💳 *Pagamento:* ${paymentMethod}\n`;
    if (orderNotes) msg += `📝 *Obs:* "${orderNotes}"\n`;
    msg += `--------------------------------------\n`;
    msg += `📦 *ITENS DO PEDIDO:*\n`;

    cart.forEach((item) => {
      const sizeStr = item.size ? ` [Opção/Medida: ${item.size}]` : '';
      msg += `• ${item.quantity}x ${item.name}${sizeStr} - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });

    msg += `--------------------------------------\n`;
    msg += `💰 *VALOR TOTAL:* R$ ${totalAmount.toFixed(2).replace('.', ',')}\n\n`;
    msg += `_Pedido recebido via Evolux Catálogo (sem taxas ou comissões)._`;
    return msg;
  };

  const handleCheckoutClick = () => {
    setShowOrderModal(true);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#5932EA', '#10B981', '#7C5CFC'],
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-900/60 rounded-3xl border border-slate-800 p-4 sm:p-7 relative overflow-hidden shadow-xl">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#5932EA]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5932EA]/20 border border-[#5932EA]/40 text-[#A78BFA] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulador ao Vivo do Catálogo</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
            Como Funciona a Experiência no Celular
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Teste como o cliente navega pelos produtos da loja e envia o pedido já calculado direto para o WhatsApp do vendedor.
          </p>
        </div>

        {/* Niche Switcher */}
        <div className="flex flex-wrap items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 self-start md:self-auto gap-1">
          <button
            type="button"
            onClick={() => {
              setSelectedNiche('sportCloset');
              setCart([
                {
                  id: 'sc1',
                  name: 'Camisa Oficial Seleção Brasileira 2026',
                  price: 139.90,
                  quantity: 1,
                  size: 'G',
                  image: DEMO_CATALOG_PRODUCTS.sportCloset[0].image,
                },
              ]);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              selectedNiche === 'sportCloset'
                ? 'bg-[#5932EA] text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>Roupas (Sport Closet)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedNiche('delivery');
              setCart([
                {
                  id: 'del1',
                  name: 'Combo Smash Burger Duplo Cheddar Bacon',
                  price: 42.90,
                  quantity: 1,
                  size: 'Combo c/ Fritas e Refri',
                  image: DEMO_CATALOG_PRODUCTS.delivery[0].image,
                },
              ]);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              selectedNiche === 'delivery'
                ? 'bg-[#5932EA] text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Delivery & Gastronomia</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedNiche('madeireiras');
              setCart([
                {
                  id: 'mad1',
                  name: 'Viga de Eucalipto Tratado em Autoclave (Metro)',
                  price: 46.50,
                  quantity: 4,
                  size: '6x12cm (Metro Linear)',
                  image: DEMO_CATALOG_PRODUCTS.madeireiras[0].image,
                },
              ]);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              selectedNiche === 'madeireiras'
                ? 'bg-[#5932EA] text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>Madeireiras (Em Estudo)</span>
          </button>
        </div>
      </div>

      {/* Contextual Banner for Selected Niche */}
      {selectedNiche === 'sportCloset' && (
        <div className="mb-4 p-3 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <Shirt className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span><strong>Case Real de Cliente:</strong> Sport Closet (moda esportiva, agasalhos e camisas) — substitui o envio manual de dezenas de fotos de tamanhos no WhatsApp.</span>
          </span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 hidden sm:inline">
            Moda & Vestuário
          </span>
        </div>
      )}

      {selectedNiche === 'delivery' && (
        <div className="mb-4 p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span><strong>Cardápio Digital Delivery:</strong> Pedidos de comida e bebidas sem pagar taxas de até 27% para aplicativos terceiros.</span>
          </span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 hidden sm:inline">
            Alimentação
          </span>
        </div>
      )}

      {selectedNiche === 'madeireiras' && (
        <div className="mb-4 p-3 rounded-2xl bg-amber-950/20 border border-amber-500/40 text-xs text-amber-200 space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Madeireiras & Insumos B2B — Área de Interesse em Estudo</span>
          </div>
          <p className="text-[11px] text-amber-200/90 leading-relaxed">
            Tenho muito interesse nessa área pelo alto valor de pedido, mas ainda analiso alguns ruídos operacionais de entrada (como o cálculo de cubagem em m³, cortes sob medida e a cotação de frete pesado por carreto). O catálogo aqui serviria para pedidos de peças padrão (vigas, tábuas e chapas compensadas).
          </p>
        </div>
      )}

      {/* Simulator Layout: Products Grid + Live Cart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Products Grid */}
        <div className="lg:col-span-7 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentProducts.map((product) => {
              const inCart = cart.find((i) => i.id === product.id);
              return (
                <div
                  key={product.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-[#5932EA]/60 transition-all flex flex-col group shadow-md"
                >
                  <div className="relative h-32 w-full overflow-hidden bg-slate-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-[#0B0F19]/85 text-[10px] font-bold px-2 py-0.5 rounded-md text-purple-300 border border-purple-500/30">
                      {product.badge}
                    </span>
                  </div>

                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                        {product.category}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400">Preço</div>
                        <div className="text-xs sm:text-sm font-extrabold text-white">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                          inCart
                            ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                            : 'bg-[#5932EA] text-white hover:bg-[#6e46ff]'
                        }`}
                        title="Adicionar à sacola"
                      >
                        {inCart ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>({inCart.quantity})</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Adicionar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Cart & WhatsApp Order Generator */}
        <div className="lg:col-span-5 bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#5932EA] text-white flex items-center justify-center">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Sacola do Pedido</h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'} adicionados
                  </span>
                </div>
              </div>

              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCart([])}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpar</span>
                </button>
              )}
            </div>

            {/* Items in Cart */}
            <div className="divide-y divide-slate-800/60 max-h-48 overflow-y-auto my-2.5 pr-1">
              {cart.length === 0 ? (
                <div className="py-6 text-center text-slate-500 text-xs">
                  Sua sacola está vazia. Adicione um produto ao lado para ver o pedido formatado!
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="py-2 flex items-center justify-between gap-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-9 h-9 rounded-lg object-cover flex-shrink-0 border border-slate-800"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {item.size ? `${item.size} • ` : ''}R$ {item.price.toFixed(2).replace('.', ',')}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Simulated Customer Fields */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-mono">Nome</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full mt-0.5 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-[#5932EA]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-mono">Pagamento</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full mt-0.5 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-[#5932EA]"
                  >
                    <option value="Pix à vista">Pix à vista</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Dinheiro">Dinheiro</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Subtotal & Action */}
          <div className="pt-3 border-t border-slate-800 mt-2">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs text-slate-400">Total do Pedido</span>
              <span className="text-base sm:text-lg font-black text-white">
                R$ {totalAmount.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <button
              type="button"
              disabled={cart.length === 0}
              onClick={handleCheckoutClick}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                cart.length > 0
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ver Pedido Formatado para WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Message Preview Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0B0F19] border border-slate-700 max-w-md w-full rounded-3xl p-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Mensagem Recebida no WhatsApp</h4>
                  <span className="text-[10px] text-slate-400">Chega pronto para o lojista confirmar</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowOrderModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#0a3328] p-3.5 rounded-2xl border border-emerald-800/40 font-mono text-xs text-emerald-100 whitespace-pre-wrap leading-relaxed shadow-inner max-h-64 overflow-y-auto">
              {generateWhatsAppMessage()}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={copyToClipboard}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const encoded = encodeURIComponent(generateWhatsAppMessage());
                  window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Testar no WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
