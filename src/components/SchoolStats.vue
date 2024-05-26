<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">School Statistics</h1>
    <input
      type="date"
      class="form-control w-50"
      v-model="selectedDate"
      @change="fetchFeedback"
    />
    <div class="row cards-block">
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
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <div
            class="card-body d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 class="card-title">Not Reported</h5>
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

    onMounted(async () => {
      await schoolDataStore.fetchSchoolData();
    });

    const fetchFeedback = async () => {
      await schoolDataStore.fetchSchoolFeedbackByDate(
        new Date(selectedDate.value)
      );
    };

    // Use computed properties to access store state reactively
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
.cards-block {
  margin-top: 300px;
}
</style>
