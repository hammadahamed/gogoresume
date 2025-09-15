import { ref, reactive } from "vue";
import { UserInfo } from "@/types/resume.types";
import { useUserStore } from "@/stores/useUserStore";

export function useResumeHistory() {
  const history = ref<UserInfo[]>([]);
  const currentIndex = ref(-1);
  const maxHistorySize = 20; // Keep last 20 states

  const userStore = useUserStore();

  const state = reactive({
    canUndo: false,
    canRedo: false,
  });

  const updateState = () => {
    state.canUndo = currentIndex.value > 0 && history.value.length > 0;
    state.canRedo = currentIndex.value < history.value.length - 1;
  };

  const saveState = (resume: UserInfo) => {
    if (!resume) return;
    // Delete everything after current index
    history.value = history.value.slice(0, currentIndex.value + 1);
    // Add new state
    history.value.push(JSON.parse(JSON.stringify(resume)));
    // Keep history within limit
    if (history.value.length > maxHistorySize) {
      history.value = history.value.slice(-maxHistorySize);
    }
    // Set current index to the last item
    currentIndex.value = history.value.length - 1;
    updateState();
  };

  const undo = () => {
    if (!state.canUndo) return;
    currentIndex.value--;
    updateState();
    userStore.setCurrentResume(history.value[currentIndex.value]);
  };

  const redo = () => {
    if (!state.canRedo) return;
    currentIndex.value++;
    updateState();
    userStore.setCurrentResume(history.value[currentIndex.value]);
  };

  const getCurrentState = (): UserInfo | null => {
    if (currentIndex.value < 0 || currentIndex.value >= history.value.length) {
      return null;
    }
    return JSON.parse(JSON.stringify(history.value[currentIndex.value]));
  };

  const clearHistory = () => {
    history.value = [];
    currentIndex.value = -1;
    updateState();
  };

  const getHistoryInfo = () => {
    return {
      total: history.value.length,
      currentIndex: currentIndex.value,
      canUndo: state.canUndo,
      canRedo: state.canRedo,
    };
  };

  return {
    state,
    history,
    saveState,
    undo,
    redo,
    getCurrentState,
    clearHistory,
    getHistoryInfo,
  };
}
