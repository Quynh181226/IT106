// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//
// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
//
// export default App
// Ecommerce_Mockup_UI.jsx
// Single-file React app mockup for the e-commerce UI requested.
// Tailwind CSS classes are used (assumes Tailwind is configured in the host project).
// Paste this file as App.jsx (or similar) inside a Create React App / Vite + React project with Tailwind.

import React, { useEffect, useState } from 'react';

// ---------- Mock Data ----------
const SAMPLE_PRODUCTS = [
    {
        id: 'P001',
        name: 'Sneakers Alpha',
        price: 1290000,
        images: ['/images/sneaker1-1.jpg','/images/sneaker1-2.jpg'],
        stock: 8,
        rating: 4.5,
        brand: 'Alpha'
    },
    {
        id: 'P002',
        name: 'T-Shirt Basic',
        price: 250000,
        images: ['/images/tshirt1.jpg'],
        stock: 0,
        rating: 4.0,
        brand: 'Core'
    },
    {
        id: 'P003',
        name: 'Wireless Headphones',
        price: 1990000,
        images: ['/images/headphone1.jpg'],
        stock: 15,
        rating: 4.7,
        brand: 'Soundly'
    },
    {
        id: 'P004',
        name: 'Smart Watch Pro',
        price: 3290000,
        images: ['/images/watch1.jpg'],
        stock: 3,
        rating: 4.6,
        brand: 'Wrist'
    }
];

// ---------- Helpers ----------
const formatVND = (n) => {
    return n.toLocaleString('vi-VN') + ' ₫';
}

// ---------- Components (Pages) ----------

function NavBar({ onNavigate, cartCount, user }) {
    return (
        <header className="bg-white shadow p-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => onNavigate('home')} className="text-xl font-bold">E-Com Mock</button>
                    <nav className="hidden md:flex gap-2">
                        <button onClick={() => onNavigate('products')} className="px-3 py-1 rounded hover:bg-gray-100">Sản phẩm</button>
                        <button onClick={() => onNavigate('orders')} className="px-3 py-1 rounded hover:bg-gray-100">Đơn hàng</button>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        {user ? <span>Xin chào, <strong>{user.name}</strong></span> : <span>Khách</span>}
                    </div>
                    <button onClick={() => onNavigate('cart')} className="relative">
                        🛒
                        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
                    </button>
                    <button onClick={() => onNavigate(user ? 'profile' : 'auth')} className="px-3 py-1 rounded bg-blue-600 text-white">{user ? 'Tài khoản' : 'Đăng nhập'}</button>
                </div>
            </div>
        </header>
    );
}

function HomePage({ onNavigate }) {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-indigo-600 text-white p-8 rounded-lg mb-6">
                <h1 className="text-3xl font-bold">Chào mừng đến với E-Com Mock</h1>
                <p className="mt-2">Demo UI cho sprint: Đăng ký, Danh sách sản phẩm, Chi tiết, Giỏ hàng, Thanh toán COD, Tracking</p>
                <div className="mt-4">
                    <button onClick={() => onNavigate('products')} className="px-4 py-2 bg-white text-indigo-600 rounded">Xem sản phẩm</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SAMPLE_PRODUCTS.slice(0,3).map(p => (
                    <div key={p.id} className="bg-white p-4 rounded shadow">
                        <div className="h-40 bg-gray-100 flex items-center justify-center mb-3">Ảnh sản phẩm</div>
                        <h3 className="font-semibold">{p.name}</h3>
                        <p className="text-sm text-gray-600">{p.brand}</p>
                        <div className="mt-2 flex items-center justify-between">
                            <div className="text-lg font-bold">{formatVND(p.price)}</div>
                            <button onClick={() => onNavigate('products')} className="px-3 py-1 bg-blue-600 text-white rounded">Chi tiết</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AuthPage({ onLogin }) {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [msg, setMsg] = useState('');

    function doRegister() {
        if (!email.includes('@')) { setMsg('Email không hợp lệ'); return; }
        if (password.length < 8) { setMsg('Mật khẩu phải >= 8 ký tự'); return; }
        const user = { name: name || email.split('@')[0], email };
        localStorage.setItem('mock_user', JSON.stringify(user));
        setMsg('Đăng ký thành công');
        onLogin(user);
    }

    function doLogin() {
        const raw = localStorage.getItem('mock_user');
        if (!raw) { setMsg('Không tìm thấy tài khoản. Vui lòng đăng ký trước.'); return; }
        const stored = JSON.parse(raw);
        if (stored.email === email) {
            setMsg('Đăng nhập thành công');
            onLogin(stored);
        } else {
            setMsg('Email hoặc mật khẩu không đúng');
        }
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-semibold mb-4">{isRegister ? 'Đăng ký' : 'Đăng nhập'}</h2>
                {isRegister && (
                    <input placeholder="Họ và tên" className="w-full p-2 border rounded mb-2" value={name} onChange={e => setName(e.target.value)} />
                )}
                <input placeholder="Email" className="w-full p-2 border rounded mb-2" value={email} onChange={e => setEmail(e.target.value)} />
                <input placeholder="Mật khẩu" className="w-full p-2 border rounded mb-2" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <div className="flex items-center justify-between">
                    <button onClick={() => isRegister ? doRegister() : doLogin()} className="px-4 py-2 bg-blue-600 text-white rounded">{isRegister ? 'Đăng ký' : 'Đăng nhập'}</button>
                    <button onClick={() => setIsRegister(!isRegister)} className="text-sm text-blue-600">{isRegister ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'}</button>
                </div>
                {msg && <div className="mt-3 text-sm text-red-600">{msg}</div>}
            </div>
        </div>
    );
}

function ProductListPage({ onViewDetail, onAddToCart }) {
    const [products, setProducts] = useState(SAMPLE_PRODUCTS);
    const [query, setQuery] = useState('');
    const [brandFilter, setBrandFilter] = useState('');

    const brands = Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.brand)));

    const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) && (brandFilter ? p.brand === brandFilter : true));

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex gap-4 mb-4">
                <input className="flex-1 p-2 border rounded" placeholder="Tìm sản phẩm..." value={query} onChange={e => setQuery(e.target.value)} />
                <select className="p-2 border rounded" value={brandFilter} onChange={e => setBrandFilter(e.target.value)}>
                    <option value="">Tất cả thương hiệu</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map(p => (
                    <div key={p.id} className="bg-white rounded shadow p-4 flex flex-col">
                        <div className="h-40 bg-gray-100 flex items-center justify-center mb-3">Ảnh</div>
                        <h3 className="font-semibold">{p.name}</h3>
                        <p className="text-sm text-gray-600">{p.brand}</p>
                        <div className="mt-2 flex items-center justify-between">
                            <div>
                                <div className="text-lg font-bold">{formatVND(p.price)}</div>
                                <div className="text-xs text-gray-500">{p.rating} ★</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => onViewDetail(p.id)} className="px-3 py-1 border rounded">Chi tiết</button>
                                <button onClick={() => onAddToCart(p,1)} disabled={p.stock===0} className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50">Thêm vào giỏ</button>
                            </div>
                        </div>
                        {p.stock === 0 && <div className="mt-2 text-sm text-red-600">Sold out</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProductDetailPage({ productId, onAddToCart }) {
    const [product] = useState(() => SAMPLE_PRODUCTS.find(p => p.id === productId) || SAMPLE_PRODUCTS[0]);
    const [qty, setQty] = useState(1);
    const [msg, setMsg] = useState('');

    useEffect(() => { setMsg(''); setQty(1); }, [productId]);

    function add() {
        if (qty > product.stock) { setMsg('Vượt quá tồn kho'); return; }
        onAddToCart(product, qty);
        setMsg('Đã thêm vào giỏ');
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
            <div className="flex gap-6">
                <div className="w-1/2">
                    <div className="h-80 bg-gray-100 flex items-center justify-center">Ảnh lớn</div>
                    <div className="mt-3 flex gap-2">
                        {product.images.map((src,i) => (
                            <div key={i} className="w-20 h-20 bg-gray-50 flex items-center justify-center">img</div>
                        ))}
                    </div>
                </div>
                <div className="w-1/2">
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <div className="text-xl text-red-600 mt-2">{formatVND(product.price)}</div>
                    <div className="mt-2 text-sm text-gray-600">Tồn kho: {product.stock}</div>
                    <div className="mt-4">
                        <label className="block text-sm">Số lượng</label>
                        <div className="flex items-center gap-2 mt-1">
                            <button onClick={() => setQty(q => Math.max(1, q-1))} className="px-3 py-1 border">-</button>
                            <input value={qty} onChange={e => setQty(Number(e.target.value)||1)} className="w-16 text-center p-2 border rounded" />
                            <button onClick={() => setQty(q => Math.min(product.stock, q+1))} className="px-3 py-1 border">+</button>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <button onClick={add} disabled={product.stock===0} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">Thêm vào giỏ</button>
                    </div>
                    {msg && <div className="mt-3 text-sm text-green-600">{msg}</div>}
                </div>
            </div>

            <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold">Mô tả sản phẩm</h3>
                <p className="text-sm text-gray-600 mt-2">Đây là phần mô tả mẫu cho sản phẩm. Bạn có thể thay đổi nội dung này bằng dữ liệu thực tế từ backend.</p>
            </div>
        </div>
    );
}

function CartPage({ cart, setCart, onCheckout }) {
    function updateQty(productId, newQty) {
        const next = cart.map(item => item.product.id === productId ? { ...item, qty: newQty } : item).filter(i => i.qty > 0);
        setCart(next);
        localStorage.setItem('mock_cart', JSON.stringify(next));
    }

    function remove(productId) {
        const next = cart.filter(i => i.product.id !== productId);
        setCart(next);
        localStorage.setItem('mock_cart', JSON.stringify(next));
    }

    const subtotal = cart.reduce((s,i) => s + i.product.price * i.qty, 0);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Giỏ hàng</h2>
            {cart.length === 0 ? (
                <div className="bg-white p-6 rounded shadow">Giỏ hàng trống.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white p-4 rounded shadow">
                        {cart.map(item => (
                            <div key={item.product.id} className="flex items-center gap-4 border-b py-3">
                                <div className="w-20 h-20 bg-gray-100 flex items-center justify-center">img</div>
                                <div className="flex-1">
                                    <div className="font-semibold">{item.product.name}</div>
                                    <div className="text-sm text-gray-600">{formatVND(item.product.price)}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => updateQty(item.product.id, Math.max(1, item.qty-1))} className="px-2 py-1 border">-</button>
                                    <div className="px-3">{item.qty}</div>
                                    <button onClick={() => updateQty(item.product.id, Math.min(item.product.stock, item.qty+1))} className="px-2 py-1 border">+</button>
                                </div>
                                <div className="w-28 text-right">{formatVND(item.product.price * item.qty)}</div>
                                <button onClick={() => remove(item.product.id)} className="ml-2 text-red-600">Xóa</button>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                        <div className="text-sm text-gray-600">Tạm tính</div>
                        <div className="text-2xl font-bold mt-2">{formatVND(subtotal)}</div>
                        <div className="mt-4">
                            <button onClick={() => onCheckout()} className="w-full px-4 py-2 bg-blue-600 text-white rounded">Tiến hành thanh toán</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function CheckoutPage({ cart, onPlaceOrder }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [method, setMethod] = useState('COD');
    const [msg, setMsg] = useState('');

    const total = cart.reduce((s,i) => s + i.product.price * i.qty, 0);

    function place() {
        if (!name || !phone || !address) { setMsg('Vui lòng nhập đầy đủ thông tin'); return; }
        const order = {
            id: 'ORD' + Math.floor(Math.random()*100000),
            date: new Date().toISOString(),
            items: cart,
            total,
            name, phone, address, method,
            status: 'Chờ xác nhận'
        };
        const raw = JSON.parse(localStorage.getItem('mock_orders') || '[]');
        raw.unshift(order);
        localStorage.setItem('mock_orders', JSON.stringify(raw));
        localStorage.removeItem('mock_cart');
        setMsg('Đặt hàng thành công');
        onPlaceOrder(order.id);
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input placeholder="Họ tên" className="w-full p-2 border rounded mb-2" value={name} onChange={e => setName(e.target.value)} />
                    <input placeholder="Số điện thoại" className="w-full p-2 border rounded mb-2" value={phone} onChange={e => setPhone(e.target.value)} />
                    <textarea placeholder="Địa chỉ giao hàng" className="w-full p-2 border rounded mb-2" value={address} onChange={e => setAddress(e.target.value)} />
                    <div className="mb-2">Phương thức thanh toán</div>
                    <select className="w-full p-2 border rounded" value={method} onChange={e => setMethod(e.target.value)}>
                        <option value="COD">COD (Thanh toán khi nhận hàng)</option>
                        <option value="ONLINE">Online (Coming Soon)</option>
                    </select>
                </div>
                <div>
                    <div className="border p-3 rounded">
                        <div className="text-sm text-gray-600">Đơn hàng</div>
                        <div className="mt-2">{cart.map(i => (<div key={i.product.id} className="flex justify-between text-sm py-1"><div>{i.product.name} x{i.qty}</div><div>{formatVND(i.product.price * i.qty)}</div></div>))}</div>
                        <div className="mt-3 border-t pt-3 text-right font-bold">Tổng: {formatVND(total)}</div>
                    </div>
                    <div className="mt-4">
                        <button onClick={place} className="w-full px-4 py-2 bg-green-600 text-white rounded">Xác nhận thanh toán</button>
                    </div>
                    {msg && <div className="mt-3 text-sm text-green-600">{msg}</div>}
                </div>
            </div>
        </div>
    );
}

function OrderTrackingPage() {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);

    function find() {
        const all = JSON.parse(localStorage.getItem('mock_orders') || '[]');
        const found = all.find(o => o.id === orderId);
        setOrder(found || null);
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Theo dõi đơn hàng</h2>
            <div className="flex gap-2 mb-4">
                <input placeholder="Nhập mã đơn (vd: ORD12345)" className="flex-1 p-2 border rounded" value={orderId} onChange={e => setOrderId(e.target.value)} />
                <button onClick={find} className="px-4 py-2 bg-blue-600 text-white rounded">Xem trạng thái</button>
            </div>

            {!order && <div className="text-sm text-gray-600">Nhập mã đơn để xem chi tiết</div>}
            {order && (
                <div>
                    <div className="mb-3">Mã đơn: <strong>{order.id}</strong> — Trạng thái: <span className="text-indigo-600">{order.status}</span></div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <div className="mb-2">Timeline</div>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">1</div>
                                    <div className="text-sm mt-1">Chờ xác nhận</div>
                                </div>
                                <div className="flex-1 h-1 bg-gray-200" />
                                <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full ${order.status === 'Đang giao' || order.status === 'Hoàn tất' ? 'bg-blue-400' : 'bg-gray-200'} flex items-center justify-center`}>2</div>
                                    <div className="text-sm mt-1">Đang giao</div>
                                </div>
                                <div className="flex-1 h-1 bg-gray-200" />
                                <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full ${order.status === 'Hoàn tất' ? 'bg-green-400' : 'bg-gray-200'} flex items-center justify-center`}>3</div>
                                    <div className="text-sm mt-1">Hoàn tất</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <div className="border p-3 rounded">
                                <div className="text-sm text-gray-600">Thông tin giao hàng</div>
                                <div className="mt-2 text-sm">{order.name}</div>
                                <div className="text-sm">{order.phone}</div>
                                <div className="text-sm">{order.address}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ---------- Main App ----------

export default function App() {
    const [route, setRoute] = useState('home');
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('mock_user') || 'null'));
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('mock_cart') || '[]'));
    const [viewProductId, setViewProductId] = useState(null);

    useEffect(() => {
        localStorage.setItem('mock_cart', JSON.stringify(cart));
    }, [cart]);

    function navigate(to) {
        setRoute(to);
    }

    function handleLogin(u) {
        setUser(u);
        localStorage.setItem('mock_user', JSON.stringify(u));
        setRoute('home');
    }

    function handleAddToCart(product, qty) {
        setCart(prev => {
            const exists = prev.find(i => i.product.id === product.id);
            if (exists) {
                return prev.map(i => i.product.id === product.id ? { ...i, qty: Math.min(product.stock, i.qty + qty) } : i);
            }
            return [...prev, { product, qty }];
        });
    }

    function handleCheckout() {
        setRoute('checkout');
    }

    function handlePlaced(orderId) {
        setCart([]);
        setRoute('orders');
    }

    function viewDetail(id) {
        setViewProductId(id);
        setRoute('product-detail');
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar onNavigate={navigate} cartCount={cart.reduce((s,i)=>s+i.qty,0)} user={user} />

            <main className="py-6">
                {route === 'home' && <HomePage onNavigate={navigate} />}
                {route === 'products' && <ProductListPage onViewDetail={viewDetail} onAddToCart={handleAddToCart} />}
                {route === 'product-detail' && <ProductDetailPage productId={viewProductId} onAddToCart={handleAddToCart} />}
                {route === 'cart' && <CartPage cart={cart} setCart={setCart} onCheckout={handleCheckout} />}
                {route === 'checkout' && <CheckoutPage cart={cart} onPlaceOrder={handlePlaced} />}
                {route === 'auth' && <AuthPage onLogin={handleLogin} />}
                {route === 'orders' && <OrderTrackingPage />}
                {route === 'profile' && (
                    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">Tài khoản: {user ? user.name : 'Khách'}</div>
                )}
            </main>

            <footer className="bg-white border-t p-4 mt-6">
                <div className="max-w-6xl mx-auto text-sm text-gray-600">© 2025 E-Com Mock - UI Demo</div>
            </footer>
        </div>
    );
}
