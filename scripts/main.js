// import Toastify from './toastify.js'

const FORM = document.querySelector("form");
const OUTPUT = document.getElementById("output-container");
const TRAIL_OPTIONS = Array.from(document.querySelectorAll('[name="trail"]'));
const COUNT_SPAN = document.getElementById("char_count");
const ESTIMATED_SPAN = document.getElementById("estimated_posts");
const TRAIL_SPAN = document.getElementById("trail_length");
const MAX_POST_LENGTH = 280; // Set by X.com https://help.twitter.com/en/using-x/how-to-post
let trailLength = 0;

//#region Event Listeners
Array.from(FORM.elements).forEach((element) => {
  element.addEventListener("input", handleInput);
});

FORM.addEventListener("submit", (event) => {
  handleSubmit(event);
});

OUTPUT.addEventListener("click", (event) => {
  copyPost(event.target);
});
//#endregion

//#region Event Handlers
function handleInput() {
  let checkedOption = TRAIL_OPTIONS.filter((op) => op.checked)[0];
  checkedOption == FORM.elements["custom"]
    ? (FORM.elements["custom_text"].disabled = false)
    : (FORM.elements["custom_text"].disabled = true);
  let text = FORM.elements["post_input"].value;
  FORM.elements["custom"].value = FORM.elements["custom_text"].value;
  trailLength = checkedOption.value.length + 1;
  TRAIL_SPAN.innerText = trailLength;
  COUNT_SPAN.innerText = text.length;
  ESTIMATED_SPAN.innerText = Math.ceil(text.length / (280 - trailLength));
}

function handleSubmit(event) {
  event.preventDefault();
  OUTPUT.innerHTML = "";
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);
  thread(formProps);
}

async function copyPost(element) {
  // If not a post, do nothing.
  if (!element.classList.contains("single-post")) {
    return;
  }

  // Copy <p> text to clipboard
  let copyError = await writeClipboardText(element.innerText);

  if(copyError){
  // Set class to copied.
  element.classList.remove("pasted");
  element.classList.add("error");
  }else{
    // Set class to copied.
    element.classList.remove("pasted");
    element.classList.add("copied");
  }

  // When copying a new <p>, the previous ones should have a "pasted" class.
  getSiblings(element).forEach((sibling) => {
    if (sibling.classList.contains("copied")) {
      sibling.classList.remove("copied");
      sibling.classList.add("pasted");
    }
  });
}
//#endregion

//#region Auxiliary Functions
function getSiblings(element) {
  // For collecting siblings
  let siblings = [];
  if (!element.parentNode) {
    return siblings;
  }
  let sibling = element.parentNode.firstChild;

  // Collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== element) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
}

async function writeClipboardText(text) {
  try {
    await navigator.clipboard.writeText(text);
    Toastify({
      text: "Copied to clipboard",
      gravity: "bottom",
      position: "right"
    }).showToast()
    
  } catch (error) {
    Toastify({
      text: `Cannot copy to clipboard.\nError: ${error.message}`,
      duration: -1,
      gravity: "top",
      position: "center",
      close: true,
      style: {
        background: "red",
      },
    }).showToast();
    console.error(error.message);
    return new Error(error.message)
  }
}

function createIndividualPost(text) {
  const POST = document.createElement("p");
  POST.classList.add("single-post");
  POST.innerText = text;
  OUTPUT.appendChild(POST);
}
//#endregion

//#region Main Function
function thread(data) {
  let { post: fullPost, trail } = data;
  // Get the trail, trail length, post length.
  // Divide post.length by (MAX_POST_LENGTH - trail.length)

  const POST_LENGTH = MAX_POST_LENGTH - (1 + trail.length);
  const ESTIMATED_POSTS = Math.ceil(fullPost.length / POST_LENGTH);
  let individualPosts = [];

  for (let index = 0; index < ESTIMATED_POSTS; index++) {
    // Split text at same length
    let start = index * POST_LENGTH;
    let end = start + POST_LENGTH;
    let individualPost = fullPost.substring(start, end);

    if (trail === "00/00") {
      individualPost += ` ${index + 1}/${ESTIMATED_POSTS}`;
    }
    // Add trail (except for the last item)
    if (trail != "00/00" && index != ESTIMATED_POSTS - 1) {
      individualPost += " " + trail;
    }

    individualPosts.push(individualPost);
  }

  // Call function to create paragraphs with each Item
  individualPosts.forEach((post) => {
    createIndividualPost(post);
  });
}
//#endregion

handleInput();
