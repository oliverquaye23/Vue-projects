<script setup>
import {ref} from 'vue';
  
  const newTask = ref('');
  const tasks = ref([]);

  const addNewTask = () => {
    if(newTask.value.trim() !== ''){
        tasks.value.push(newTask.value);
        newTask.value = '';
    }else{
      alert('Please enter a task!');
    }
  }

  const removeTask = (index) => {
    tasks.value.splice(index, 1);
  }

</script>

<template>
  <div class="todo-app">
    <div class="task-input">
      <input v-model="newTask" @keyup.enter="addNewTask" placeholder="Add new task">
      <button @click="addNewTask">Add</button>
    </div>
    <ul class="task-list">
      <li v-for="(task,index) in tasks" :key='index' class="task-item">
       {{ task }}
       <button @click="removeTask(index)" class="remove-button">Remove</button>
      </li>
    </ul>
  </div>
</template>
  

<style >
.todo-app {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.task-input {
  display: flex;
  gap: 10px;
  
}

input {
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border-radius: 30px;
  background-color: #f3ecec;
  border: none;
}

button {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #66cf6a;
  color: #fff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-family:'poppins', sans-serif;
  margin: 8px 0;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.remove-button {
  padding: 6px 10px;
  font-size: 12px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c0392b;
}
</style>
