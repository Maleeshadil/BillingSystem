# Billing System

<img width="1470" height="835" alt="Billing-System" src="https://github.com/user-attachments/assets/8cb348b5-1232-4d9a-824e-69ca45f7ae22" />


A web-based Point of Sale (POS) billing system built with PHP, MySQL, and Bootstrap for managing product sales and generating invoices.

## Features

- **User Authentication**: Secure login and registration system
- **Product Management**: Add, edit, and delete products
- **Real-time Billing**: Dynamic invoice generation with automatic calculations
- **Receipt Printing**: Print-ready invoice format
- **Session Management**: Cashier tracking and session control
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript, jQuery, Bootstrap 5, FontAwesome
- **Backend**: PHP
- **Database**: MySQL
- **Server**: XAMPP (Apache, MySQL)

## Prerequisites

- XAMPP (or any Apache + MySQL + PHP stack)
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Modern web browser

## Installation

1. **Install XAMPP**
   - Download and install XAMPP from [https://www.apachefriends.org](https://www.apachefriends.org)

2. **Clone/Copy Project**
   ```bash
   # Copy project to XAMPP htdocs directory
   /Applications/XAMPP/xamppfiles/htdocs/BillingSystem
   ```

3. **Database Setup**
   - Start Apache and MySQL from XAMPP Control Panel
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - Create a database named `products`
   - Import the database schema (create tables for users and products)

4. **Configure Database Connection**
   - Edit `includes/db.inc.php` if needed:
   ```php
   $dbServer = "localhost";
   $dbUser = "root";
   $dbpass = "";
   $database = "products";
   ```

5. **Access Application**
   - Open browser and navigate to: `http://localhost/BillingSystem`

## Project Structure

```
BillingSystem/
├── css/                    # Bootstrap CSS files
├── FontAwesome/           # Icon fonts
├── includes/              # Database connection
│   └── db.inc.php
├── js/                    # Bootstrap JavaScript files
├── PHP/                   # Backend PHP scripts
│   ├── login.php
│   ├── register.php
│   ├── logout.php
│   ├── fetch_products.php
│   ├── get_products.php
│   ├── edit_products.php
│   ├── delete_products.php
│   └── valid_product.php
├── index.php              # Login page
├── Main.php               # Main billing interface
├── script.js              # Main JavaScript
├── style.css              # Main stylesheet
├── loign_style.css        # Login page styles
└── signup_style.css       # Signup page styles
```

## Usage

1. **Login/Register**
   - Create a new account or login with existing credentials
   - Access the main billing interface

2. **Add Products to Bill**
   - Enter Product ID
   - Enter Quantity
   - Product details will be added to the invoice table

3. **Manage Invoice**
   - View all added items with prices and totals
   - Edit or delete items as needed
   - System automatically calculates net amount

4. **Complete Transaction**
   - Enter cash amount
   - View balance/change
   - Print receipt

5. **Clear/Reset**
   - Use Clear button to start a new transaction

## Database Schema

### Users Table
- User credentials and authentication data

### Products Table
- Product ID
- Product Name
- Price
- Stock/Quantity

## Security Notes

- Session-based authentication
- SQL injection prevention (use prepared statements)
- Password hashing recommended
- Secure logout functionality

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available for educational purposes.


