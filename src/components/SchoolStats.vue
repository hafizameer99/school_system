<template>
    <div class="school-stats">
      <h1>School Statistics</h1>
      <div class="stats">
        <div class="stat">
          <h2>Total Schools</h2>
          <p>{{ totalSchools }}</p>
        </div>
        <div class="stat">
          <h2>Total Students</h2>
          <p>{{ totalStudents }}</p>
        </div>
        <div class="stat">
          <h2>Schools with Electricity</h2>
          <p>{{ schoolsWithElectricity }}</p>
        </div>
        <div class="stat">
          <h2>Schools with Internet</h2>
          <p>{{ schoolsWithInternet }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, computed } from 'vue';
  import { useSchoolDataStore } from '../stores/schoolData';
  
  export default defineComponent({
    name: 'SchoolStats',
    setup() {
      const schoolDataStore = useSchoolDataStore();
  
      onMounted(async () => {
        await schoolDataStore.fetchSchoolData();
      });
  
      // Use computed properties to access store state reactively
      const totalSchools = computed(() => schoolDataStore.totalSchools);
      const totalStudents = computed(() => schoolDataStore.totalStudents);
      const schoolsWithElectricity = computed(() => schoolDataStore.schoolsWithElectricity);
      const schoolsWithInternet = computed(() => schoolDataStore.schoolsWithInternet);
  
      return {
        totalSchools,
        totalStudents,
        schoolsWithElectricity,
        schoolsWithInternet
      };
    }
  });
  </script>
  
  <style scoped>
  .school-stats {
    max-width: 600px;
    margin: auto;
    padding: 1em;
    text-align: center;
  }
  .stats {
    display: flex;
    justify-content: space-around;
  }
  .stat {
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  