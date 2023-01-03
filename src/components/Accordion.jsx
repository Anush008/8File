const Accordion = () => {
    return (<div class="accordion" id="accordionExample5">
    <div class="accordion-item bg-white border border-gray-200">
      <h2 class="accordion-header mb-0" id="headingOne5">
        <button class="
          accordion-button
          relative
          flex
          items-center
          w-full
          py-4
          px-5
          text-base text-gray-800 text-left
          bg-white
          border-0
          rounded-none
          transition
          focus:outline-none
        " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne5" aria-expanded="true"
          aria-controls="collapseOne5">
          Accordion Item #1
        </button>
      </h2>
      <div id="collapseOne5" class="accordion-collapse collapse show" aria-labelledby="headingOne5">
        <div class="accordion-body py-4 px-5">
          <strong>This is the first item's accordion body.</strong> It is shown by default,
          until the collapse plugin adds the appropriate classes that we use to style each
          element. These classes control the overall appearance, as well as the showing and
          hiding via CSS transitions. You can modify any of this with custom CSS or overriding
          our default variables. It's also worth noting that just about any HTML can go within
          the <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </div>
    <div class="accordion-item bg-white border border-gray-200">
      <h2 class="accordion-header mb-0" id="headingTwo5">
        <button class="
          accordion-button
          collapsed
          relative
          flex
          items-center
          w-full
          py-4
          px-5
          text-base text-gray-800 text-left
          bg-white
          border-0
          rounded-none
          transition
          focus:outline-none
        " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo5" aria-expanded="false"
          aria-controls="collapseTwo5">
          Accordion Item #2
        </button>
      </h2>
      <div id="collapseTwo5" class="accordion-collapse collapse" aria-labelledby="headingTwo5">
        <div class="accordion-body py-4 px-5">
          <strong>This is the second item's accordion body.</strong> It is hidden by default,
          until the collapse plugin adds the appropriate classes that we use to style each
          element. These classes control the overall appearance, as well as the showing and
          hiding via CSS transitions. You can modify any of this with custom CSS or overriding
          our default variables. It's also worth noting that just about any HTML can go within
          the <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </div>
    <div class="accordion-item bg-white border border-gray-200">
      <h2 class="accordion-header mb-0" id="headingThree5">
        <button class="
          accordion-button
          collapsed
          relative
          flex
          items-center
          w-full
          py-4
          px-5
          text-base text-gray-800 text-left
          bg-white
          border-0
          rounded-none
          transition
          focus:outline-none
        " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree5" aria-expanded="false"
          aria-controls="collapseThree5">
          Accordion Item #3
        </button>
      </h2>
      <div id="collapseThree5" class="accordion-collapse collapse" aria-labelledby="headingThree5">
        <div class="accordion-body py-4 px-5">
          <strong>This is the third item's accordion body.</strong> It is hidden by default,
          until the collapse plugin adds the appropriate classes that we use to style each
          element. These classes control the overall appearance, as well as the showing and
          hiding via CSS transitions. You can modify any of this with custom CSS or overriding
          our default variables. It's also worth noting that just about any HTML can go within
          the <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </div>
  </div>)
}

export default Accordion;