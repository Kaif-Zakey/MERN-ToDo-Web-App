# 📝 MERN Todo Application

A full-stack Todo application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to manage their daily tasks with full CRUD operations.

## ✨ Features

- ✅ **Add Tasks**: Create new todo items
- 📝 **View Tasks**: Display all todos in a clean list
- ✏️ **Update Tasks**: Edit existing todo items
- 🗑️ **Delete Tasks**: Remove completed or unwanted tasks
- 🔄 **Real-time Updates**: Instant UI updates after operations
- 📱 **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling for Node.js

### Frontend
- **React** - JavaScript library for building user interfaces
- **HTML5** - Markup language for web pages
- **CSS3** - Styling and layout
- **JavaScript (ES6+)** - Programming language

## 📁 Project Structure

```
todo-app/
├── backend/
│   ├── models/
│   │   └── Todo.js          # Todo model schema
│   ├── routes/
│   │   └── todos.js         # Todo routes
│   ├── package.json
│   └── server.js            # Express server setup
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js           # Main React component
│   │   └── index.js         # React entry point
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before running this application, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kaif-Zakey/MERN-ToDo-App.git
   cd mern-todo-app
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Set up MongoDB**
   - Make sure MongoDB is running on your local machine
   - Or update the connection string in `backend/server.js` to use MongoDB Atlas

## 🏃‍♂️ Running the Application

### Start the Backend Server

```bash
cd backend
npm start
```
- Backend server will run on **http://localhost:8000**

### Start the Frontend Development Server

```bash
cd frontend
npm start
```
- Frontend application will run on **http://localhost:3000**

### Running Both Servers Simultaneously

You can run both servers at the same time by opening two terminal windows and running the commands above in each.

## 🔗 API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `http://localhost:8000/todos` | Get all todos |
| POST | `http://localhost:8000/todos` | Create a new todo |
| PUT | `http://localhost:8000/todos/:id` | Update a specific todo |
| DELETE | `http://localhost:8000/todos/:id` | Delete a specific todo |

### Example API Usage

**Get all todos:**
```bash
GET http://localhost:8000/todos
```

**Add a new todo:**
```bash
POST http://localhost:8000/todos
Content-Type: application/json

{
  "title": "Complete the project",
  "description": "Finish the MERN todo application",
  "completed": false
}
```

**Update a todo:**
```bash
PUT http://localhost:8000/todos/id
Content-Type: application/json

{
  "title": "Updated task title",
  "completed": true
}
```

**Delete a todo:**
```bash
DELETE http://localhost:8000/todos/id
```

## 📱 Application Usage

1. **Adding Tasks**: Use the input field to type your task and click "Add Task"
2. **Viewing Tasks**: All tasks are displayed in a list format
3. **Updating Tasks**: Click on a task to edit it inline or use the edit button
4. **Deleting Tasks**: Click the delete button (🗑️) next to any task to remove it
5. **Marking Complete**: Toggle the checkbox to mark tasks as completed

## 🗂️ Database Schema

The Todo model includes the following fields:

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  createdAt: Date (default: Date.now),
  updatedAt: Date
}
```

## 🔧 Available Scripts

### Backend Scripts
```bash
npm start          # Start the Express server
npm run dev        # Start server with nodemon (if configured)
npm test           # Run tests
```

### Frontend Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

## 🚀 Deployment

### Backend Deployment
1. Choose a hosting service (Heroku, Railway, Render, etc.)
2. Set up environment variables for MongoDB connection
3. Deploy your backend code

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the `build` folder to a static hosting service (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Make sure MongoDB is running locally
- Check the connection string in your backend configuration

**Port Already in Use:**
- Kill the process using the port: `lsof -ti:8000 | xargs kill -9`
- Or change the port in your configuration

**CORS Issues:**
- Make sure CORS is properly configured in your Express server
- Check that frontend is making requests to the correct backend URL

## 🙏 Acknowledgments

- [MongoDB](https://www.mongodb.com/) for the database
- [Express.js](https://expressjs.com/) for the backend framework
- [React](https://reactjs.org/) for the frontend library
- [Node.js](https://nodejs.org/) for the runtime environment

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Open an issue on GitHub
3. Contact [kaifzakey22@gmail.com]

---

**vibe Code!** 🎉
