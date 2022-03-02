function Ticker(elem) {
  elem.lettering(),
    (this.done = !1),
    (this.cycleCount = 5),
    (this.cycleCurrent = 0),
    (this.chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;':\"<>?,./`~".split(
        ""
      )),
    (this.charsCount = this.chars.length),
    (this.letters = elem.find("span")),
    (this.letterCount = this.letters.length),
    (this.letterCurrent = 0),
    this.letters.each(function () {
      var $this = $(this);
      $this.attr("data-orig", $this.text()), $this.text("-");
    });
}
(Ticker.prototype.getChar = function () {
  return this.chars[Math.floor(Math.random() * this.charsCount)];
}),
  (Ticker.prototype.reset = function () {
    (this.done = !1),
      (this.cycleCurrent = 0),
      (this.letterCurrent = 0),
      this.letters.each(function () {
        var $this = $(this);
        $this.text($this.attr("data-orig")), $this.removeClass("done");
      }),
      this.loop();
  }),
  (Ticker.prototype.loop = function () {
    var self = this;
    if (
      (this.letters.each(function (index, elem) {
        var $elem = $(elem);
        index >= self.letterCurrent &&
          " " !== $elem.text() &&
          ($elem.text(self.getChar()), $elem.css("opacity", Math.random()));
      }),
      this.cycleCurrent < this.cycleCount)
    )
      this.cycleCurrent++;
    else if (this.letterCurrent < this.letterCount) {
      var currLetter = this.letters.eq(this.letterCurrent);
      (this.cycleCurrent = 0),
        currLetter
          .text(currLetter.attr("data-orig"))
          .css("opacity", 1)
          .addClass("done"),
        this.letterCurrent++;
    } else this.done = !0;
    this.done
      ? setTimeout(function () {
          self.reset();
        }, 750)
      : requestAnimationFrame(function () {
          self.loop();
        });
  }),
  ($words = $(".word")),
  $words.each(function () {
    var $this = $(this),
      ticker = new Ticker($this).reset();
    $this.data("ticker", ticker);
  });
