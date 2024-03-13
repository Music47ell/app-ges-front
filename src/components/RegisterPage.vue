<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        <img class="w-8 h-8 mr-2" src="/images/logo.png" alt="logo" />
        Appp Ges
      </a>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Yeni bir hesap oluştur
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                >E-posta</label
              >
              <input
                type="email"
                name="email"
                id="email"
                placeholder="admin@example.com"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                v-model="email"
                required
              />
            </div>
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900"
                >Kullanıcı Adı</label
              >
              <input
                type="username"
                name="username"
                id="username"
                placeholder="admin"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                v-model="username"
                required
              />
            </div>
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900"
                >Telefon numarası</label
              >
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+903122132965"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                pattern="^\+(?:[0-9] ?){6,14}[0-9]$"
                title="Lütfen artı işaretiyle (+) başlayan ve boşluk içermeyen geçerli bir uluslararası telefon numarası girin"
                v-model="phone"
                required
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                >Şifre</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                v-model="password"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Üye olmak
            </button>
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
              v-if="errorMessage"
            >
              <strong class="font-bold">Hata!</strong>
              <span class="block">{{ errorMessage }}</span>
            </div>
            <div
              class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
              v-if="successMessage"
            >
              <strong class="font-bold">Tebrikler!</strong>
              <span class="block">{{ successMessage }}</span>
            </div>
            <p class="text-sm font-light text-gray-500">
              Hesabınız var mı?
              <a href="/login" class="font-medium text-blue-600 hover:underline">Giriş yapmak</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const username = ref('')
const phone = ref('')
const password = ref('')
const successMessage = ref('')
const errorMessage = ref('')

const login = async () => {
  if (email.value && username.value && phone.value && password.value) {
    try {
      const response = await fetch('https://panel.test.app-ges.com/panel/v2/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.value,
          username: username.value,
          phone: phone.value,
          password: password.value
        })
      })
      if (response.ok) {
        const data = await response.json()
        console.log('Giriş başarılı', data)
        successMessage.value = data.message
        email.value = ''
        username.value = ''
        phone.value = ''
        password.value = ''
        errorMessage.value = ''
      } else {
        const errorData = await response.json()
        console.error('Kayıt başarısız:', errorData)
        errorMessage.value = errorData.message || 'Kayıt başarısız'
      }
    } catch (error) {
      console.error('Sistem kayıt hatası:', error)
      errorMessage.value = 'Kayıt sırasında bir hata oluştu'
    }
  } else {
    errorMessage.value = 'Lütfen gerekli tüm bilgileri girin'
  }
}
</script>
