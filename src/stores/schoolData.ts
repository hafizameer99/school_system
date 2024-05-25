import { defineStore } from 'pinia';
import axios from 'axios';
// import { SchoolType, SchoolFeedbackType } from '../types/school';
import { SchoolType } from '@/types/schoolType';
import { SchoolFeedbackType } from '@/types/schoolFeedbackType';
import { useAuthStore } from './auth';

const API_BASE_URL = 'https://funcapp-takmilplatform-dev.azurewebsites.net/api';

export const useSchoolDataStore = defineStore('school-data', {
  state: () => ({
    schools: [] as SchoolType[],
    totalSchools: 0,
    totalStudents: 0,
    schoolsWithElectricity: 0,
    schoolsWithInternet: 0,
    schoolFeedback: [] as SchoolFeedbackType[], // Add feedback data state
  }),
  actions: {
    async fetchSchoolData() {
      try {
        const authStore = useAuthStore();
        const token = authStore.token || localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get<SchoolType[]>(`${API_BASE_URL}/dashboard/query/viewSchoolWithNames`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        this.schools = response.data;

        this.totalSchools = this.schools.length;
        this.totalStudents = this.schools.reduce((sum, school) => sum + (school.totalStudents || 0), 0);
        this.schoolsWithElectricity = this.schools.filter(school => school.hasElectricity).length;
        this.schoolsWithInternet = this.schools.filter(school => school.hasInternet).length;

      } catch (error) {
        console.error('Failed to fetch school data:', error);
      }
    },

    async fetchSchoolFeedbackByDate(date: Date) {
      try {
        const authStore = useAuthStore();
        const token = authStore.token || localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get<SchoolFeedbackType[]>(`${API_BASE_URL}/dashboard/query/querySchoolFeedbackByDate`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            today: date.toISOString().slice(0, 10)
          }
        });

        this.schoolFeedback = response.data;

      } catch (error) {
        console.error('Failed to fetch school feedback by date:', error);
      }
    }
  }
});
