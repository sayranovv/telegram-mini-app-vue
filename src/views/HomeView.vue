<script setup>
import { ref, computed } from 'vue'
import ScoreProgress from '@/components/ScoreProgress.vue'
import { useScoreStore } from '@/stores/score.js'
import frog from '@/assets/frog.png'
import lizard from '@/assets/lizzard.png'
import one from '@/assets/1.png'
import two from '@/assets/2.png'
import three from '@/assets/3.png'
import four from '@/assets/4.png'
import five from '@/assets/5.png'
import six from '@/assets/6.png'
import seven from '@/assets/7.png'
import eight from '@/assets/8.png'
import nine from '@/assets/9.png'
import ten from '@/assets/10.png'


const store = useScoreStore()

const img = ref(null)
const imgSrc = computed(() => {
  if (store.score < 25) {
    return one
  } else if (store.score < 75) {
    return two
  } else if (store.score < 175) {
    return three
  } else if (store.score < 375) {
    return four
  } else if (store.score < 775) {
    return five
  } else if (store.score < 1575) {
    return six
  } else if (store.score < 3175) {
    return seven
  } else if (store.score < 6375) {
    return eight
  } else if (store.score < 12775) {
    return nine
  } else if (store.score >= 12775) {
    return ten
  }
})

function increment(event) {
  store.add(1)
  const rect = event.target.getBoundingClientRect()

  const offfsetX = event.clientX - rect.left - rect.width / 2
  const offfsetY = event.clientY - rect.top - rect.height / 2

  const DEG = 40

  const tiltX = (offfsetY / rect.height) * DEG
  const tiltY = (offfsetX / rect.width) * -DEG

  img.value.style.setProperty('--tiltX', `${tiltX}deg`)
  img.value.style.setProperty('--tiltY', `${tiltY}deg`)

  setTimeout(() => {
    img.value.style.setProperty('--tiltX', `0deg`)
    img.value.style.setProperty('--tiltY', `0deg`)
  }, 300)

  const plusOne = document.createElement('div')
  plusOne.classList.add('plus-one')
  plusOne.textContent = '+1'
  plusOne.style.left = `${event.clientX - rect.left}px`
  plusOne.style.top = `${event.clientY - rect.top}px`

  img.value.parentElement.appendChild(plusOne)

  setTimeout(() => plusOne.remove(), 2000)
}
</script>

<template>
  <div class="game-container">
    <ScoreProgress />
    <div class="header">
      <img src="../assets/coin.png" alt="coin" />
      <h2 class="score" id="score">{{ store.score }}</h2>
    </div>
    <div class="circle">
      <img @click="increment" ref="img" id="circle" :src="imgSrc" />
    </div>
  </div>
</template>


