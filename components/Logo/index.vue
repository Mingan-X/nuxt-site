<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="104"
    height="40"
    viewBox="0 0 209.00396728515625 128.0022201538086"
    fill="none"
  >
    <title>Jasper</title>
    <path
      stroke="rgba(0, 0, 0, 1)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M96.7977 1.5C60.2947 34.8206 38.9769 92.2909 27.2959 108.187C15.615 124.083 -2.19583 127.751 2.18188 101.767C6.55959 75.7835 37.8042 59.8874 42.1892 57.1362C42.1892 57.1362 67.8786 42.4629 86.279 28.401C104.679 14.3391 96.897 12.1993 85.0233 12.1993C73.1495 12.1993 52.3233 28.401 41.2255 46.4369C30.1277 64.4728 32.1723 69.3639 41.2255 71.8095C50.2787 74.255 83.5876 70.4124 86.2906 64.4728C88.9937 58.5333 77.5723 58.0071 66.141 74.255C54.7097 90.5029 75.9568 81.2918 81.6183 71.8095C68.5262 88.0073 79.5774 85.26 88.0486 79.1461C88.4841 79.602 108.111 61.8382 107.614 61.1102C107.876 63.2985 101.906 82.5033 102.942 77.312C102.033 83.3948 93.5971 84.6486 93.5971 79.1461C93.8319 96.063 147.039 45.8255 148.498 40.9344L91.8449 120.72C83.6678 133.111 81.1576 122.759 86.2965 115.829C93.7311 99.7284 137.115 64.4728 137.115 64.4728C147.423 56.8677 147.043 64.1671 137.115 74.255C127.186 84.3429 137.405 80.9803 143.539 79.1461C149.673 77.312 154.348 77.312 166.901 67.8355C179.454 58.359 166.895 51.6337 156.68 67.8355C146.465 84.0372 156.68 85.5657 166.907 79.1461C177.133 72.7266 191.729 58.359 191.729 58.359C191.729 58.359 197.863 49.1882 187.64 58.359C185.637 60.5472 193.316 66.8673 189.977 67.8355C181.752 73.3302 170.701 98.3292 207.504 64.4728"
    ></path>
  </svg>
</template>

<script setup></script>

<style scoped>
@media (prefers-reduced-motion) {
  path {
    animation: none !important;
    stroke-dasharray: unset !important;
  }
}
@media print {
  path {
    animation: none !important;
    stroke-dasharray: unset !important;
  }
}
@keyframes grow {
  0% {
    stroke-dashoffset: 1px;
    stroke-dasharray: 0 1100px;
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translate(0, 1%);
  }
  20% {
    transform: translate(0, 0);
  }
  40% {
    stroke-dasharray: 1100px 0;
  }
  85% {
    stroke-dasharray: 1100px 0;
  }
  95%,
  to {
    stroke-dasharray: 0 1100px;
  }
}
path {
  stroke-dashoffset: 1px;
  stroke-dasharray: 1100px 0;
  animation: grow 15s ease forwards infinite;
  transform-origin: center;
  stroke: #303030;
  animation-delay: 0s;
}
.dark path {
  stroke: #fdfdfd;
}
</style>
