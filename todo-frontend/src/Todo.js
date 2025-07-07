import { useEffect, useState } from "react";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const apiUrl = "http://localhost:8000";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch(`${apiUrl}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch(() => setError("Failed to fetch tasks"));
  };

  const handleSubmit = () => {
    setError("");
    if (title.trim() && description.trim()) {
      fetch(`${apiUrl}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => {
          if (res.ok) {
            fetchTodos();
            setMessage("Task added successfully");
            setTitle("");
            setDescription("");
            setTimeout(() => setMessage(""), 3000);
          } else {
            setError("Failed to add task");
          }
        })
        .catch(() => setError("Failed to add task"));
    } else {
      setError("Please fill in both title and description");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleEditCancel = () => {
    setEditId(-1);
    setEditTitle("");
    setEditDescription("");
  };

  const handleUpdate = () => {
    setError("");
    if (editTitle.trim() && editDescription.trim()) {
      fetch(`${apiUrl}/todos/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      })
        .then((res) => {
          if (res.ok) {
            fetchTodos();
            setMessage("Task updated successfully");
            handleEditCancel();
            setTimeout(() => setMessage(""), 3000);
          } else {
            setError("Failed to update task");
          }
        })
        .catch(() => setError("Failed to update task"));
    } else {
      setError("Please fill in both title and description");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`${apiUrl}/todos/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            fetchTodos();
            setMessage("Task deleted successfully");
            setTimeout(() => setMessage(""), 3000);
          } else {
            setError("Failed to delete task");
          }
        })
        .catch(() => setError("Failed to delete task"));
    }
  };

  return (
    <div className="min-vh-100" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* CDN Links for Bootstrap 5 and Icons */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        rel="stylesheet" 
      />

      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-lg mb-3" 
               style={{ width: '80px', height: '80px' }}>
            <i className="fas fa-tasks text-primary fs-2"></i>
          </div>
          <h1 className="text-white fw-bold mb-2" style={{ fontSize: '2.5rem' }}>
            TaskFlow
          </h1>
          <p className="text-white-50 fs-5">Organize your day, achieve your goals</p>
        </div>

        {/* Add Task Card */}
        <div className="card border-0 shadow-lg mb-4" style={{ 
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-plus-circle text-success me-2 fs-4"></i>
              <h3 className="mb-0 text-dark fw-bold">Add New Task</h3>
            </div>
            
            {message && (
              <div className="alert alert-success border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <i className="fas fa-check-circle me-2"></i>
                {message}
              </div>
            )}
            
            {error && (
              <div className="alert alert-danger border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <i className="fas fa-exclamation-circle me-2"></i>
                {error}
              </div>
            )}
            
            <div className="row g-3">
              <div className="col-md-5">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control border-0 shadow-sm"
                    id="taskTitle"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ borderRadius: '15px', backgroundColor: '#f8f9fa' }}
                  />
                  <label htmlFor="taskTitle" className="text-muted">
                    <i className="fas fa-heading me-2"></i>Task Title
                  </label>
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control border-0 shadow-sm"
                    id="taskDescription"
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ borderRadius: '15px', backgroundColor: '#f8f9fa' }}
                  />
                  <label htmlFor="taskDescription" className="text-muted">
                    <i className="fas fa-align-left me-2"></i>Description
                  </label>
                </div>
              </div>
              <div className="col-md-2">
                <button 
                  className="btn btn-success h-100 w-100 border-0 shadow-sm fw-bold"
                  onClick={handleSubmit}
                  style={{ borderRadius: '15px' }}
                >
                  <i className="fas fa-plus me-2"></i>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="card border-0 shadow-lg" style={{ 
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="card-body p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center">
                <i className="fas fa-list-check text-primary me-2 fs-4"></i>
                <h3 className="mb-0 text-dark fw-bold">Your Tasks</h3>
              </div>
              <span className="badge bg-primary rounded-pill px-3 py-2 fs-6">
                {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>
            
            {todos.length === 0 ? (
              <div className="text-center py-5">
                <div className="mb-3">
                  <i className="fas fa-clipboard-list text-muted" style={{ fontSize: '4rem' }}></i>
                </div>
                <h4 className="text-muted mb-2">No tasks yet</h4>
                <p className="text-muted">Add your first task to get started!</p>
              </div>
            ) : (
              <div className="row g-3">
                {todos.map((item, index) => (
                  <div key={item._id} className="col-12">
                    <div className="card border-0 shadow-sm h-100" style={{ 
                      borderRadius: '15px',
                      transition: 'all 0.3s ease',
                      transform: 'scale(1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                    }}>
                      <div className="card-body p-4">
                        <div className="d-flex align-items-start justify-content-between">
                          <div className="d-flex align-items-start">
                            <div className="d-flex align-items-center justify-content-center bg-light rounded-circle me-3 flex-shrink-0" 
                                 style={{ width: '40px', height: '40px' }}>
                              <span className="fw-bold text-primary">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              {editId !== item._id ? (
                                <>
                                  <h5 className="fw-bold text-dark mb-2">
                                    {item.title}
                                  </h5>
                                  <p className="text-muted mb-0">
                                    {item.description}
                                  </p>
                                </>
                              ) : (
                                <div className="row g-2">
                                  <div className="col-12">
                                    <div className="form-floating">
                                      <input
                                        type="text"
                                        className="form-control border-0 shadow-sm"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        style={{ borderRadius: '10px', backgroundColor: '#f8f9fa' }}
                                      />
                                      <label className="text-muted">Title</label>
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <div className="form-floating">
                                      <input
                                        type="text"
                                        className="form-control border-0 shadow-sm"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        style={{ borderRadius: '10px', backgroundColor: '#f8f9fa' }}
                                      />
                                      <label className="text-muted">Description</label>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="d-flex gap-2 flex-shrink-0">
                            {editId !== item._id ? (
                              <>
                                <button
                                  className="btn btn-outline-primary btn-sm border-0 shadow-sm"
                                  onClick={() => handleEdit(item)}
                                  style={{ borderRadius: '10px' }}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm border-0 shadow-sm"
                                  onClick={() => handleDelete(item._id)}
                                  style={{ borderRadius: '10px' }}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="btn btn-success btn-sm border-0 shadow-sm"
                                  onClick={handleUpdate}
                                  style={{ borderRadius: '10px' }}
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                                <button
                                  className="btn btn-secondary btn-sm border-0 shadow-sm"
                                  onClick={handleEditCancel}
                                  style={{ borderRadius: '10px' }}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}