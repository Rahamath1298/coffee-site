import { useState, useMemo } from 'react';
import { products, categories, Product } from './data/products';
import { Search, ShoppingCart, X, Plus, Minus, Trash2, Coffee, Star, Filter, Check, ArrowLeft } from 'lucide-react';

interface CartItem {
  product: Product;
  quantity: number;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some((note) => note.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handlePlaceOrder = () => {
    setCheckoutStep('success');
    setCart([]);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
    setCheckoutStep('cart');
  };

  const getCartQuantity = (productId: number) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#2c1810]/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Coffee className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
              <h1 className="text-xl sm:text-2xl font-bold text-amber-50 tracking-wide">
                Ember <span className="text-amber-400">&</span> Bloom
              </h1>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-200/60" />
                <input
                  type="text"
                  placeholder="Search coffees, origins, flavors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#3d2518] border border-amber-900/30 rounded-full text-amber-50 placeholder-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-amber-700/30 hover:bg-amber-700/50 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-amber-100" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-[#2c1810] text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar - Mobile */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-200/60" />
              <input
                type="text"
                placeholder="Search coffees, origins, flavors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#3d2518] border border-amber-900/30 rounded-full text-amber-50 placeholder-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2c1810] via-[#3d2518] to-[#1a0f0a] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center">
            <p className="text-amber-400 text-sm sm:text-base font-medium tracking-widest uppercase mb-3">
              Specialty Coffee Roasters
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-amber-50 mb-4 sm:mb-6 leading-tight">
              Exceptional Beans,<br />
              <span className="text-amber-400">Extraordinary Moments</span>
            </h2>
            <p className="text-amber-200/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Hand-selected single origins and artisan blends, roasted in small batches
              to bring out the unique character of each bean.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-[#2c1810]">Our Collection</h3>
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="sm:hidden flex items-center gap-2 px-4 py-2 bg-[#2c1810] text-amber-50 rounded-full text-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Desktop Filters */}
          <div className="hidden sm:flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#2c1810] text-amber-50 shadow-md'
                    : 'bg-white text-[#2c1810] hover:bg-amber-50 border border-amber-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile Filters */}
          {mobileFiltersOpen && (
            <div className="sm:hidden flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setMobileFiltersOpen(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#2c1810] text-amber-50 shadow-md'
                      : 'bg-white text-[#2c1810] hover:bg-amber-50 border border-amber-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartQuantity={getCartQuantity(product.id)}
              onAddToCart={() => addToCart(product)}
              onViewDetails={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Coffee className="w-16 h-16 text-amber-300 mx-auto mb-4" />
            <p className="text-[#2c1810]/60 text-lg">No coffees found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-6 py-2 bg-[#2c1810] text-amber-50 rounded-full text-sm hover:bg-[#3d2518] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          cartQuantity={getCartQuantity(selectedProduct.id)}
          onAddToCart={() => addToCart(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseCart}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#faf7f2] shadow-2xl flex flex-col">
            {checkoutStep === 'cart' && (
              <CartPanel
                cart={cart}
                cartTotal={cartTotal}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onCheckout={handleCheckout}
                onClose={handleCloseCart}
              />
            )}
            {checkoutStep === 'checkout' && (
              <CheckoutPanel
                cart={cart}
                cartTotal={cartTotal}
                onBack={() => setCheckoutStep('cart')}
                onPlaceOrder={handlePlaceOrder}
                onClose={handleCloseCart}
              />
            )}
            {checkoutStep === 'success' && (
              <SuccessPanel onClose={handleCloseCart} />
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#2c1810] text-amber-200/60 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Coffee className="w-5 h-5 text-amber-400" />
            <span className="text-amber-50 font-semibold">Ember & Bloom</span>
          </div>
          <p className="text-sm">Crafted with passion. Roasted with care.</p>
          <p className="text-xs mt-2 text-amber-200/40">© 2026 Ember & Bloom Coffee Roasters. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Product Card Component
function ProductCard({
  product,
  cartQuantity,
  onAddToCart,
  onViewDetails,
}: {
  product: Product;
  cartQuantity: number;
  onAddToCart: () => void;
  onViewDetails: () => void;
}) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100/50">
      {/* Product Image Area */}
      <div
        className="relative h-48 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center cursor-pointer"
        onClick={onViewDetails}
      >
        <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{product.image}</span>
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-[#2c1810]/90 text-amber-100 text-xs font-medium rounded-full">
            {product.roast} Roast
          </span>
        </div>
        {cartQuantity > 0 && (
          <div className="absolute top-3 right-3">
            <span className="w-7 h-7 bg-amber-500 text-[#2c1810] text-xs font-bold rounded-full flex items-center justify-center shadow-md">
              {cartQuantity}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3
            className="font-semibold text-[#2c1810] text-lg leading-tight cursor-pointer hover:text-amber-700 transition-colors"
            onClick={onViewDetails}
          >
            {product.name}
          </h3>
          <span className="text-lg font-bold text-amber-700 whitespace-nowrap ml-2">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-[#2c1810]/50 mb-2">{product.origin} · {product.weight}</p>

        {/* Flavor Notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="px-2 py-0.5 bg-amber-50 text-amber-800 text-xs rounded-full border border-amber-100"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Rating & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-[#2c1810]/70">{product.rating}</span>
          </div>
          <button
            onClick={onAddToCart}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#2c1810] hover:bg-[#3d2518] text-amber-50 rounded-full text-sm font-medium transition-all hover:shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// Product Detail Modal
function ProductDetailModal({
  product,
  cartQuantity,
  onAddToCart,
  onClose,
}: {
  product: Product;
  cartQuantity: number;
  onAddToCart: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#faf7f2] rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors z-10"
        >
          <X className="w-5 h-5 text-[#2c1810]" />
        </button>

        {/* Image */}
        <div className="h-56 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center rounded-t-2xl">
          <span className="text-8xl">{product.image}</span>
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-2xl font-bold text-[#2c1810]">{product.name}</h2>
            <span className="text-2xl font-bold text-amber-700">${product.price.toFixed(2)}</span>
          </div>

          <p className="text-sm text-[#2c1810]/50 mb-4">{product.origin} · {product.weight} · {product.roast} Roast</p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-sm font-medium text-[#2c1810]/70">{product.rating}</span>
            </div>
            <span className="text-[#2c1810]/20">·</span>
            <span className="text-sm text-amber-700 font-medium">{product.category}</span>
          </div>

          <p className="text-[#2c1810]/70 leading-relaxed mb-6">{product.description}</p>

          {/* Flavor Notes */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#2c1810] mb-2">Tasting Notes</h4>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1.5 bg-amber-50 text-amber-800 text-sm rounded-full border border-amber-200"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={onAddToCart}
            className="w-full py-3.5 bg-[#2c1810] hover:bg-[#3d2518] text-amber-50 rounded-xl font-semibold text-base transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartQuantity > 0 ? `Add Another (${cartQuantity} in cart)` : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Cart Panel
function CartPanel({
  cart,
  cartTotal,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  onClose,
}: {
  cart: CartItem[];
  cartTotal: number;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-amber-100">
        <h2 className="text-xl font-bold text-[#2c1810] flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Your Cart
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-amber-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-[#2c1810]" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <Coffee className="w-16 h-16 text-amber-200 mx-auto mb-4" />
            <p className="text-[#2c1810]/50 text-lg">Your cart is empty</p>
            <p className="text-[#2c1810]/30 text-sm mt-1">Add some delicious coffee!</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.product.id} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-amber-50">
              <div className="w-14 h-14 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">{item.product.image}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#2c1810] text-sm truncate">{item.product.name}</h4>
                <p className="text-amber-700 font-medium text-sm">${item.product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(item.product.id, -1)}
                  className="w-8 h-8 flex items-center justify-center bg-amber-50 hover:bg-amber-100 rounded-full transition-colors"
                >
                  <Minus className="w-3.5 h-3.5 text-[#2c1810]" />
                </button>
                <span className="w-6 text-center font-semibold text-[#2c1810] text-sm">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.product.id, 1)}
                  className="w-8 h-8 flex items-center justify-center bg-amber-50 hover:bg-amber-100 rounded-full transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-[#2c1810]" />
                </button>
              </div>
              <button
                onClick={() => onRemove(item.product.id)}
                className="p-1.5 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-400 hover:text-red-600" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Cart Footer */}
      {cart.length > 0 && (
        <div className="border-t border-amber-100 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[#2c1810]/60">Subtotal</span>
            <span className="text-xl font-bold text-[#2c1810]">${cartTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-all hover:shadow-lg active:scale-[0.98]"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </>
  );
}

// Checkout Panel
function CheckoutPanel({
  cart,
  cartTotal,
  onBack,
  onPlaceOrder,
  onClose,
}: {
  cart: CartItem[];
  cartTotal: number;
  onBack: () => void;
  onPlaceOrder: () => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    card: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceOrder();
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-amber-100">
        <button onClick={onBack} className="flex items-center gap-2 text-[#2c1810] hover:text-amber-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Cart</span>
        </button>
        <button onClick={onClose} className="p-2 hover:bg-amber-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-[#2c1810]" />
        </button>
      </div>

      {/* Checkout Form */}
      <div className="flex-1 overflow-y-auto p-5">
        <h2 className="text-xl font-bold text-[#2c1810] mb-6">Checkout</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl p-4 border border-amber-100">
            <h3 className="text-sm font-semibold text-[#2c1810] mb-3">Order Summary</h3>
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center py-1.5">
                <span className="text-sm text-[#2c1810]/70">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="text-sm font-medium text-[#2c1810]">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-amber-100 mt-3 pt-3 flex justify-between">
              <span className="font-semibold text-[#2c1810]">Total</span>
              <span className="font-bold text-lg text-amber-700">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#2c1810]">Contact Information</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-[#2c1810] placeholder-[#2c1810]/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-sm"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-[#2c1810] placeholder-[#2c1810]/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-sm"
            />
          </div>

          {/* Shipping */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#2c1810]">Shipping Address</h3>
            <input
              type="text"
              placeholder="Street Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-[#2c1810] placeholder-[#2c1810]/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-sm"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-[#2c1810] placeholder-[#2c1810]/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-sm"
              />
              <input
                type="text"
                placeholder="ZIP Code"
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-[#2c1810] placeholder-[#2c1810]/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Payment */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#2c1810]">Payment (Simulated)</h3>
            <input
              type="text"
              placeholder="Card Number"
              value={formData.card}
              onChange={(e) => setFormData({ ...formData, card: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-[#2c1810] placeholder-[#2c1810]/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Place Order — ${cartTotal.toFixed(2)}
          </button>
        </form>
      </div>
    </>
  );
}

// Success Panel
function SuccessPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-[#2c1810] mb-2">Order Placed!</h2>
      <p className="text-[#2c1810]/60 mb-2">Thank you for your order.</p>
      <p className="text-[#2c1810]/40 text-sm mb-8">
        Your freshly roasted coffee is on its way. We'll send a confirmation email shortly.
      </p>
      <button
        onClick={onClose}
        className="px-8 py-3 bg-[#2c1810] hover:bg-[#3d2518] text-amber-50 rounded-xl font-semibold transition-all hover:shadow-lg"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default App;
