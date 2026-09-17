
const lessons = [
  {
    number: 1,
    title: "Habitat",
    description: "Explore the differences between savannah and forest habitats.",
    free: true
  },
  {
    number: 2,
    title: "Photosynthesis",
    description: "Discover how green plants make their own food.",
    free: true
  },
  {
    number: 3,
    title: "Food Chain",
    description: "Follow how energy moves from one organism to another.",
    free: true
  },
  {
    number: 4,
    title: "Cell Structure",
    description: "Explore the parts of plant and animal cells.",
    free: true
  },
  {
    number: 5,
    title: "Osmosis",
    description: "Discover how water moves across a partially permeable membrane.",
    free: true
  },
  {
    number: 6,
    title: "Reproduction",
    description: "Learn how living organisms produce offspring.",
    free: false
  },
  {
    number: 7,
    title: "Genetics",
    description: "Explore genes, inheritance and variation.",
    free: false
  },
  {
    number: 8,
    title: "Ecology",
    description: "Understand relationships between organisms and their environment.",
    free: false
  },
  {
    number: 9,
    title: "Respiration",
    description: "Discover how cells release energy from food.",
    free: false
  },
  {
    number: 10,
    title: "Nutrition",
    description: "Learn about food and the nutrients living things need.",
    free: false
  }
];

const lessonList = document.getElementById("lessonList");
const exploreBtn = document.getElementById("exploreBtn");
const container = document.querySelector(".container");

// Load saved progress
let completedLessons = JSON.parse(
  localStorage.getItem("completedLessons")
) || [];

let cells = Number(localStorage.getItem("cells")) || 0;
let streak = Number(localStorage.getItem("streak")) || 0;
let lastStudyDate = localStorage.getItem("lastStudyDate") || "";

// Update study streak
function updateStreak() {
  const today = new Date().toDateString();

  if (lastStudyDate === today) {
    return;
  }

  if (lastStudyDate !== "") {
    const previousDate = new Date(lastStudyDate);
    const currentDate = new Date(today);

    const difference =
      (currentDate - previousDate) / (1000 * 60 * 60 * 24);

    if (difference === 1) {
      streak++;
    } else {
      streak = 1;
    }
  } else {
    streak = 1;
  }

  lastStudyDate = today;

  localStorage.setItem("streak", streak);
  localStorage.setItem("lastStudyDate", lastStudyDate);
}

// Create progress display
const progressBox = document.createElement("div");
progressBox.className = "progress-box";

if (container) {
  container.prepend(progressBox);
}

// Display progress
function displayProgress() {
  if (!progressBox) {
    return;
  }

  progressBox.innerHTML = `
    <h2>🌱 Your Progress</h2>
    <p>🧬 Cells: <strong>${cells}</strong></p>
    <p>🔥 Days Streak: <strong>${streak}</strong></p>
    <p>📚 Lessons Completed:
      <strong>${completedLessons.length}</strong> / ${lessons.length}
    </p>
  `;
}

// Complete a lesson
function completeLesson(lesson) {
  if (completedLessons.includes(lesson.number)) {
    alert("You have already completed this lesson.");
    return;
  }

  completedLessons.push(lesson.number);
  cells += 10;

  localStorage.setItem(
    "completedLessons",
    JSON.stringify(completedLessons)
  );

  localStorage.setItem("cells", cells);

  updateStreak();
  displayProgress();

  alert(
    "Congratulations! 🎉\n\n" +
    "You completed Lesson " +
    lesson.number +
    ": " +
    lesson.title +
    "\n\n" +
    "You earned 10 cells! 🧬"
  );

  renderLessons();
}

// Display lessons
function renderLessons() {
  if (!lessonList) {
    return;
  }

  lessonList.innerHTML = "";

  lessons.forEach(function(lesson, index) {
    const card = document.createElement("div");
    card.className = "lesson-card";

    const previousLessonCompleted =
      index === 0 ||
      completedLessons.includes(lessons[index - 1].number);

    const isCompleted = completedLessons.includes(lesson.number);
    const isLocked = !previousLessonCompleted;

    if (isLocked) {
      card.classList.add("locked");
    }

    if (isCompleted) {
      card.classList.add("completed");
    }

    let buttonText = "Start Learning";

    if (isCompleted) {
      buttonText = "✅ Completed";
    } else if (isLocked) {
      buttonText = "🔒 Locked";
    } else if (!lesson.free) {
      buttonText = "🔒 Premium — GHS 20";
    }

    card.innerHTML = `
      <h3>Lesson ${lesson.number}: ${lesson.title}</h3>
      <p>${lesson.description}</p>
      <button>${buttonText}</button>
    `;

    const button = card.querySelector("button");

    button.addEventListener("click", function() {
      if (isCompleted) {
        alert("You have already completed this lesson.");
      } else if (isLocked) {
        alert(
          "Complete Lesson " +
          (lesson.number - 1) +
          " first to unlock this lesson."
        );
      } else if (!lesson.free) {
        alert(
          "This is a premium lesson.\n\n" +
          "Payment will be added later."
        );
      } else {
        window.location.assign("./lesson.html");
      }
    });

    lessonList.appendChild(card);
  });
}

// Start the app
updateStreak();
displayProgress();
renderLessons();

// Explore Lessons button
if (exploreBtn) {
  exploreBtn.addEventListener("click", function() {
    const lessonsSection = document.getElementById("lessons");

    if (lessonsSection) {
      lessonsSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
}
