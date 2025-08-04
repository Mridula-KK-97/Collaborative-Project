# Restaurant Management System (QR-based)

A modern restaurant management app where customers can scan a QR code at their table to view the menu and place orders directly from their devices. Admins can manage all menu items via a secure dashboard.

---

## Goal

To streamline restaurant operations by eliminating paper menus and manual order taking. The system connects Customers, Admins, and optionally Kitchen Staff/Waiters through a centralized digital platform.

---

## User Roles

### 1. Customer
- Scan table-specific QR code (Table ID embedded)
- View categorized digital menu
- Add items to cart
- Place orders
- (Optional) Track order status

### 2. Admin
- Secure login to dashboard
- Add / Update / Delete menu items
- View all food items
- (Optional) View customer orders

## Features

### Customer App
- QR Scan to access table menu
- View categorized menu (image, name, price)
- Add to cart and place order
- Order linked to Table ID
- Order confirmation screen

### Admin Dashboard
- Login authentication (NextAuth)
- Add/Edit/Delete menu items (with image upload)
- View full menu list

---

## Tech Stack

### Frontend
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS and MUI
- **State Management:** React Context 
- **Forms:** React Hook Form

### Backend
- **API:** Next.js API routes (`/api`)
- **Authentication:** NextAuth (Admin login only)
- **Database:** Supabase 

---


