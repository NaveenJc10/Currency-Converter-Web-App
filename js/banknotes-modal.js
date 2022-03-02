var myFlag = document.getElementById("flag-list__my"),
  cnFlag = document.getElementById("flag-list__cn"),
  usFlag = document.getElementById("flag-list__us"),
  sgFlag = document.getElementById("flag-list__sg"),
  jpFlag = document.getElementById("flag-list__jp"),
  modal = document.getElementById("modal"),
  modalCloseBtn = document.getElementById("modal__close-btn"),
  modalImage = document.getElementById("modal__img"),
  modalText = document.getElementById("modal__text");
(myFlag.onclick = function () {
  (modal.style.display = "block"),
    (modalImage.src = "images/MYR.webp"),
    (modalText.innerHTML = "MYR : Malaysian Ringgit");
}),
  (cnFlag.onclick = function () {
    (modal.style.display = "block"),
      (modalImage.src = "images/CNY.webp"),
      (modalText.innerHTML = "CNY : Chinese Yuan");
  }),
  (usFlag.onclick = function () {
    (modal.style.display = "block"),
      (modalImage.src = "images/USD.webp"),
      (modalText.innerHTML = "USD : United States Dollar");
  }),
  (sgFlag.onclick = function () {
    (modal.style.display = "block"),
      (modalImage.src = "images/SGD.webp"),
      (modalText.innerHTML = "SGD : Singapore Dollar");
  }),
  (jpFlag.onclick = function () {
    (modal.style.display = "block"),
      (modalImage.src = "images/JPY.webp"),
      (modalText.innerHTML = "JPY : Japanese Yen");
  }),
  (modalCloseBtn.onclick = function () {
    modal.style.display = "none";
  }),
  (window.onclick = function (event) {
    event.target == modal && (modal.style.display = "none");
  });
