import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const recentOrderData = [
	{
		id: '1',
		product_id: '4324',
		customer_id: '23143',
		customer_name: 'Shirley A. Lape',
		order_date: '2022-05-17T03:24:00',
		order_total: '$435.50',
		current_order_status: 'PLACED',
		shipment_address: 'Cottage Grove, OR 97424'
	},
	{
		id: '7',
		product_id: '7453',
		customer_id: '96453',
		customer_name: 'Ryan Carroll',
		order_date: '2022-05-14T05:24:00',
		order_total: '$96.35',
		current_order_status: 'CONFIRMED',
		shipment_address: 'Los Angeles, CA 90017'
	},
	{
		id: '2',
		product_id: '5434',
		customer_id: '65345',
		customer_name: 'Mason Nash',
		order_date: '2022-05-17T07:14:00',
		order_total: '$836.44',
		current_order_status: 'SHIPPED',
		shipment_address: 'Westminster, CA 92683'
	},
	{
		id: '3',
		product_id: '9854',
		customer_id: '87832',
		customer_name: 'Luke Parkin',
		order_date: '2022-05-16T12:40:00',
		order_total: '$334.50',
		current_order_status: 'SHIPPED',
		shipment_address: 'San Mateo, CA 94403'
	},
	{
		id: '4',
		product_id: '8763',
		customer_id: '09832',
		customer_name: 'Anthony Fry',
		order_date: '2022-05-14T03:24:00',
		order_total: '$876.00',
		current_order_status: 'OUT_FOR_DELIVERY',
		shipment_address: 'San Mateo, CA 94403'
	},
	{
		id: '5',
		product_id: '5627',
		customer_id: '97632',
		customer_name: 'Ryan Carroll',
		order_date: '2022-05-14T05:24:00',
		order_total: '$96.35',
		current_order_status: 'DELIVERED',
		shipment_address: 'Los Angeles, CA 90017'
	}
]

export default function RecentOrders() {
	return (
<div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
  <strong className="text-gray-700 font-medium">Recent Orders</strong>
  <div className="border-x border-gray-200 rounded-sm mt-3 overflow-x-auto">
    <table className="w-full text-gray-700 table-auto">
      <thead className="bg-neutral-100">
        <tr>
          <th className="px-4 py-3 text-sm font-semibold text-left border-y border-gray-200">ID</th>
          <th className="px-4 py-3 text-sm font-semibold text-left border-y border-gray-200">Product ID</th>
          <th className="px-4 py-3 text-sm font-semibold text-left border-y border-gray-200">Customer Name</th>
          <th className="px-4 py-3 text-sm font-semibold text-left border-y border-gray-200">Order Date</th>
          <th className="px-4 py-3 text-sm font-semibold text-left border-y border-gray-200">Order Total</th>
          <th className="px-4 py-3 text-sm font-semibold text-left border-y border-gray-200">Shipping Address</th>
        </tr>
      </thead>
      <tbody className="text-sm text-gray-700">
        {recentOrderData.map((order) => (
          <tr key={order.id}>
            <td className="border px-4 py-3 text-sm text-left border-y border-gray-200">
              <Link to={`/order/${order.id}`} className="text-sky-500 hover:underline">#{order.id}</Link>
            </td>
            <td className="border px-4 py-3 text-sm text-left border-y border-gray-200">
              <Link to={`/product/${order.product_id}`} className="text-sky-500 hover:underline">#{order.product_id}</Link>
            </td>
            <td className="border px-4 py-3 text-sm text-left border-y border-gray-200">
              <Link to={`/customer/${order.customer_id}`} className="text-sky-500 hover:underline">{order.customer_name}</Link>
            </td>
            <td className="border px-4 py-3 text-sm text-left border-y border-gray-200">
              {format(new Date(order.order_date), 'dd MMM yyyy')}
            </td>
            <td className="border px-4 py-3 text-sm text-left border-y border-gray-200">{order.order_total}</td>
            <td className="border px-4 py-3 text-sm text-left border-y border-gray-200">{order.shipment_address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
	)
}
