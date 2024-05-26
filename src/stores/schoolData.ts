import { defineStore } from "pinia";
import { SchoolType } from "@/types/schoolType";
import { SchoolFeedbackType } from "@/types/schoolFeedbackType";
import axiosInstance from "@/utils/axiosInstance";

export const useSchoolDataStore = defineStore("school-data", {
  state: () => ({
    schools: [] as SchoolType[],
    schoolFeedback: [] as SchoolFeedbackType[],
    totalSchools: 0,
    openSchool: 0,
    closeSchool: 0,
  }),
  actions: {
    async fetchSchoolData() {
      try {
        const response = await axiosInstance.get<SchoolType[]>(
          "/dashboard/query/viewSchoolWithNames"
        );

        this.schools = response.data;
        const functionalSchool = this.schools.filter(item => item.status === 'Functional').length;
        this.totalSchools = functionalSchool;
      } catch (error) {
        console.error("Failed to fetch school data:", error);
      }
    },

    async fetchSchoolFeedbackByDate(date: Date) {
      console.log('date',date)
      try {
        const response = await axiosInstance.get<SchoolFeedbackType[]>(
          "/dashboard/query/querySchoolFeedbackByDate",
          {
            params: {
              today: date.toISOString().slice(0, 10),
            },
          }
        );

        this.schoolFeedback = response.data;

        const onSchool = this.schoolFeedback.filter(item => item.schoolStatus === 'On').length;
        this.openSchool = onSchool;

        const offSchool = this.schoolFeedback.filter(item => item.schoolStatus === 'Off').length;
        this.closeSchool = offSchool;

      } catch (error) {
        console.error("Failed to fetch school feedback by date:", error);
      }
    },
  },
});
