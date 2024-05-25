<template>
    <div class="school-feedback">
      <h1>School Feedback</h1>
      <input type="date" v-model="selectedDate" @change="fetchFeedback" />
      <div class="feedbacks" v-if="schoolFeedback.length">
        <div class="feedback" v-for="feedback in schoolFeedback" :key="feedback._id">
          <h2>Feedback for {{ feedback.date }}</h2>
          <p>Attendance Shared: {{ feedback.attendanceShared }}</p>
          <p>Class Activity Completed: {{ feedback.classActivityCompleted }}</p>
          <p>Grade: {{ feedback.grade }}</p>
          <p>Level: {{ feedback.level }}</p>
          <p>Lesson Feedback Shared: {{ feedback.lessonFeedbackShared }}</p>
          <p>Media Shared: {{ feedback.mediaShared }}</p>
          <p>Mini Projector Used: {{ feedback.miniProjectorUsed }}</p>
          <p>School Status: {{ feedback.schoolStatus }}</p>
          <p>SEL: {{ feedback.sel }}</p>
          <p>Students Present: {{ feedback.studentsPresent }}</p>
          <p>Teacher Present: {{ feedback.teacherPresent }}</p>
          <p>Comments: {{ feedback.comments }}</p>
          <p>Issues: {{ feedback.issues }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue';
  import { useSchoolDataStore } from '../stores/schoolData';
  
  export default defineComponent({
    name: 'SchoolFeedback',
    setup() {
      const schoolDataStore = useSchoolDataStore();
      const selectedDate = ref(new Date().toISOString().slice(0, 10)); // Default to today's date
  
      const fetchFeedback = async () => {
        await schoolDataStore.fetchSchoolFeedbackByDate(new Date(selectedDate.value));
      };
  
      // Fetch initial feedback for today's date
      onMounted(fetchFeedback);
  
      // Use computed properties to access store state reactively
      const schoolFeedback = computed(() => schoolDataStore.schoolFeedback);
  
      return {
        selectedDate,
        fetchFeedback,
        schoolFeedback
      };
    }
  });
  </script>
  
  <style scoped>
  .school-feedback {
    max-width: 600px;
    margin: auto;
    padding: 1em;
    text-align: center;
  }
  .feedbacks {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .feedback {
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  