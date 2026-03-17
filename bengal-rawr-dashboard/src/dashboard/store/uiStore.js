import create from 'zustand';

const useUIStore = create((set) => ({
  selectedCourse: null,
  selectedDateRange: [null, null],
  isHeatmapVisible: true,
  isWeeklyChartVisible: true,
  isDeadlineListVisible: true,
  isCourseBreakdownVisible: true,
  isAlertsPanelVisible: true,

  setSelectedCourse: (course) => set({ selectedCourse: course }),
  setSelectedDateRange: (range) => set({ selectedDateRange: range }),
  toggleHeatmapVisibility: () => set((state) => ({ isHeatmapVisible: !state.isHeatmapVisible })),
  toggleWeeklyChartVisibility: () => set((state) => ({ isWeeklyChartVisible: !state.isWeeklyChartVisible })),
  toggleDeadlineListVisibility: () => set((state) => ({ isDeadlineListVisible: !state.isDeadlineListVisible })),
  toggleCourseBreakdownVisibility: () => set((state) => ({ isCourseBreakdownVisible: !state.isCourseBreakdownVisible })),
  toggleAlertsPanelVisibility: () => set((state) => ({ isAlertsPanelVisible: !state.isAlertsPanelVisible })),
}));

export default useUIStore;