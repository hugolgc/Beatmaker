<template>
  <div class="flex lg:hidden min-h-screen bg-gray-900">
    <h1 class="m-auto text-center text-white tracking-wide font-light">
      <span class="text-4xl">Un écran c'est bien</span>
      <br />
      <span class="pt-2 text-xl font-medium"
        >Un écran plus grand c'est mieux</span
      >
    </h1>
  </div>
  <main class="hidden lg:flex min-h-screen bg-gray-900">
    <div class="w-full m-auto p-8 space-y-0.5">
      <div class="flex space-x-0.5">
        <div
          class="
            w-20
            h-14
            flex flex-none
            bg-gray-800
            rounded-md
            text-white
            cursor-pointer
          "
          @click="play()"
        >
          <svg
            v-if="run"
            xmlns="http://www.w3.org/2000/svg"
            class="m-auto h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="m-auto h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div
          class="
            h-14
            px-4
            flex
            justify-between
            items-center
            flex-auto
            border border-gray-800
            rounded-md
            overflow-hidden
          "
        >
          <div class="space-x-1 flex items-center">
            <input
              class="
                w-16
                bg-transparent
                text-white text-xl
                tracking-wide
                outline-none
              "
              type="number"
              min="50"
              max="400"
              v-model="bpm"
              @change="
                play();
                play();
              "
            />
            <p class="text-white text-xl tracking-wide">BPM</p>
          </div>
          <div class="flex space-x-6 text-white font-light tracking-wide">
            <p
              class="cursor-pointer"
              @click="
                setConfig(1);
                play();
              "
            >
              Config. 1
            </p>
            <p
              class="cursor-pointer"
              @click="
                setConfig(2);
                play();
              "
            >
              Config. 2
            </p>
            <p
              class="cursor-pointer"
              @click="
                setConfig(3);
                play();
              "
            >
              Config. 3
            </p>
          </div>
        </div>
      </div>
      <div
        v-for="(instrument, key) in instruments"
        :key="key"
        class="flex space-x-0.5"
      >
        <div class="w-20 flex flex-none bg-gray-800 rounded-md">
          <audio
            :id="key"
            :src="require('./assets/' + key + '.mp3')"
            class="hidden"
          ></audio>
          <img
            :src="require('./assets/' + key.slice(0, -1) + '.png')"
            :alt="'Image ' + key"
            class="m-auto"
          />
        </div>
        <div
          v-for="(item, index) in instrument.boxs"
          :key="index"
          @click="instruments[key].boxs[index] = !instruments[key].boxs[index]"
          class="h-14 flex-auto rounded-md cursor-pointer"
          :class="getClass(key, index)"
        >
          {{ index }}
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import "./assets/style.css";

export default {
  data() {
    return {
      run: false,
      step: 0,
      bpm: 146,
      interval: null,
      instruments: {
        kick1: {
          color: "bg-green",
          boxs: [],
        },
        kick2: {
          color: "bg-green",
          boxs: [],
        },
        kick3: {
          color: "bg-green",
          boxs: [],
        },
        snare1: {
          color: "bg-red",
          boxs: [],
        },
        hit1: {
          color: "bg-yellow",
          boxs: [],
        },
        hit2: {
          color: "bg-yellow",
          boxs: [],
        },
        hit3: {
          color: "bg-yellow",
          boxs: [],
        },
        hit4: {
          color: "bg-yellow",
          boxs: [],
        },
        tom1: {
          color: "bg-blue",
          boxs: [],
        },
        tom2: {
          color: "bg-blue",
          boxs: [],
        },
        tom3: {
          color: "bg-blue",
          boxs: [],
        },
      },
    };
  },
  methods: {
    setConfig(index) {
      for (const key in this.instruments) {
        for (let i = 0; i < 32; i++) {
          this.instruments[key].boxs[i] = false;
        }
      }
      if (index === 1) {
        this.bpm = 146;
        this.instruments.kick1.boxs[0] = true;
        this.instruments.kick1.boxs[6] = true;
        this.instruments.kick1.boxs[12] = true;
        this.instruments.kick1.boxs[16] = true;
        this.instruments.kick1.boxs[22] = true;
        this.instruments.hit1.boxs[3] = true;
        this.instruments.hit1.boxs[5] = true;
        this.instruments.hit1.boxs[19] = true;
        this.instruments.hit1.boxs[21] = true;
        this.instruments.tom2.boxs[8] = true;
        this.instruments.tom2.boxs[24] = true;
      } else if (index === 2) {
        this.bpm = 138;
        this.instruments.kick2.boxs[0] = true;
        this.instruments.kick2.boxs[6] = true;
        this.instruments.kick2.boxs[15] = true;
        this.instruments.kick2.boxs[16] = true;
        this.instruments.kick2.boxs[23] = true;
        this.instruments.kick2.boxs[28] = true;
        this.instruments.kick3.boxs[0] = true;
        this.instruments.kick3.boxs[16] = true;
        this.instruments.hit4.boxs[4] = true;
        this.instruments.hit4.boxs[12] = true;
        this.instruments.hit4.boxs[20] = true;
        this.instruments.hit4.boxs[28] = true;
        this.instruments.tom1.boxs[8] = true;
        this.instruments.tom1.boxs[24] = true;
      } else {
        this.bpm = 120;
        this.instruments.kick1.boxs[0] = true;
        this.instruments.kick1.boxs[4] = true;
        this.instruments.kick1.boxs[8] = true;
        this.instruments.kick1.boxs[11] = true;
        this.instruments.kick1.boxs[14] = true;
        this.instruments.kick1.boxs[16] = true;
        this.instruments.kick1.boxs[20] = true;
        this.instruments.kick1.boxs[24] = true;
        this.instruments.kick1.boxs[27] = true;
        this.instruments.kick1.boxs[30] = true;
        this.instruments.tom2.boxs[3] = true;
        this.instruments.tom2.boxs[6] = true;
        this.instruments.tom2.boxs[11] = true;
        this.instruments.tom2.boxs[14] = true;
        this.instruments.tom2.boxs[19] = true;
        this.instruments.tom2.boxs[22] = true;
        this.instruments.tom2.boxs[27] = true;
        this.instruments.tom2.boxs[30] = true;
        this.instruments.snare1.boxs[7] = true;
        this.instruments.snare1.boxs[10] = true;
        this.instruments.snare1.boxs[14] = true;
        this.instruments.snare1.boxs[19] = true;
        this.instruments.snare1.boxs[23] = true;
        this.instruments.snare1.boxs[26] = true;
        this.instruments.snare1.boxs[30] = true;
        this.instruments.hit3.boxs[2] = true;
        this.instruments.hit3.boxs[6] = true;
        this.instruments.hit3.boxs[7] = true;
        this.instruments.hit3.boxs[10] = true;
        this.instruments.hit3.boxs[14] = true;
        this.instruments.hit3.boxs[15] = true;
        this.instruments.hit3.boxs[18] = true;
        this.instruments.hit3.boxs[22] = true;
        this.instruments.hit3.boxs[23] = true;
        this.instruments.hit3.boxs[31] = true;
      }
    },
    init() {
      for (const key in this.instruments) {
        for (let i = 0; i < 32; i++) this.instruments[key].boxs.push(false);
      }
      this.setConfig(1);
    },
    getClass(key, index) {
      if (this.instruments[key].boxs[index]) {
        return this.instruments[key].color;
      } else if (index === this.step || index % 4 === 0) {
        return "bg-gray-700 hover:bg-gray-700";
      } else {
        return "bg-gray-800 hover:bg-gray-700";
      }
    },
    play() {
      if (this.run) {
        this.run = false;
        clearInterval(this.interval);
      } else {
        this.run = true;
        this.interval = setInterval(() => {
          for (const key in this.instruments) {
            for (
              let index = 0;
              index < this.instruments[key].boxs.length;
              index++
            ) {
              if (this.instruments[key].boxs[index] && index === this.step)
                this.sound(key);
            }
          }
          this.step++;
          this.step = this.step > 31 ? 0 : this.step;
        }, (60 / this.bpm / 4) * 1000);
      }
    },
    sound(key) {
      const audio = document.getElementById(key);
      audio.currentTime = 0;
      audio.play();
    },
  },
  mounted() {
    this.init();
    document.body.onkeyup = (e) => {
      if (e.code !== "Space") return;
      this.play();
    };
  },
};
</script>
