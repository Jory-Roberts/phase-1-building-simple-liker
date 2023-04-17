// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";
const likeBtns = document.querySelectorAll(".like-glyph");
const errorModal = document.querySelector("#modal");
const errorMessage = document.querySelector("#modal-message");

errorModal.classList.add("hidden");

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  addingEventListener();
});
const addingEventListener = () => {
  likeBtns.forEach((likeBtn) => {
    likeBtn.addEventListener("click", (e) =>
      toggleLikeState(e, errorMessage, errorModal)
    );
  });
};

const toggleLikeState = (e, errorMessage, errorModal) => {
  const heart = e.target;
  mimicServerCall()
    .then(() => {
      heart.classList.toggle("activated-heart");
      if (heart.classList.contains("activated-heart")) {
        heart.innerText = FULL_HEART;
      } else {
        heart.innterText = EMPTY_HEART;
      }
    })
    .catch(() => {
      errorMessage.innerText = "Something broke";
      errorModal.classList.remove("hidden");
      setTimeout(() => {
        errorModal.classList.add("hidden");
      }, 3000);
    });
};

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
