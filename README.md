# word_list_js
source code for generating words in brute-force

if you want to use it, remember :
<variable>
abjad -> contains the letter(s) that you want to generate
max_length -> maximum word length that you want to define

example :
abjad = 'abcde';
max_length = 8;
-> that means, you want to generate words from 'a', 'aa', 'aaa', ...., to 'eeeeeeee'
-> word total that you can generate from this example is (abjad.length ^ max_length-7) + (abjad.length ^ max_length-6) +(abjad.length ^ max_length-5) + ... + (abjad.length ^ max_length-0)

# caution !
# this is might caused heap out of memory !
# i still struggle to resolve it
