<template>
    <LineChart :data="chartData" />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
  } from 'chart.js';
  
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  );
  
  export default defineComponent({
    name: 'SeismicChart',
    components: {
      LineChart: Line,
    },
    props: {
      chartData: {
        type: Object,
        required: true,
      },
    },
  });
  </script>
  