/**
 * BIG NOTE
 * BIG NOTE
 * BIG NOTE
 * BIG NOTE
 * BIG NOTE
 * BIG NOTE
 * 
 * YOU SHOULD RUN IT WITH
 * example :
 * node --max-old-space-size=4096 word_list.js
 * 
 * --max-old-space-size helps you to reach up the memory usage for this word generate code
 * you can fill it (--max-old-space-size=x) in byte decimal number -> 1024, 2048, etc
 */

const fs = require('fs');

String.prototype.replaceAt = function(index, replacement) {
	if (index >= this.length) {
		return this.valueOf();
	}

	return this.substring(0, index) + replacement + this.substring(index + 1);
}

let abjad = 'oig0169';
let max_length = 9;
let init_abjad = '';
let final_abjad = '';
let count = 0;
let words = '';
let word_list = [];
// 500000 row

for (let i=0; i<max_length; i++) {
  init_abjad = '';
  final_abjad = '';
  for (let conc=0; conc<i+1; conc++) {
    init_abjad = init_abjad.concat(abjad[0]);
    final_abjad = final_abjad.concat(abjad[abjad.length-1]);
  }

  while (init_abjad !== final_abjad) {
    /**
     * putar index ke 0 dari init_abjad sepanjang abjad
     * misal : abjad = 'abc' && init_abjad = 'aaa'
     * putar : init_abjad = 'baa'
     * putar : init_abjad = 'caa'
     * putar : init_abjad = 'aba'
     * dst
     * */
    for (let j=0; j<abjad.length; j++) {
      init_abjad = init_abjad.replaceAt(0, abjad[j]);
      // count++;
      // console.log(init_abjad);
      // console.log(count);
      // if (count === 0) {
      //   fs.writeFile('D:/word_list.txt', init_abjad, (err) => {
      //     if (err) throw err;
      //   })
      // }
      words = words.concat(init_abjad.concat('\n'));
      // file dipecah setiap 6.725.591 words
      if (words.length > (6725591*6)) {
        // word_list.push(words);
        fs.writeFile(`./list/word_list_${count}.txt`, words, 'utf8',(err) => {
          if (err) throw err;
        })
        words = '';
        count++;
      }
    }
    if (init_abjad === final_abjad) break;

    init_abjad = init_abjad.replaceAt(0, abjad[0]);

    let is_akhir = true;
    for (let j=1; j<init_abjad.length; j++) {
      if (init_abjad[j] === abjad[abjad.length-1]) {
        init_abjad = init_abjad.replaceAt(j, abjad[0]);
        is_akhir = true;
      } else {
        init_abjad = init_abjad.replaceAt(j, abjad[abjad.indexOf(init_abjad[j])+1]);
        is_akhir = false;
      }
      if (!is_akhir) break;
    }
  }
}
// console.log(word_list)
// word_list.forEach((wordList, index) => {
//   fs.writeFile(`D:/word_list/word_list_${index}.txt`, wordList, 'utf8',(err) => {
//     if (err) throw err;
//   })
// })
fs.writeFile(`./list/word_list_${count}.txt`, words, 'utf8',(err) => {
  if (err) throw err;
})
