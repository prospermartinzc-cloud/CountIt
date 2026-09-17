/* =========================
   COUNTIT V3
   SHARED APP SYSTEM
========================= */


/* =========================
   CELLS
========================= */

function getCells() {

  let cells =
    Number(
      localStorage.getItem("cells")
    );

  if (isNaN(cells)) {

    cells = 10;

    localStorage.setItem(
      "cells",
      cells
    );

  }

  return cells;

}


function addCells(amount) {

  let cells = getCells();

  cells += amount;

  if (cells < 0) {
    cells = 0;
  }

  localStorage.setItem(
    "cells",
    cells
  );

  return cells;

}


/* =========================
   GP — GROWTH POINTS
========================= */

function getGP() {

  let gp =
    Number(
      localStorage.getItem("gp")
    );

  if (isNaN(gp)) {

    gp = 0;

    localStorage.setItem(
      "gp",
      gp
    );

  }

  return gp;

}


function addGP(amount) {

  let gp = getGP();

  gp += amount;

  if (gp < 0) {
    gp = 0;
  }

  localStorage.setItem(
    "gp",
    gp
  );

  return gp;

}


/* =========================
   STREAK
========================= */

function getStreak() {

  return Number(
    localStorage.getItem("streak")
  ) || 0;

}


/* =========================
   LESSON PROGRESS
========================= */

function isLessonCompleted(
  lessonNumber
) {

  return (
    localStorage.getItem(
      "lesson" +
      lessonNumber +
      "Completed"
    ) === "true"
  );

}


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


function completeLesson(
  lessonNumber
) {

  localStorage.setItem(
    "lesson" +
    lessonNumber +
    "Completed",
    "true"
  );

}


/* =========================
   CELL REGENERATION
========================= */

/*
   Every 15 minutes:

   +5 Cells

   Maximum waiting regeneration:
   10 Cells.

   The learner's total Cells
   can go above 10.
*/

const CELL_REGEN_AMOUNT = 5;

const CELL_REGEN_INTERVAL =
  15 * 60 * 1000;

const CELL_REGEN_MAX = 10;


function processCellRegeneration() {

  const now = Date.now();

  let lastRegen =
    Number(
      localStorage.getItem(
        "lastCellRegen"
      )
    );


  /*
     First time.
  */

  if (!lastRegen) {

    localStorage.setItem(
      "lastCellRegen",
      now
    );

    return;

  }


  const elapsed =
    now - lastRegen;


  const periods =
    Math.floor(
      elapsed /
      CELL_REGEN_INTERVAL
    );


  if (periods <= 0) {

    return;

  }


  const regeneration =
    Math.min(
      periods *
      CELL_REGEN_AMOUNT,
      CELL_REGEN_MAX
    );


  addCells(
    regeneration
  );


  localStorage.setItem(
    "lastCellRegen",
    lastRegen +
    (
      periods *
      CELL_REGEN_INTERVAL
    )
  );

}


/* =========================
   START REGENERATION
========================= */

processCellRegeneration();


/*
   Check every minute
   while CountIt is open.
*/

setInterval(
  processCellRegeneration,
  60 * 1000
);


/* =========================
   SERVICE WORKER
========================= */

if (
  "serviceWorker" in navigator
) {

  navigator.serviceWorker
    .register(
      "service-worker.js"
    )
    .then(
      function() {

        console.log(
          "CountIt service worker registered."
        );

      }
    )
    .catch(
      function(error) {

        console.error(
          "Service worker registration failed:",
          error
        );

      }
    );

}