<script setup>
import { app, db } from './db';
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import { onMounted, reactive, ref } from 'vue';

const inputUsername = ref('');
const inputMessage = ref('');
console.log(inputMessage)

const state = reactive({
  username: "",
  messages: [],
  loading: true
});

const login = () => {
  if (inputUsername.value.trim() !== '') {
    state.username = inputUsername.value.trim();
    inputUsername.value = '';
  }
};

async function writeUserData(username=state.username,content=inputMessage.value.trim()) {
  console.log("Username:", username);
  console.log("Content:", content);

  try {
    const docRef = await addDoc(collection(db, "users"), {
      username: state.username,
      content: inputMessage.value.trim()
    });
    inputMessage.value = '';
    console.log("Document written with ID: ", docRef.id);
    
    // Update state immediately after adding the message
    state.messages.push({ id: docRef.id, username: state.username, content });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function fetchData() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    console.log(messages)
    state.messages = messages;
  } catch (e) {
    console.error("Error fetching data: ", e);
  } finally {
    state.loading = false;
  }
}

onMounted(() => {
  fetchData();
});

const logout = () => {
    state.username = '';
}

</script>

<template>
  <div class="view login" v-if="state.username === '' || state.username === null">
    <form class="login-form" @submit.prevent="login">
      <div class="form-inner">
        <h1>Login to fleetchat</h1>
        <label for="username">username</label>
        <input type="text" v-model="inputUsername" placeholder="Please enter your username">
        <input type="submit" value="Login">
      </div>
    </form>
  </div>
  
  <div class="view chat" v-else>
    <header>
      <button class="logout" type="submit" @click="logout()">Logout</button>
      <h1>welcome, {{ state.username }}</h1>
    </header>

    <section class="chat-box">
      <div v-for="message in state.messages" :key="message.id" :class="(message.username == state.username ? 'message current-user':'message')">
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="writeUserData">
        <input type="text" v-model="inputMessage" placeholder="write your messsage...">
        <input type="submit" value="send">
      </form>
    </footer>
  </div>
</template>


<style>
.loading {
  text-align: center;
  margin-top: 20px;
}
</style>


<style scoped>
* {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.view {
	display: flex;
	justify-content: center;
	min-height: 100vh;
	background-color: #ea526f;
	
	&.login {
		align-items: center;
		.login-form {
			display: block;
			width: 100%;
			padding: 15px;
			
			.form-inner {
				display: block;
				background-color: #FFF;
				padding: 50px 15px;
				border-radius: 16px;
				box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);

				h1 {
					color: #AAA;
					font-size: 28px;
					margin-bottom: 30px;
				}

				label {
					display: block;
					margin-bottom: 5px;
					color: #AAA;
					font-size: 16px;
					transition: 0.4s;
				}

				input[type="text"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;

					display: block;
					width: 100%;
					padding: 10px 15px;
					border-radius: 8px;
					margin-bottom: 15px;
					
					color: #333;
					font-size: 18px;

					box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
					background-color: #F3F3F3;

					transition: 0.4s;

					&::placeholder {
						color: #888;
						transition: 0.4s;
					}
				}

				input[type="submit"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;

					display: block;
					width: 100%;
					padding: 10px 15px;
					background-color: #ea526f;
					border-radius: 8px;

					color: #FFF;
					font-size: 18px;
					font-weight: 700;
				}

				&:focus-within {
					label {
						color: #ea526f;
					}

					input[type="text"] {
						background-color: #FFF;
						box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);

						&::placeholder {
							color: #666;
						}
					}
				}
			}
		}
	}

	&.chat {
		flex-direction: column;

		header {
			position: relative;
			display: block;
			width: 100%;
			padding: 50px 30px 10px;

			.logout {
				position: absolute;
				top: 15px;
				right: 15px;
				appearance: none;
				border: none;
				outline: none;
				background: none;
				
				color: #FFF;
				font-size: 18px;
				margin-bottom: 10px;
				text-align: right;
			}

			h1 {
				color: #FFF;
			}
		}

		.chat-box {
			border-radius: 24px 24px 0px 0px;
			background-color: #FFF;
			box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
			flex: 1 1 100%;
			padding: 30px;

			.message {
				display: flex;
				margin-bottom: 15px;
				
				.message-inner {
					.username {
						color: #888;
						font-size: 16px;
						margin-bottom: 5px;
						padding-left: 15px;
						padding-right: 15px;
					}

					.content {
						display: inline-block;
						padding: 10px 20px;
						background-color: #F3F3F3;
						border-radius: 999px;

						color: #333;
						font-size: 18px;
						line-height: 1.2em;
						text-align: left;
					}
				}

				&.current-user {
					margin-top: 30px;
					justify-content: flex-end;
					text-align: right;

					.message-inner {
						max-width: 75%;

						.content {
							color: #FFF;
							font-weight: 600;
							background-color: #ea526f;
						}
					}
				}
			}
		}

		footer {
			position: sticky;
			bottom: 0px;
			background-color: #FFF;
			padding: 30px;
			box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);

			form {
				display: flex;

				input[type="text"] {
					flex: 1 1 100%;

					appearance: none;
					border: none;
					outline: none;
					background: none;

					display: block;
					width: 100%;
					padding: 10px 15px;
					border-radius: 8px 0px 0px 8px;
					
					color: #333;
					font-size: 18px;

					box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
					background-color: #F3F3F3;

					transition: 0.4s;

					&::placeholder {
						color: #888;
						transition: 0.4s;
					}
				}
				
				input[type="submit"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;

					display: block;
					padding: 10px 15px;
					border-radius: 0px 8px 8px 0px;

					background-color: #ea526f;

					color: #FFF;
					font-size: 18px;
					font-weight: 700;
				}
			}
		}
	}
}
</style>
