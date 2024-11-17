Mini CRM
Welcome to the Mini CRM project! This is a streamlined demonstration of a Customer Relationship Management (CRM) application, showcasing modern web development practices and technologies.

Technologies and Tools
Frontend:

Next.js: A React framework optimized for server-side rendering and static generation.
TypeScript: Adds static typing to JavaScript, enhancing development reliability.
ShadCN: A design system combining TailwindCSS with React components for elegant UI.
TailwindCSS: A utility-first CSS framework for creating responsive designs.
Backend:

Express.js: Lightweight web application framework for Node.js.
MongoDB Atlas: A cloud-hosted NoSQL database for managing customer data.
Firebase: Secure authentication services for user management.
RabbitMQ Cloud: A message broker for real-time updates and notifications.
Features
User Authentication: Powered by Firebase, ensuring secure login and session management.
Comprehensive CRUD Operations: Manage customer data seamlessly.
Real-Time Notifications: RabbitMQ Cloud ensures instant updates across the system.
Responsive UI: Built using ShadCN and TailwindCSS for a polished experience.
TypeScript-Powered Codebase: Organized and strongly-typed for maintainability.
Getting Started
Prerequisites
Ensure you have the following installed:

Node.js (v14 or higher)
pnpm (v6 or higher)
A MongoDB Atlas account
A RabbitMQ Cloud account
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/mangalamraj/CRM.git  
cd CRM  
Install dependencies:
For the client:

bash
Copy code
cd client  
pnpm install  
For the server:

bash
Copy code
cd ../server  
pnpm install  
Running the Application
To run both client and server simultaneously:

Start the client:

bash
Copy code
cd client  
pnpm run dev  
Start the server:

bash
Copy code
cd server  
pnpm run develop & pnpm run start:all  
Open your browser and navigate to the provided URL to access the CRM application.

Contributing
Contributions are welcome! Feel free to fork the repository, make your changes, and submit a pull request.

License
This project was crafted by Nikhil Dev. Feel free to modify and adapt it to suit your needs.
