<template>
  <!-- Container for school statistics -->
  <div class="container mt-5">
    <!-- Title -->
    <h1 class="text-center mb-4">School Statistics</h1>
    <!-- Input for selecting date -->
    <input
      type="date"
      class="form-control w-50"
      v-model="selectedDate"
      @change="fetchFeedback"
    />
    <!-- Cards displaying school statistics -->
    <div class="row cards-block">
      <!-- Card for total schools -->
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <div
            class="card-body d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 class="card-title">Total</h5>
              <p class="card-text">{{ totalSchools }}</p>
            </div>
            <i class="fa fa-book text-primary" style="font-size: 1.5rem"></i>
          </div>
        </div>
      </div>
      <!-- Card for open schools -->
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <div
            class="card-body d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 class="card-title">Open</h5>
              <p class="card-text">{{ openSchool }}</p>
            </div>
            <i class="fa fa-user-o text-success" style="font-size: 1.5rem"></i>
          </div>
        </div>
      </div>
      <!-- Card for closed schools -->
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <div
            class="card-body d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 class="card-title">Closed</h5>
              <p class="card-text">{{ closeSchool }}</p>
            </div>
            <i class="fa fa-square-o text-info" style="font-size: 1.5rem"></i>
          </div>
        </div>
      </div>
      <!-- Card for schools with no reported status -->
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <div
            class="card-body d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 class="card-title">Not Reported</h5>
              <!-- Calculate and display schools with no reported status -->
              <p class="card-text">
                {{ totalSchools - (openSchool + closeSchool) }}
              </p>
            </div>
            <i class="fa fa-file-o text-danger" style="font-size: 1.5rem"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useSchoolDataStore } from "../stores/schoolData";

export default defineComponent({
  name: "SchoolStats",
  setup() {
    const schoolDataStore = useSchoolDataStore();
    const selectedDate = ref(); // Default to today's date

    // Fetch school data on component mount
    onMounted(async () => {
      await schoolDataStore.fetchSchoolData();
    });

    // Function to fetch feedback based on selected date
    const fetchFeedback = async () => {
      await schoolDataStore.fetchSchoolFeedbackByDate(
        new Date(selectedDate.value)
      );
    };

    // Computed properties to access store state reactively
    const totalSchools = computed(() => schoolDataStore.totalSchools);
    const openSchool = computed(() => schoolDataStore.openSchool);
    const closeSchool = computed(() => schoolDataStore.closeSchool);

    return {
      totalSchools,
      openSchool,
      closeSchool,
      selectedDate,
      fetchFeedback,
    };
  },
});
</script>

<style scoped>
/* Styling for cards block */
.cards-block {
  margin-top: 300px;
}
</style>
