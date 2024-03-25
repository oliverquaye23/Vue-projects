<script setup>
  import {ref,onMounted} from 'vue';

  const currentQuote = ref({text:'',author:''})
  const quotes = ref([
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln"
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky"
  },
  {
    text: "The only thing necessary for the triumph of evil is for good men to do nothing.",
    author: "Edmund Burke"
  }
  ]);

 
  
  const getRandom = () => {
     const randomIndex = Math.floor(Math.random()* quotes.value.length)
     currentQuote.value = quotes.value[randomIndex]
  }

onMounted(getRandom)

</script>

<template>
<div class="quote-generator">
  <div class="app-title">Random Quote Generator</div>
  <blockquote class="quote-container">
    <p>{{ currentQuote.text }}</p>
    <cite>{{ currentQuote.author }}</cite>
  </blockquote>

  <button @click="getRandom" class="quote-button">Get new quote</button>
</div>

</template>

<style scoped>
*{
    font-family: Arial, Helvetica, sans-serif;
}
.quote-generator {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
}

.quote-container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  margin-bottom: 10px;
}

cite {
  font-style: normal;
  color: #d1cece;
}

.quote-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #34db87;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.quote-button:hover {
  background-color: #29b976;
}
</style>