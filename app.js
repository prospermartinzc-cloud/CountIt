/* =========================
   COUNTIT APP DATA
========================= */

// Get Cells
function getCells() {

  return Number(
    localStorage.getItem("cells")
  ) || 0;

}


// Get Streak
function getStreak() {

  return Number(
    localStorage.getItem("streak")
  ) || 0;

}


// Check if a lesson is completed
function isLessonCompleted(lessonNumber) {

  return (
    localStorage.getItem(
      "lesson" + lessonNumber + "Completed"
    ) === "true"
  );

}


// Count completed lessons
function getCompletedLessons() {

  let completed = 0;

  for (
    let i = 1;
    i <= 10;
    i++
  ) {

    if (
      isLessonCompleted(i)
    ) {

      completed++;

    }

  }

  return completed;

}
/* =========================
   ADD CELLS
========================= */

function addCells(amount) {

  let cells = getCells();

  cells += amount;

  localStorage.setItem(
    "cells",
    cells
  );

  return cells;

}
/* =========================
   COMPLETE LESSON
========================= */

function completeLesson(lessonNumber) {

  localStorage.setItem(
    "lesson" + lessonNumber + "Completed",
    "true"
  );

}
/* =========================
   SERVICE WORKER
========================= */

if ("serviceWorker" in navigator) {

  navigator.serviceWorker.register(
    "service-worker.js"
  );

}