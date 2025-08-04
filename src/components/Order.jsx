'use client';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch('/api/order/get');
      const data = await res.json();
      setOrders(data);
    }

    fetchOrders();
  }, []);

  return (
    <div className="p-4 text-white ml-8">
      <h1 className="text-xl font-bold">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-sm text-gray-300 mt-2">No orders found.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {orders.map((order) => (
            <li key={order.id} className="bg-white/10 p-4 rounded">
              <div className="text-sm">
                <strong>Order Id:</strong> {order.order_id}
              </div>
              <div className="text-sm">
                <strong>Table No:</strong> {order.table_no}
              </div>
              <div className="text-sm">
                <strong>Item:</strong> {order.item}
              </div>
              <div className="text-sm">
                <strong>Quantity:</strong> {order.quantity}
              </div>
              <div className="text-sm">
                <strong>Total</strong> {order.tot_price}
              </div>
              <div className="text-sm">
                <strong>Status:</strong> {order.status}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
