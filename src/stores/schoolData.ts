import { defineStore } from "pinia"; // Import necessary function from Pinia
import { SchoolType } from "@/types/schoolType"; // Import SchoolType interface
import { SchoolFeedbackType } from "@/types/schoolFeedbackType"; // Import SchoolFeedbackType interface
import axiosInstance from "@/utils/axiosInstance"; // Import Axios instance

// Define and export SchoolDataStore using Pinia's defineStore function
export const useSchoolDataStore = defineStore("school-data", {
  state: () => ({
    schools: [] as SchoolType[], // Array to store school data
    schoolFeedback: [] as SchoolFeedbackType[], // Array to store school feedback data
    totalSchools: 0, // Total number of schools
    openSchool: 0, // Number of open schools
    closeSchool: 0, // Number of closed schools
  }),
  actions: {
    // Action to fetch school data
    async fetchSchoolData() {
      try {
        // Send GET request to fetch school data
        const response = await axiosInstance.get<SchoolType[]>(
          "/dashboard/query/viewSchoolWithNames"
        );

        // Update schools array with fetched data
        this.schools = response.data;

        // Calculate total number of functional schools
        const functionalSchool = this.schools.filter(item => item.status === 'Functional').length;
        this.totalSchools = functionalSchool;
      } catch (error) {
        // Handle error if fetching school data fails
        console.error("Failed to fetch school data:", error);
      }
    },

    // Action to fetch school feedback by date
    async fetchSchoolFeedbackByDate(date: Date) {
      console.log('date',date)
      try {
        // Send GET request to fetch school feedback by date
        const response = await axiosInstance.get<SchoolFeedbackType[]>(
          "/dashboard/query/querySchoolFeedbackByDate",
          {
            params: {
              today: date.toISOString().slice(0, 10), // Format date to YYYY-MM-DD
            },
          }
        );

        // Update schoolFeedback array with fetched data
        this.schoolFeedback = response.data;

        // Calculate number of open schools based on feedback
        const onSchool = this.schoolFeedback.filter(item => item.schoolStatus === 'On').length;
        this.openSchool = onSchool;

        // Calculate number of closed schools based on feedback
        const offSchool = this.schoolFeedback.filter(item => item.schoolStatus === 'Off').length;
        this.closeSchool = offSchool;

      } catch (error) {
        // Handle error if fetching school feedback by date fails
        console.error("Failed to fetch school feedback by date:", error);
      }
    },
  },
});
