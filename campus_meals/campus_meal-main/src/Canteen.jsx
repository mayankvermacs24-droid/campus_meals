import React from 'react';

function Canteen({ onNavigate, className = "" }) {
    return (
        <section id="canteen" className={className}>
            <div className="container">
                <h1 className="section-title">Canteen</h1>
                <p className="section-subtitle">Order your favorite food and beverages online. Pick up with QR code.</p>
                <div className="process-steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Browse Menu</h3>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Add to Cart</h3>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Pay Online</h3>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <h3>Collect Order</h3>
                    </div>
                </div>
                <div className="content-box">
                    <div className="box-header">
                        <h2>Menu</h2>
                        <button className="btn btn-secondary" onClick={() => onNavigate && onNavigate('student-dashboard')}>🛒 Cart (0)</button>
                    </div>
                    <div className="menu-categories">
                        <button className="category-btn active">All</button>
                        <button className="category-btn">Beverages</button>
                        <button className="category-btn">Snacks</button>
                        <button className="category-btn">Main</button>
                        <button className="category-btn">Desserts</button>
                    </div>
                    <div className="menu-content">
                        <h3>No Items Available</h3>
                        <p className="content-message">Menu items will be available soon. Please check back later.</p>
                    </div>
                </div>
                <div className="content-box">
                    <h2 className="box-title">Track Your Order</h2>
                    <p className="box-description">Get real-time notifications when your order is ready for pickup</p>
                    <div className="empty-state">
                        <p className="empty-state-title">No Active Orders</p>
                        <p className="empty-state-message">Start ordering from the menu above to see your order status here</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Canteen;
