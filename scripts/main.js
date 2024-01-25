const FORM = document.querySelector("form")
const TRAIL_OPTIONS = Array.from(document.querySelectorAll('[name="trail"]'))
const COUNT_SPAN = document.getElementById("char_count")
const ESTIMATED_SPAN = document.getElementById("estimated_posts")
const TRAIL_SPAN = document.getElementById("trail_length")
let trailLength = TRAIL_OPTIONS.filter(option => option.checked)[0].value.length
TRAIL_SPAN.innerText=trailLength
  

Array.from(FORM.elements).forEach((element)=>{
  element.addEventListener('input', handleInput)
})

function handleInput() {
  let checkedOption = TRAIL_OPTIONS.filter(op => op.checked)[0]
  checkedOption == FORM.elements["custom"] ? FORM.elements["custom_text"].disabled = false : FORM.elements["custom_text"].disabled = true
  let text = FORM.elements["post_input"].value
  FORM.elements["custom"].value = FORM.elements["custom_text"].value
  trailLength = checkedOption.value.length
  TRAIL_SPAN.innerText=trailLength
  COUNT_SPAN.innerText= text.length
  ESTIMATED_SPAN.innerText= Math.ceil(text.length / (280 - trailLength))
}

FORM.onsubmit = (event)=>{
  event.preventDefault();
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);
  clip(formProps)
}

function clip(data) {

  console.log(data)
  // Get the trail
  
  // Get trail length

  // Count characters on post text

  // Divide post.length by (280 - trail.length)

  // Split text at same length and add trail (except for the last item)

  // Call function to create paragraphs with each Item

}

function createIndividualPost(text){
  // Create <p> 

  // Insert text

  // Insert <p> into DOM

  // Add eventListener to copy to clipboard when clicked
}

function copyPost(){
  // TO HANDLE CLICK 
  // Copy <p> text to clipboard

  // Set state to copied. If copied backgruond should be green

  // When copying a new <p>, the previous one should have a "pasted" state. Change bg to gray
}

