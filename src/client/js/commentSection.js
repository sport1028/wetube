import fetch from "node-fetch";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.getElementsByClassName("deleteBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  icon.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.className = "deleteBtn";
  newComment.appendChild(icon);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
  span2.addEventListener("click", handleDelete);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
    event.preventDefault();
    const videoId = videoContainer.dataset.id;
    const comment = event.target.parentNode;
    const commentId = comment.dataset.id;
    console.log(commentId);
    const response = await fetch(`/api/videos/${videoId}/commentDelete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, commentId }),
      });
    if (response.status === 200) {
        window.location.reload();
    }
}

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteBtns) {
    for(let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener("click", handleDelete);
    }
}
