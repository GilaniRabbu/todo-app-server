import { Todo } from "../models/todo.js";

// Create
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(403).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    const todo = new Todo({ title, description });
    await todo.save();
    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log(todos);
    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update
export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { title, description } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description },
      { new: true }
    );
    await todo.save();
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete
export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};